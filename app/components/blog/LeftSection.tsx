import SpotLight from '~/components/blog/SpotLight';
import Tags from '~/components/blog/Tags';


function LeftSection() {
  return <div className="bg-shoko-bg-alt flex w-[416px] flex-col gap-y-8 px-8 py-16">
    <SpotLight />
    <Tags />
  </div>;
}

export default LeftSection;
