'use client';

import { BaseFilterProps } from './filter-types';
import { BedsBathsFilter } from './BedsBathsFilter';

export const BedsBathsFilterMobile = (props: BaseFilterProps) => {
  return <BedsBathsFilter {...props} variant="select" />;
};
