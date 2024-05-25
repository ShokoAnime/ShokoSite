type Props = {
  title: string;
}

function HighLightHeader({ title }: Props) {
  return <div className="flex flex-col gap-y-2">
    <h2 className="text-2xl">{title}</h2>
    <hr className="border-shoko-highlight w-[100px] border" />
  </div>;
}

export default HighLightHeader;
