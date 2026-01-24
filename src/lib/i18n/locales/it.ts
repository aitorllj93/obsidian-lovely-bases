import type { LocaleTranslations } from "../types";

export const it: LocaleTranslations = {
	card: {
		options: {
			layoutAndDisplay: {
				title: "Layout e Visualizzazione",
				layout: {
					title: "Layout",
					horizontal: "Orizzontale",
					vertical: "Verticale",
					overlay: "Sovrapposizione",
					polaroid: "Polaroid",
				},
				contentVisibility: {
					title: "Visibilità del Contenuto",
					always: "Sempre Visibile",
					hover: "Mostra al Passaggio del Mouse",
				},
				cardSize: {
					title: "Dimensione della Scheda",
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
					alternating: "Alternata",
				},
			},
			image: {
				title: "Immagine",
				imageProperty: {
					title: "Proprietà Immagine",
				},
				imageAspectRatio: {
					title: "Rapporto d'Aspetto Immagine",
				},
				imageFit: {
					title: "Adattamento Immagine",
					cover: "Coprire",
					contain: "Contenere",
				},
				reverseContent: {
					title: "Inverti Immagine e Contenuto",
				},
			},
			content: {
				title: "Contenuto",
				showTitle: {
					title: "Mostra Titolo",
				},
				showPropertyTitles: {
					title: "Mostra Titoli Proprietà",
				},
				showContent: {
					title: "Mostra Contenuto Nota",
				},
				contentMaxLength: {
					title: "Lunghezza Massima Contenuto",
				},
			},
		appearance: {
			title: "Aspetto",
			titleFont: {
				title: "Famiglia di Font del Titolo",
			},
			contentFont: {
				title: "Famiglia di Font del Contenuto",
			},
			badgesFont: {
				title: "Famiglia di Font dei Badge",
			},
			backgroundColorProperty: {
				title: "Proprietà Colore di Sfondo",
			},
			backgroundColorApplyTo: {
				title: "Applica Colore di Sfondo a",
				image: "Immagine",
				content: "Contenuto",
				both: "Entrambi",
			},
			iconProperty: {
				title: "Proprietà Icona",
			},
		},
		badges: {
			title: "Badge",
			badgeProperty: {
				title: "Proprietà Badge",
			},
			badgeIcon: {
				title: "Icona Badge",
			},
			badgeColor: {
				title: "Colore Badge",
			},
		},
			interactivity: {
				title: "Interattività",
				linkProperty: {
					title: "Proprietà Link",
				},
				hoverStyle: {
					title: "Stile al Passaggio del Mouse",
					none: "Nessuno",
					overlay: "Sovrapposizione",
					tooltip: "Tooltip",
				},
				hoverProperty: {
					title: "Proprietà al Passaggio del Mouse",
				},
			},
		},
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
	projectFolders: {
		options: {
			dataProperties: {
				title: "Proprietà dei Dati",
				imageProperty: {
					title: "Proprietà Immagine",
				},
				iconProperty: {
					title: "Proprietà Icona",
				},
				colorProperty: {
					title: "Proprietà Colore",
				},
			},
			display: {
				title: "Visualizzazione",
				colorizeFiles: {
					title: "Colora i File",
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
		options: {
			grouping: {
				title: "Raggruppamento",
				groupTitleProperty: {
					title: "Proprietà Titolo Gruppo",
				},
				groupSubtitleProperty: {
					title: "Proprietà Sottotitolo Gruppo",
				},
			},
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
};
