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
	heatmapCalendar: {
		legend: {
			less: "Moins",
			more: "Plus",
			no: "Non",
			yes: "Oui",
			overflow: "Débordement",
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
		},
	},
};
