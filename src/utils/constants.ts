import { PopularSearchCard } from '@/types/types';

export const LOCATION_OPTIONS = [
  { label: 'Casablanca', value: 'casablanca' },
  { label: 'Tangier', value: 'tangier' },
  { label: 'Fez', value: 'fez' },
  { label: 'Marrakesh', value: 'marrakesh' },
  { label: 'Salé', value: 'sale' },
  { label: 'Meknes', value: 'meknes' },
  { label: 'Rabat', value: 'rabat' },
  { label: 'Oujda', value: 'oujda' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Office', value: 'office' },
  { label: 'Land', value: 'land' },
  { label: 'Commercial', value: 'commercial' },
];

export const DEAL_TYPE_OPTIONS = [
  { label: 'Buy', value: 'sale' },
  { label: 'Long-time Rent', value: 'long-term' },
  { label: 'Short-time Rent', value: 'short-term' },
];

export const POPULAR_SEARCH_CARDS: PopularSearchCard[] = [
  { id: 'buy-apartment', label: 'Buy Apartment', image: '/images/apartment1.svg' },
  { id: 'buy-house', label: 'Buy House', image: '/images/house1.svg' },
  { id: 'buy-land', label: 'Buy Land', image: '/images/land.svg' },
  { id: 'rent-apartment', label: 'Rent Apartment', image: '/images/apartment2.svg' },
  { id: 'rent-house', label: 'Rent House', image: '/images/house2.svg' },
  { id: 'rent-office', label: 'Rent Office', image: '/images/office.svg' },
];

export const GRID_AREA_CLASSES = [
  'row-[1_/_2] col-[1_/_2] lg:row-[1_/_3] lg:col-[1_/_2]',
  'row-[2_/_3] col-[1_/_2] lg:row-[1_/_2] lg:col-[2_/_3]',
  'row-[3_/_4] col-[1_/_2] lg:row-[2_/_3] lg:col-[2_/_3]',
  'row-[1_/_2] col-[2_/_3] lg:row-[1_/_3] lg:col-[3_/_4]',
  'row-[2_/_3] col-[2_/_3] lg:row-[1_/_2] lg:col-[4_/_5]',
  'row-[3_/_4] col-[2_/_3] lg:row-[2_/_3] lg:col-[4_/_5]',
];
