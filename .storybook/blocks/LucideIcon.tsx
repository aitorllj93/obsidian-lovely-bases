import * as Lucide from "lucide-react";
import React, { type ComponentProps, createElement } from "react";

import ICONS from '../../src/icons';

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

const IconStringRenderer = (str: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'image/svg+xml')
  const svg = doc.documentElement

  return (props: ComponentProps<typeof Lucide['AArrowDown']>) => createElement(
    'svg',
    {
      ...Object.fromEntries(
        Array.from(svg.attributes).map(attr => [attr.name, attr.value])
      ),
      ...props,
      dangerouslySetInnerHTML: { __html: svg.innerHTML },
    }
  );
}

const LucideIcon = ({ name, className, size, style }: Props) => {
  const key = normalizeLucideName(name);
  const iconStr = ICONS.get(name);
  // biome-ignore lint/suspicious/noExplicitAny: dynamic resolution of the icon
  const Icon = iconStr ? IconStringRenderer(iconStr) : (Lucide as any)[key] as React.ComponentType<any> | undefined;

  if (!Icon) return null;
  return <Icon className={className} style={{
    ...(size
      ? {
          width: size,
          height: size,
        }
      : {}),
    ...style,
  }} />;
}

export default LucideIcon;
