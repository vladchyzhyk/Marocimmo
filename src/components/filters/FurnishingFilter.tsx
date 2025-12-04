'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface FurnishingFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const FurnishingFilter = ({
  filterId,
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: FurnishingFilterProps) => {
  return (
    <CheckboxGroupFilter
      filterId={filterId}
      title="Furnishing & Essentials"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

