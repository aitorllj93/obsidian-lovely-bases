import type { Decorator, ReactRenderer, StrictArgs } from "@storybook/react-vite";
import type { StoryContext } from "storybook/internal/csf";

import LucideIcon from "@/components/Obsidian/LucideIcon";

type HeaderProps = {
  ctx: StoryContext<ReactRenderer, StrictArgs>;
}

const Header = ({
  ctx
}: HeaderProps) => {
  // biome-ignore lint/suspicious/noExplicitAny: ignore
  const totalResults = (ctx.args.data as Array<unknown>)?.length ?? (ctx.args.groupedData as Array<unknown>)?.flatMap((g: any) => 'entries' in g ? g.entries : g).length ?? 0;
  const showHeader = ctx.parameters.obsidian?.showHeader ?? ctx.globals.obsidianShowHeader ?? false;

  if (!showHeader) {
    return null;
  }

  const name = ctx.parameters.docs.def?.name ?? ctx.name;
  const icon = ctx.parameters.docs.def?.icon ?? "layout-grid";

  return (
    <header className="flex justify-between m-2">
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center text-sm">
          <LucideIcon name={icon} className="size-3.5" />
          {name}
          <LucideIcon name="chevrons-up-down" className="size-2.5" />
        </div>
        <span className="text-xs">
          {totalResults} results
        </span>
      </div>
      <div className="flex gap-2.5 items-center">
        <div className="flex gap-1 items-center text-sm">
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
        </div>
        <div className="flex gap-1 items-center text-sm">
          <LucideIcon name="code-xml" className="size-3.5" />
        </div>
      </div>
    </header>
  )
}

const ViewWrapper: Decorator = (Story, ctx) => {
  return (
    <div>
      <Header ctx={ctx} />
      <div
        className="p-(--size-4-3) h-auto max-h-screen w-auto overflow-auto [scrollbar-width:none]"
        data-testid="lovely-bases">
        <Story />
      </div>
    </div>
  );
};

export default ViewWrapper;
