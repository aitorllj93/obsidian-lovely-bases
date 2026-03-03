
import { useTranslation } from "@/lib/i18n";

import type { CellShape } from "../config";

import Cell from "./Cell";

type Props = {
	classNames: string[];
  contents?: string[];
	overflowColor?: string;
  shape?: CellShape;
};

export const Legend = ({ classNames, contents, overflowColor, shape }: Props) => {
	const { t } = useTranslation("heatmapCalendar");
	const isBinary = classNames.length === 2;
	const lessText = isBinary ? t("legend.no") : t("legend.less");
	const moreText = isBinary ? t("legend.yes") : t("legend.more");

	return (
		<div className="mt-4 justify-center flex gap-2 text-muted-foreground text-xs items-center">
			<span>{lessText}</span>
			{classNames.map((_, index) => (
        <Cell
          key={`color-${index.toString()}`}
          colors={classNames}
          contents={contents}
          maxValue={classNames.length}
          minValue={0}
          overflowColor={overflowColor}
          shape={shape}
          value={index}
        />
      ))}
			<span>{moreText}</span>
			{overflowColor && (
				<>
					<span className="ml-2">|</span>
          <Cell
            colors={classNames}
            contents={contents}
            maxValue={classNames.length}
            minValue={0}
            overflowColor={overflowColor}
            shape={shape}
            value={classNames.length + 1}
          />
					<span>{t("legend.overflow")}</span>
				</>
			)}
		</div>
	);
};
