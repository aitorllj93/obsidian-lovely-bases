
import type { App } from "obsidian";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardItem } from "./types";


type Props = {
  layout: "horizontal" | "vertical";
  cardSize: number;
  item: CardItem;
  imageWidthPercent: number;
  showPropertyTitles: boolean;
  app: App;
}

const Content = ({ layout, cardSize, item, imageWidthPercent, showPropertyTitles, app }: Props) => {
  return (
    <div
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
      style={{
        ...(layout === "horizontal"
          ? { width: `${100 - imageWidthPercent}%` }
          : { height: `${100 - imageWidthPercent}%` }),
      }}
    >
      <Title layout={layout} cardSize={cardSize} item={item} />

      <div className="flex-1 min-h-0">
        <PropertyList
          app={app}
          properties={item.properties}
          showTitles={showPropertyTitles}
        />
      </div>
    </div>
  )
};

export default Content;
