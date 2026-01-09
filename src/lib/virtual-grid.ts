import { RefObject, useEffect, useState, useMemo, useRef, useCallback } from 'react';

// ============================================================================
// HOOK: useContainerDimensions
// ============================================================================

export const useContainerDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
};

type VirtualGridParams<T> = {
  items: T[];
  containerWidth: number;
  containerHeight: number;
  scrollTop: number;
  cardSize: number;
  gap?: number;
  bufferRows?: number;
}

type VirtualGridResult<T> = {
  visibleItems: Array<{
    item: T;
    index: number;
    style: React.CSSProperties;
  }>;
  totalHeight: number;
  columns: number;
}

export const useVirtualGridForCards = <T,>({
  items,
  containerWidth,
  containerHeight,
  scrollTop,
  cardSize,
  gap = 24,
  bufferRows = 3
}: VirtualGridParams<T>): VirtualGridResult<T> => {
  return useMemo(() => {
    if (!containerWidth || !containerHeight) {
      return { visibleItems: [], totalHeight: 0, columns: 0 };
    }

    const minCardWidth = Math.max(400, cardSize * 1.5);
    const availableWidth = containerWidth - (gap * 2);
    const columns = Math.max(1, Math.floor(availableWidth / minCardWidth));

    const totalGaps = (columns - 1) * gap;
    const cardWidth = (availableWidth - totalGaps) / columns;

    const totalRows = Math.ceil(items.length / columns);
    const rowHeight = cardSize + gap;
    const totalHeight = totalRows * rowHeight + (gap * 2);

    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferRows);
    const endRow = Math.min(
      totalRows,
      Math.ceil((scrollTop + containerHeight) / rowHeight) + bufferRows
    );

    const visibleItems = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        if (index >= items.length) break;

        visibleItems.push({
          item: items[index],
          index,
          style: {
            position: 'absolute' as const,
            top: row * rowHeight + gap,
            left: col * (cardWidth + gap) + gap,
            width: cardWidth,
            height: cardSize
          }
        });
      }
    }

    return { visibleItems, totalHeight, columns };
  }, [items, containerWidth, containerHeight, scrollTop, cardSize, gap, bufferRows]);
};

type DynamicGridParams<T> = {
  items: T[];
  containerWidth: number;
  containerHeight: number;
  scrollTop: number;
  estimatedCardHeight: number; // Altura estimada inicial
  gap?: number;
  bufferRows?: number;
}

type DynamicGridResult<T> = {
  visibleItems: Array<{
    item: T;
    index: number;
    style: React.CSSProperties;
    measureRef: (el: HTMLElement | null) => void;
  }>;
  totalHeight: number;
  columns: number;
}

