'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterMobile = ({ value, onChange, className }: BaseFilterProps) => {
  const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number; exactMatch?: boolean } | undefined;
  return <BedsBathsFilter className={className} variant="select" value={bedsBathsValue} onChange={onChange} />;
};
