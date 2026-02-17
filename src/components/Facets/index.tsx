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
import { useContainerData } from "./hooks/use-container-data";
import { useExpand } from "./hooks/use-expand";
import { isGroup, type Props } from "./types";
import { getLayoutIds } from "./utils";
import { cva } from "class-variance-authority";

const borderVariants = cva(
  "bg-card",
  {
    variants: {
      border: {
        none: "",
        solid: "border-solid",
        dotted: "bi-dotted",
        dashed: "bi-dashed"
      },
      active: {
        true: "shadow-2xl shadow-(--folder-color)/20",
        false: "",
      }
    },
    compoundVariants: [
      {
        border: "solid",
        active: false,
        class: "border-border",
      },
      {
        border: "solid",
        active: true,
        class: "border-(--folder-color)/40",
      },
      {
        border: "dotted",
        active: false,
        class: "bi-color-border",
      },
      {
        border: "dotted",
        active: true,
        class: "bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]"
      },
      {
        border: "dashed",
        active: false,
        class: "bi-color-border",
      },
      {
        border: "dashed",
        active: true,
        class: "bi-color-[color-mix(in_srgb,var(--folder-color)_40%,transparent)]"
      }
    ],
    defaultVariants: {
      border: "none",
      active: false,
    },
  }
)

const Facets = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const layoutNS = useId();
  const { active, id, config, facetsConfig, onSetActive } = props;
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

  const borderClass = borderVariants({
    border: facetsConfig?.layoutItemBorder ?? "none",
    active: active || isHovered,
  });

  const handleOnMouseEnter = (_: React.MouseEvent<HTMLDivElement>) => {
     setIsHovered(true);
     onSetActive?.(true);
  }
  const handleOnMouseLeave = (_: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
  }

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
        id={id}
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
            zIndex: (isHovered || active) ? 50 : 1,
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
          scale: isPressing ? 0.98 : (isHovered || active) ? 1.04 : 1,
          rotate: (isHovered || active) ? -1.5 : 0,
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
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
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
            opacity: (isHovered || active) ? 0.12 : 0,
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
          isHovered={isHovered || active}
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