export const useVirtualGridDynamicHeight = <T extends { id: string }>({
  items,
  containerWidth,
  containerHeight,
  scrollTop,
  estimatedCardHeight,
  gap = 24,
  bufferRows = 3
}: DynamicGridParams<T>): DynamicGridResult<T> => {
  // Cache de alturas medidas por fila (altura máxima de las tarjetas en esa fila)
  const rowHeightsRef = useRef<Map<number, number>>(new Map());
  // Cache de alturas individuales por índice de item
  const itemHeightsRef = useRef<Map<number, number>>(new Map());
  const [measureVersion, setMeasureVersion] = useState(0);
  const pendingUpdate = useRef(false);

  // Calcular columnas
  const columns = useMemo(() => {
    if (!containerWidth) return 1;
    const minCardWidth = Math.max(400, estimatedCardHeight * 1.5);
    const availableWidth = containerWidth - (gap * 2);
    return Math.max(1, Math.floor(availableWidth / minCardWidth));
  }, [containerWidth, estimatedCardHeight, gap]);

  // Calcular ancho de tarjeta
  const cardWidth = useMemo(() => {
    if (!containerWidth || columns === 0) return 0;
    const availableWidth = containerWidth - (gap * 2);
    const totalGaps = (columns - 1) * gap;
    return (availableWidth - totalGaps) / columns;
  }, [containerWidth, columns, gap]);

  // Recalcular alturas de fila basándose en las alturas individuales
  const recalculateRowHeights = useCallback(() => {
    const totalRows = Math.ceil(items.length / columns);
    const newRowHeights = new Map<number, number>();

    for (let row = 0; row < totalRows; row++) {
      let maxHeight = 0;
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        if (index >= items.length) break;
        const itemHeight = itemHeightsRef.current.get(index) || estimatedCardHeight;
        maxHeight = Math.max(maxHeight, itemHeight);
      }
      newRowHeights.set(row, maxHeight);
    }

    rowHeightsRef.current = newRowHeights;
  }, [items.length, columns, estimatedCardHeight]);

  // Función para obtener altura de fila (con fallback a estimada)
  const getRowHeight = useCallback((rowIndex: number) => {
    return rowHeightsRef.current.get(rowIndex) || estimatedCardHeight;
  }, [estimatedCardHeight]);

  // Calcular posiciones y altura total
  const { rowPositions, totalHeight, totalRows } = useMemo(() => {
    // Recalcular alturas de fila antes de calcular posiciones
    recalculateRowHeights();

    const totalRows = Math.ceil(items.length / columns);
    const positions: number[] = [];
    let currentTop = gap;

    for (let row = 0; row < totalRows; row++) {
      positions.push(currentTop);
      currentTop += getRowHeight(row) + gap;
    }

    return {
      rowPositions: positions,
      totalHeight: currentTop,
      totalRows
    };
  }, [items.length, columns, gap, getRowHeight, recalculateRowHeights, measureVersion]);

  // Encontrar filas visibles
  const { startRow, endRow } = useMemo(() => {
    if (rowPositions.length === 0) return { startRow: 0, endRow: 0 };

    let startRow = 0;
    let endRow = totalRows;

    // Buscar primera fila visible
    for (let i = 0; i < rowPositions.length; i++) {
      const rowBottom = rowPositions[i] + getRowHeight(i);
      if (rowBottom >= scrollTop) {
        startRow = Math.max(0, i - bufferRows);
        break;
      }
    }

    // Buscar última fila visible
    const viewportBottom = scrollTop + containerHeight;
    for (let i = startRow; i < rowPositions.length; i++) {
      if (rowPositions[i] > viewportBottom) {
        endRow = Math.min(totalRows, i + bufferRows);
        break;
      }
    }

    return { startRow, endRow };
  }, [rowPositions, scrollTop, containerHeight, totalRows, getRowHeight, bufferRows]);

  // Función para medir elementos individuales
  const createMeasureRef = useCallback((itemIndex: number) => {
    return (el: HTMLElement | null) => {
      if (!el) return;

      // Usar un pequeño delay para asegurar que el contenido esté renderizado
      requestAnimationFrame(() => {
        const height = el.offsetHeight;
        if (height === 0) return; // Ignorar mediciones de 0

        const currentHeight = itemHeightsRef.current.get(itemIndex);

        // Solo actualizar si la altura cambió significativamente (>2px de diferencia)
        if (currentHeight === undefined || Math.abs(height - currentHeight) > 2) {
          itemHeightsRef.current.set(itemIndex, height);

          // Batching: solo un update por frame
          if (!pendingUpdate.current) {
            pendingUpdate.current = true;
            requestAnimationFrame(() => {
              pendingUpdate.current = false;
              setMeasureVersion(v => v + 1);
            });
          }
        }
      });
    };
  }, []);

  // Generar items visibles
  const visibleItems = useMemo(() => {
    const result: DynamicGridResult<T>['visibleItems'] = [];

    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        if (index >= items.length) break;

        result.push({
          item: items[index],
          index,
          style: {
            position: 'absolute' as const,
            top: rowPositions[row],
            left: col * (cardWidth + gap) + gap,
            width: cardWidth,
            // No forzamos altura - dejamos que el contenido determine su altura natural
          },
          measureRef: createMeasureRef(index)
        });
      }
    }

    return result;
  }, [startRow, endRow, items, columns, cardWidth, gap, rowPositions, createMeasureRef]);

  return {
    visibleItems,
    totalHeight,
    columns
  };
};
