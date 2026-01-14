"use client"

import {
  type LegacyAnimationControls,
  motion,
  type Transition,
  useAnimation,
  useMotionValue,
  useTransform,
} from "motion/react"
import { type BasesEntry, Keymap } from "obsidian"
import { memo, useEffect, useLayoutEffect, useState } from "react"

import Icon from "@/components/Entries/Icon"
import { useObsidian } from "../Obsidian/Context"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition: Transition = { duration, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    items,
  }: {
    handleClick: (event: React.MouseEvent, entry: BasesEntry) => void
    controls: LegacyAnimationControls
    items: BasesEntry[]
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = items.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )


    return (
      <div
        className="flex h-full items-center justify-center bg-mauve-dark-2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={"x"}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {items.map((item, index) => (
            <motion.div
              key={`key-${item.file.path}-${index.toString()}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  index * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={(event) => handleClick(event, item)}
            >
              <motion.div
                layoutId={`img-${item.file.path}`}
                layout="position"
                className="pointer-events-none  w-full rounded-xl object-cover aspect-square"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}>
                <Icon entry={item} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)


type Props = {
  items: BasesEntry[];
}

function ThreeDCarousel({ items = [] }: Props) {
  const { app } = useObsidian();
  const controls = useAnimation()

  const handleClick = (event: React.MouseEvent, entry: BasesEntry) => {
    event.preventDefault();
    event.stopPropagation();
    const modEvent = Keymap.isModEvent(event.nativeEvent);
    void app.workspace.openLinkText(entry.file.path, "", modEvent);
    controls.stop()
  }

  return (
    <motion.div layout className="relative">
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          items={items}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDCarousel }

