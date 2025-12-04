'use client';

import { BaseFilterProps } from './filter-types';
import { UtilitiesFilter } from './UtilitiesFilter';

const UTILITIES_OPTIONS = [
  { label: 'Water system', value: 'water-system' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Drainage', value: 'drainage' },
  { label: 'Gas', value: 'gas' },
];

export const UtilitiesFilterMobile = (props: BaseFilterProps) => {
  return <UtilitiesFilter {...props} options={UTILITIES_OPTIONS} variant="select" />;
};

