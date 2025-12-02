'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface FurnishingFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const FurnishingFilter = ({
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: FurnishingFilterProps) => {
  return (
    <CheckboxGroupFilter
      title="Furnishing & Essentials"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

