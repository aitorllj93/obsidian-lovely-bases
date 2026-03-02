
export const CAROUSEL_ICON_ID = "lovely-carousel";

export const CAROUSEL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-width="1.5">
		<path d="M12.5 5c1.886 0 2.828 0 3.414.586S16.5 7.114 16.5 9v6c0 1.886 0 2.828-.586 3.414S14.386 19 12.5 19h-1c-1.886 0-2.828 0-3.414-.586S7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414S9.614 5 11.5 5z" />
		<path stroke-linecap="round" d="M22 19h-.5a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 21.5 5h.5M2 19h.5A2.5 2.5 0 0 0 5 16.5v-9A2.5 2.5 0 0 0 2.5 5H2" opacity="0.5" />
	</g>
</svg>`;

export default [
  CAROUSEL_ICON_ID,
  CAROUSEL_ICON_SVG
] as const;
