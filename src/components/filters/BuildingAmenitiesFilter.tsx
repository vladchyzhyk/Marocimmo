'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface BuildingAmenitiesFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const BuildingAmenitiesFilter = ({
  filterId,
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: BuildingAmenitiesFilterProps) => {
  return (
    <CheckboxGroupFilter
      filterId={filterId}
      title="Building Amenities"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

