'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface AmenitiesFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const AmenitiesFilter = ({
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: AmenitiesFilterProps) => {
  return (
    <CheckboxGroupFilter
      title="Amenities"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

