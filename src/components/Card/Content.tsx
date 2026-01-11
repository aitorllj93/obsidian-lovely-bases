import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardConfig } from "./types";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
}

const Content = memo(({ entry, cardConfig, config }: Props) => {
  return (
    <div
      className="flex flex-col flex-1 min-h-0 min-w-0 h-full overflow-hidden"
    >
      <Title entry={entry} cardConfig={cardConfig} />

      <div className="flex-1 min-h-0">
        <PropertyList
          entry={entry}
          cardConfig={cardConfig}
          config={config}
        />
      </div>
    </div>
  )
});

Content.displayName = "Content";

export default Content;
