'use client';

import { BaseFilterProps } from './filter-types';
import { AreaFilter } from './AreaFilter';

export const AreaFilterMobile = (props: BaseFilterProps) => {
  return <AreaFilter {...props} variant="select" />;
};


