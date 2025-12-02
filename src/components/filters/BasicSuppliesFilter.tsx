'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface BasicSuppliesFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const BasicSuppliesFilter = ({
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: BasicSuppliesFilterProps) => {
  return (
    <CheckboxGroupFilter
      title="Basic Supplies & Extras"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

