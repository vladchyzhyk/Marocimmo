'use client';

import { BaseFilterProps } from './filter-types';
import { CeilingFilter } from './CeilingFilter';

export const CeilingFilterDesktop = (props: BaseFilterProps) => {
  return <CeilingFilter {...props} variant="compact" />;
};

