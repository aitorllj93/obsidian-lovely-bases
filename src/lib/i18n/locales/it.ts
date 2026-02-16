export const it = {
  facets: {
    layout: {
      title: "Layout",
      size: {
        title: "Dimensione Elemento",
      },
      gap: {
        title: "Spaziatura",
      },
      border: {
        title: "Bordo",
        none: "Nessuno",
        solid: "Solido",
        dashed: "Tratteggiato",
        dotted: "Punteggiato",
      },
      spacing: {
        title: "Spaziatura",
      },
    },
    groups: {
      title: "Gruppi",
      layout: {
        title: "Layout",
        sections: "Sezioni",
        grid: "Griglia",
      },
      shape: {
        title: "Forma",
        folder: "Cartella",
        notebook: "Quaderno",
      },
      ungroupedItemsDisplay: {
        title: "Visualizzazione Elementi Non Raggruppati",
        group: "Raggruppa",
        inline: "In linea",
        hidden: "Nascosto",
      },
      inferPropertiesFromLinkedNotes: {
        title: "Dedurre Proprietà dalle Note Collegate",
      }
    },
    cards: {
      title: "Carte",
      layout: {
        title: "Layout",
        horizontal: "Orizzontale",
        vertical: "Verticale",
        overlay: "Sovrapposizione",
        polaroid: "Polaroid",
      },
      shape: {
        title: "Forma",
        square: "Quadrato",
        circle: "Cerchio",
        rounded: "Arrotondato",
      },
      tilt: {
        title: "Inclinazione",
        none: "Nessuna",
        clockwise: "In senso orario",
        counterclockwise: "In senso antiorario",
        alternating: "Alternata",
      },
      adaptToSize: {
        title: "Adatta alla Dimensione",
      },
      reverseContent: {
        title: "Inverti Contenuto",
      },
    },
    titles: {
      title: "Titoli",
      position: {
        title: "Posizione",
        none: "Nessuno",
        inside: "Interno",
        outside: "Esterno",
      },
      font: {
        title: "Famiglia di Font",
      },
      groupTitleProperty: {
        title: "Proprietà Titolo Gruppo",
      },
      groupSubtitleProperty: {
        title: "Proprietà Sottotitolo Gruppo",
      },
    },
    contents: {
      title: "Contenuti",
      visibility: {
        title: 'Visibilità del Contenuto',
        always: 'Sempre Visibile',
        hover: 'Mostra al Passaggio del Mouse',
      },
      font: {
        title: "Famiglia di Font",
      },
      showPropertyTitles: {
        title: "Mostra Titoli Proprietà",
      },
      showMarkdown: {
        title: "Mostra Markdown",
      },
      markdownMaxLength: {
        title: "Lunghezza Massima Markdown",
      },
      markdownMaxHeight: {
        title: "Altezza Massima Markdown",
      },
    },
    images: {
      title: "Immagini",
      property: {
        title: "Proprietà",
      },
      aspectRatio: {
        title: "Rapporto d'Aspetto",
      },
      fit: {
        title: "Adattamento",
        cover: "Coprire",
        contain: "Contenere",
      },
    },
    colors: {
      title: "Colori",
      property: {
        title: "Proprietà",
      },
      applyTo: {
        title: "Applica A",
        image: "Immagine",
        content: "Contenuto",
        both: "Entrambi",
      },
    },
    icons: {
      title: "Icone",
      property: {
        title: "Proprietà",
      },
      fileExtensionAsFallback: {
        title: "Usa Icone Estensione File come Fallback",
      },
    },
    badges: {
      title: 'Badge',
      property: {
        title: "Proprietà",
      },
      font: {
        title: "Famiglia di Font",
      },
      iconProperty: {
        title: "Proprietà Icona",
      },
      colorProperty: {
        title: "Proprietà Colore",
      },
      counterPosition: {
        title: "Posizione Contatore Gruppo",
        none: "Nessuno",
        inside: "Interno",
        outside: "Esterno",
      }
    },
    actions: {
      title: 'Azioni',
      property: {
        title: "Proprietà Link",
      },
      groupClickBehavior: {
        title: "Comportamento Click Gruppo",
        expand: "Espandi",
        navigate: "Naviga",
        none: "Nessuno",
      },
      hoverStyle: {
        title: "Stile al Passaggio del Mouse",
        overlay: "Sovrapposizione",
        tooltip: "Tooltip",
        none: "Nessuno",
      },
      hoverProperty: {
        title: "Proprietà al Passaggio del Mouse",
      }
    }
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Griglia",
        masonry: {
          title: "Layout a Mosaico",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Dati",
        startDateProperty: {
          title: "Proprietà Data di Inizio",
        },
        endDateProperty: {
          title: "Proprietà Data di Fine",
        },
        titleProperty: {
          title: "Proprietà Titolo",
        },
      },
      dateRange: {
        title: "Intervallo di Date",
        referenceDate: {
          title: "Data di Riferimento",
          placeholder: "AAAA-MM-GG",
        },
        focus: {
          title: "Focus",
          full: "Anno Intero",
          half: "Mezzo Anno",
          quarter: "Trimestre",
        },
      },
      appearance: {
        title: "Aspetto",
        colorProperty: {
          title: "Proprietà Colore",
        },
        iconProperty: {
          title: "Proprietà Icona",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Meno",
      more: "Più",
      no: "No",
      yes: "Sì",
      overflow: "Overflow",
    },
    options: {
      data: {
        title: "Dati",
        dateProperty: {
          title: "Proprietà Data",
        },
        trackProperty: {
          title: "Proprietà di Tracciamento",
        },
        trackType: {
          title: "Tipo di Tracciamento",
          autoDetect: "Auto-rilevamento",
          number: "Numero",
          boolean: "Booleano (Sì/No)",
          text: "Testo (per lunghezza)",
          list: "Lista (per numero di elementi)",
        },
      },
      dateRange: {
        title: "Intervallo di Date",
        startDate: {
          title: "Data di Inizio",
          placeholder: "AAAA-MM-GG",
        },
        endDate: {
          title: "Data di Fine",
          placeholder: "AAAA-MM-GG",
        },
      },
      display: {
        title: "Layout e Visualizzazione",
        layout: {
          title: "Layout",
          horizontal: "Orizzontale",
          vertical: "Verticale",
        },
        viewMode: {
          title: "Modalità di Visualizzazione",
          "week-grid": "Griglia Settimanale (stile GitHub)",
          "month-grid": "Griglia Mensile (stile Calendario)",
        },
        showDayLabels: {
          title: "Mostra Etichette Giorni",
        },
        showMonthLabels: {
          title: "Mostra Etichette Mesi",
        },
        showYearLabels: {
          title: "Mostra Etichette Anni",
        },
        showLegend: {
          title: "Mostra Legenda",
        },
      },
      valueRange: {
        title: "Intervallo di Valori",
        minValue: {
          title: "Valore Minimo",
        },
        maxValue: {
          title: "Valore Massimo",
        },
      },
      appearance: {
        title: "Aspetto",
        shape: {
          title: "Forma",
          circle: "Cerchio",
          square: "Quadrato",
          rounded: "Arrotondato",
        },
        colorScheme: {
          title: "Schema di Colori",
        },
        reverseColors: {
          title: "Inverti Colori",
        },
        customColors: {
          title: "Colori Personalizzati (hex separati da virgole)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Colore di Avviso Overflow",
          placeholder: "#ff0000",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Dati",
        aggregationFunction: {
          title: "Funzione di Aggregazione",
          average: "Media",
          median: "Mediana",
          sum: "Somma",
          max: "Massimo",
          min: "Minimo",
        },
      },
      valueRange: {
        title: "Intervallo di Valori",
        minValue: {
          title: "Valore Minimo",
        },
        maxValue: {
          title: "Valore Massimo",
        },
      },
      display: {
        title: "Visualizzazione",
        showAxisLabels: {
          title: "Mostra Etichette Assi",
        },
        showAxisTicks: {
          title: "Mostra Tacche Assi",
        },
        showLegend: {
          title: "Mostra Legenda",
        },
        legendPosition: {
          title: "Posizione Legenda",
          top: "Alto",
          bottom: "Basso",
          left: "Sinistra",
          right: "Destra",
        },
      },
      appearance: {
        title: "Aspetto",
        colorScheme: {
          title: "Schema di Colori",
        },
        customColors: {
          title: "Colori Personalizzati (hex separati da virgole)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Opacità di Riempimento",
        },
      },
    },
  },
  common: {
    loading: "Caricamento...",
    error: "Errore",
    back: "Indietro",
    totalItems: "{count} voci",
    singleItem: "{count} voce",
    options: {
      colors: {
        palettes: {
          red: "Rosso",
          orange: "Arancione",
          yellow: "Giallo",
          green: "Verde",
          cyan: "Ciano",
          blue: "Blu",
          purple: "Viola",
          magenta: "Magenta",
        },
        schemes: {
          primary: "Primario",
          semaphor: "Semaforo",
          rainbow: "Arcobaleno",
          contrast: "Contrasto",
        },
      },
    },
  },
} as const;
