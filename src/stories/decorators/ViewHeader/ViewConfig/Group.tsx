import type { GroupOption } from "obsidian";
import { type PropsWithChildren, useState } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";

type Props = PropsWithChildren<{
  group: GroupOption;
}>;

const Group = ({ children, group }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0 px-2 py-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-none bg-transparent flex justify-start gap-1.5 w-full py-2 px-1 text-[11px] font-semibold tracking-wider opacity-60 hover:opacity-100 transition-opacity"
      >
        <LucideIcon
          name={isOpen ? "chevron-down" : "chevron-right"}
          className="size-3"
        />
        {group.displayName}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Group;
