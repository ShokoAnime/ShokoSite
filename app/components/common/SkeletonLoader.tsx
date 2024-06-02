import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type SkeletonLoaderProps = {
  type?: string;
};

const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
  if (type === 'highlight') {
    return (
      <div className="flex w-full max-w-[386px] flex-col gap-y-6">
        <Skeleton width={'100%'} height={49} />
        <div className="flex flex-col gap-y-4">
          <Skeleton width={'100%'} height={204} />
          <Skeleton width={'100%'} height={26} />
        </div>
      </div>
    );
  }

  if (type === 'blog-list') {
    const fakeArray = [1, 2, 3, 4];
    return (
      <div className="flex w-full max-w-[56.25rem] flex-col gap-y-6">
        {fakeArray.map((_, index) => (
          <div key={index} className="flex flex-col gap-y-6 pb-8">
            <Skeleton height={300} />
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
              <Skeleton height={26} />
            </div>
            <Skeleton count={5} />
            <Skeleton width={145} height={50} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'index-blog') {
    const fakeArray = [1, 2, 3];
    return (
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-x-6">
        {fakeArray.map((_, index) => (
          <div key={index} className="flex w-full max-w-[463px] flex-col gap-x-8">
            <Skeleton width={'100%'} height={255} />
            <Skeleton width={'100%'} height={58} />
            <Skeleton width={'100%'} height={127} />
            <Skeleton width={'100%'} height={26} />
          </div>
        ))}
      </div>
    );
  }
};

export default SkeletonLoader;
