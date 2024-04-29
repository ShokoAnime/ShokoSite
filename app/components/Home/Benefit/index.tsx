import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { benefitsMap } from './Benefit.utils';

export const Benefit = () => {
  return benefitsMap.map((benefit) => (
    <div className="flex max-w-[445px] items-center gap-4" key={benefit.title}>
      <div className="my-auto flex w-full max-w-[64px]">
        <FontAwesomeIcon
          className="mx-auto text-textHeader-light dark:text-textHeader-dark"
          icon={benefit.icon}
          size="3x"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="font-medium text-textHeader-light dark:text-textHeader-dark">{benefit.title}</div>
        <div>{benefit.description}</div>
      </div>
    </div>
  ));
};
