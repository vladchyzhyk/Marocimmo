'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { FilterTip } from './FilterTip';
import { useCollectFilters } from '@/hooks/useCollectFilters';
import { useFilters } from '@/hooks/useFilters';
import { FILTERS_CONFIG } from './filters-config';
import { generateFilterTips } from '@/utils/filterTips';

interface SeeMoreButtonProps {
  text: string;
  onClick: () => void;
}

const SeeMoreButton = ({ text, onClick }: SeeMoreButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="title-sm text-[var(--accent-green)] transition-colors whitespace-nowrap"
    >
      {text}
    </button>
  );
};

export const ActiveFilters = () => {
  const { activeFilters } = useCollectFilters({ onlyActive: true, includeMetadata: true });
  const { updateFilter, clearAllFilters, clearFilterItem, clearFilterField } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const hasActiveFilters = activeFilters.length > 0;

  const handleClearAll = () => {
    if (!hasActiveFilters) {
      return;
    }
    clearAllFilters();
  };

  const filterTips = useMemo(() => {
    return generateFilterTips(activeFilters, FILTERS_CONFIG, {
      updateFilter,
      clearFilterItem,
      clearFilterField,
    });
  }, [activeFilters, updateFilter, clearFilterItem, clearFilterField]);

  useEffect(() => {
    setIsExpanded(false);
    setVisibleCount(null);
    itemsRef.current = [];
  }, [filterTips.length]);

  useEffect(() => {
    if (isExpanded) {
      return;
    }

    if (!containerRef.current || filterTips.length === 0) {
      setVisibleCount(null);
      return;
    }

    const container = containerRef.current;

    const calculateVisibleCount = () => {
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

      if (items.length !== filterTips.length) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const gap = 12;
      let currentWidth = 0;
      let count = 0;

      const clearAllButton = container.querySelector('button:first-of-type');
      const clearAllButtonWidth = clearAllButton
        ? clearAllButton.getBoundingClientRect().width
        : 80;
      currentWidth += clearAllButtonWidth + gap;

      const seeMoreButtonWidth = 90;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item) continue;

        const itemRect = item.getBoundingClientRect();
        const itemWidth = itemRect.width;

        const neededWidth = currentWidth + itemWidth + gap;

        if (neededWidth + seeMoreButtonWidth + gap <= containerWidth) {
          currentWidth += itemWidth + gap;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(count);
    };

    const timeoutId = setTimeout(() => {
      calculateVisibleCount();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount();
    });

    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [filterTips.length, isExpanded]);

  const handleSeeMore = () => {
    setIsExpanded(true);
  };

  const handleSeeLess = () => {
    setIsExpanded(false);
  };

  if (!hasActiveFilters || filterTips.length === 0) {
    return null;
  }

  const shouldShowSeeMore =
    !isExpanded && visibleCount !== null && visibleCount < filterTips.length;

  return (
    <div ref={containerRef} className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={handleClearAll}
        className="text-sm text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
      >
        Clear all
      </button>
      {filterTips.map((tip, index) => {
        const shouldRender = visibleCount === null || isExpanded || index < visibleCount;
        if (!shouldRender) {
          return (
            <div
              key={`${tip.filterId}-${index}`}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}
            >
              <FilterTip text={tip.text} onClear={tip.onClear} />
            </div>
          );
        }
        return (
          <div
            key={`${tip.filterId}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <FilterTip text={tip.text} onClear={tip.onClear} />
          </div>
        );
      })}
      {shouldShowSeeMore && <SeeMoreButton text="See more" onClick={handleSeeMore} />}
      {isExpanded && filterTips.length > (visibleCount || 0) && (
        <SeeMoreButton text="See less" onClick={handleSeeLess} />
      )}
    </div>
  );
};
