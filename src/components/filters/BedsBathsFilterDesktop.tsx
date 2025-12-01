'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterDesktop = (props: BaseFilterProps) => {
  return <BedsBathsFilter {...props} variant="compact" />;
};
