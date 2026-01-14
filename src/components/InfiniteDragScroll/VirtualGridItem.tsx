import { type MotionValue,motion, useTransform } from "motion/react";
import { memo, type ReactNode } from "react";

type Props = {
	scrollX: MotionValue<number>;
	scrollY: MotionValue<number>;
	baseX: number;
	baseY: number;
	width: number;
	height: number;
	children: ReactNode;
};

// Component that uses useTransform for reactive positioning without re-renders
const VirtualGridItem = memo(
	({
		scrollX,
		scrollY,
		baseX,
		baseY,
		width,
		height,
		children,
	}: Props) => {
		// These transforms update reactively without causing React re-renders
		const x = useTransform(scrollX, (sx) => baseX + sx);
		const y = useTransform(scrollY, (sy) => baseY + sy);

		return (
			<motion.div
				className="pointer-events-auto"
				style={{
					position: "absolute",
					x,
					y,
					width,
					height,
					willChange: "transform",
				}}
			>
				{children}
			</motion.div>
		);
	},
);

VirtualGridItem.displayName = "VirtualGridItem";

export default VirtualGridItem;
