'use client';

import { BaseFilterProps } from './filter-types';
import { FloorFilter } from './FloorFilter';

export const FloorFilterMobile = (props: BaseFilterProps) => {
  return <FloorFilter {...props} variant="select" />;
};
