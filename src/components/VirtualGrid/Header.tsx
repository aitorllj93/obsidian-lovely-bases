
import { useContainerData } from "@/components/Facets/hooks/use-container-data";
import type { GroupProps } from "@/components/Facets/types";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useTranslation } from "@/lib/i18n";

export function Header(props: GroupProps) {
  const { t } = useTranslation("common");
  const { color, icon, title } = useContainerData(props, {
    color: 'var(--color-foreground)'
  });
  const entries = props.data.entries ?? [];

  return (
    <header className="flex items-center gap-3 px-3 py-2 border-b border-border bg-background/95 backdrop-blur-sm"
      style={{
        ...props.style,
        color,
      }}>
      {icon && (
        <div
          className="shrink-0 size-5"
        >
          <LucideIcon
            name={icon}
            className="size-full"
          />
        </div>
      )}
      <h2
        className="text-base m-0 font-semibold flex-1 line-clamp-1"
      >
        {title !== '' ? title : t('ungrouped')}
      </h2>
      <span
        className="text-sm  shrink-0"
      >
        {entries.length === 1
          ? t("singleItem", { count: entries.length.toString() })
          : t("totalItems", { count: entries.length.toString() })}
      </span>
    </header>
  );
}
