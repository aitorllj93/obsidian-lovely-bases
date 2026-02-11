import type { BasesEntry } from "obsidian";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { accent, linear } from "@/lib/colors";

type Props = {
  entry: BasesEntry;
}

const Icon = ({ entry }: Props) => {
  const icon = entry.getValue('note.icon')?.toString();
  const color = entry.getValue('note.color')?.toString();
  const image = entry.getValue('note.image')?.toString();
  const title = entry.file.name;

  const gradient = linear(color !== "null" ? color : accent(), 0.2);

  return (
    <div className="rounded-xl aspect-square w-full h-full flex items-center justify-center" style={{ background: gradient }}>
      <LucideIcon name={icon} className="size-16 text-white" />
    </div>
    );
}

export default Icon;
