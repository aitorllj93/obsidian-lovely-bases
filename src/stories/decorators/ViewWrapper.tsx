import type { Decorator } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import ViewHeader from "./ViewHeader";

const ViewWrapper: Decorator = (Story, ctx) => {
  const [args, updateArgs] = useArgs();

  return (
    <div>
      {(ctx.viewMode === 'story') ? (
        <ViewHeader args={args} updateArgs={updateArgs} ctx={ctx} />
      ) : (
        // biome-ignore lint/a11y/useAnchorContent: docs
        <a className="absolute z-10 w-full h-full" href={`./?path=/story/${ctx.id}&globals=obsidianShowHeader:!true`} />
      )}
      <div
        className="h-auto max-h-screen w-auto overflow-auto [scrollbar-width:none]"
        data-testid="lovely-bases">
        <Story />
      </div>
    </div>
  );
};

export default ViewWrapper;
