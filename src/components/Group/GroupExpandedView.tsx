import { AnimatePresence, motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import type { CardConfig } from "@/components/Card/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import VirtualGrid from "@/components/VirtualGrid";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useObsidian } from "../Obsidian/Context";

type Props = {
  isOpen: boolean;
  title: string;
  icon: string | null;
  entries: BasesEntry[];
  cardConfig: CardConfig;
  config: BasesViewConfig;
  onClose: () => void;
};

const EXPAND_DURATION = 0.24;
const COLLAPSE_DURATION = 0.2;
const EASING = [0.32, 0.72, 0, 1] as const;

const GroupExpandedView = ({
  isOpen,
  title,
  icon,
  entries,
  cardConfig,
  config,
  onClose,
}: Props) => {
  const { t } = useTranslation("projectFolders");
  const { containerEl, contentRef } = useObsidian();
  const [showGrid, setShowGrid] = useState(false);

  const cardHeight = useMemo(
    () => estimateCardHeight(cardConfig),
    [cardConfig],
  );
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowGrid(true);
      }, EXPAND_DURATION * 1000);
      return () => clearTimeout(timer);
    }
    setShowGrid(false);
  }, [isOpen]);
  const expandTransition = {
    duration: EXPAND_DURATION,
    ease: EASING,
  };

  const collapseTransition = {
    duration: COLLAPSE_DURATION,
    ease: EASING,
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: collapseTransition }}
          transition={expandTransition}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Backdrop - subtle dim, no blur */}
          <motion.div
            className="absolute inset-0 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: collapseTransition }}
            transition={expandTransition}
            onClick={handleBackdropClick}
          />

          {/* Floating container */}
          <motion.div
            className="absolute inset-6 bg-background rounded-xl shadow-lg border border-border overflow-hidden flex flex-col"
            layoutId={`folder-card-${title}`}
            initial={false}
            transition={expandTransition}
            exit={{ transition: collapseTransition }}
          >
            {/* Header with shared elements */}
            <header className="flex items-center gap-3 px-3 py-2 border-b border-border bg-background/95 backdrop-blur-sm">
              {icon && (
                <motion.div
                  layoutId={`folder-icon-${title}`}
                  className="shrink-0 size-5"
                  transition={expandTransition}
                  exit={{ transition: collapseTransition }}
                >
                  <LucideIcon
                    name={icon}
                    className="size-full text-foreground"
                  />
                </motion.div>
              )}
              <motion.h2
                layoutId={`folder-title-${title}`}
                className="text-base m-0 font-semibold text-foreground flex-1 line-clamp-1"
                transition={expandTransition}
                exit={{ transition: collapseTransition }}
              >
                {title}
              </motion.h2>
              <motion.span
                layoutId={`folder-count-${title}`}
                className="text-sm text-muted-foreground shrink-0"
                transition={expandTransition}
                exit={{ transition: collapseTransition }}
              >
                {entries.length === 1
                  ? t("singleItem", { count: entries.length.toString() })
                  : t("totalItems", { count: entries.length.toString() })}
              </motion.span>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "cursor-pointer ml-4 text-sm font-medium text-foreground",
                  "rounded-md border border-border bg-background-secondary",
                  "hover:bg-muted transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                )}
                aria-label="Close folder view"
              >
                {t("back")}
              </button>
            </header>

            <div className="flex-1 min-h-0 w-full pt-2">
              {showGrid &&<VirtualGrid
                cardConfig={cardConfig}
                config={config}
                estimateRowHeight={cardHeight}
                items={entries}
                minItemWidth={cardConfig.cardSize}
              />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    contentRef.current ?? containerEl,
  );
};

export default GroupExpandedView;
