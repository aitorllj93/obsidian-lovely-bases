import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import type { ReactRenderer, StrictArgs } from "@storybook/react-vite";
import type { BasesEntry, BasesEntryGroup } from "obsidian";
import type { StoryContext } from "storybook/internal/csf";

import { aBasesViewConfig } from "@/__mocks__";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import type { BaseViewDef } from "@/types";

import Code from "./Code";
import Option from "./ViewConfig/Option";

type Props = {
  args: StrictArgs;
  updateArgs: (newArgs: StrictArgs) => void;
  ctx: StoryContext<ReactRenderer, StrictArgs>;
};

const ViewHeader = ({ args, updateArgs, ctx }: Props) => {
  const showHeader =
    ctx.parameters.obsidian?.showHeader ??
    ctx.globals.obsidianShowHeader ??
    false;
  if (!showHeader) {
    return null;
  }

  const totalResults =
    (args.data as BasesEntry[])?.length ??
    (args.groupedData as BasesEntryGroup[])?.flatMap((g) =>
      "entries" in g ? g.entries : g,
    ).length ??
    0;
  const def = ctx.parameters.docs.def as BaseViewDef | undefined;
  const config = aBasesViewConfig(args);
  const name = def?.name ?? ctx.name;
  const icon = def?.icon ?? "layout-grid";
  const options = def?.options?.() ?? [];

  return (
    <header className="flex justify-between m-2 text-foreground">
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverButton className="flex gap-2 items-center bg-transparent border-0 hover:bg-border rounded px-1.5 py-0.5 transition-colors cursor-pointer outline-none">
            <div className="flex gap-1 items-center text-sm font-medium text-foreground">
              <LucideIcon name={icon} className="size-3.5" />
              {name}
              <LucideIcon
                name="chevrons-up-down"
                className="size-2.5 opacity-50"
              />
            </div>
          </PopoverButton>
          <PopoverPanel
            anchor="bottom start"
            transition
            className="z-50 overflow-y-auto bg-background text-popover-foreground rounded-lg border border-border min-w-[200px] shadow-xl origin-top-right transition-all data-closed:opacity-0 data-closed:scale-95 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
          >
            <div className="flex flex-col gap- max-h-[60dvh] overflow-auto">
              {options.map((opt) => (
                <Option
                  key={opt.displayName}
                  args={args}
                  config={config}
                  option={opt}
                  updateArgs={updateArgs}
                />
              ))}
            </div>
          </PopoverPanel>
        </Popover>
        <span className="text-xs opacity-50">{totalResults} results</span>
      </div>
      <div className="flex gap-2.5 items-center">
        {/* <div className="flex gap-1 items-center text-sm">
          <LucideIcon name="arrow-up-down" className="size-3.5" />
          Sort
        </div>
        <div className="flex gap-1 items-center text-sm">
          <LucideIcon name="list-filter" className="size-3.5" />
          Filter
        </div>
        <div className="flex gap-1 items-center text-sm">
          <LucideIcon name="list" className="size-3.5" />
          Properties
        </div> */}
        <Popover>
          <PopoverButton className="flex gap-2 items-center bg-transparent border-0 hover:bg-border rounded px-1.5 py-0.5 transition-colors cursor-pointer outline-none text-foreground">
            <LucideIcon name="code-xml" className="size-3.5" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom end"
            transition
            className="z-50 overflow-y-auto bg-background text-popover-foreground rounded-lg border border-border min-w-[50px] shadow-xl origin-top-right transition-all data-closed:opacity-0 data-closed:scale-95 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
          >
            <Code args={args} options={options} />
          </PopoverPanel>
        </Popover>
      </div>
    </header>
  );
};

export default ViewHeader;
