import { LayoutGroup, motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, useMemo, useRef, useState } from "react";

import type { CardConfig } from "@/components/Card/types";
import { useFileOpen } from "@/hooks/use-file-open";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import Folder from "../Folder";
import Notebook from "../Notebook";

import GroupExpandedView from "./GroupExpandedView";

import { useGroupData } from "./hooks/use-group-data";
import { useGroupExpand } from "./hooks/use-group-expand";

import type { GroupBorder, GroupConfig, GroupShape } from "./types";

const BORDER_CLASSES: Record<GroupBorder, string> = {
  none: "",
  solid:
    "bg-card border border-border border-solid hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40",
  dotted:
    "bg-card bi-dotted bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
  dashed:
    "bg-card bi-dashed bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
};

const getComponent = (shape: GroupShape) => {
  if (shape === "folder") {
    return Folder;
  }
  return Notebook;
};

type Props = {
  groupKey: string;
  titleFont?: string;
  entries?: BasesEntry[];
  className?: string;
  cardConfig: CardConfig;
  groupConfig: GroupConfig;
  config: BasesViewConfig;
};

const Group: React.FC<Props> = ({
  groupKey,
  titleFont,
  entries = [],
  className,
  cardConfig,
  groupConfig,
  config,
}) => {
  const { color, file, icon, title } = useGroupData(
    groupKey,
    groupConfig,
  );
  const { t } = useTranslation("projectFolders");
  const Component = getComponent(groupConfig.groupShape);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const groupWidth = useMemo(() => {
    return cardConfig.cardSize
      ? cardConfig.cardSize - (groupConfig.groupSpacing ?? 0) * 2
      : undefined;
  }, [cardConfig.cardSize, groupConfig.groupSpacing]);

  const handleNavigate = useFileOpen(file);
  const {
    handlePointerDown,
    handlePointerUp,
    handleClick: handleExpand,
    handleClose,
    isExpanded,
    isPressing,
  } = useGroupExpand();

  const borderClass = BORDER_CLASSES[groupConfig.groupBorder ?? "none"];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (groupConfig.groupClickOnGroup === "expand") {
      handleExpand(e, cardRef);
    } else if (groupConfig.groupClickOnGroup === "navigate") {
      handleNavigate(e);
    }
  };

  return (
    <LayoutGroup id={`group-${title}`}>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative flex flex-col items-center justify-center rounded cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group",
          borderClass,
          className,
        )}
        style={
          {
            padding: `${groupConfig.groupSpacing}px`,
            perspective: "1200px",
            "--folder-color": color,
            zIndex: isHovered ? 50 : 1,
          } as CSSProperties
        }
        animate={{
          scale: isPressing ? 0.98 : isHovered ? 1.04 : 1,
          rotate: isHovered ? -1.5 : 0,
        }}
        transition={{
          scale: { duration: isPressing ? 0.08 : 0.7, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }}
        layoutId={`folder-card-${title}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
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
        <div style={{ opacity: isExpanded ? 0 : 1 }}>
          <Component
            icon={icon}
            files={entries}
            color={color}
            onClick={handleClick}
            cardConfig={cardConfig}
            config={config}
            title={
              groupConfig.groupTitlePosition === "inside" ? title : undefined
            }
            titleFont={titleFont}
            counterLayoutId={
              groupConfig.groupCounterPosition === "inside"
                ? `folder-count-${title}`
                : undefined
            }
            iconLayoutId={`folder-icon-${title}`}
            titleLayoutId={`folder-title-${title}`}
            showCounter={groupConfig.groupCounterPosition === "inside"}
            width={groupWidth}
          />
        </div>
        {(groupConfig.groupTitlePosition === "outside" ||
          groupConfig.groupCounterPosition === "outside") && (
          <div className="text-center relative z-10">
            {groupConfig.groupTitlePosition === "outside" && (
              <motion.h3
                className="text-base font-semibold text-foreground mt-4 transition-all duration-500 line-clamp-1"
                layoutId={`folder-title-${title}`}
                layout="position"
                style={{
                  transform: isHovered ? "translateY(2px)" : "translateY(0)",
                  letterSpacing: isHovered ? "-0.01em" : "0",
                }}
              >
                {title}
              </motion.h3>
            )}
            {groupConfig.groupCounterPosition === "outside" && (
              <motion.p
                className="text-xs font-medium text-muted-foreground transition-all duration-500"
                layoutId={`folder-count-${title}`}
                style={{ opacity: isHovered ? 0.8 : 1 }}
              >
                {entries.length === 1
                  ? t("singleItem", { count: entries.length.toString() })
                  : t("totalItems", { count: entries.length.toString() })}
              </motion.p>
            )}
          </div>
        )}
      </motion.div>
      <GroupExpandedView
        isOpen={isExpanded}
        title={title}
        icon={icon}
        entries={entries}
        cardConfig={cardConfig}
        config={config}
        onClose={handleClose}
      />
    </LayoutGroup>
  );
};

export default Group;
