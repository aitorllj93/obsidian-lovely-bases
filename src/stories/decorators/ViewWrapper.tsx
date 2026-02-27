import type { Decorator } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import ViewHeader from "./ViewHeader";

const ViewWrapper: Decorator = (Story, ctx) => {
  const [args, updateArgs] = useArgs();
  return (
    <div>
      <ViewHeader args={args} updateArgs={updateArgs} ctx={ctx} />
      <div
        className="h-auto max-h-screen w-auto overflow-auto [scrollbar-width:none]"
        data-testid="lovely-bases">
        <Story />
      </div>
    </div>
  );
};

export default ViewWrapper;
