'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { ArrowNextIcon } from '@/utils/icons';
import classNames from 'classnames';

interface ScrollableContainerProps {
  children: ReactNode;
  title?: string;
  scrollAmount?: number;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
}

export const ScrollableContainer = ({
  children,
  title,
  scrollAmount = 307 + 16,
  className = '',
  containerClassName = '',
  titleClassName = '',
}: ScrollableContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => {
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {title && (
          <h3
            className={classNames(
              titleClassName ? titleClassName : 'heading-h3 text-[var(--color-black)]',
            )}
          >
            {title}
          </h3>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:bg-[var(--bg-tint)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Scroll left"
          >
            <ArrowNextIcon className="w-5 h-5 text-[var(--color-black)] rotate-180" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--border)] bg-white hover:bg-[var(--bg-tint)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Scroll right"
          >
            <ArrowNextIcon className="w-5 h-5 text-[var(--color-black)]" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`flex gap-4 overflow-x-auto scrollbar-none -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-[80px] px-4 sm:px-6 md:px-8 lg:px-[80px] ${containerClassName}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={checkScrollButtons}
      >
        {children}
      </div>
    </div>
  );
};
