import { FilterValues } from './filterUtils';
import { DealType } from '@/components/filters/filters-config';

export interface MockSavedFilter {
  id: string;
  title: string;
  newCount?: number;
  dealType?: DealType | null;
  filterQuery: FilterValues;
  updatedAt: string;
  propertyCount: number;
}

const hoursAgo = (hours: number) => {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
};

const dayAgo = hoursAgo(24);
const weekAgo = hoursAgo(24 * 7);

export const mockSavedFilters: MockSavedFilter[] = [
  {
    id: '1',
    title: '1123',
    newCount: 1,
    dealType: 'sale',
    filterQuery: {
      propertyTypes: ['Apartment'],
      location: '1',
      priceMin: 100000,
      priceMax: 200000,
    },
    updatedAt: dayAgo,
    propertyCount: 1,
  },
  {
    id: '2',
    title: '1123',
    newCount: 4,
    dealType: 'sale',
    filterQuery: {
      propertyTypes: ['Apartment', 'House', 'Villa'],
      location: '1',
      priceMin: 100000,
      priceMax: 200000,
      bedrooms: 2,
      bathrooms: 1,
      areaMin: 100,
      areaMax: 200,
      floorLevelMin: 1,
      floorLevelMax: 2,
      furnished: true,
      zoningCategory: 'Residential',
      amenities: ['Pool', 'Gym', 'Parking'],
      exactMatch: true,
      guests: {
        maxGuests: 2,
        disabledAccess: false,
        petsAllowed: false,
      },
      building: {
        year: '2020',
        condition: 'Good',
        renovation: 'Renovated',
        propertyClass: 'Class A',
      },
      view: 'Sea View',
      ceilingMin: 2.5,
      ceilingMax: 3.5,
      availability: {
        moveInDate: '2025-01-01',
        showWithoutDate: false,
      },
      specialCondition: {
        disabledAccess: true,
        petsAllowed: false,
        smokingAllowed: false,
      },
    },
    updatedAt: weekAgo,
    propertyCount: 1,
  },
  {
    id: '3',
    title: '1123',
    filterQuery: {
      propertyTypes: ['Apartment'],
      location: '1',
      priceMin: 100000,
      priceMax: 200000,
    },
    updatedAt: hoursAgo(1),
    propertyCount: 1,
  },
  {
    id: '4',
    title: '1123',
    filterQuery: {
      propertyTypes: ['Apartment'],
      location: '1',
      priceMin: 100000,
      priceMax: 200000,
    },
    updatedAt: hoursAgo(2),
    propertyCount: 1,
  },
];
