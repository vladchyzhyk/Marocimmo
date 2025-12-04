'use client';

import { BaseFilterProps } from './filter-types';
import { GuestsFilter } from './GuestsFilter';

export const GuestsFilterDesktop = (props: BaseFilterProps) => {
  return <GuestsFilter {...props} variant="compact" />;
};

