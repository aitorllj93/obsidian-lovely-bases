
import { motion } from 'motion/react';
import type { KeyboardEvent, MouseEvent } from 'react';

import { useContainerData } from "@/components/Facets/hooks/use-container-data";
import type { GroupProps } from "@/components/Facets/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useTranslation } from "@/lib/i18n";

type Props = GroupProps & {
  id?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function Header({
  active,
  id,
  isCollapsed,
  onToggleCollapse,
  ...props
}: Props) {
  const { t } = useTranslation("groups");
  const { color, icon, title } = useContainerData(props, {
    color: props.facetsConfig.backgroundProperty ? (
      props.facetsConfig.backgroundGradient === 'light' ? '#000' : '#fff'
    ) : 'var(--color-foreground)'
  });
  const titleFont = props.facetsConfig.groupTitleFont ?? props.facetsConfig.titleFont ?? 'var(--font-serif)';

  const entries = props.data.entries ?? [];

  const handleNavigate = (
    event: MouseEvent | KeyboardEvent
  ) => {
    const evt = event.nativeEvent;

    if (evt instanceof MouseEvent && evt.button !== 0 && evt.button !== 1)
      return;
    if (
      evt instanceof KeyboardEvent &&
      evt.key !== "Enter" &&
      evt.key !== " "
    )
      return;

    evt.preventDefault();
    evt.stopPropagation();

    onToggleCollapse?.();
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: header
    <header
      id={id}
      className="focus-visible:outline-none flex items-center gap-1 px-3 py-2 border-b backdrop-blur-none cursor-pointer"
      style={{
        ...props.style,
        color,
        borderColor: color === 'var(--color-foreground)' ? 'var(--color-border)' : color,
      }}
      onClick={handleNavigate}
      onKeyDown={handleNavigate}
      role="button"
      tabIndex={0}
      aria-expanded={!isCollapsed}>
      {icon && (
        <motion.div
          className="shrink-0 size-5"
          animate={{
            scale: active ? 1.5 : 1,
            rotate: active ? -3 : 0,
          }}
          transition={{
            scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <LucideIcon
            name={icon}
            className="size-full"
          />
        </motion.div>
      )}
      <div className="flex flex-1">
        <motion.h2
          className="inline-block text-base m-0 font-semibold line-clamp-1"
          animate={{
            scale: active ? 1.5 : 1,
            translateX: active ? 25 : 0,
          }}
          transition={{
            scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            fontFamily: titleFont,
          }}
        >
          {title !== '' ? title : t('ungrouped')}
        </motion.h2>
      </div>
      <span
        className="text-sm shrink-0"
      >
        {entries.length === 1
          ? t("singleItem", { count: entries.length.toString() })
          : t("totalItems", { count: entries.length.toString() })}
      </span>
    </header>
  );
}

export default Header;
