import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import { aBasesViewConfig } from "@/__mocks__";
import { FACETS_CONFIG_DEFAULTS, type FacetsConfig } from "@/components/Facets/config";
import Providers from "@/stories/decorators/Providers";

import Group from "../components/Group";
import { FACETS_CONFIG_ARG_TYPES } from "../config/stories.argTypes";

export type StoryProps = Partial<Omit<ComponentProps<typeof Group>, "config" | "facetsConfig">> & FacetsConfig;

export const GroupStory = ({
	width,
  color,
	colors,
	icon,
	files,
	onClick,
  // ONLY IN NOTEBOOK
  // padContent,
  // pageStyle,
  // previewFilesAmount,
  showCounter = false,
  title,
  counterLayoutId,
	iconLayoutId,
	titleLayoutId,
  ...facetsConfig
}: StoryProps) => {
  const obsConfig = aBasesViewConfig({
    ...facetsConfig,
  });
  return (
    <Group
      width={width ?? facetsConfig.layoutItemSize}
      color={color}
      // biome-ignore lint/suspicious/noExplicitAny: group colors
      colors={colors as any}
      icon={icon}
      files={files ?? []}
      config={obsConfig}
      onClick={onClick}
      showCounter={showCounter}
      title={title}
      counterLayoutId={counterLayoutId}
      iconLayoutId={iconLayoutId}
      titleLayoutId={titleLayoutId}
      facetsConfig={facetsConfig}
      groupShape={facetsConfig.groupShape}
    />
  );
};

export const meta = {
  title: "Design System/Group",
  component: GroupStory,
  parameters: {
    layout: "centered",
  },
  tags: ["internal"],
  argTypes: {
    ...FACETS_CONFIG_ARG_TYPES,
    files: {
      table: {
        disable: true,
      },
    }
  },
  args: {
    ...FACETS_CONFIG_DEFAULTS,
  },
  decorators: [
    Providers,
  ],
} satisfies Meta<typeof GroupStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
