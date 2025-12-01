'use client';

import { BaseFilterProps } from './filter-types';
import { PropertyTypeFilter } from './PropertyTypeFilter';

export const PropertyTypeFilterMobile = (props: BaseFilterProps) => {
  return <PropertyTypeFilter {...props} variant="select" />;
};

