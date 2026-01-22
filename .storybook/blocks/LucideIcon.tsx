import React from "react";
import * as Lucide from "lucide-react";

type Props = {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

const normalizeLucideName = (name: string) => {
  const pascal = name
    .trim()
    .replace(/(^\w|[-_\s]+\w)/g, (m) => m.replace(/[-_\s]+/, "").toUpperCase());
  return pascal;
};

const LucideIcon = ({ name, className, style }: Props) => {
  const key = normalizeLucideName(name);
  // biome-ignore lint/suspicious/noExplicitAny: dynamic resolution of the icon
  const Icon = (Lucide as any)[key] as React.ComponentType<any> | undefined;

  if (!Icon) return null;
  return <Icon className={className} style={style} />;
}

export default LucideIcon;
