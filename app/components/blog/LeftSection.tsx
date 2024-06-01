import SpotLight from '~/components/blog/SpotLight';
import Tags from '~/components/blog/Tags';

function LeftSection() {
  return (
    <div className="bg-shoko-bg-alt flex w-[26rem] flex-col gap-y-8 p-8">
      <SpotLight />
      <div className="sticky top-32">
        <Tags />
      </div>
    </div>
  );
}

export default LeftSection;
