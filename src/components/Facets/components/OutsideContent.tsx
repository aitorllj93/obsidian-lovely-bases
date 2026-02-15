import { motion } from "motion/react";

import { useTranslation } from "@/lib/i18n";

import type { FacetsConfig } from "../config";
import type { LayoutIds } from "../utils";

type Props = {
  facetsConfig?: FacetsConfig;
  title?: string;
  count?: number;
  isHovered: boolean;
  layoutIds: LayoutIds;
};

const OutsideContent = ({
  facetsConfig,
  title,
  count,
  isHovered,
  layoutIds,
}: Props) => {
  const { t } = useTranslation("common");
  const { titlePosition, groupCounterPosition } = facetsConfig ?? {};

  const shouldShowTitle =
    titlePosition === "outside" && typeof title !== "undefined";
  const shouldShowCount =
    groupCounterPosition === "outside" && typeof count !== "undefined";

  if (!shouldShowTitle && !shouldShowCount) {
    return null;
  }

  return (
    <div className="text-center mt-4 flex flex-col gap-2">
      {shouldShowTitle && (
        <motion.h3
          className="text-base font-semibold text-foreground m-0 transition-transform duration-500 line-clamp-1"
          layoutId={layoutIds.title}
          style={{
            transform: isHovered ? "translateY(2px)" : "translateY(0)",
            letterSpacing: isHovered ? "-0.01em" : "0",
          }}
        >
          {title}
        </motion.h3>
      )}
      {shouldShowCount && (
        <motion.p
          className="text-xs font-medium m-0 text-muted-foreground transition-all duration-500"
          layoutId={layoutIds.counter}
          style={{ opacity: isHovered ? 0.8 : 1 }}
        >
          {count === 1
            ? t("singleItem", { count: count.toString() })
            : t("totalItems", { count: count.toString() })}
        </motion.p>
      )}
    </div>
  );
};

export default OutsideContent;
