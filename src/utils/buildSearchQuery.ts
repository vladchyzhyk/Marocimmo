import { FilterValues } from './filterUtils';
import { PropertyType, DealType } from '@/components/filters/filters-config';

export interface SearchQuery {
  dealType: DealType;
  propertyTypes: PropertyType[];
  locationId?: string;
  price?: {
    min?: number;
    max?: number;
  };
  area?: {
    min?: number;
    max?: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  parking?: number;
  floor?: number;
  furnished?: boolean;
  zoningCategory?: string;
  amenities?: string[];
}

export function buildSearchQuery(
  dealType: DealType | null,
  propertyTypes: PropertyType[],
  locationId: string | null,
  filters: FilterValues,
): SearchQuery | null {
  if (!dealType) return null;

  const query: SearchQuery = {
    dealType,
    propertyTypes: propertyTypes.length > 0 ? propertyTypes : [],
  };

  if (locationId) {
    query.locationId = locationId;
  }

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    query.price = {
      ...(filters.priceMin !== undefined && { min: filters.priceMin }),
      ...(filters.priceMax !== undefined && { max: filters.priceMax }),
    };
  }

  if (filters.areaMin !== undefined || filters.areaMax !== undefined) {
    query.area = {
      ...(filters.areaMin !== undefined && { min: filters.areaMin }),
      ...(filters.areaMax !== undefined && { max: filters.areaMax }),
    };
  }

  if (filters.bedrooms !== undefined) {
    query.bedrooms = filters.bedrooms;
  }

  if (filters.bathrooms !== undefined) {
    query.bathrooms = filters.bathrooms;
  }

  if (filters.rooms !== undefined) {
    query.rooms = filters.rooms;
  }

  if (filters.parking !== undefined) {
    query.parking = filters.parking;
  }

  if (filters.floor !== undefined) {
    query.floor = filters.floor;
  }

  if (filters.furnished !== undefined && (dealType === 'long-term' || dealType === 'short-term')) {
    query.furnished = filters.furnished;
  }

  if (filters.zoningCategory !== undefined) {
    query.zoningCategory = filters.zoningCategory;
  }

  if (filters.amenities && filters.amenities.length > 0) {
    query.amenities = filters.amenities;
  }

  return query;
}
