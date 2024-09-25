import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useSentinel(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState<boolean | null>(false);
  const targetRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.5, ...options });

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting] as const;
}
