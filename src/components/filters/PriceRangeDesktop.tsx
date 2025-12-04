'use client';

import { BaseFilterProps } from './filter-types';
import { PriceRange } from './PriceRange';
import { useFilters } from '@/hooks/useFilters';

export const PriceRangeDesktop = ({ filterId, value, onChange, className }: BaseFilterProps) => {
  const { dealType } = useFilters();
  const showPeriodToggle = dealType === 'short-term';

  return (
    <PriceRange
      filterId={filterId}
      value={value}
      onChange={onChange}
      className={className}
      variant="compact"
      showPeriodToggle={showPeriodToggle}
    />
  );
};
