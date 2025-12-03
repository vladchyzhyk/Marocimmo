'use client';

import { FilterDropdown } from './FilterDropdown';
import { FilterItem } from './FilterItem';
import { useFilters } from '@/hooks/useFilters';
import { isFilterActive } from '@/utils/countActiveFilters';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getFilterValueById } from '@/utils/getFilterValueById';

interface MoreFiltersDropdownProps {
  className?: string;
}

export const MoreFiltersDropdown = ({ className = '' }: MoreFiltersDropdownProps) => {
  const { popupFilters, mobileBarFilters, visibleFilters, filterValues, clearAllFilters } = useFilters();
  const isMobile = useIsMobile(768);

  const hiddenActiveFiltersCount = visibleFilters
    .filter((filter) => !mobileBarFilters.some((f) => f.id === filter.id))
    .filter((filter) => {
      const value = getFilterValueById(filter.id, filterValues);
      return isFilterActive(filter.id, value);
    }).length;

  if (isMobile) {
    return null;
  }

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 px-4 h-10 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors flex-shrink-0"
    >
      <span className="text-base leading-[140%]whitespace-nowrap">
        More
      </span>
      <Image
        src="/icons/ic_arrow_down.svg"
        alt="More"
        width={20}
        height={20}
        className="transition-transform"
      />
      {hiddenActiveFiltersCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-green)] text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
          {hiddenActiveFiltersCount}
        </span>
      )}
    </button>
  );

  const content = (
    <div className="flex flex-col gap-6 min-w-[350px] max-w-[600px]">
      <div className="flex items-center justify-between pr-2 flex-shrink-0">
        <h3 className="title-sm font-medium text-[var(--color-black)]">More filters</h3>
        <button
          className="title-sm text-[var(--accent-green)] hover:underline"
          onClick={clearAllFilters}
        >
          Clear all filters
        </button>
      </div>

      <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto overflow-x-hidden scrollbar-none">
        {popupFilters.map((filter) => (
          <FilterItem key={filter.id} config={filter} context="popup" />
        ))}
        {popupFilters.length === 0 && (
          <p className="text-[var(--text-body-tint)] body-lg text-center py-8">
            No additional filters available
          </p>
        )}
      </div>
    </div>
  );

  return (
    <FilterDropdown
      trigger={trigger}
      content={content}
      onApply={() => {}}
      onClear={clearAllFilters}
      showActions={false}
      placement="bottom-end"
      className={className}
    />
  );
};

