'use client';

import { BaseFilterProps } from './filter-types';
import { PriceRange } from './PriceRange';

export const PriceRangeMobile = ({ filterId, value, onChange, className }: BaseFilterProps) => {
  return (
    <PriceRange
      filterId={filterId}
      value={value}
      onChange={onChange}
      className={className}
      variant="select"
    />
  );
};
