import { BenefitProps } from '~/types/home';
import SectionHeader from '~/components/common/SectionHeader';
import Icon from '~/components/common/Icon';
import benefitDetails from './Benefits.data';

const SingleBenefit = ({ title, description, icon }: BenefitProps) => {
  return (
    <div className="group flex w-full max-w-[21rem] flex-col items-center gap-y-4 rounded-lg border border-b-2 border-shoko-border border-b-shoko-button-alt bg-shoko-bg p-4 transition-colors duration-500 ease-in-out hover:bg-shoko-button-alt hover:text-shoko-text-alt lg:max-w-72 xl:max-w-[20.2rem] 2xl:max-w-[20.938rem]">
      <Icon
        className="text-shoko-text-header transition-colors duration-500 ease-in-out group-hover:text-shoko-text-alt"
        icon={icon}
        size={64}
      />
      <div className="flex flex-col items-center gap-y-2 text-center">
        <div className="font-header text-xl font-semibold text-shoko-text-header transition-colors duration-500 ease-in-out group-hover:text-shoko-text-alt">
          {title}
        </div>
        <div>
          {description}
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <div className="border-y border-shoko-border bg-shoko-bg-alt py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center gap-y-16 px-6 2xl:px-0">
        <SectionHeader type="h2" title="Benefits of Shoko" center={true} />
        <div className="flex flex-wrap justify-center gap-8">
          {benefitDetails.map((benefit) => <SingleBenefit key={benefit.title} {...benefit} />)}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
