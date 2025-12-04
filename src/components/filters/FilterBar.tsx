'use client';

import { useFilters } from '@/hooks/useFilters';
import { FilterItem } from './FilterItem';
import { FilterIcon } from '@/utils/icons';
import { isFilterActive } from '@/utils/countActiveFilters';
import { MoreFiltersDropdown } from './MoreFiltersDropdown';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getFilterValueById } from '@/utils/getFilterValueById';

interface FilterBarProps {
  onMoreFiltersClick?: () => void;
  className?: string;
}

export const FilterBar = ({ onMoreFiltersClick, className = '' }: FilterBarProps) => {
  const { mobileBarFilters, visibleFilters, filterValues } = useFilters();
  const isMobile = useIsMobile(768);

  const hiddenActiveFiltersCount = visibleFilters
    .filter((filter) => !mobileBarFilters.some((f) => f.id === filter.id))
    .filter((filter) => {
      const value = getFilterValueById(filter.id, filterValues);
      return isFilterActive(filter.id, value);
    }).length;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {mobileBarFilters.map((filter) => (
        <div key={filter.id} className="flex-shrink-1 min-w-[150px]">
          <FilterItem config={filter} context="bar" />
        </div>
      ))}
      {isMobile && onMoreFiltersClick ? (
        <button
          type="button"
          onClick={onMoreFiltersClick}
          className="relative flex items-center justify-center w-10 h-10 border-2 border-[var(--accent-green)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors flex-shrink-0"
        >
          <FilterIcon className="w-5 h-5 text-[var(--accent-green)]" />
          {hiddenActiveFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-green)] text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
              {hiddenActiveFiltersCount}
            </span>
          )}
        </button>
      ) : (
        <MoreFiltersDropdown />
      )}
    </div>
  );
};
