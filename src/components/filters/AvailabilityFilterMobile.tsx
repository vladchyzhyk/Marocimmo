'use client';

import { BaseFilterProps } from './filter-types';
import { AvailabilityFilter } from './AvailabilityFilter';

export const AvailabilityFilterMobile = (props: BaseFilterProps) => {
  return <AvailabilityFilter {...props} variant="select" />;
};

