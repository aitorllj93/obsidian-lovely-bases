
import PropertyList from "./PropertyList";
import Title from "./Title";

type Props = {
  entryId: string;
}

const Content = ({ entryId }: Props) => {
  return (
    <div
      className="flex flex-col flex-1 min-h-0 min-w-0 h-full overflow-hidden"
    >
      <Title entryId={entryId} />

      <div className="flex-1 min-h-0">
        <PropertyList
          entryId={entryId}
        />
      </div>
    </div>
  )
};

export default Content;
