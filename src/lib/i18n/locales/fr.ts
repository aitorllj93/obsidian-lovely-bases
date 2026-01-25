import type { LocaleTranslations } from "../types";

export const fr: LocaleTranslations = {
  card: {
    options: {
      layoutAndDisplay: {
        title: "Disposition et Affichage",
        layout: {
          title: "Disposition",
          horizontal: "Horizontal",
          vertical: "Vertical",
          overlay: "Superposition",
          polaroid: "Polaroid",
        },
        contentVisibility: {
          title: "Visibilité du Contenu",
          always: "Toujours Visible",
          hover: "Afficher au Survol",
        },
        cardSize: {
          title: "Taille de Carte",
        },
        shape: {
          title: "Forme",
          square: "Carré",
          circle: "Cercle",
          rounded: "Arrondi",
        },
        tilt: {
          title: "Inclinaison",
          none: "Aucune",
          alternating: "Alternant",
        },
      },
      image: {
        title: "Image",
        imageProperty: {
          title: "Propriété d'Image",
        },
        imageAspectRatio: {
          title: "Ratio d'Aspect de l'Image",
        },
        imageFit: {
          title: "Ajustement de l'Image",
          cover: "Couvrir",
          contain: "Contenir",
        },
        reverseContent: {
          title: "Inverser Image et Contenu",
        },
      },
      content: {
        title: "Contenu",
        showTitle: {
          title: "Afficher le Titre",
        },
        showPropertyTitles: {
          title: "Afficher les Titres de Propriétés",
        },
        showContent: {
          title: "Afficher le Contenu de la Note",
        },
        contentMaxLength: {
          title: "Longueur Maximale du Contenu",
        },
      },
      appearance: {
        title: "Apparence",
        titleFont: {
          title: "Famille de Police du Titre",
        },
        contentFont: {
          title: "Famille de Police du Contenu",
        },
        badgesFont: {
          title: "Famille de Police des Badges",
        },
        backgroundColorProperty: {
          title: "Propriété de Couleur de Fond",
        },
        backgroundColorApplyTo: {
          title: "Appliquer la Couleur de Fond à",
          image: "Image",
          content: "Contenu",
          both: "Les Deux",
        },
        iconProperty: {
          title: "Propriété d'Icône",
        },
      },
      badges: {
        title: "Badges",
        badgeProperty: {
          title: "Propriété de Badge",
        },
        badgeIcon: {
          title: "Icône de Badge",
        },
        badgeColor: {
          title: "Couleur de Badge",
        },
      },
      interactivity: {
        title: "Interactivité",
        linkProperty: {
          title: "Propriété de Lien",
        },
        hoverStyle: {
          title: "Style au Survol",
          none: "Aucun",
          overlay: "Superposition",
          tooltip: "Info-bulle",
        },
        hoverProperty: {
          title: "Propriété au Survol",
        },
      },
    },
  },
  infiniteGallery: {
    options: {
      grid: {
        title: "Grille",
        masonry: {
          title: "Disposition en Mosaïque",
        },
      },
    },
  },
  linearCalendar: {
    options: {
      data: {
        title: "Données",
        startDateProperty: {
          title: "Propriété de Date de Début",
        },
        endDateProperty: {
          title: "Propriété de Date de Fin",
        },
        titleProperty: {
          title: "Propriété de Titre",
        },
      },
      dateRange: {
        title: "Plage de Dates",
        referenceDate: {
          title: "Date de Référence",
          placeholder: "AAAA-MM-JJ",
        },
        focus: {
          title: "Focus",
          full: "Année Complète",
          half: "Demi-Année",
          quarter: "Trimestre",
        },
      },
      appearance: {
        title: "Apparence",
        colorProperty: {
          title: "Propriété de Couleur",
        },
        iconProperty: {
          title: "Propriété d'Icône",
        },
      },
    },
  },
  heatmapCalendar: {
    legend: {
      less: "Moins",
      more: "Plus",
      no: "Non",
      yes: "Oui",
      overflow: "Débordement",
    },
    options: {
      data: {
        title: "Données",
        dateProperty: {
          title: "Propriété de Date",
        },
        trackProperty: {
          title: "Propriété de Suivi",
        },
        trackType: {
          title: "Type de Suivi",
          autoDetect: "Auto-détection",
          number: "Nombre",
          boolean: "Booléen (Oui/Non)",
          text: "Texte (par longueur)",
          list: "Liste (par nombre d'éléments)",
        },
      },
      dateRange: {
        title: "Plage de Dates",
        startDate: {
          title: "Date de Début",
          placeholder: "AAAA-MM-JJ",
        },
        endDate: {
          title: "Date de Fin",
          placeholder: "AAAA-MM-JJ",
        },
      },
      display: {
        title: "Disposition et Affichage",
        layout: {
          title: "Disposition",
          horizontal: "Horizontal",
          vertical: "Vertical",
        },
        viewMode: {
          title: "Mode d'Affichage",
          "week-grid": "Grille Hebdomadaire (style GitHub)",
          "month-grid": "Grille Mensuelle (style Calendrier)",
        },
        showDayLabels: {
          title: "Afficher les Étiquettes des Jours",
        },
        showMonthLabels: {
          title: "Afficher les Étiquettes des Mois",
        },
        showYearLabels: {
          title: "Afficher les Étiquettes des Années",
        },
        showLegend: {
          title: "Afficher la Légende",
        },
      },
      valueRange: {
        title: "Plage de Valeurs",
        minValue: {
          title: "Valeur Minimale",
        },
        maxValue: {
          title: "Valeur Maximale",
        },
      },
      appearance: {
        title: "Apparence",
        shape: {
          title: "Forme",
          circle: "Cercle",
          square: "Carré",
          rounded: "Arrondi",
        },
        colorScheme: {
          title: "Schéma de Couleurs",
        },
        reverseColors: {
          title: "Inverser les Couleurs",
        },
        customColors: {
          title: "Couleurs Personnalisées (hex séparés par des virgules)",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        overflowColor: {
          title: "Couleur d'Avertissement de Débordement",
          placeholder: "#ff0000",
        },
      },
    },
  },
  projectFolders: {
    options: {
      dataProperties: {
        title: "Propriétés des Données",
        imageProperty: {
          title: "Propriété d'Image",
        },
        iconProperty: {
          title: "Propriété d'Icône",
        },
        colorProperty: {
          title: "Propriété de Couleur",
        },
      },
      display: {
        title: "Affichage",
        colorizeFiles: {
          title: "Coloriser les Fichiers",
        },
      },
    },
  },
  radarChart: {
    options: {
      data: {
        title: "Données",
        aggregationFunction: {
          title: "Fonction d'Agrégation",
          average: "Moyenne",
          median: "Médiane",
          sum: "Somme",
          max: "Maximum",
          min: "Minimum",
        },
      },
      valueRange: {
        title: "Plage de Valeurs",
        minValue: {
          title: "Valeur Minimale",
        },
        maxValue: {
          title: "Valeur Maximale",
        },
      },
      display: {
        title: "Affichage",
        showAxisLabels: {
          title: "Afficher les Étiquettes des Axes",
        },
        showAxisTicks: {
          title: "Afficher les Graduations des Axes",
        },
        showLegend: {
          title: "Afficher la Légende",
        },
        legendPosition: {
          title: "Position de la Légende",
          top: "Haut",
          bottom: "Bas",
          left: "Gauche",
          right: "Droite",
        },
      },
      appearance: {
        title: "Apparence",
        colorScheme: {
          title: "Schéma de Couleurs",
        },
        customColors: {
          title: "Couleurs Personnalisées (hex séparés par des virgules)",
          placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
        },
        fillOpacity: {
          title: "Opacité de Remplissage",
        },
      },
    },
  },
  common: {
    loading: "Chargement...",
    error: "Erreur",
    options: {
      grouping: {
        title: "Regroupement",
        groupTitleProperty: {
          title: "Propriété de Titre de Groupe",
        },
        groupSubtitleProperty: {
          title: "Propriété de Sous-titre de Groupe",
        },
      },
      colors: {
        palettes: {
          red: "Rouge",
          orange: "Orange",
          yellow: "Jaune",
          green: "Vert",
          cyan: "Cyan",
          blue: "Bleu",
          purple: "Violet",
          magenta: "Magenta",
        },
        schemes: {
          primary: "Primaire",
          semaphor: "Sémaphore",
          rainbow: "Arc-en-ciel",
          contrast: "Contraste",
        },
      },
    },
  },
};
