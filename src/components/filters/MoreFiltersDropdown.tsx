'use client';

import { useState, useEffect } from 'react';
import { FilterDropdown } from './FilterDropdown';
import { FilterItem } from './FilterItem';
import { useFilters } from '@/hooks/useFilters';
import { ArrowDownIcon } from '@/utils/icons';
import { isFilterActive } from '@/utils/countActiveFilters';
import Image from 'next/image';

interface MoreFiltersDropdownProps {
  className?: string;
}

export const MoreFiltersDropdown = ({ className = '' }: MoreFiltersDropdownProps) => {
  const { popupFilters, mobileBarFilters, visibleFilters, filterValues, clearAllFilters } = useFilters();
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

  if (isMobile) {
    return null;
  }

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 px-4 h-10 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors flex-shrink-0"
    >
      <span className="text-base leading-[140%] text-[var(--color-black)] whitespace-nowrap">
        More
      </span>
      <Image
        src="/icons/ic_arrow_down.svg"
        alt="More"
        width={20}
        height={20}
        className="transition-transform"
      />
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

