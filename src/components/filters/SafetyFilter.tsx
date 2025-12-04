'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface SafetyFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const SafetyFilter = ({
  filterId,
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: SafetyFilterProps) => {
  return (
    <CheckboxGroupFilter
      filterId={filterId}
      title="Safety & Security"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

