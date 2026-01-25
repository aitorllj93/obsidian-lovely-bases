import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, PERSON_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import PROJECT_FOLDERS_VIEW from ".";
import {
  COLORIZED_FILES_BASE_CONFIG,
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG,
} from "./__fixtures__/configs";
import ProjectFoldersView from "./ProjectFoldersView";
import type { ProjectFoldersConfig } from "./types";

const t = (key: NamespacedTranslationKey<"projectFolders">) =>
	translate("en", "projectFolders", key);

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
    // Data Properties
    imageProperty: {
      control: "text",
      name: t("options.dataProperties.imageProperty.title"),
      description:
        "The property that contains the image to display on file cards within folders.",
      table: {
        category: t("options.dataProperties.title"),
        defaultValue: { summary: "note.cover" },
      },
    },
    iconProperty: {
      control: "text",
      name: t("options.dataProperties.iconProperty.title"),
      description:
        "The property that contains the icon to display on folders (from the frontmatter of the note representing the folder).",
      table: {
        category: t("options.dataProperties.title"),
        defaultValue: { summary: "note.icon" },
      },
    },
    colorProperty: {
      control: "text",
      name: t("options.dataProperties.colorProperty.title"),
      description:
        "The property that contains the color to display on folders (from the frontmatter of the note representing the folder).",
      table: {
        category: t("options.dataProperties.title"),
        defaultValue: { summary: "note.color" },
      },
    },
    // Display
    colorizeFiles: {
      control: "boolean",
      name: t("options.display.colorizeFiles.title"),
      description:
        "Whether to colorize the file cards based on the folder color.",
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "false" },
      },
    },
    // Internal props (disabled)
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
    onEntryClick: {
      table: {
        disable: true,
      },
    },
    onEntryHover: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    data: [],
    groupedData: [
      aBasesEntryGroup('[[Movies]]', MOVIES_ENTRIES),
      aBasesEntryGroup('[[Books]]', BOOK_ENTRIES),
      aBasesEntryGroup('[[People]]', PERSON_ENTRIES),
      aBasesEntryGroup('[[Applications]]', APPLICATION_ENTRIES),
      aBasesEntryGroup('[[Articles]]', ARTICLE_ENTRIES),
    ],
    onEntryClick: fn(),
    ...FULL_BASE_CONFIG,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "By default, the Project Folders view displays grouped notes in interactive 3D folders with file previews on hover.",
      },
    }
  },
  args: {
    data: [],
    groupedData: [
      aBasesEntryGroup('[[Movies]]', MOVIES_ENTRIES),
      aBasesEntryGroup('[[Books]]', BOOK_ENTRIES),
      aBasesEntryGroup('[[People]]', PERSON_ENTRIES),
      aBasesEntryGroup('[[Applications]]', APPLICATION_ENTRIES),
      aBasesEntryGroup('[[Articles]]', ARTICLE_ENTRIES),
    ],
    onEntryClick: fn(),
    ...DEFAULT_BASE_CONFIG,
  },
};

export const ColorizedFiles: Story = {
  parameters: {
    docs: {
      description: {
        story: `Enable colorization of file cards based on the folder color for a more cohesive visual experience.

\`\`\`yml
colorizeFiles: true
\`\`\`
`,
      },
    }
  },
  args: {
    data: MOVIES_ENTRIES,
    groupedData: [
      aBasesEntryGroup('[[Movies]]', MOVIES_ENTRIES),
      aBasesEntryGroup('[[Books]]', BOOK_ENTRIES),
      aBasesEntryGroup('[[People]]', PERSON_ENTRIES),
      aBasesEntryGroup('[[Applications]]', APPLICATION_ENTRIES),
      aBasesEntryGroup('[[Articles]]', ARTICLE_ENTRIES),
    ],
    onEntryClick: fn(),
    ...COLORIZED_FILES_BASE_CONFIG,
  },
};
