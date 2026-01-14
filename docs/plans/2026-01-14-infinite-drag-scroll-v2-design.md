# InfiniteDragScrollV2 Design

**Date:** 2026-01-14
**Status:** Approved
**Priority:** Critical - Fixes mobile crashes with small datasets

## Problem Statement

Current InfiniteDragScroll crashes on mobile devices immediately (within seconds) even with small datasets (<100 items). Investigation reveals fundamental memory leaks causing catastrophic failure rather than gradual performance degradation.

## Root Causes

### 1. Motion.div Overhead
- Every visible item creates `motion.div` + 2 `useTransform` hooks
- 50 visible items = 100 hook subscriptions + 50 motion contexts
- Mobile browsers cannot handle this subscription overhead

### 2. Unsafe Virtualization Math
- If viewport dimensions = 0 on mount, range calculations produce invalid results
- No maximum cap on rendered items
- Infinite grid loops can generate thousands of items on edge cases

### 3. Duplicate ResizeObservers
- Both `index.tsx` and `VirtualGrid.tsx` create separate observers
- Unnecessary resource duplication

### 4. Over-Engineered Scroll Throttling
- RAF scheduling + manual throttling + state updates = unpredictable behavior
- Complex forceUpdate pattern (lines 50-88 in VirtualGrid.tsx)
- Forces re-renders even when throttled

## Solution Architecture

### Core Principle
**Eliminate hook subscriptions from grid items.** Use plain CSS transforms instead of Motion library for positioning. Keep Motion only for drag physics at container level.

### Component Structure

```
InfiniteDragScrollV2/
├── index.tsx              # Entry point, column calculation, ResizeObserver
├── DragContainer.tsx      # Drag physics (Motion), scroll callback pattern
├── VirtualGrid.tsx        # Virtualization, direct style updates
├── GridItem.tsx           # Plain div with CSS transform (zero hooks)
├── ItemContent.tsx        # Reuse existing (no changes)
├── hooks/
│   └── use-virtual-grid.ts  # Safe calculations with guards
└── types.ts
```

## Detailed Changes

### 1. GridItem - Pure CSS Transform

**Before (VirtualGridItem.tsx):**
```typescript
const VirtualGridItem = ({ scrollX, scrollY, baseX, baseY, ... }) => {
  const x = useTransform(scrollX, (sx) => baseX + sx);  // Hook subscription
  const y = useTransform(scrollY, (sy) => baseY + sy);  // Hook subscription
  return <motion.div style={{ x, y, ... }} />;
};
```

**After (GridItem.tsx):**
```typescript
const GridItem = memo(({ x, y, width, height, variant, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width,
        height,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
});
```

**Benefits:**
- Zero hooks per item
- Transform updates = style prop change (no re-render)
- GPU-accelerated via translate3d
- Mobile-friendly

### 2. Safe Virtualization Logic

**use-virtual-grid.ts improvements:**

```typescript
// Safety guards
const MAX_VISIBLE_ITEMS = 200;
const MAX_BUFFER = 5;

// Early validation
if (totalItems === 0 || columns === 0) return [];
if (viewportWidth <= 0 || viewportHeight <= 0) return [];
if (cellWidth <= 0 || cellHeight <= 0) return [];

const safeBuffer = Math.min(buffer, MAX_BUFFER);
```

**Simplified calculation:**
1. Calculate columns/rows that fit in viewport
2. Add buffer
3. Cap at MAX_VISIBLE_ITEMS
4. Map to real indices via modulo

**Masonry offset separation:**
- Remove offset from virtualization math
- Apply offset only in rendering (CSS/inline styles)
- Cleaner separation of concerns

### 3. DragContainer - Callback Pattern

**Before:** Context-based with MotionValues passed to all children

**After:** Motion for physics, callback for updates

```typescript
const DragContainer = ({ children, variant, onScrollChange }) => {
  const scrollX = useMotionValue(0);  // Keep for drag physics
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const unsubX = scrollX.on("change", (x) => {
      onScrollChange?.({ x, y: scrollY.get() });
    });
    const unsubY = scrollY.on("change", (y) => {
      onScrollChange?.({ x: scrollX.get(), y });
    });
    return () => { unsubX(); unsubY(); };
  }, [scrollX, scrollY, onScrollChange]);

  // ... drag handlers remain same
};
```

**Remove:**
- ScrollContext
- GridVariantContext (pass as prop)

### 4. VirtualGrid Simplification

**Before:**
- Subscribe to MotionValues
- Complex RAF throttling
- forceUpdate pattern

**After:**
- Receive scroll position as numbers via callback
- Update state → React batches automatically
- Re-render VirtualGrid (cheap), update item styles (cheaper)

```typescript
const VirtualGrid = ({ items, scrollX, scrollY, ... }) => {
  const visibleItems = useVirtualGrid({ scrollX, scrollY, ... });

  return (
    <div className="absolute inset-0">
      {visibleItems.map(({ key, realIndex, x, y }) => (
        <GridItem
          key={key}
          x={x}
          y={y}
          width={cellWidth}
          height={cellHeight}
          variant={variant}
        >
          <ItemContent item={items[realIndex]} {...itemConfig} />
        </GridItem>
      ))}
    </div>
  );
};
```

### 5. Single ResizeObserver

Move all dimension tracking to `index.tsx`:
- Track container dimensions
- Calculate columns
- Pass viewport size to VirtualGrid

Remove ResizeObserver from VirtualGrid.

### 6. Memory Leak Prevention

**Cleanup checklist:**
- ✓ Unsubscribe Motion listeners in useEffect cleanup
- ✓ Disconnect ResizeObserver on unmount
- ✓ Remove wheel event listeners on cleanup
- ✓ Stop animations before unmounting (check animationXRef/animationYRef)
- ✓ Cancel pending image loads (add to ItemContent if needed)
- ✓ Avoid stale closures in refs

**Image loading enhancement (optional):**
```typescript
const imgRef = useRef<HTMLImageElement>(null);
useEffect(() => {
  return () => {
    if (imgRef.current) imgRef.current.src = '';
  };
}, []);
```

## API Compatibility

**Drop-in replacement** - no consumer changes needed:

```typescript
type Props = {
  items: BasesEntry[];
  itemConfig: ItemConfig;
  variant: "default" | "masonry" | "polaroid";
}
```

## Implementation Order

1. **Create safe use-virtual-grid hook** - Test with edge cases (0 dimensions, huge scrolls)
2. **Build GridItem with CSS transforms** - Verify no memory growth
3. **Simplify DragContainer** - Remove contexts, add callback
4. **Build VirtualGrid** - Wire with new patterns
5. **Copy ItemContent** - Minimal/no changes
6. **Test on mobile** - Verify crash is fixed

## Success Metrics

- ✓ No crashes with <100 items on mobile
- ✓ Memory usage stable over 60s of scrolling
- ✓ Smooth 60fps scrolling on mobile devices
- ✓ Max 200 DOM nodes rendered at any time
- ✓ Zero Motion subscriptions in grid items

## Migration Notes

Component will live in `src/components/InfiniteDragScrollV2/` as independent implementation. Does not depend on original code but maintains identical API for easy swap.

Original component remains untouched for reference and rollback capability.
