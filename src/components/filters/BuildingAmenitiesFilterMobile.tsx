'use client';

import { BaseFilterProps } from './filter-types';
import { BuildingAmenitiesFilter } from './BuildingAmenitiesFilter';

const BUILDING_AMENITIES_OPTIONS = [
  { label: 'Parking', value: 'parking' },
  { label: 'Elevator', value: 'elevator' },
  { label: 'Swimming pool', value: 'swimming-pool' },
  { label: 'Gym', value: 'gym' },
  { label: 'Storage room', value: 'storage-room' },
  { label: 'Concierge', value: 'concierge' },
  { label: 'Garden', value: 'garden' },
  { label: 'Fireplace', value: 'fireplace' },
  { label: 'Grill zone', value: 'grill-zone' },
];

export const BuildingAmenitiesFilterMobile = (props: BaseFilterProps) => {
  return <BuildingAmenitiesFilter {...props} options={BUILDING_AMENITIES_OPTIONS} variant="select" />;
};

