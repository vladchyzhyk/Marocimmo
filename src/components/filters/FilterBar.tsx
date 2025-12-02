'use client';

import { useState, useEffect } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterItem } from './FilterItem';
import { FilterIcon } from '@/utils/icons';
import { isFilterActive } from '@/utils/countActiveFilters';
import { MoreFiltersDropdown } from './MoreFiltersDropdown';

interface FilterBarProps {
  onMoreFiltersClick?: () => void;
  className?: string;
}

export const FilterBar = ({ onMoreFiltersClick, className = '' }: FilterBarProps) => {
  const { mobileBarFilters, visibleFilters, filterValues } = useFilters();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFilterValueById = (filterId: string) => {
    switch (filterId) {
      case 'price':
        return { min: filterValues.priceMin, max: filterValues.priceMax };
      case 'propertyType':
        return filterValues.propertyTypes;
      case 'area':
        return {
          livingAreaMin: filterValues.livingAreaMin,
          livingAreaMax: filterValues.livingAreaMax,
          totalAreaMin: filterValues.totalAreaMin,
          totalAreaMax: filterValues.totalAreaMax,
        };
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
        return {
          floorLevelMin: filterValues.floorLevelMin,
          floorLevelMax: filterValues.floorLevelMax,
          totalFloorsMin: filterValues.totalFloorsMin,
          totalFloorsMax: filterValues.totalFloorsMax,
        };
      case 'furnished':
        return filterValues.furnished;
      case 'zoningCategory':
        return filterValues.zoningCategory;
      case 'location':
        return filterValues.location;
      case 'guests':
        return filterValues.guests;
      case 'building':
        return filterValues.building;
      case 'view':
        return filterValues.view;
      case 'ceiling':
        return { min: filterValues.ceilingMin, max: filterValues.ceilingMax };
      case 'availability':
        return filterValues.availability;
      case 'specialCondition':
        return filterValues.specialCondition;
      case 'furnishing':
        return filterValues.furnishing;
      case 'layout':
        return filterValues.layout;
      case 'buildingAmenities':
        return filterValues.buildingAmenities;
      case 'safety':
        return filterValues.safety;
      case 'utilities':
        return filterValues.utilities;
      case 'basicSupplies':
        return filterValues.basicSupplies;
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
