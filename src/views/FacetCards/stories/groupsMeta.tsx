
import { GROUPED_ENTRIES } from "@/__fixtures__/entries";
import {
  WithAdaptiveContentSize,
  WithBorderDashed,
  WithBorderSolid,
  WithColor,
  WithGap5XS,
  WithIcon,
  WithImage,
  WithInferPropertiesFromLinkedNotes,
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

import CardsMeta, { type FacetCardsViewStory, View } from './meta';

export { View };
export type { FacetCardsViewStory };


export const meta = {
  ...CardsMeta,
  args: {
    groupedData: GROUPED_ENTRIES,
    ...CardsMeta.args,
    ...WithSize5XSAndSpacing,
    ...WithImage,
    ...WithInferPropertiesFromLinkedNotes,
    ...WithSquareImage,
    ...WithPolaroidLayout,
    ...WithoutCounter,
    ...WithAdaptiveContentSize,
  }
};

export default meta;

export const FullExample: FacetCardsViewStory = {
  args: {
    ...WithInnerTitle,
    ...WithInnerCounter,
    ...WithColor,
    ...WithIcon,
    ...WithBorderDashed,
    ...WithGap5XS,
    ...WithUngroupedItemsInline,
  },
};

export const Default: FacetCardsViewStory = {
  parameters: {
    docs: {
      description: {
        story:
          "By default, the Project Folders view displays grouped notes in interactive 3D folders with file previews on hover.",
      },
    },
  },
};

export const Shape: FacetCardsViewStory = {
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

export const Counter: FacetCardsViewStory = {
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

export const Spacing: FacetCardsViewStory = {
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
    layoutItemSpacing: 75,
  },
};

export const Borders: FacetCardsViewStory = {
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

export const OutsideLabels: FacetCardsViewStory = {
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
    ...WithBorderSolid,
    ...WithOuterTitle,
    ...WithOuterCounter,
  },
};

export const InlineUngroupedContent: FacetCardsViewStory = {
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
    ...WithBorderSolid,
    ...WithUngroupedItemsInline,
  },
};
