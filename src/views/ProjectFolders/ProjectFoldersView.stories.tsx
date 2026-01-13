import type { Meta, StoryObj } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import {
  COLORIZED_FILES_BASE_CONFIG,
  DEFAULT_BASE_CONFIG,
} from "./__fixtures__/configs";

import ProjectFoldersView, {
  type ProjectFoldersConfig,
} from "./ProjectFoldersView";

const View = createViewRenderer<ProjectFoldersConfig>(ProjectFoldersView);

const meta = {
  title: "Views/Project Folders",
  component: View,
  tags: ["autodocs"],
  decorators: [Providers, ViewWrapper],
  parameters: {
    docs: {
      subtitle:
        "A tactile, organization-focused view that groups your notes into beautiful 3D interactive folders. Perfect for managing projects, areas, or any hierarchical collection.",
      description: {
        component: `### Features

- **Interactive 3D Folders**: Folders that dynamically open and tilt on hover, providing a playful and organic feel.
- **File Previews**: Up to 5 notes from each group are displayed as cards popping out of the folder when you move over it.
- **Visual Metadata**: Automatically extracts icons and colors from the frontmatter of the note representing the folder.
- **Smart Grouping**: Leverages your Base's grouping settings to automatically organize notes into relevant categories.
- **Custom Gradients**: Generates beautiful, color-matched gradients for each folder based on its assigned color.

### Configuration`,
      },
    },
  },
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
    imageProperty: { control: "text", name: "Image Property", description: "The property that contains the image to display on the folders." },
    colorizeFiles: { control: "boolean", name: "Colorize Files", description: "Whether to colorize the files based on the folder color.", table: { defaultValue: { summary: "false" } } },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: MOVIES_ENTRIES,
    ...DEFAULT_BASE_CONFIG,
  },
};

export const ColorizedFiles: Story = {
  args: {
    data: MOVIES_ENTRIES,
    ...COLORIZED_FILES_BASE_CONFIG,
  },
};
