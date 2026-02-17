export const es = {
  facets: {
    layout: {
      title: "Diseño",
      size: {
        title: "Tamaño del Elemento",
      },
      gap: {
        title: "Espaciado",
      },
      border: {
        title: "Borde",
        none: "Ninguno",
        solid: "Sólido",
        dashed: "Discontinuo",
        dotted: "Punteado",
      },
      spacing: {
        title: "Espaciado",
      },
    },
    groups: {
      title: "Grupos",
      layout: {
        title: "Diseño",
        sections: "Secciones",
        grid: "Cuadrícula",
      },
      shape: {
        title: "Forma",
        folder: "Carpeta",
        notebook: "Cuaderno",
      },
      ungroupedItemsDisplay: {
        title: "Visualización de Elementos sin Agrupar",
        group: "Agrupar",
        inline: "En línea",
        hidden: "Oculto",
      },
      inferPropertiesFromLinkedNotes: {
        title: "Inferir Propiedades de Notas Enlazadas",
      }
    },
    cards: {
      title: "Tarjetas",
      layout: {
        title: "Diseño",
        horizontal: "Horizontal",
        vertical: "Vertical",
        overlay: "Superposición",
        polaroid: "Polaroid",
      },
      shape: {
        title: "Forma",
        square: "Cuadrado",
        circle: "Círculo",
        rounded: "Redondeado",
      },
      tilt: {
        title: "Inclinación",
        none: "Ninguna",
        clockwise: "En sentido horario",
        counterclockwise: "En sentido antihorario",
        alternating: "Alternante",
      },
      adaptToSize: {
        title: "Adaptar al Tamaño",
      },
      reverseContent: {
        title: "Invertir Contenido",
      },
    },
    titles: {
      title: "Títulos",
      position: {
        title: "Posición",
        none: "Ninguno",
        inside: "Dentro",
        outside: "Fuera",
      },
      font: {
        title: "Familia de Fuente",
      },
      groupTitleProperty: {
        title: "Propiedad de Título de Grupo",
      },
      groupSubtitleProperty: {
        title: "Propiedad de Subtítulo de Grupo",
      },
    },
    contents: {
      title: "Contenidos",
      visibility: {
        title: 'Visibilidad del Contenido',
        always: 'Siempre Visible',
        hover: 'Mostrar al Pasar el Ratón',
      },
      font: {
        title: "Familia de Fuente",
      },
      showPropertyTitles: {
        title: "Mostrar Títulos de Propiedades",
      },
      showMarkdown: {
        title: "Mostrar Markdown",
      },
      markdownMaxLength: {
        title: "Longitud Máxima de Markdown",
      },
      markdownMaxHeight: {
        title: "Altura Máxima de Markdown",
      },
    },
    images: {
      title: "Imágenes",
      property: {
        title: "Propiedad",
      },
      aspectRatio: {
        title: "Relación de Aspecto",
      },
      fit: {
        title: "Ajuste",
        cover: "Cubrir",
        contain: "Contener",
      },
    },
    colors: {
      title: "Colores",
      property: {
        title: "Propiedad",
      },
      applyTo: {
        title: "Aplicar A",
        image: "Imagen",
        content: "Contenido",
        both: "Ambas",
      },
    },
    icons: {
      title: "Iconos",
      property: {
        title: "Propiedad",
      },
      fileExtensionAsFallback: {
        title: "Usar Iconos de Extensión de Archivo como Respaldo",
      },
    },
    badges: {
      title: 'Insignias',
      property: {
        title: "Propiedad",
      },
      font: {
        title: "Familia de Fuente",
      },
      iconProperty: {
        title: "Propiedad de Icono",
      },
      colorProperty: {
        title: "Propiedad de Color",
      },
      counterPosition: {
        title: "Posición del Contador de Grupo",
        none: "Ninguno",
        inside: "Dentro",
        outside: "Fuera",
      }
    },
    actions: {
      title: 'Acciones',
      property: {
        title: "Propiedad de Enlace",
      },
      groupClickBehavior: {
        title: "Comportamiento de Clic en Grupo",
        expand: "Expandir",
        navigate: "Navegar",
        none: "Ninguno",
      },
      hoverStyle: {
        title: "Estilo al Pasar el Ratón",
        overlay: "Superposición",
        tooltip: "Tooltip",
        none: "Ninguno",
      },
      hoverProperty: {
        title: "Propiedad al Pasar el Ratón",
      }
    }
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Cuadrícula",
        masonry: {
          title: "Diseño de Mampostería",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Datos",
        startDateProperty: {
          title: "Propiedad de Fecha de Inicio",
        },
        endDateProperty: {
          title: "Propiedad de Fecha de Fin",
        },
        titleProperty: {
          title: "Propiedad de Título",
        },
      },
      dateRange: {
        title: "Rango de Fechas",
        referenceDate: {
          title: "Fecha de Referencia",
          placeholder: "YYYY-MM-DD",
        },
        focus: {
          title: "Enfoque",
          full: "Año Completo",
          half: "Medio Año",
          quarter: "Trimestre",
        },
      },
      appearance: {
        title: "Apariencia",
        colorProperty: {
          title: "Propiedad de Color",
        },
        iconProperty: {
          title: "Propiedad de Icono",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Menos",
      more: "Más",
      no: "No",
      yes: "Sí",
      overflow: "Desbordamiento",
    },
    options: {
      data: {
        title: "Datos",
        dateProperty: {
          title: "Propiedad de Fecha",
        },
        trackProperty: {
          title: "Propiedad de Seguimiento",
        },
        trackType: {
          title: "Tipo de Seguimiento",
          autoDetect: "Auto-detectar",
          number: "Número",
          boolean: "Booleano (Sí/No)",
          text: "Texto (por longitud)",
          list: "Lista (por cantidad de elementos)",
        },
      },
      dateRange: {
        title: "Rango de Fechas",
        startDate: {
          title: "Fecha de Inicio",
          placeholder: "YYYY-MM-DD",
        },
        endDate: {
          title: "Fecha de Fin",
          placeholder: "YYYY-MM-DD",
        },
      },
      display: {
        title: "Diseño y Visualización",
        layout: {
          title: "Diseño",
          horizontal: "Horizontal",
          vertical: "Vertical",
        },
        viewMode: {
          title: "Modo de Vista",
          "week-grid": "Cuadrícula Semanal (estilo GitHub)",
          "month-grid": "Cuadrícula Mensual (estilo Calendario)",
        },
        showDayLabels: {
          title: "Mostrar Etiquetas de Días",
        },
        showMonthLabels: {
          title: "Mostrar Etiquetas de Meses",
        },
        showYearLabels: {
          title: "Mostrar Etiquetas de Años",
        },
        showLegend: {
          title: "Mostrar Leyenda",
        },
      },
      valueRange: {
        title: "Rango de Valores",
        minValue: {
          title: "Valor Mínimo",
        },
        maxValue: {
          title: "Valor Máximo",
        },
      },
      appearance: {
        title: "Apariencia",
        shape: {
          title: "Forma",
          circle: "Círculo",
          square: "Cuadrado",
          rounded: "Redondeado",
        },
        colorScheme: {
          title: "Esquema de Colores",
        },
        reverseColors: {
          title: "Invertir Colores",
        },
        customColors: {
          title: "Colores Personalizados (hex separados por comas)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Color de Advertencia de Desbordamiento",
          placeholder: "#ff0000",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Datos",
        aggregationFunction: {
          title: "Función de Agregación",
          average: "Promedio",
          median: "Mediana",
          sum: "Suma",
          max: "Máximo",
          min: "Mínimo",
        },
      },
      valueRange: {
        title: "Rango de Valores",
        minValue: {
          title: "Valor Mínimo",
        },
        maxValue: {
          title: "Valor Máximo",
        },
      },
      display: {
        title: "Visualización",
        showAxisLabels: {
          title: "Mostrar Etiquetas de Ejes",
        },
        showAxisTicks: {
          title: "Mostrar Marcas de Ejes",
        },
        showLegend: {
          title: "Mostrar Leyenda",
        },
        legendPosition: {
          title: "Posición de Leyenda",
          top: "Arriba",
          bottom: "Abajo",
          left: "Izquierda",
          right: "Derecha",
        },
      },
      appearance: {
        title: "Apariencia",
        colorScheme: {
          title: "Esquema de Colores",
        },
        customColors: {
          title: "Colores Personalizados (hex separados por comas)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Opacidad de Relleno",
        },
      },
    },
  },
  common: {
    loading: "Cargando...",
    error: "Error",
    back: "Volver",
    ungrouped: "Ninguno",
    totalItems: "{count} entradas",
    singleItem: "{count} entrada",
    options: {
      colors: {
        palettes: {
          red: "Rojo",
          orange: "Naranja",
          yellow: "Amarillo",
          green: "Verde",
          cyan: "Cian",
          blue: "Azul",
          purple: "Púrpura",
          magenta: "Magenta",
        },
        schemes: {
          primary: "Primario",
          semaphor: "Semáforo",
          rainbow: "Arcoíris",
          contrast: "Contraste",
        },
      },
    },
  },
} as const;
