import type { LocaleTranslations } from "../types";

export const pt: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "Layout e Exibição",
        layout: {
          title: "Layout",
          horizontal: "Horizontal",
          vertical: "Vertical",
          overlay: "Sobreposição",
          polaroid: "Polaroid",
        },
        contentVisibility: {
          title: "Visibilidade do Conteúdo",
          always: "Sempre Visível",
          hover: "Mostrar ao Passar o Mouse",
        },
        cardSize: {
          title: "Tamanho do Cartão",
        },
        shape: {
          title: "Forma",
          square: "Quadrado",
          circle: "Círculo",
          rounded: "Arredondado",
        },
        tilt: {
          title: "Inclinação",
          none: "Nenhuma",
          alternating: "Alternada",
        },
      },
      image: {
        title: "Imagem",
        imageProperty: {
          title: "Propriedade da Imagem",
        },
        imageAspectRatio: {
          title: "Proporção da Imagem",
        },
        imageFit: {
          title: "Ajuste da Imagem",
          cover: "Cobrir",
          contain: "Conter",
        },
        reverseContent: {
          title: "Inverter Imagem e Conteúdo",
        },
      },
      content: {
        title: "Conteúdo",
        showTitle: {
          title: "Mostrar Título",
        },
        showPropertyTitles: {
          title: "Mostrar Títulos de Propriedades",
        },
        showContent: {
          title: "Mostrar Conteúdo da Nota",
        },
        contentMaxLength: {
          title: "Comprimento Máximo do Conteúdo",
        },
      },
      appearance: {
        title: "Aparência",
        titleFont: {
          title: "Família de Fonte do Título",
        },
        contentFont: {
          title: "Família de Fonte do Conteúdo",
        },
        badgesFont: {
          title: "Família de Fonte dos Distintivos",
        },
        backgroundColorProperty: {
          title: "Propriedade de Cor de Fundo",
        },
        backgroundColorApplyTo: {
          title: "Aplicar Cor de Fundo em",
          image: "Imagem",
          content: "Conteúdo",
          both: "Ambos",
        },
        iconProperty: {
          title: "Propriedade de Ícone",
        },
      },
      badges: {
        title: "Distintivos",
        badgeProperty: {
          title: "Propriedade do Distintivo",
        },
        badgeIcon: {
          title: "Ícone do Distintivo",
        },
        badgeColor: {
          title: "Cor do Distintivo",
        },
      },
      interactivity: {
        title: "Interatividade",
        linkProperty: {
          title: "Propriedade do Link",
        },
        hoverStyle: {
          title: "Estilo ao Passar o Mouse",
          none: "Nenhum",
          overlay: "Sobreposição",
          tooltip: "Dica",
        },
        hoverProperty: {
          title: "Propriedade ao Passar o Mouse",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Grade",
        masonry: {
          title: "Layout de Alvenaria",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Dados",
        startDateProperty: {
          title: "Propriedade de Data de Início",
        },
        endDateProperty: {
          title: "Propriedade de Data de Fim",
        },
        titleProperty: {
          title: "Propriedade de Título",
        },
      },
      dateRange: {
        title: "Intervalo de Datas",
        referenceDate: {
          title: "Data de Referência",
          placeholder: "AAAA-MM-DD",
        },
        focus: {
          title: "Foco",
          full: "Ano Completo",
          half: "Meio Ano",
          quarter: "Trimestre",
        },
      },
      appearance: {
        title: "Aparência",
        colorProperty: {
          title: "Propriedade de Cor",
        },
        iconProperty: {
          title: "Propriedade de Ícone",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Menos",
      more: "Mais",
      no: "Não",
      yes: "Sim",
      overflow: "Excesso",
    },
    options: {
      data: {
        title: "Dados",
        dateProperty: {
          title: "Propriedade de Data",
        },
        trackProperty: {
          title: "Propriedade de Rastreamento",
        },
        trackType: {
          title: "Tipo de Rastreamento",
          autoDetect: "Auto-detectar",
          number: "Número",
          boolean: "Booleano (Sim/Não)",
          text: "Texto (por comprimento)",
          list: "Lista (por quantidade de itens)",
        },
      },
      dateRange: {
        title: "Intervalo de Datas",
        startDate: {
          title: "Data de Início",
          placeholder: "AAAA-MM-DD",
        },
        endDate: {
          title: "Data de Fim",
          placeholder: "AAAA-MM-DD",
        },
      },
      display: {
        title: "Layout e Exibição",
        layout: {
          title: "Layout",
          horizontal: "Horizontal",
          vertical: "Vertical",
        },
        viewMode: {
          title: "Modo de Visualização",
          "week-grid": "Grade Semanal (estilo GitHub)",
          "month-grid": "Grade Mensal (estilo Calendário)",
        },
        showDayLabels: {
          title: "Mostrar Rótulos de Dias",
        },
        showMonthLabels: {
          title: "Mostrar Rótulos de Meses",
        },
        showYearLabels: {
          title: "Mostrar Rótulos de Anos",
        },
        showLegend: {
          title: "Mostrar Legenda",
        },
      },
      valueRange: {
        title: "Intervalo de Valores",
        minValue: {
          title: "Valor Mínimo",
        },
        maxValue: {
          title: "Valor Máximo",
        },
      },
      appearance: {
        title: "Aparência",
        shape: {
          title: "Forma",
          circle: "Círculo",
          square: "Quadrado",
          rounded: "Arredondado",
        },
        colorScheme: {
          title: "Esquema de Cores",
        },
        reverseColors: {
          title: "Inverter Cores",
        },
        customColors: {
          title: "Cores Personalizadas (hex separados por vírgulas)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Cor de Aviso de Excesso",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "Propriedades de Dados",
        imageProperty: {
          title: "Propriedade de Imagem",
        },
        iconProperty: {
          title: "Propriedade de Ícone",
        },
        colorProperty: {
          title: "Propriedade de Cor",
        },
      },
      display: {
        title: "Exibição",
        colorizeFiles: {
          title: "Colorir Arquivos",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Dados",
        aggregationFunction: {
          title: "Função de Agregação",
          average: "Média",
          median: "Mediana",
          sum: "Soma",
          max: "Máximo",
          min: "Mínimo",
        },
      },
      valueRange: {
        title: "Intervalo de Valores",
        minValue: {
          title: "Valor Mínimo",
        },
        maxValue: {
          title: "Valor Máximo",
        },
      },
      display: {
        title: "Exibição",
        showAxisLabels: {
          title: "Mostrar Rótulos dos Eixos",
        },
        showAxisTicks: {
          title: "Mostrar Marcas dos Eixos",
        },
        showLegend: {
          title: "Mostrar Legenda",
        },
        legendPosition: {
          title: "Posição da Legenda",
          top: "Topo",
          bottom: "Fundo",
          left: "Esquerda",
          right: "Direita",
        },
      },
      appearance: {
        title: "Aparência",
        colorScheme: {
          title: "Esquema de Cores",
        },
        customColors: {
          title: "Cores Personalizadas (hex separados por vírgulas)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Opacidade de Preenchimento",
        },
      },
    },
  },
  common: {
    loading: "Carregando...",
    error: "Erro",
    options: {
      grouping: {
        title: "Agrupamento",
        groupTitleProperty: {
          title: "Propriedade de Título do Grupo",
        },
        groupSubtitleProperty: {
          title: "Propriedade de Subtítulo do Grupo",
        },
      },
      colors: {
        palettes: {
          red: "Vermelho",
          orange: "Laranja",
          yellow: "Amarelo",
          green: "Verde",
          cyan: "Ciano",
          blue: "Azul",
          purple: "Roxo",
          magenta: "Magenta",
        },
        schemes: {
          primary: "Primário",
          semaphor: "Semáforo",
          rainbow: "Arco-íris",
          contrast: "Contraste",
        },
      },
    },
  },
};
