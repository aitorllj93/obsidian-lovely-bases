import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
} from "@/__fixtures__/entries";
import {
  MONOSPACE_FONTS,
  SANS_SERIF_FONTS,
  SERIF_FONTS,
} from "@/__fixtures__/typographies";
import { aBasesEntryGroup } from "@/__mocks__";
import { POLAROID_LAYOUT_CONFIG as CARD_POLAROID_LAYOUT_CONFIG } from "@/components/Card/__fixtures__/configs";
import CardMeta from "@/components/Card/stories/meta";
import { DEFAULTS as GROUP_DEFAULTS } from "@/components/Group/constants";
import GroupMeta from "@/components/Group/stories/meta";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import PROJECT_FOLDERS_VIEW from "..";
import ProjectFoldersView from "../ProjectFoldersView";
import type { ProjectFoldersConfig } from "../types";

export const View =
  createViewRenderer<ProjectFoldersConfig>(ProjectFoldersView);

export const GROUPED_DATA = [
  aBasesEntryGroup("[[Articles]]", ARTICLE_ENTRIES),
  aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
  aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
  aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
  aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
];

export const meta = {
  title: "Views/Project Folders",
  component: View,
  tags: ["autodocs"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: "fullscreen",
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
- **Customizable Cards**: Full Card component configuration for file previews (layout, shape, badges, etc.).

### Configuration`,
      },
    },
  },
  args: {
    groupedData: GROUPED_DATA,
    onEntryClick: fn(),
    ...GROUP_DEFAULTS,
    ...CARD_POLAROID_LAYOUT_CONFIG,
    cardSize: 228,
  },
  argTypes: {
    ...GroupMeta.argTypes,
    ...CardMeta.argTypes,
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

export type ProjectFoldersViewStory = StoryObj<typeof meta>;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    layout: "horizontal",
    shape: "square",
    cardSize: 228,
    imageProperty: "formula.image",
    imageAspectRatio: 0.85,
    imageFit: "cover",
    showTitle: true,
    showPropertyTitles: false,
    properties: ["note.author", "note.published", "note.excerpt"],
    reverseContent: true,
    linkProperty: undefined,
    titleFont: SERIF_FONTS,
    contentFont: SANS_SERIF_FONTS,
    badgesFont: MONOSPACE_FONTS,
    iconProperty: "note.icon",
    backgroundColorProperty: "note.color",
    backgroundColorApplyTo: "both",
    groupIconProperty: "note.icon",
    groupColorProperty: "note.color",
    groupTitlePosition: "inside",
    groupCounterPosition: "inside",
    groupBorder: "dotted",
    groupSpacing: 50,
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
    groupShape: "notebook",
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
    groupCounterPosition: "inside",
  },
};

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story: `With spacing, the groups are displayed with an inner spacing.

\`\`\`yml
groupSpacing: 50
\`\`\`
`,
      },
    },
  },
  args: {
    cardSize: 228,
    groupSpacing: 50,
  },
};

export const Borders: Story = {
  parameters: {
    docs: {
      description: {
        story: `Use borders to add visual separation between groups.

\`\`\`yml
groupBorder: dashed
groupSpacing: 50
\`\`\`
        `,
      },
    },
  },
  args: {
    cardSize: 228,
    groupBorder: "dashed",
    groupSpacing: 50,
  },
};

export const OutsideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: `With an outside title, the groups display the title outside the folder.

\`\`\`yml
groupTitlePosition: outside
groupCounterPosition: outside
groupSpacing: 50
groupBorder: solid
\`\`\`
`,
      },
    },
  },
  args: {
    cardSize: 228,
    groupTitlePosition: "outside",
    groupCounterPosition: "outside",
    groupSpacing: 50,
    groupBorder: "solid",
  },
};
