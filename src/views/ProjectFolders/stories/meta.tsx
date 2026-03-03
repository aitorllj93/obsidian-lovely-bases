import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { GROUPED_ENTRIES } from "@/__fixtures__/entries";
import {
  WithBorderDashed,
  WithBorderSolid,
  WithColor,
  WithGap5XS,
  WithGridLayout,
  WithGroupColor,
  WithGroupIcon,
  WithIcon,
  WithImage,
  WithInnerCounter,
  WithInnerTitle,
  WithNotebookShape,
  WithOuterCounter,
  WithOuterTitle,
  WithoutCounter,
  WithPolaroidLayout,
  WithSize5XSAndSpacing,
  WithSquareImage,
  WithUngroupedItemsInline,
} from "@/__fixtures__/facets/configs";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { FACETS_CONFIG_ARG_TYPES } from "@/components/Facets/config/stories.argTypes";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import PROJECT_FOLDERS_VIEW from "..";
import ProjectFoldersView, {
  type ProjectFoldersConfig,
} from "../ProjectFoldersView";

export const View =
  createViewRenderer<ProjectFoldersConfig>(ProjectFoldersView);

export const meta = {
  title: "Views/Project Folders (Deprecated)",
  component: View,
  tags: ["autodocs", "status:deprecated"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: "fullscreen",
    extraNotes: [
      {
        kind: "error",
        title: "Deprecated",
        description:
          "This feature has been reworked under the <bold>Grouping</bold> features for Card based components such as <a href='./?path=/story/views-grid-groups-folders--full-example'>Grid</a>. Please use them instead.",
      },
    ],
    docs: {
      def: PROJECT_FOLDERS_VIEW,
      subtitle:
        "A tactile, organization-focused view that groups your notes into beautiful 3D interactive folders. Perfect for managing projects, areas, or any hierarchical collection.",
      description: {
        component: `### Features

- **Interactive 3D Folders**: Folders that dynamically open and tilt on hover, providing a playful and organic feel.
- **File Previews**: Up to 5 notes from each group are displayed as cards popping out of the folder when you move over it.
- **Visual Metadata**: Automatically extracts icons and colors from the frontmatter of the note representing the folder.
- **Smart Grouping**: Leverages your Base's grouping settings to automatically organize notes into relevant categories.
- **Custom Gradients**: Generates beautiful, color-matched gradients for each folder based on its assigned color.
- **Customizable Cards**: Full Card component configuration for file previews (layout, shape, badges, etc.).

### Configuration`,
      },
    },
  },
  argTypes: {
    ...FACETS_CONFIG_ARG_TYPES,
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
  args: {
    groupedData: GROUPED_ENTRIES,
    onEntryClick: fn(),
    ...FACETS_CONFIG_DEFAULTS,
    ...WithSize5XSAndSpacing,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
    ...WithoutCounter,
    ...WithGridLayout,
  },
} satisfies Meta<typeof View>;

export default meta;

export type ProjectFoldersViewStory = StoryObj<typeof meta>;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    ...WithInnerTitle,
    ...WithInnerCounter,
    ...WithColor,
    ...WithGroupColor,
    ...WithIcon,
    ...WithGroupIcon,
    ...WithBorderDashed,
    ...WithGap5XS,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "By default, the Project Folders view displays grouped notes in interactive 3D folders with file previews on hover.",
      },
    },
  },
};

export const Shape: Story = {
  parameters: {
    docs: {
      description: {
        story: `You can change the shape of the groups to a folder or a notebook.

\`\`\`yml
groupShape: notebook
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithNotebookShape,
  },
};

export const Counter: Story = {
  parameters: {
    docs: {
      description: {
        story: `With a counter, the groups display the total number of files in the group.

\`\`\`yml
groupCounterPosition: inside
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithInnerCounter,
  },
};

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story: `With spacing, the groups are displayed with an inner spacing.

\`\`\`yml
layoutItemSpacing: 50
\`\`\`
`,
      },
    },
  },
  args: {
    layoutItemSpacing: 50,
  },
};

export const Borders: Story = {
  parameters: {
    docs: {
      description: {
        story: `Use borders to add visual separation between groups.

\`\`\`yml
layoutItemBorder: dashed
layoutItemSpacing: 50
\`\`\`
        `,
      },
    },
  },
  args: {
    layoutItemSpacing: 50,
    ...WithBorderDashed,
  },
};

export const OutsideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: `With an outside title, the groups display the title outside the folder.

\`\`\`yml
titlePosition: outside
groupCounterPosition: outside
layoutItemSpacing: 50
layoutItemBorder: solid
\`\`\`
`,
      },
    },
  },
  args: {
    layoutItemSpacing: 50,
    ...WithIcon,
    ...WithGroupIcon,
    ...WithBorderSolid,
    ...WithOuterTitle,
    ...WithOuterCounter,
  },
};

export const InlineUngroupedContent: Story = {
  parameters: {
    docs: {
      description: {
        story: `You can display the items without group inline with the folders

\`\`\`yml
groupUngroupedItemsDisplay: inline
\`\`\`
`,
      },
    },
  },
  args: {
    layoutItemSpacing: 50,
    ...WithIcon,
    ...WithGroupIcon,
    ...WithBorderSolid,
    ...WithOuterTitle,
    ...WithOuterCounter,
    ...WithUngroupedItemsInline,
  },
};
