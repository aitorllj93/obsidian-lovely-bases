
import type { HTMLMotionProps } from "motion/react";

type GetAnimationsParams = {
  active?: boolean;
  initialAnimationDelay?: number;
  isHovered?: boolean;
  isPressing?: boolean;
  showInitialAnimation?: boolean;
}

const getInitialAnimation = (
  delay: number
): HTMLMotionProps<'div'> => ({
  animate: { opacity: 1, y: 0, },
  initial: { opacity: 0, y: 20 },
  transition: { opacity: { delay, duration: 0.5 }, y: { delay, duration: 0.5 }, }
});

const getHoverAnimation = (
  active: boolean | undefined,
  isHovered: boolean | undefined,
  isPressing: boolean | undefined,
): HTMLMotionProps<'div'> => ({
  animate: {
    scale: isPressing ? 0.98 : isHovered || active ? 1.04 : 1,
    rotate: isHovered || active ? -1.5 : 0,
  },
  transition: {
    scale: { duration: isPressing ? 0.08 : 0.7, ease: [0.16, 1, 0.3, 1] },
    rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }
})

export const getAnimations = ({
  active,
  initialAnimationDelay,
  isHovered,
  isPressing,
  showInitialAnimation,
}: GetAnimationsParams): HTMLMotionProps<'div'> => {
  const initialAnimation: HTMLMotionProps<'div'> | undefined = showInitialAnimation ?
    getInitialAnimation(initialAnimationDelay ?? 0) : undefined;
  const hoverAnimation = getHoverAnimation(active, isHovered, isPressing)

  return {
    initial: initialAnimation && typeof initialAnimation.initial === "object"
      ? initialAnimation.initial
      : false,
    animate: Object.assign(
      {},
      (initialAnimation && typeof initialAnimation.animate === "object") ? initialAnimation.animate : {},
      (hoverAnimation && typeof hoverAnimation.animate === "object") ? hoverAnimation.animate : {},
    ),
    transition: Object.assign(
      {},
      (initialAnimation && typeof initialAnimation.transition === "object") ? initialAnimation.transition : {},
      (hoverAnimation && typeof hoverAnimation.transition === "object") ? hoverAnimation.transition : {},
    ),
  }
}
