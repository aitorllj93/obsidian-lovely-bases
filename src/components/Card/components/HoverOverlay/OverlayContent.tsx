import type { BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";

import Property from "../Property";

type Props = {
  adaptToSize?: boolean;
  config: BasesViewConfig;
  entry: BasesEntry;
  isOverlayMode?: boolean;
  propertyId: BasesPropertyId;
  showPropertyTitles: boolean;
};

const OverlayContent = ({ ...props }: Props) => {

  return (
    <Property {...props} />
  );
};

export default OverlayContent;
