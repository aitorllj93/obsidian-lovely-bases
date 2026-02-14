import { LayoutGroup, motion } from "motion/react";
import { type CSSProperties, forwardRef, useMemo, useRef, useState } from "react";

import { useTranslation } from "@/lib/i18n";
import { cn, mergeRefs } from "@/lib/utils";
import Card from "../Card";
import Group from "./Group";
import type { GroupBorder } from "../Group/types";
import { useContainerData } from "./hooks/use-container-data";
import { isGroup, type Props } from "./types";
import CellOutsideContent from "./OutsideContent";

const BORDER_CLASSES: Record<GroupBorder, string> = {
  none: "",
  solid:
    "bg-card border border-border border-solid hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40",
  dotted:
    "bg-card bi-dotted bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
  dashed:
    "bg-card bi-dashed bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
};

const GroupOrEntry = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { cardConfig, groupConfig } = props;
  const { color, title } = useContainerData(props);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const width = useMemo(() => {
    return cardConfig.cardSize
      ? cardConfig.cardSize - (cardConfig.spacing ?? 0) * 2
      : undefined;
  }, [cardConfig.cardSize, cardConfig.spacing]);

  const borderClass = BORDER_CLASSES[groupConfig.groupBorder ?? "none"];

  return (
    <LayoutGroup id={`cell-${title}`}>
      <motion.div
        ref={mergeRefs(cardRef, ref)}
        className={cn(
          "relative flex flex-col items-center justify-center rounded cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group",
          borderClass,
        )}
        style={
          {
            padding: `${cardConfig.spacing ?? 0}px`,
            perspective: "1200px",
            "--folder-color": color,
            zIndex: isHovered ? 50 : 1,
          } as CSSProperties
        }
        animate={{
          scale: isHovered ? 1.04 : 1,
          rotate: isHovered ? -1.5 : 0,
        }}
        transition={{
          scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }}
        layoutId={`cell-content-${title}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-700"
          style={
            groupConfig.groupBorder !== "none"
              ? {
                  background:
                    "radial-gradient(circle at 50% 70%, var(--folder-color) 0%, transparent 70%)",
                  opacity: isHovered ? 0.12 : 0,
                }
              : undefined
          }
        />
        <div>
          {isGroup(props) ? (
            <Group
              cardConfig={props.cardConfig}
              className={props.className}
              config={props.config}
              entries={props.data.entries}
              groupConfig={props.groupConfig}
              groupKey={props.data.key?.toString() ?? ""}
              ref={ref}
            />
          ) : (
            <Card
              {...props.cardConfig}
              cardSize={width}
              className={props.className}
              contentClassName="h-fit"
              config={props.config}
              entry={props.data}
              ref={ref}
              style={{
                padding: `${cardConfig.spacing ?? 0}px`,
              }}
            />
          )}
        </div>
        <CellOutsideContent
          groupConfig={groupConfig}
          title={title}
          count={isGroup(props) ? props.data.entries.length : undefined}
          isHovered={isHovered}
        />
      </motion.div>
    </LayoutGroup>
  );
});

export default GroupOrEntry;
