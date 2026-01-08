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
				type: 'property',
				displayName: 'Image property to display',
				key: 'imageProperty',
				default: 'note.cover',
			  },
		  ])
		});
	}
}
