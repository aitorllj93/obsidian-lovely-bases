
import type { HTMLMotionProps } from "motion/react";

import type { ActiveEffect } from "../config";

type GetAnimationsParams = {
  activeEffect: ActiveEffect;
  initialAnimationDelay?: number;
  isActive?: boolean;
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

const HoverAnimations: Record<ActiveEffect, (
  isActive?: boolean,
  isHovered?: boolean,
  isPressing?: boolean
) => HTMLMotionProps<'div'>> = {
  bordered: () => ({}),
  none: () => ({}),
  tilted: (isActive, isHovered, isPressing) => ({
    animate: {
      scale: isPressing ? 0.98 : isHovered || isActive ? 1.04 : 1,
      rotate: isHovered || isActive ? -1.5 : 0,
    },
    transition: {
      scale: { duration: isPressing ? 0.08 : 0.7, ease: [0.16, 1, 0.3, 1] },
      rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }
  }),
}

export const getAnimations = ({
  activeEffect,
  initialAnimationDelay,
  isActive,
  isHovered,
  isPressing,
  showInitialAnimation,
}: GetAnimationsParams): HTMLMotionProps<'div'> => {
  const initialAnimation: HTMLMotionProps<'div'> | undefined = showInitialAnimation ?
    getInitialAnimation(initialAnimationDelay ?? 0) : undefined;
  const hoverAnimation = HoverAnimations[activeEffect](
    isActive,
    isHovered,
    isPressing,
  );

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
