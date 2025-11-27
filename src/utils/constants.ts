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

export const LOCATION_SEARCH_OPTIONS = [
  { id: '1', street: 'Casablanca-Settat', city: 'region', region: 'Casablanca-Settat' },
  { id: '2', street: 'Casablanca', city: 'Casablanca-Settat', region: 'Casablanca-Settat' },
  { id: '3', street: 'Rabat-Salé-Kénitra', city: 'region', region: 'Rabat-Salé-Kénitra' },
  { id: '4', street: 'Rabat', city: 'Rabat-Salé-Kénitra', region: 'Rabat-Salé-Kénitra' },
  { id: '5', street: 'Marrakech-Safi', city: 'region', region: 'Marrakech-Safi' },
  { id: '6', street: 'Marrakech', city: 'Marrakech-Safi', region: 'Marrakech-Safi' },
  {
    id: '7',
    street: 'Tanger-Tetouan-Al Hoceima',
    city: 'region',
    region: 'Tanger-Tetouan-Al Hoceima',
  },
  {
    id: '8',
    street: 'Tangier',
    city: 'Tanger-Tetouan-Al Hoceima',
    region: 'Tanger-Tetouan-Al Hoceima',
  },
  { id: '9', street: 'Casabarata', city: 'Tanger', region: 'Tanger-Tetouan-Al Hoceima' },
  { id: '10', street: 'Castilla', city: 'Tanger', region: 'Tanger-Tetouan-Al Hoceima' },
  { id: '11', street: 'Avenue Mohammed V', city: 'Casablanca', region: 'Casablanca-Settat' },
  { id: '12', street: 'Boulevard Zerktouni', city: 'Casablanca', region: 'Casablanca-Settat' },
  { id: '13', street: 'Avenue Allal Ben Abdellah', city: 'Rabat', region: 'Rabat-Salé-Kénitra' },
  { id: '14', street: 'Boulevard Mohammed VI', city: 'Rabat', region: 'Rabat-Salé-Kénitra' },
  { id: '15', street: 'Avenue Mohammed VI', city: 'Marrakech', region: 'Marrakech-Safi' },
  { id: '16', street: 'Rue de la Koutoubia', city: 'Marrakech', region: 'Marrakech-Safi' },
  { id: '17', street: 'Boulevard Pasteur', city: 'Tangier', region: 'Tanger-Tetouan-Al Hoceima' },
  { id: '18', street: "Avenue d'Espagne", city: 'Tangier', region: 'Tanger-Tetouan-Al Hoceima' },
  { id: '19', street: 'Fez-Meknes', city: 'region', region: 'Fez-Meknes' },
  { id: '20', street: 'Fez', city: 'Fez-Meknes', region: 'Fez-Meknes' },
  { id: '21', street: 'Souss-Massa', city: 'region', region: 'Souss-Massa' },
  { id: '22', street: 'Agadir', city: 'Souss-Massa', region: 'Souss-Massa' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Office', value: 'office' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Land', value: 'land' },
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

export const POPULAR_CITIES = [
  {
    id: 'casablanca',
    name: 'Casablanca',
    region: 'Grand Casablanca',
    image: '/images/Casablanca.svg',
  },
  {
    id: 'marrakesh',
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    image: '/images/Marrakech.svg',
  },
  {
    id: 'rabat',
    name: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    image: '/images/Rabat.svg',
  },
  {
    id: 'tangier',
    name: 'Tangier',
    region: 'Tanger-Tétouan-Al Hoceïma',
    image: '/images/Tangier.svg',
  },
  {
    id: 'agadir',
    name: 'Agadir',
    region: 'Souss-Massa',
    image: '/images/Agadir.svg',
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    region: 'Grand Casablanca',
    image: '/images/Casablanca.svg',
  },
  {
    id: 'marrakesh',
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    image: '/images/Marrakech.svg',
  },
  {
    id: 'rabat',
    name: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    image: '/images/Rabat.svg',
  },
  {
    id: 'tangier',
    name: 'Tangier',
    region: 'Tanger-Tétouan-Al Hoceïma',
    image: '/images/Tangier.svg',
  },
  {
    id: 'agadir',
    name: 'Agadir',
    region: 'Souss-Massa',
    image: '/images/Agadir.svg',
  },
];
