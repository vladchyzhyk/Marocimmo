'use client';

import { BaseFilterProps } from './filter-types';
import { AreaFilter } from './AreaFilter';

export const AreaFilterDesktop = (props: BaseFilterProps) => {
  return <AreaFilter {...props} variant="compact" />;
};


