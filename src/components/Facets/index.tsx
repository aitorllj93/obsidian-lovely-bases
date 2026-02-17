import { LayoutGroup, motion } from "motion/react";
import {
  type CSSProperties,
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import Card from "@/components/Card";
import { useFileOpen } from "@/hooks/use-file-open";
import { cn, mergeRefs } from "@/lib/utils";

import ExpandedView from "./components/ExpandedView";
import Group from "./components/Group";
import OutsideContent from "./components/OutsideContent";
import type { Border } from "./config";
import { useContainerData } from "./hooks/use-container-data";
import { useExpand } from "./hooks/use-expand";
import { isGroup, type Props } from "./types";
import { getLayoutIds } from "./utils";

const BORDER_CLASSES: Record<Border, string> = {
  none: "",
  solid:
    "bg-card border border-border border-solid hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:border-(--folder-color)/40",
  dotted:
    "bg-card bi-dotted bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
  dashed:
    "bg-card bi-dashed bi-color-border hover:shadow-2xl hover:shadow-(--folder-color)/20 hover:bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]",
};

const Facets = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const layoutNS = useId();
  const { config, facetsConfig } = props;
  const { color, file, icon, title } = useContainerData(props);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const layoutIds = getLayoutIds(`${props.layoutIdPrefix}-${layoutNS}`);

  const width = useMemo(() => {
    return facetsConfig.layoutItemSize
      ? facetsConfig.layoutItemSize - (facetsConfig.layoutItemSpacing ?? 0) * 2
      : undefined;
  }, [facetsConfig.layoutItemSize, facetsConfig.layoutItemSpacing]);

  const handleNavigate = useFileOpen(file);
  const {
    handlePointerDown,
    handlePointerUp,
    handleExpand,
    handleClose,
    isExpanded,
    isPressing,
  } = useExpand();

  const borderClass = BORDER_CLASSES[facetsConfig?.layoutItemBorder ?? "none"];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (facetsConfig.groupActionClickBehavior === "expand") {
      handleExpand(e, cardRef);
    } else if (facetsConfig.groupActionClickBehavior === "navigate") {
      handleNavigate(e);
    }
  };

  return (
    <LayoutGroup id={layoutIds.container}>
      <motion.div
        layoutId={layoutIds.content}
        ref={mergeRefs(cardRef, ref)}
        className={cn(
          "relative flex flex-col items-center justify-center rounded cursor-pointer group h-[stretch]",
          borderClass,
        )}
        style={
          {
            padding: `${facetsConfig.layoutItemSpacing ?? 0}px`,
            perspective: "1200px",
            "--folder-color": color,
            zIndex: isHovered ? 50 : 1,
          } as CSSProperties
        }
        initial={props.initialAnimation && { opacity: 0, y: 20 }}
        animate={{
          ...(props.initialAnimation
            ? {
                opacity: 1,
                y: 0,
              }
            : {}),
          scale: isPressing ? 0.98 : isHovered ? 1.04 : 1,
          rotate: isHovered ? -1.5 : 0,
        }}
        transition={{
          ...(props.initialAnimation
            ? {
                opacity: { delay: (props.index ?? 0) * 0.1, duration: 0.5 },
                y: { delay: (props.index ?? 0) * 0.1, duration: 0.5 },
              }
            : {}),
          scale: { duration: isPressing ? 0.08 : 0.7, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(isGroup(props)
          ? {
              onPointerDown: handlePointerDown,
              onPointerUp: handlePointerUp,
              onClick: handleClick,
            }
          : {})}
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, var(--folder-color) 0%, transparent 70%)",
            opacity: isHovered ? 0.12 : 0,
          }}
        />
        <div style={{ opacity: isExpanded ? 0 : 1 }}>
          {isGroup(props) ? (
            <Group
              facetsConfig={facetsConfig}
              color={color}
              config={config}
              counterLayoutId={layoutIds.counter}
              files={props.data.entries}
              groupShape={facetsConfig.groupShape}
              icon={icon}
              iconLayoutId={layoutIds.icon}
              onClick={handleClick}
              showCounter={facetsConfig.groupCounterPosition === "inside"}
              title={
                facetsConfig.titlePosition === "inside" ? title : undefined
              }
              titleLayoutId={layoutIds.title}
              ref={ref}
              width={width}
            />
          ) : (
            <Card
              {...facetsConfig}
              isDraggable={props.isDraggable}
              layoutItemSize={width}
              className={props.className}
              contentClassName="min-h-fit"
              config={props.config}
              entry={props.data}
              ref={ref}
            />
          )}
        </div>
        <OutsideContent
          facetsConfig={facetsConfig}
          title={title}
          count={isGroup(props) ? props.data.entries.length : undefined}
          isHovered={isHovered}
          layoutIds={layoutIds}
        />
      </motion.div>
      {isGroup(props) && (
        <ExpandedView
          color={color}
          isOpen={isExpanded}
          title={title}
          icon={icon}
          entries={props.data.entries}
          facetsConfig={facetsConfig}
          config={config}
          onClose={handleClose}
          layoutIds={layoutIds}
        />
      )}
    </LayoutGroup>
  );
});

export default Facets;
