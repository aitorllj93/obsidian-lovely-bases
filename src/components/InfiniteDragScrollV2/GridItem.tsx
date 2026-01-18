import { memo, type ReactNode } from "react";

type Props = {
	x: number;
	y: number;
	width: number;
	height: number;
	children: ReactNode;
};

const GridItem = memo(
	({ x, y, width, height, children }: Props) => {
		return (
			<div
				className="pointer-events-auto"
				style={{
					position: "absolute",
					transform: `translate3d(${x}px, ${y}px, 0)`,
					width,
					height,
					willChange: "transform",
				}}
			>
				{children}
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Shallow comparison for performance
		return (
			prevProps.x === nextProps.x &&
			prevProps.y === nextProps.y &&
			prevProps.width === nextProps.width &&
			prevProps.height === nextProps.height
		);
	},
);

GridItem.displayName = "GridItem";

export default GridItem;
