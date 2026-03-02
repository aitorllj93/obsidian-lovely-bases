

import { getStories, type ViewName } from '../utils/stories';
import ReelComposition from "./ReelComposition";

type Props = {
  viewId: ViewName;
  title: string | null | undefined;
  playSFX?: boolean;
}

const StatelessReelComposition = (props: Props) => {
  const { title, playSFX } = props;
  const reelStories = getStories(props.viewId);

  return (
    <ReelComposition
      reelStories={reelStories}
      title={title}
      playSFX={playSFX}
    />
  )
};

export default StatelessReelComposition;
