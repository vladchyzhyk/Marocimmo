'use client';

import { BaseFilterProps } from './filter-types';
import { ViewFilter } from './ViewFilter';

export const ViewFilterDesktop = (props: BaseFilterProps) => {
  return <ViewFilter {...props} variant="compact" />;
};

