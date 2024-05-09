import Icon from '~/components/common/Icon';
import benefitDetails from '~/components/home/Benefits.data';

const Benefits = () => {
  return (
    <div className="bg-shoko-bg-alt size-full px-6 py-16 2xl:px-0">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-y-16">
        <div className="flex flex-col items-center gap-y-2">
          <h2>Benefits of Shoko</h2>
          <hr className="border-shoko-highlight w-[100px] border" />
        </div>
        <div className="grid w-full grid-cols-3 gap-8">
          {benefitDetails.map((benefit) => (
            <div
              className="flex max-w-[445px] items-center gap-4"
              key={benefit.title}
            >
              <div className="my-auto flex w-full max-w-[64px]">
                <Icon className="text-shoko-text-header mx-auto" icon={benefit.icon} size={64} />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="text-shoko-text-header font-medium">{benefit.title}</div>
                <div>{benefit.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
