'use client';

import { BaseFilterProps } from './filter-types';
import { BuildingFilter } from './BuildingFilter';

export const BuildingFilterMobile = (props: BaseFilterProps) => {
  return <BuildingFilter {...props} variant="select" />;
};

