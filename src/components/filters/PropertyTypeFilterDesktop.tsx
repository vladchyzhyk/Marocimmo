'use client';

import { BaseFilterProps } from './filter-types';
import { PropertyTypeFilter } from './PropertyTypeFilter';

export const PropertyTypeFilterDesktop = (props: BaseFilterProps) => {
  return <PropertyTypeFilter {...props} variant="compact" />;
};

