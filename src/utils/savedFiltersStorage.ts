import { FilterValues } from './filterUtils';
import { SearchParams } from '@/hooks/useSearchParams';
import { DealType } from '@/components/filters/filters-config';

export interface SavedFilter {
  id: string;
  title: string;
  newCount?: number;
  dealType: DealType | null;
  filterQuery: FilterValues;
  updatedAt: string;
  propertyCount: number;
}

const STORAGE_KEY = 'savedFilters';

function convertSearchParamsToFilterValues(searchParams: SearchParams): FilterValues {
  const filterValues: FilterValues = {};

  if (searchParams.propertyTypes && searchParams.propertyTypes.length > 0) {
    filterValues.propertyTypes = searchParams.propertyTypes;
  }
  if (searchParams.locationId) {
    filterValues.location = searchParams.locationId;
  }
  if (searchParams.priceMin !== undefined) {
    filterValues.priceMin = searchParams.priceMin;
  }
  if (searchParams.priceMax !== undefined) {
    filterValues.priceMax = searchParams.priceMax;
  }
  if (searchParams.areaMin !== undefined) {
    filterValues.areaMin = searchParams.areaMin;
  }
  if (searchParams.areaMax !== undefined) {
    filterValues.areaMax = searchParams.areaMax;
  }
  if (searchParams.livingAreaMin !== undefined) {
    filterValues.livingAreaMin = searchParams.livingAreaMin;
  }
  if (searchParams.livingAreaMax !== undefined) {
    filterValues.livingAreaMax = searchParams.livingAreaMax;
  }
  if (searchParams.totalAreaMin !== undefined) {
    filterValues.totalAreaMin = searchParams.totalAreaMin;
  }
  if (searchParams.totalAreaMax !== undefined) {
    filterValues.totalAreaMax = searchParams.totalAreaMax;
  }
  if (searchParams.bedrooms !== undefined) {
    filterValues.bedrooms = searchParams.bedrooms;
  }
  if (searchParams.bathrooms !== undefined) {
    filterValues.bathrooms = searchParams.bathrooms;
  }
  if (searchParams.rooms !== undefined) {
    filterValues.rooms = searchParams.rooms;
  }
  if (searchParams.parking !== undefined) {
    filterValues.parking = searchParams.parking;
  }
  if (searchParams.floorLevelMin !== undefined) {
    filterValues.floorLevelMin = searchParams.floorLevelMin;
  }
  if (searchParams.floorLevelMax !== undefined) {
    filterValues.floorLevelMax = searchParams.floorLevelMax;
  }
  if (searchParams.totalFloorsMin !== undefined) {
    filterValues.totalFloorsMin = searchParams.totalFloorsMin;
  }
  if (searchParams.totalFloorsMax !== undefined) {
    filterValues.totalFloorsMax = searchParams.totalFloorsMax;
  }
  if (searchParams.furnished !== undefined) {
    filterValues.furnished = searchParams.furnished;
  }
  if (searchParams.zoningCategory) {
    filterValues.zoningCategory = searchParams.zoningCategory;
  }
  if (searchParams.amenities && searchParams.amenities.length > 0) {
    filterValues.amenities = searchParams.amenities;
  }
  if (searchParams.exactMatch !== undefined) {
    filterValues.exactMatch = searchParams.exactMatch;
  }
  if (searchParams.guests) {
    filterValues.guests = searchParams.guests;
  }
  if (searchParams.building) {
    filterValues.building = searchParams.building;
  }
  if (searchParams.view) {
    filterValues.view = searchParams.view;
  }
  if (searchParams.ceilingMin !== undefined) {
    filterValues.ceilingMin = searchParams.ceilingMin;
  }
  if (searchParams.ceilingMax !== undefined) {
    filterValues.ceilingMax = searchParams.ceilingMax;
  }
  if (searchParams.availability) {
    filterValues.availability = searchParams.availability;
  }
  if (searchParams.specialCondition) {
    filterValues.specialCondition = searchParams.specialCondition;
  }
  if (searchParams.furnishing && searchParams.furnishing.length > 0) {
    filterValues.furnishing = searchParams.furnishing;
  }
  if (searchParams.layout && searchParams.layout.length > 0) {
    filterValues.layout = searchParams.layout;
  }
  if (searchParams.buildingAmenities && searchParams.buildingAmenities.length > 0) {
    filterValues.buildingAmenities = searchParams.buildingAmenities;
  }
  if (searchParams.safety && searchParams.safety.length > 0) {
    filterValues.safety = searchParams.safety;
  }
  if (searchParams.utilities && searchParams.utilities.length > 0) {
    filterValues.utilities = searchParams.utilities;
  }
  if (searchParams.basicSupplies && searchParams.basicSupplies.length > 0) {
    filterValues.basicSupplies = searchParams.basicSupplies;
  }
  if (searchParams.pricePeriod) {
    filterValues.pricePeriod = searchParams.pricePeriod;
  }

  return filterValues;
}

export function getSavedFilters(): SavedFilter[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as SavedFilter[];
  } catch (error) {
    console.error('Error reading saved filters from localStorage:', error);
    return [];
  }
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function saveFilterToStorage(
  title: string,
  searchParams: SearchParams,
  propertyCount: number = 0,
): SavedFilter {
  const savedFilters = getSavedFilters();
  const filterQuery = convertSearchParamsToFilterValues(searchParams);

  const newFilter: SavedFilter = {
    id: generateId(),
    title,
    dealType: searchParams.dealType || null,
    filterQuery,
    updatedAt: new Date().toISOString(),
    propertyCount,
  };

  savedFilters.push(newFilter);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters));
  } catch (error) {
    console.error('Error saving filter to localStorage:', error);
    throw error;
  }

  return newFilter;
}

export function deleteFilterFromStorage(filterId: string): void {
  const savedFilters = getSavedFilters();
  const filtered = savedFilters.filter((filter) => filter.id !== filterId);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting filter from localStorage:', error);
    throw error;
  }
}

export function updateFilterInStorage(filterId: string, updates: Partial<SavedFilter>): void {
  const savedFilters = getSavedFilters();
  const index = savedFilters.findIndex((filter) => filter.id === filterId);
  
  if (index === -1) {
    throw new Error(`Filter with id ${filterId} not found`);
  }

  savedFilters[index] = {
    ...savedFilters[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters));
  } catch (error) {
    console.error('Error updating filter in localStorage:', error);
    throw error;
  }
}

