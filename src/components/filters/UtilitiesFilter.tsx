'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface UtilitiesFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const UtilitiesFilter = ({
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: UtilitiesFilterProps) => {
  return (
    <CheckboxGroupFilter
      title="Utilities available"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

