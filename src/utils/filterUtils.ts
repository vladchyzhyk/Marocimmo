import { PropertyType, DealType } from '@/components/filters/filters-config';

export interface FilterValues {
  propertyTypes?: string[];
  location?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  livingAreaMin?: number;
  livingAreaMax?: number;
  totalAreaMin?: number;
  totalAreaMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  parking?: number;
  floorLevelMin?: number;
  floorLevelMax?: number;
  totalFloorsMin?: number;
  totalFloorsMax?: number;
  furnished?: boolean;
  zoningCategory?: string;
  amenities?: string[];
}

export function resetDependentFilters(
  propertyTypes: PropertyType[],
  dealType: DealType | null,
  currentFilters: FilterValues,
): FilterValues {
  const resetFilters = { ...currentFilters };

  if (!dealType || dealType === 'sale') {
    resetFilters.furnished = undefined;
  }

  if (
    !propertyTypes.includes('apartment') &&
    !propertyTypes.includes('house') &&
    !propertyTypes.includes('villa')
  ) {
    resetFilters.bedrooms = undefined;
  }

  if (!propertyTypes.includes('office')) {
    resetFilters.rooms = undefined;
  }

  if (!propertyTypes.includes('office') && !propertyTypes.includes('commercial')) {
    resetFilters.parking = undefined;
  }

  if (!propertyTypes.includes('apartment') && !propertyTypes.includes('office')) {
    resetFilters.floorLevelMin = undefined;
    resetFilters.floorLevelMax = undefined;
    resetFilters.totalFloorsMin = undefined;
    resetFilters.totalFloorsMax = undefined;
  }

  if (!propertyTypes.includes('land')) {
    resetFilters.zoningCategory = undefined;
  }

  return resetFilters;
}

export function validateFilterRange(min?: number, max?: number): boolean {
  if (min === undefined || max === undefined) return true;
  return min <= max;
}

export function formatFilterValue(value: number | undefined, unit?: string): string {
  if (value === undefined) return '';
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}
