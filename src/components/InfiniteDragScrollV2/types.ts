export type VirtualItem = {
	virtualCol: number;
	virtualRow: number;
	realIndex: number;
	x: number; // Final position including scroll offset
	y: number; // Final position including scroll offset
	key: string;
};
