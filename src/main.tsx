import { Plugin } from "obsidian";

import { ReactView } from "@/lib/view-class";

import InfiniteGallery, { INFINITE_GALLERY_TYPE_ID } from "@/views/InfiniteGallery";

export default class LovelyBasesPlugin extends Plugin {

	async onload(): Promise<void> {
		this.registerBasesView(INFINITE_GALLERY_TYPE_ID, {
			name: "Infinite Gallery",
			icon: 'lucide-infinity',
			factory: (controller, containerEl) =>
				new ReactView(
					INFINITE_GALLERY_TYPE_ID,
					InfiniteGallery,
					controller,
					containerEl
				),
			options: () => ([
			  {
				type: 'slider',
				displayName: 'Card size',
				min: 50,
				max: 800,
				key: 'cardSize',
				default: 100,
			  },
			  {
				type: 'property',
				displayName: 'Image property',
				key: 'imageProperty',
				default: 'note.cover',
			  },
			  {
				type: 'dropdown',
				displayName: 'Image fit',
				key: 'imageFit',
				default: 'cover',
				options: {
					cover: 'Cover',
					contain: 'Contain',
				}
			  },
			  {
				type: 'slider',
				displayName: 'Aspect ratio',
				min: 0.25,
				max: 2.5,
				key: 'aspectRatio',
				default: 1.5,
				step: 0.05
			  },
			  {
				type: 'dropdown',
				displayName: 'Shape',
				key: 'shape',
				default: 'square',
				options: {
					square: 'Square',
					circle: 'Circle',
					rounded: 'Rounded',
					// TODO: Enable this once Obsidian's webview supports it
					// squircle: 'Squircle',
				}
			  }
		  ])
		});
	}
}
