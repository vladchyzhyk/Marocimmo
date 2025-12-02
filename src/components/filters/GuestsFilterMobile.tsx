'use client';

import { BaseFilterProps } from './filter-types';
import { GuestsFilter } from './GuestsFilter';

export const GuestsFilterMobile = (props: BaseFilterProps) => {
  return <GuestsFilter {...props} variant="select" />;
};

