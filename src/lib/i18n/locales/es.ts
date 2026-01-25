import type { LocaleTranslations } from "../types";

export const es: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "Diseño y Visualización",
        layout: {
          title: "Diseño",
          horizontal: "Horizontal",
          vertical: "Vertical",
          overlay: "Superposición",
          polaroid: "Polaroid",
        },
        contentVisibility: {
          title: "Visibilidad del Contenido",
          always: "Siempre Visible",
          hover: "Mostrar al Pasar el Ratón",
        },
        cardSize: {
          title: "Tamaño de Tarjeta",
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
          alternating: "Alternante",
        },
      },
      image: {
        title: "Imagen",
        imageProperty: {
          title: "Propiedad de Imagen",
        },
        imageAspectRatio: {
          title: "Relación de Aspecto de Imagen",
        },
        imageFit: {
          title: "Ajuste de Imagen",
          cover: "Cubrir",
          contain: "Contener",
        },
        reverseContent: {
          title: "Invertir Imagen y Contenido",
        },
      },
      content: {
        title: "Contenido",
        showTitle: {
          title: "Mostrar Título",
        },
        showPropertyTitles: {
          title: "Mostrar Títulos de Propiedades",
        },
        showContent: {
          title: "Mostrar Contenido de Nota",
        },
        contentMaxLength: {
          title: "Longitud Máxima del Contenido",
        },
      },
      appearance: {
        title: "Apariencia",
        titleFont: {
          title: "Familia de Fuente del Título",
        },
        contentFont: {
          title: "Familia de Fuente del Contenido",
        },
        badgesFont: {
          title: "Familia de Fuente de las Insignias",
        },
        backgroundColorProperty: {
          title: "Propiedad de Color de Fondo",
        },
        backgroundColorApplyTo: {
          title: "Aplicar Color de Fondo a",
          image: "Imagen",
          content: "Contenido",
          both: "Ambas",
        },
        iconProperty: {
          title: "Propiedad de Icono",
        },
      },
      badges: {
        title: "Insignias",
        badgeProperty: {
          title: "Propiedad de Insignia",
        },
        badgeIcon: {
          title: "Icono de Insignia",
        },
        badgeColor: {
          title: "Color de Insignia",
        },
      },
      interactivity: {
        title: "Interactividad",
        linkProperty: {
          title: "Propiedad de Enlace",
        },
        hoverStyle: {
          title: "Estilo al Pasar el Ratón",
          none: "Ninguno",
          overlay: "Superposición",
          tooltip: "Tooltip",
        },
        hoverProperty: {
          title: "Propiedad al Pasar el Ratón",
        },
      },
    },
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
          placeholder: "AAAA-MM-DD",
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
          placeholder: "AAAA-MM-DD",
        },
        endDate: {
          title: "Fecha de Fin",
          placeholder: "AAAA-MM-DD",
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
  projectFolders: {
    options: {
      dataProperties: {
        title: "Propiedades de Datos",
        imageProperty: {
          title: "Propiedad de Imagen",
        },
        iconProperty: {
          title: "Propiedad de Icono",
        },
        colorProperty: {
          title: "Propiedad de Color",
        },
      },
      display: {
        title: "Visualización",
        colorizeFiles: {
          title: "Colorear Archivos",
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
    options: {
      grouping: {
        title: "Agrupación",
        groupTitleProperty: {
          title: "Propiedad de Título de Grupo",
        },
        groupSubtitleProperty: {
          title: "Propiedad de Subtítulo de Grupo",
        },
      },
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
};
