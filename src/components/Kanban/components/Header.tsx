import { cva } from "class-variance-authority";

import type { FacetsConfig } from "@/components/Facets/config";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { Badge } from "@/components/reui/badge";
import { FrameHeader, FrameTitle } from "@/components/reui/frame";

type Props = Pick<FacetsConfig, "groupCounterPosition"> & {
  color: string;
  direction: "row" | "column";
  icon?: string;
  isCollapsed: boolean;
  title: string;
  titleFont: string;
  toggleCollapsed: () => void;
  totalItems: number;
};

const headerVariants = cva(
  "flex items-center justify-between gap-2 cursor-pointer transition-all",
  {
    variants: {
      collapsed: {
        true: "",
        false: "",
      },
      direction: {
        row: "flex-row",
        column: "flex-row",
      },
    },
    compoundVariants: [
      {
        collapsed: true,
        direction: "column",
        className: "writing-sideways",
      },
      {
        collapsed: false,
        direction: "column",
        className: "border-b mx-2",
      },
      {
        collapsed: true,
        direction: "row",
        className: "flex-row-reverse"
      },
      {
        collapsed: false,
        direction: "row",
        className: "border-r mx-2 writing-sideways py-0",
      },
    ],
  },
);

const iconVariants = cva("size-4", {
  variants: {
    collapsed: {
      true: "",
      false: "",
    },
    direction: {
      column: "",
      row: "",
    },
  },
  compoundVariants: [
    {
      collapsed: true,
      className: "pt-1"
    },
  ],
});

const titleVariants = cva("", {
  variants: {
    collapsed: {
      true: "",
      false: "",
    },
    hasIcon: {
      true: "",
      false: ""
    },
    direction: {
      column: "",
      row: "",
    },
  },
  compoundVariants: [
    {
      collapsed: true,
      direction: "column",
      className: "pt-4 border-t",
    },
    {
      collapsed: true,
      direction: "row",
      className: "pl-4 border-l",
    },
  ],
});

const badgeVariants = cva(
  "bg-(--column-color)/10 font-bold",
  {
    variants: {
      direction: {
        column: "ml-auto",
        row: "",
      },
      collapsed: {
        true: "writing-horizontal",
        false: ""
      }
    }
  }
)

const Header = ({
  color,
  direction,
  groupCounterPosition,
  icon,
  isCollapsed: collapsed,
  title,
  titleFont,
  toggleCollapsed,
  totalItems,
}: Props) => {
  const headerClass = headerVariants({
    collapsed,
    direction,
  });
  const iconClass = iconVariants({
    collapsed,
    direction,
  });
  const titleClass = titleVariants({
    collapsed,
    direction,
    hasIcon: !!icon,
  });
  const badgeClass = badgeVariants({
    collapsed,
    direction,
  });
  const borderColor = color !== "var(--color-foreground)" ? color : "var(--color-muted)";

  return (
    <FrameHeader
      className={headerClass}
      style={{
        borderColor
      }}
      onClick={toggleCollapsed}
    >
      {icon && (
        <LucideIcon
          className={iconClass}
          style={{
            color,
          }}
          name={icon}
        />
      )}
      <FrameTitle
        className={titleClass}
        style={{
          borderColor,
          color,
          fontFamily: titleFont,
        }}
      >
        {title}
      </FrameTitle>
      {groupCounterPosition !== "none" && (
        <Badge
          variant="ghost"
          className={badgeClass}
          style={{
            color,
          }}
        >
          {totalItems}
        </Badge>
      )}
    </FrameHeader>
  );
};

export default Header;
