import { motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";

import Card from "@/components/Card";
import type { CardConfig } from "@/components/Card/types";

type Props = {
  cardConfig: CardConfig;
  config: BasesViewConfig;
  entry: BasesEntry;
  index: number;
};

export default function Item({ cardConfig, config, entry, index }: Props) {
  return (
    <motion.div
      key={entry.file.path}
      className="shrink-0"
      style={{ width: cardConfig.cardSize, height: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        contentClassName="mb-3"
        key={entry.file.path}
        entry={entry}
        config={config}
        {...cardConfig}
      />
    </motion.div>
  );
}
