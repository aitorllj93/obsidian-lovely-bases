import type { BasesEntry } from "obsidian";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { accent, linear } from "@/lib/colors";
import { getPropertyValue } from "@/lib/obsidian/entry";

type Props = {
  entry: BasesEntry;
}

const Icon = ({ entry }: Props) => {
  const icon = getPropertyValue(entry, 'note.icon');
  const color = getPropertyValue(entry, 'note.color');

  const gradient = linear(color ?? accent(), 0.2);

  return (
    <div className="rounded-xl aspect-square w-full h-full flex items-center justify-center" style={{ background: gradient }}>
      {icon && <LucideIcon name={icon} className="size-16 text-white" />}
    </div>
    );
}

export default Icon;
