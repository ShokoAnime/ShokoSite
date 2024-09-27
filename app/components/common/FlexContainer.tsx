import { FlexContainerProps } from '~/types/common';

const FlexContainer = ({ children }: FlexContainerProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {children}
    </div>
  );
};

export default FlexContainer;
