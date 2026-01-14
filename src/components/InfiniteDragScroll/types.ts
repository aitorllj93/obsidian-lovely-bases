

export type variants = "default" | "masonry" | "polaroid";

export type VirtualItem = {
	virtualCol: number;
	virtualRow: number;
	realIndex: number;
	baseX: number; // Grid position without scroll offset
	baseY: number; // Grid position without scroll offset
	key: string;
};
