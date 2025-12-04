'use client';

import { BaseFilterProps } from './filter-types';
import { BuildingFilter } from './BuildingFilter';

export const BuildingFilterDesktop = (props: BaseFilterProps) => {
  return <BuildingFilter {...props} variant="compact" />;
};

