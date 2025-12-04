'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterDesktop = ({ value, onChange, className }: BaseFilterProps) => {
  const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number; exactMatch?: boolean } | undefined;
  return <BedsBathsFilter className={className} variant="compact" value={bedsBathsValue} onChange={onChange} />;
};
