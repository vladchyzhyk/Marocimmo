'use client';

import { BaseFilterProps } from './filter-types';
import { BasicSuppliesFilter } from './BasicSuppliesFilter';

const BASIC_SUPPLIES_OPTIONS = [
  { label: 'Towels', value: 'towels' },
  { label: 'Toiletries', value: 'toiletries' },
  { label: "Children's equipment", value: 'children-equipment' },
  { label: 'Iron', value: 'iron' },
  { label: 'Hair dryer', value: 'hair-dryer' },
];

export const BasicSuppliesFilterMobile = (props: BaseFilterProps) => {
  return <BasicSuppliesFilter {...props} options={BASIC_SUPPLIES_OPTIONS} variant="select" />;
};

