'use client';

import { BaseFilterProps } from './filter-types';
import { AmenitiesFilter } from './AmenitiesFilter';

const AMENITIES_OPTIONS = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'TV', value: 'tv' },
  { label: 'Satellite TV', value: 'satellite-tv' },
  { label: 'Fiber optic cable', value: 'fiber-optic' },
  { label: 'Telephone wiring', value: 'telephone' },
  { label: 'Air conditioning', value: 'air-conditioning' },
  { label: 'Hot water', value: 'hot-water' },
  { label: 'Heating', value: 'heating' },
];

export const AmenitiesFilterDesktop = (props: BaseFilterProps) => {
  return <AmenitiesFilter {...props} options={AMENITIES_OPTIONS} variant="compact" />;
};

