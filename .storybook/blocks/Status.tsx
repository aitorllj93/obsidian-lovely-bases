import { useOf } from "@storybook/addon-docs/blocks";
import React from "react";

import { cn } from "../../src/lib/utils";
import LucideIcon from './LucideIcon';

const DEFAULT_STATUS = "experimental";

const STATUS_LABELS = {
  testing: "Ready for beta testing",
  ready: "Ready for production",
  deprecated: "Deprecated",
  experimental: "Experimental",
  stable: "Stable",
};

const STATUS_TOOLTIPS = {
  testing:
    "This component is ready for beta users to test and provide feedback.",
  ready: "This component is ready for production use.",
  deprecated:
    "This component is no longer supported and will be removed in a future version.",
  experimental:
    "This component is experimental and may be changed or removed in a future version.",
  stable:
    "This component has been tested in production for a while and is considered stable.",
};

// background, border and text colors
const STATUS_CLASSES = {
  testing: "bg-blue-300 text-white border-blue-500",
  ready: "bg-green-300 text-white border-green-500",
  deprecated: "bg-red-300 text-white border-red-500",
  experimental: "bg-yellow-300 text-white border-yellow-500",
  stable: "bg-purple-300 text-white border-purple-500",
};

const STATUS_ICONS = {
  testing: "monitor",
  ready: "check-circle",
  deprecated: "alert-circle",
  experimental: "triangle-alert",
  stable: "check-circle",
};

export const Status = () => {
  const resolvedOf = useOf("meta", ["story", "meta"]);

  const tags = resolvedOf.type === "meta" ? resolvedOf.preparedMeta.tags : [];
  const isView = resolvedOf.type === "meta" && resolvedOf.preparedMeta.title.includes("Views");

  if (!isView) {
    return null;
  }

  let status = tags
    .find((tag) => tag.startsWith("status:"))
    ?.replace("status:", "");
  const desktopOnly = tags.includes("desktop-only");

  if (!status && tags.includes("experimental")) {
    status = "experimental";
  }

  if (!status) {
    status = DEFAULT_STATUS;
  }

  return (
    <div className="flex w-full justify-between my-4!">
      <div className="flex items-center gap-2">
        <span title="Works on desktop devices">
          <LucideIcon name="monitor" className="w-4 h-4" />
        </span>
        {!desktopOnly && (
          <span title="Works on mobile devices">
            <LucideIcon name="smartphone" className="w-4 h-4" />
          </span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "text-xs text-muted-foreground px-1.5 py-0.5 border rounded-md flex items-center gap-2",
            STATUS_CLASSES[status as keyof typeof STATUS_CLASSES],
          )}
          title={STATUS_TOOLTIPS[status as keyof typeof STATUS_TOOLTIPS]}
        >
          {STATUS_ICONS[status as keyof typeof STATUS_ICONS] && (
            <LucideIcon
              name={STATUS_ICONS[status as keyof typeof STATUS_ICONS]}
              className="w-3.5 h-3.5"
            />
          )}
          {STATUS_LABELS[status as keyof typeof STATUS_LABELS]}
        </span>
      )}
    </div>
  );
};
