import type { LocaleTranslations } from "../types";

export const de: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "Layout & Anzeige",
        layout: {
          title: "Layout",
          horizontal: "Horizontal",
          vertical: "Vertikal",
          overlay: "Überlagerung",
          polaroid: "Polaroid",
        },
        contentVisibility: {
          title: "Inhalts-Sichtbarkeit",
          always: "Immer sichtbar",
          hover: "Bei Hover anzeigen",
        },
        cardSize: {
          title: "Kartengröße",
        },
        shape: {
          title: "Form",
          square: "Quadrat",
          circle: "Kreis",
          rounded: "Abgerundet",
        },
        tilt: {
          title: "Neigung",
          none: "Keine",
          alternating: "Wechselnd",
        },
      },
      image: {
        title: "Bild",
        imageProperty: {
          title: "Bildeigenschaft",
        },
        imageAspectRatio: {
          title: "Bild-Seitenverhältnis",
        },
        imageFit: {
          title: "Bildanpassung",
          cover: "Abdecken",
          contain: "Enthalten",
        },
        reverseContent: {
          title: "Bild und Inhalt umkehren",
        },
      },
      content: {
        title: "Inhalt",
        showTitle: {
          title: "Titel anzeigen",
        },
        showPropertyTitles: {
          title: "Eigenschaftstitel anzeigen",
        },
        showContent: {
          title: "Notizinhalt anzeigen",
        },
        contentMaxLength: {
          title: "Maximale Inhaltslänge",
        },
      },
      appearance: {
        title: "Erscheinungsbild",
        titleFont: {
          title: "Schriftfamilie des Titels",
        },
        contentFont: {
          title: "Schriftfamilie des Inhalts",
        },
        badgesFont: {
          title: "Schriftfamilie der Abzeichen",
        },
        backgroundColorProperty: {
          title: "Hintergrundfarbe-Eigenschaft",
        },
        backgroundColorApplyTo: {
          title: "Hintergrundfarbe anwenden auf",
          image: "Bild",
          content: "Inhalt",
          both: "Beides",
        },
        iconProperty: {
          title: "Symbol-Eigenschaft",
        },
      },
      badges: {
        title: "Abzeichen",
        badgeProperty: {
          title: "Abzeichen-Eigenschaft",
        },
        badgeIcon: {
          title: "Abzeichen-Symbol",
        },
        badgeColor: {
          title: "Abzeichen-Farbe",
        },
      },
      interactivity: {
        title: "Interaktivität",
        linkProperty: {
          title: "Link-Eigenschaft",
        },
        hoverStyle: {
          title: "Hover-Stil",
          none: "Keine",
          overlay: "Überlagerung",
          tooltip: "Tooltip",
        },
        hoverProperty: {
          title: "Hover-Eigenschaft",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Raster",
        masonry: {
          title: "Mauerwerk-Layout",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Daten",
        startDateProperty: {
          title: "Startdatum-Eigenschaft",
        },
        endDateProperty: {
          title: "Enddatum-Eigenschaft",
        },
        titleProperty: {
          title: "Titel-Eigenschaft",
        },
      },
      dateRange: {
        title: "Datumsbereich",
        referenceDate: {
          title: "Referenzdatum",
          placeholder: "JJJJ-MM-TT",
        },
        focus: {
          title: "Fokus",
          full: "Ganzes Jahr",
          half: "Halbes Jahr",
          quarter: "Quartal",
        },
      },
      appearance: {
        title: "Erscheinungsbild",
        colorProperty: {
          title: "Farb-Eigenschaft",
        },
        iconProperty: {
          title: "Symbol-Eigenschaft",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Weniger",
      more: "Mehr",
      no: "Nein",
      yes: "Ja",
      overflow: "Überlauf",
    },
    options: {
      data: {
        title: "Daten",
        dateProperty: {
          title: "Datums-Eigenschaft",
        },
        trackProperty: {
          title: "Verfolgungs-Eigenschaft",
        },
        trackType: {
          title: "Verfolgungstyp",
          autoDetect: "Auto-Erkennung",
          number: "Zahl",
          boolean: "Boolean (Ja/Nein)",
          text: "Text (nach Länge)",
          list: "Liste (nach Elementanzahl)",
        },
      },
      dateRange: {
        title: "Datumsbereich",
        startDate: {
          title: "Startdatum",
          placeholder: "JJJJ-MM-TT",
        },
        endDate: {
          title: "Enddatum",
          placeholder: "JJJJ-MM-TT",
        },
      },
      display: {
        title: "Layout & Anzeige",
        layout: {
          title: "Layout",
          horizontal: "Horizontal",
          vertical: "Vertikal",
        },
        viewMode: {
          title: "Ansichtsmodus",
          "week-grid": "Wochenraster (GitHub-Stil)",
          "month-grid": "Monatsraster (Kalender-Stil)",
        },
        showDayLabels: {
          title: "Tagesbeschriftungen anzeigen",
        },
        showMonthLabels: {
          title: "Monatsbeschriftungen anzeigen",
        },
        showYearLabels: {
          title: "Jahresbeschriftungen anzeigen",
        },
        showLegend: {
          title: "Legende anzeigen",
        },
      },
      valueRange: {
        title: "Wertebereich",
        minValue: {
          title: "Minimalwert",
        },
        maxValue: {
          title: "Maximalwert",
        },
      },
      appearance: {
        title: "Erscheinungsbild",
        colorScheme: {
          title: "Farbschema",
        },
        reverseColors: {
          title: "Farben umkehren",
        },
        customColors: {
          title: "Benutzerdefinierte Farben (kommagetrennte Hex-Werte)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Überlauf-Warnfarbe",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "Dateneigenschaften",
        imageProperty: {
          title: "Bild-Eigenschaft",
        },
        iconProperty: {
          title: "Symbol-Eigenschaft",
        },
        colorProperty: {
          title: "Farb-Eigenschaft",
        },
      },
      display: {
        title: "Anzeige",
        colorizeFiles: {
          title: "Dateien einfärben",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Daten",
        aggregationFunction: {
          title: "Aggregationsfunktion",
          average: "Durchschnitt",
          median: "Median",
          sum: "Summe",
          max: "Maximum",
          min: "Minimum",
        },
      },
      valueRange: {
        title: "Wertebereich",
        minValue: {
          title: "Minimalwert",
        },
        maxValue: {
          title: "Maximalwert",
        },
      },
      display: {
        title: "Anzeige",
        showAxisLabels: {
          title: "Achsenbeschriftungen anzeigen",
        },
        showAxisTicks: {
          title: "Achsenmarkierungen anzeigen",
        },
        showLegend: {
          title: "Legende anzeigen",
        },
        legendPosition: {
          title: "Legendenposition",
          top: "Oben",
          bottom: "Unten",
          left: "Links",
          right: "Rechts",
        },
      },
      appearance: {
        title: "Erscheinungsbild",
        colorScheme: {
          title: "Farbschema",
        },
        customColors: {
          title: "Benutzerdefinierte Farben (kommagetrennte Hex-Werte)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Fülldeckkraft",
        },
      },
    },
  },
  common: {
    loading: "Laden...",
    error: "Fehler",
    options: {
      grouping: {
        title: "Gruppierung",
        groupTitleProperty: {
          title: "Gruppentitel-Eigenschaft",
        },
        groupSubtitleProperty: {
          title: "Gruppenuntertitel-Eigenschaft",
        },
      },
      colors: {
        palettes: {
          red: "Rot",
          orange: "Orange",
          yellow: "Gelb",
          green: "Grün",
          cyan: "Cyan",
          blue: "Blau",
          purple: "Lila",
          magenta: "Magenta",
        },
        schemes: {
          primary: "Primär",
          semaphor: "Ampel",
          rainbow: "Regenbogen",
          contrast: "Kontrast",
        },
      },
    },
  },
};
