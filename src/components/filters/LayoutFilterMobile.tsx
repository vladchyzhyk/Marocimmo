'use client';

import { BaseFilterProps } from './filter-types';
import { LayoutFilter } from './LayoutFilter';

const LAYOUT_OPTIONS = [
  { label: 'Moroccan lounge', value: 'moroccan-lounge' },
  { label: 'European lounge', value: 'european-lounge' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Balcony', value: 'balcony' },
  { label: 'Terrace', value: 'terrace' },
];

export const LayoutFilterMobile = (props: BaseFilterProps) => {
  return <LayoutFilter {...props} options={LAYOUT_OPTIONS} variant="select" />;
};

