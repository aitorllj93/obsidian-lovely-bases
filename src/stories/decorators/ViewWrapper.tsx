import type { Decorator } from "@storybook/react-vite";

const ViewWrapper: Decorator = (Story) => {
  return (
    <div
      className="p-(--size-4-3) h-auto max-h-screen w-auto overflow-auto [scrollbar-width:none]"
      data-testid="lovely-bases">
      <Story />
    </div>
  );
};

export default ViewWrapper;
