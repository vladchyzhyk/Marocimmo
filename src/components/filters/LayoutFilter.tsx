'use client';

import { BaseFilterProps } from './filter-types';
import { CheckboxGroupFilter } from './CheckboxGroupFilter';

interface LayoutFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  options: { label: string; value: string }[];
}

export const LayoutFilter = ({
  filterId,
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: LayoutFilterProps) => {
  return (
    <CheckboxGroupFilter
      filterId={filterId}
      title="Layout & Style"
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant}
    />
  );
};

