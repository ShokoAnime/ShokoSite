import { BenefitProps } from '~/types/home';
import SectionHeader from '~/components/common/SectionHeader';
import Icon from '~/components/common/Icon';
import benefitDetails from './Benefits.data';

const SingleBenefit = ({ title, description, icon }: BenefitProps) => {
  return (
    <div className="bg-shoko-bg border-shoko-border border-b-shoko-button-alt hover:bg-shoko-button-alt hover:text-shoko-text-alt group flex w-full max-w-[20.938rem] lg:max-w-[300px] xl:max-w-[20.938rem]  flex-col items-center gap-y-4 rounded-lg border border-b-2 p-4 transition-colors duration-500 ease-in-out">
      <Icon
        className="text-shoko-text-header group-hover:text-shoko-text-alt transition-colors duration-500 ease-in-out"
        icon={icon}
        size={64}
      />
      <div className="flex flex-col items-center gap-y-2">
        <div className="font-header text-shoko-text-header group-hover:text-shoko-text-alt text-xl font-semibold transition-colors duration-500 ease-in-out">
          {title}
        </div>
        <div className="font-body text-center">
          {description}
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <div className="bg-shoko-bg-alt border-shoko-border border-y py-16">
      <div className="mx-auto flex w-full flex-col justify-center gap-y-16">
        <SectionHeader type="h2" title="Benefits of Shoko" center={true} />
        <div className="flex flex-wrap xl:gap-8 lg:gap-4 gap-2 justify-center lg:container lg:mx-auto">
          {benefitDetails.map((benefit) => <SingleBenefit key={benefit.title} {...benefit} />)}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
