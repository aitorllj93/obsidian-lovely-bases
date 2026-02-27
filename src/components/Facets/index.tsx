
import { cva } from "class-variance-authority";
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
import { cn, mergeRefs } from "@/lib/utils";

import ExpandedView from "./components/ExpandedView";
import Group from "./components/Group";
import OutsideContent from "./components/OutsideContent";

import { getAnimations } from "./helpers/get-animations";
import { useContainerData } from "./hooks/use-container-data";
import { useExpand } from "./hooks/use-expand";
import { useNavigate } from "./hooks/use-navigate";

import { isGroup, type Props } from "./types";
import { getLayoutIds } from "./utils";

const borderVariants = cva("", {
  variants: {
    border: {
      none: "",
      solid: "border-solid",
      dotted: "bi-dotted",
      dashed: "bi-dashed",
    },
    activeEffect: {
      none: "",
      tilted: "shadow-2xl shadow-(--facets-color)/20",
      bordered: "border-solid border-2 border-(--facets-color)"
    },
  },
  compoundVariants: [
    {
      border: "solid",
      activeEffect: "none",
      class: "border-border",
    },
    {
      border: "solid",
      activeEffect: "tilted",
      class: "border-(--facets-color)/40",
    },
    {
      border: "dotted",
      activeEffect: "none",
      class: "bi-color-border",
    },
    {
      border: "dotted",
      activeEffect: "tilted",
      class:
        "bi-color-[color-mix(in_srgb,var(--facets-color)_40%,transparent)]",
    },
    {
      border: "dashed",
      activeEffect: "none",
      class: "bi-color-border",
    },
    {
      border: "dashed",
      activeEffect: "tilted",
      class:
        "bi-color-[color-mix(in_srgb,var(--facets-color)_40%,transparent)]",
    },
  ],
  defaultVariants: {
    border: "none",
    activeEffect: "none",
  },
});

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
      : 0;
  }, [facetsConfig.layoutItemSize, facetsConfig.layoutItemSpacing]);

  const {
    handlePointerDown,
    handlePointerUp,
    handleExpand,
    handleClose,
    isExpanded,
    isPressing,
  } = useExpand();

  const handleNavigate = useNavigate({
    data: props.data,
    config: props.facetsConfig,
    file,
    toggleExpanded: (e) => handleExpand(e, cardRef),
  });

  const animations = useMemo(() => {
    return getAnimations({
      activeEffect: facetsConfig.activeEffect,
      initialAnimationDelay: (props.index ?? 0) * 0.1,
      isActive: active,
      isHovered,
      isPressing,
      showInitialAnimation: props.initialAnimation,
    });
  }, [facetsConfig.activeEffect, active, props.index, isHovered, isPressing, props.initialAnimation])

  const handleOnMouseEnter = (_: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onSetActive?.(true);
  };
  const handleOnMouseLeave = (_: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
  };

  const shouldApplyActiveEffect = active || isHovered;

  const borderClass = borderVariants({
    border: facetsConfig?.layoutItemBorder ?? "none",
    activeEffect: shouldApplyActiveEffect ? facetsConfig.activeEffect : "none"
  });

  return (
    <LayoutGroup id={layoutIds.container}>
      <motion.div
        id={id}
        layoutId={layoutIds.content}
        role="button"
        tabIndex={0}
        ref={mergeRefs(cardRef, ref)}
        className={cn(
          "focus-visible:outline-none relative flex flex-col items-center justify-center rounded cursor-pointer group h-[stretch]",
          borderClass,
        )}
        style={
          {
            padding: `${facetsConfig.layoutItemSpacing ?? 0}px`,
            perspective: "1200px",
            "--facets-color": color,
            zIndex: isHovered || active ? 50 : 1,
          } as CSSProperties
        }
        initial={animations.initial}
        animate={animations.animate}
        transition={animations.transition}
        onClick={handleNavigate}
        onKeyDown={handleNavigate}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, var(--facets-color) 0%, transparent 70%)",
            opacity: isHovered || active ? 0.12 : 0,
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
              onClick={() => {}}
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
              active={active}
              isDraggable={props.isDraggable}
              layoutItemSize={width}
              className={props.className}
              contentClassName="min-h-fit"
              config={props.config}
              entry={props.data}
              ref={ref}
              onClick={() => {}}
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
