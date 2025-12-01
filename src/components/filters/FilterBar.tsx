'use client';

import { useFilters } from '@/hooks/useFilters';
import { FilterItem } from './FilterItem';
import { FilterIcon } from '@/utils/icons';
import { isFilterActive } from '@/utils/countActiveFilters';

interface FilterBarProps {
  onMoreFiltersClick?: () => void;
  className?: string;
}

export const FilterBar = ({ onMoreFiltersClick, className = '' }: FilterBarProps) => {
  const { mobileBarFilters, visibleFilters, filterValues, updateFilter } = useFilters();

  const getFilterValueById = (filterId: string) => {
    switch (filterId) {
      case 'price':
        return { min: filterValues.priceMin, max: filterValues.priceMax };
      case 'propertyType':
        return filterValues.propertyTypes;
      case 'area':
        return { min: filterValues.areaMin, max: filterValues.areaMax };
      case 'bedsBaths':
        return {
          bedrooms: filterValues.bedrooms,
          bathrooms: filterValues.bathrooms,
        };
      case 'bedrooms':
        return filterValues.bedrooms;
      case 'bathrooms':
        return filterValues.bathrooms;
      case 'rooms':
        return filterValues.rooms;
      case 'parking':
        return filterValues.parking;
      case 'floor':
        return filterValues.floor;
      case 'furnished':
        return filterValues.furnished;
      case 'zoningCategory':
        return filterValues.zoningCategory;
      case 'location':
        return filterValues.location;
      default:
        return undefined;
    }
  };

  const hiddenActiveFiltersCount = visibleFilters
    .filter((filter) => !mobileBarFilters.some((f) => f.id === filter.id))
    .filter((filter) => {
      const value = getFilterValueById(filter.id);
      return isFilterActive(filter.id, value);
    }).length;

  return (
    <div className={`flex items-center gap-2 overflow-x-auto ${className}`}>
      {mobileBarFilters.map((filter) => (
        <div key={filter.id} className="flex-shrink-0 min-w-[200px]">
          <FilterItem config={filter} context="bar" />
        </div>
      ))}
      {onMoreFiltersClick && (
        <button
          type="button"
          onClick={onMoreFiltersClick}
          className="flex items-center gap-2 px-4 h-10 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors flex-shrink-0"
        >
          <FilterIcon className="w-4 h-4 text-[var(--color-black)]" />
          <span className="text-base leading-[140%] text-[var(--color-black)] whitespace-nowrap">
            More filters
            {hiddenActiveFiltersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[var(--accent-green)] text-white rounded text-xs font-medium">
                {hiddenActiveFiltersCount}
              </span>
            )}
          </span>
        </button>
      )}
    </div>
  );
};
