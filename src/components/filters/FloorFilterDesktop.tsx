'use client';

import { BaseFilterProps } from './filter-types';
import { FloorFilter } from './FloorFilter';

export const FloorFilterDesktop = (props: BaseFilterProps) => {
  return <FloorFilter {...props} variant="compact" />;
};

