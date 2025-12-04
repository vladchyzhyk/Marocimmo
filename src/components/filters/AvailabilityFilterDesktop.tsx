'use client';

import { BaseFilterProps } from './filter-types';
import { AvailabilityFilter } from './AvailabilityFilter';

export const AvailabilityFilterDesktop = (props: BaseFilterProps) => {
  return <AvailabilityFilter {...props} variant="compact" />;
};

