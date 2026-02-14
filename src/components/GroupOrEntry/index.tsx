import { forwardRef } from "react";
import Card from "../Card";
import Group from "../Group/Group";

import { isGroup, type Props } from "./types";

const GroupOrEntry = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return isGroup(props) ? (
    <Group
      cardConfig={props.cardConfig}
      className={props.className}
      config={props.config}
      entries={props.data.entries}
      groupConfig={props.groupConfig}
      groupKey={props.data.key?.toString() ?? ""}
      ref={ref}
    />
  ) : (
    <Card
      {...props.cardConfig}
      className={props.className}
      config={props.config}
      entry={props.data}
      ref={ref}
    />
  );
});

export default GroupOrEntry;
