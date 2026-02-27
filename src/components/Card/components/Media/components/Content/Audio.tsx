import { motion } from "motion/react";
import { type MouseEvent, memo, useEffect, useState } from "react";
import useSound from "use-sound";

import { shallowEqual } from "@/lib/utils";

import Image from "./Image";
import type { ContentProps } from "./types";

const AMOUNT_OF_BARS = 5;

const getRandomHeights = (bars = AMOUNT_OF_BARS) => {
  return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
};

const PureAudio = ({
  aspectRatio,
  autoPlay,
  fit,
  thumbnail,
  url,
}: ContentProps) => {
  const [heights, setHeights] = useState(getRandomHeights());

  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause }] = useSound(url, {
    loop: true,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    soundEnabled: true,
  });

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(AMOUNT_OF_BARS).fill(0.1));
  }, [isPlaying]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }
    play();
    setIsPlaying(true);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {(thumbnail?.type === "image" || thumbnail?.type === "url") && thumbnail.value && (
        <Image
          className="absolute"
          url={thumbnail.value}
          aspectRatio={aspectRatio}
          autoPlay={autoPlay}
          fit={fit}
        />
      )}
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ padding: "14px 14px " }}
        whileHover={{ padding: "18px 22px " }}
        whileTap={{ padding: "18px 22px " }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className="absolute bg-background cursor-pointer rounded-full p-2"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="flex h-[18px] w-full items-center gap-1 rounded-full"
        >
          {/* Waveform visualization */}
          {heights.map((height, index) => (
            <motion.div
              key={index.toString()}
              className="bg-foreground w-px rounded-full"
              initial={{ height: 1 }}
              animate={{
                height: Math.max(4, height * 14),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Audio = memo(PureAudio, shallowEqual);

Audio.displayName = "Audio";

export default Audio;
