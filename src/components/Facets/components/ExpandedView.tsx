import { AnimatePresence, motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useObsidian } from "@/components/Obsidian/Context";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import VirtualGrid from "@/components/VirtualGrid";

import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { FacetsConfig } from "../config";
import type { LayoutIds } from "../utils";

type Props = {
  color?: string;
  isOpen: boolean;
  title: string;
  icon?: string;
  entries: BasesEntry[];
  facetsConfig: FacetsConfig;
  config: BasesViewConfig;
  onClose: () => void;
  layoutIds: LayoutIds;
};

const EXPAND_DURATION = 0.24;
const COLLAPSE_DURATION = 0.2;
const EASING = [0.32, 0.72, 0, 1] as const;

const ExpandedView = ({
  color,
  isOpen,
  title,
  icon,
  entries,
  config,
  facetsConfig,
  layoutIds,
  onClose,
}: Props) => {
  const { t } = useTranslation("groups");
  const { t: tNav } = useTranslation("navigation");
  const { containerEl, contentRef } = useObsidian();
  const [showGrid, setShowGrid] = useState(false);

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
            layoutId={layoutIds.expandedView}
            initial={false}
            transition={expandTransition}
            exit={{ transition: collapseTransition }}
          >
            {/* Header with shared elements */}
            <header className="flex items-center gap-3 px-3 py-2 border-b border-border bg-background/95 backdrop-blur-sm" style={{
        color: color ?? 'var(--color-foreground)',
      }}>
              {icon && (
                <motion.div
                  layoutId={layoutIds.icon}
                  className="shrink-0 size-5"
                  transition={expandTransition}
                  exit={{ transition: collapseTransition }}
                >
                  <LucideIcon
                    name={icon}
                    className="size-full"
                  />
                </motion.div>
              )}
              <motion.h2
                layoutId={layoutIds.title}
                className="text-base m-0 font-semibold flex-1 line-clamp-1"
                transition={expandTransition}
                exit={{ transition: collapseTransition }}
              >
                {title}
              </motion.h2>
              <motion.span
                layoutId={layoutIds.counter}
                className="text-sm shrink-0"
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
                {tNav("back")}
              </button>
            </header>

            <div className="flex-1 min-h-0 w-full">
              {showGrid && (
                <VirtualGrid
                  facetsConfig={facetsConfig}
                  className="contain-strict m-(--size-4-3) h-full"
                  config={config}
                  items={entries}
                  minItemWidth={facetsConfig.layoutItemSize}
                  layoutIdPrefix={layoutIds.ns}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    contentRef.current ?? containerEl,
  );
};

export default ExpandedView;
