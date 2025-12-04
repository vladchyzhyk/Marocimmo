'use client';

import { BaseFilterProps } from './filter-types';
import { CeilingFilter } from './CeilingFilter';

export const CeilingFilterMobile = (props: BaseFilterProps) => {
  return <CeilingFilter {...props} variant="select" />;
};

