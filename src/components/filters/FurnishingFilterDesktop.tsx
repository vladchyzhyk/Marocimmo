'use client';

import { BaseFilterProps } from './filter-types';
import { FurnishingFilter } from './FurnishingFilter';

const FURNISHING_OPTIONS = [
  { label: 'Furnished', value: 'furnished' },
  { label: 'Equipped kitchen', value: 'equipped-kitchen' },
  { label: 'Fridge', value: 'fridge' },
  { label: 'Stove', value: 'stove' },
  { label: 'Microwave', value: 'microwave' },
  { label: 'Coffee machine', value: 'coffee-machine' },
  { label: 'Shower cabin', value: 'shower-cabin' },
  { label: 'Bathtub', value: 'bathtub' },
  { label: 'Washing machine', value: 'washing-machine' },
  { label: 'Mezzanine floor', value: 'mezzanine' },
];

export const FurnishingFilterDesktop = (props: BaseFilterProps) => {
  return <FurnishingFilter {...props} options={FURNISHING_OPTIONS} variant="compact" />;
};

