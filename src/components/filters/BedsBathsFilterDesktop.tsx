'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterDesktop = ({ className }: BaseFilterProps) => {
  return <BedsBathsFilter className={className} variant="compact" />;
};
