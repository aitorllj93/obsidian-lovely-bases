import type { Meta, StoryObj } from "@storybook/react-vite";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, PERSON_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import PROJECT_FOLDERS_VIEW from ".";

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
    layout: 'fullscreen',
    docs: {
      icon: PROJECT_FOLDERS_VIEW.icon,
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
    groupedData: {
      table: {
        disable: true,
      },
    },
    imageProperty: { control: "text", name: "Image Property", description: "The property that contains the image to display on the folders." },
    colorProperty: { control: "text", name: "Color Property", description: "The property that contains the color to display on the folders. (On the frontmatter of the note representing the folder)", table: { defaultValue: { summary: "note.color" } } },
    iconProperty: { control: "text", name: "Icon Property", description: "The property that contains the icon to display on the folders. (On the frontmatter of the note representing the folder)", table: { defaultValue: { summary: "note.icon" } } },
    colorizeFiles: { control: "boolean", name: "Colorize Files", description: "Whether to colorize the files based on the folder color.", table: { defaultValue: { summary: "false" } } },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [],
    groupedData: [
      aBasesEntryGroup('[[Movies]]', MOVIES_ENTRIES),
      aBasesEntryGroup('[[Books]]', BOOK_ENTRIES),
      aBasesEntryGroup('[[People]]', PERSON_ENTRIES),
      aBasesEntryGroup('[[Applications]]', APPLICATION_ENTRIES),
      aBasesEntryGroup('[[Articles]]', ARTICLE_ENTRIES),
    ],
    ...DEFAULT_BASE_CONFIG,
  },
};

export const ColorizedFiles: Story = {
  args: {
    data: MOVIES_ENTRIES,
    groupedData: [
      aBasesEntryGroup('[[Movies]]', MOVIES_ENTRIES),
      aBasesEntryGroup('[[Books]]', BOOK_ENTRIES),
      aBasesEntryGroup('[[People]]', PERSON_ENTRIES),
      aBasesEntryGroup('[[Applications]]', APPLICATION_ENTRIES),
      aBasesEntryGroup('[[Articles]]', ARTICLE_ENTRIES),
    ],
    ...COLORIZED_FILES_BASE_CONFIG,
  },
};
