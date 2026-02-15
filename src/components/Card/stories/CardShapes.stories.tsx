import type { Meta } from "@storybook/react-vite";

import { APPLICATION_ENTRIES, PERSON_ENTRIES } from "@/__fixtures__/entries";
import {
  WithCircleShape,
  WithImage,
  WithoutGap,
  WithoutTitle,
  WithRoundedShape,
  WithSize3XSAndSpacing,
  WithSquareImage,
  WithVerticalLayout,
} from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import type Card from "../index";

import CardMeta, { type Story } from "./meta";

const meta = {
  ...CardMeta,
  title: "Design System/Card/Shapes",
  tags: ["internal"],
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          maxWidth: "340px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

export const Circle: Story = {
  args: {
    ...WithSize3XSAndSpacing,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithCircleShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
    entry: PERSON_ENTRIES[0],
  },
};

export const Rounded: Story = {
  args: {
    ...WithSize3XSAndSpacing,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithRoundedShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
    entry: APPLICATION_ENTRIES[0],
  },
};
