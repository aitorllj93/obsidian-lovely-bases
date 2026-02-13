import type { Decorator } from "@storybook/react-vite";

const ScrollViewWrapper: Decorator = (Story) => {
  return (
    <div style={{ maxHeight: '100vh', padding: 'var(--size-4-3)', overflowY: 'auto', scrollbarWidth: 'none' }} data-testid="lovely-bases">
      <Story />
    </div>
  );
};

export default ScrollViewWrapper;
