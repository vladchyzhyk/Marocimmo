'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterMobile = ({ className }: BaseFilterProps) => {
  return <BedsBathsFilter className={className} variant="select" />;
};
