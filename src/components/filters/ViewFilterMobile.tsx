'use client';

import { BaseFilterProps } from './filter-types';
import { ViewFilter } from './ViewFilter';

export const ViewFilterMobile = (props: BaseFilterProps) => {
  return <ViewFilter {...props} variant="select" />;
};

