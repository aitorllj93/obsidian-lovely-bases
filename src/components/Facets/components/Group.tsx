import { type ComponentProps, forwardRef } from "react";

import type { GroupShape  } from "@/components/Facets/config";
import Folder from "@/components/Folder";
import Notebook from "@/components/Notebook";

type Props = ComponentProps<typeof Folder | typeof Notebook> & {
  groupShape: GroupShape;
};

const Group = forwardRef<HTMLDivElement, Props>((props, ref) => {
  if (props.groupShape === "notebook") {
    return <Notebook {...props as ComponentProps<typeof Notebook>} ref={ref} />;
  } else {
    return <Folder {...props as ComponentProps<typeof Folder>} ref={ref} />;
  }
});

export default Group;
