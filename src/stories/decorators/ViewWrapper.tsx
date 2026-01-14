import type { Decorator } from "@storybook/react-vite";

const ViewWrapper: Decorator = (Story) => {
  return (
    <div style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto', scrollbarWidth: 'none' }} data-testid="lovely-bases">
      <Story />
    </div>
  );
};

export default ViewWrapper;
