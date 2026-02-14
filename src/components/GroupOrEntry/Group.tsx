import { type ComponentProps, forwardRef } from "react";

import Folder from "../Folder";
import type { GroupShape } from "../Group/types";
import Notebook from "../Notebook";

type Props = ComponentProps<typeof Folder | typeof Notebook> & {
  groupShape: GroupShape;
};

const Group = forwardRef<HTMLDivElement, Props>((props) => {
  if (props.groupShape === "notebook") {
    return <Notebook {...props as ComponentProps<typeof Notebook>} />;
  } else {
    return <Folder {...props as ComponentProps<typeof Folder>} />;
  }
});

export default Group;
