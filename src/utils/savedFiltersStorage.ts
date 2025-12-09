import { FilterValues } from './filterUtils';
import { SearchParams } from '@/hooks/useSearchParams';
import { DealType, PropertyType } from '@/components/filters/filters-config';

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

export function convertFilterValuesToSearchParams(
  filterValues: FilterValues,
): Partial<SearchParams> {
  const searchParams: Partial<SearchParams> = {};

  if (filterValues.propertyTypes && filterValues.propertyTypes.length > 0) {
    searchParams.propertyTypes = filterValues.propertyTypes as PropertyType[];
  }
  if (filterValues.location) {
    searchParams.locationId = filterValues.location;
  }
  if (filterValues.priceMin !== undefined) {
    searchParams.priceMin = filterValues.priceMin;
  }
  if (filterValues.priceMax !== undefined) {
    searchParams.priceMax = filterValues.priceMax;
  }
  if (filterValues.areaMin !== undefined) {
    searchParams.areaMin = filterValues.areaMin;
  }
  if (filterValues.areaMax !== undefined) {
    searchParams.areaMax = filterValues.areaMax;
  }
  if (filterValues.livingAreaMin !== undefined) {
    searchParams.livingAreaMin = filterValues.livingAreaMin;
  }
  if (filterValues.livingAreaMax !== undefined) {
    searchParams.livingAreaMax = filterValues.livingAreaMax;
  }
  if (filterValues.totalAreaMin !== undefined) {
    searchParams.totalAreaMin = filterValues.totalAreaMin;
  }
  if (filterValues.totalAreaMax !== undefined) {
    searchParams.totalAreaMax = filterValues.totalAreaMax;
  }
  if (filterValues.bedrooms !== undefined) {
    searchParams.bedrooms = filterValues.bedrooms;
  }
  if (filterValues.bathrooms !== undefined) {
    searchParams.bathrooms = filterValues.bathrooms;
  }
  if (filterValues.rooms !== undefined) {
    searchParams.rooms = filterValues.rooms;
  }
  if (filterValues.parking !== undefined) {
    searchParams.parking = filterValues.parking;
  }
  if (filterValues.floorLevelMin !== undefined) {
    searchParams.floorLevelMin = filterValues.floorLevelMin;
  }
  if (filterValues.floorLevelMax !== undefined) {
    searchParams.floorLevelMax = filterValues.floorLevelMax;
  }
  if (filterValues.totalFloorsMin !== undefined) {
    searchParams.totalFloorsMin = filterValues.totalFloorsMin;
  }
  if (filterValues.totalFloorsMax !== undefined) {
    searchParams.totalFloorsMax = filterValues.totalFloorsMax;
  }
  if (filterValues.furnished !== undefined) {
    searchParams.furnished = filterValues.furnished;
  }
  if (filterValues.zoningCategory) {
    searchParams.zoningCategory = filterValues.zoningCategory;
  }
  if (filterValues.amenities && filterValues.amenities.length > 0) {
    searchParams.amenities = filterValues.amenities;
  }
  if (filterValues.exactMatch !== undefined) {
    searchParams.exactMatch = filterValues.exactMatch;
  }
  if (filterValues.guests) {
    searchParams.guests = filterValues.guests;
    if (filterValues.guests.maxGuests !== undefined) {
      searchParams.maxGuests = filterValues.guests.maxGuests;
    }
    if (filterValues.guests.disabledAccess !== undefined) {
      searchParams.guestsDisabledAccess = filterValues.guests.disabledAccess;
    }
    if (filterValues.guests.petsAllowed !== undefined) {
      searchParams.guestsPetsAllowed = filterValues.guests.petsAllowed;
    }
  }
  if (filterValues.building) {
    searchParams.building = filterValues.building;
    if (filterValues.building.year) {
      searchParams.buildingYear = filterValues.building.year;
    }
    if (filterValues.building.condition) {
      searchParams.buildingCondition = filterValues.building.condition;
    }
    if (filterValues.building.renovation) {
      searchParams.buildingRenovation = filterValues.building.renovation;
    }
    if (filterValues.building.propertyClass) {
      searchParams.buildingPropertyClass = filterValues.building.propertyClass;
    }
  }
  if (filterValues.view) {
    searchParams.view = filterValues.view;
  }
  if (filterValues.ceilingMin !== undefined) {
    searchParams.ceilingMin = filterValues.ceilingMin;
  }
  if (filterValues.ceilingMax !== undefined) {
    searchParams.ceilingMax = filterValues.ceilingMax;
  }
  if (filterValues.availability) {
    searchParams.availability = filterValues.availability;
    if (filterValues.availability.moveInDate) {
      searchParams.moveInDate = filterValues.availability.moveInDate;
    }
    if (filterValues.availability.showWithoutDate !== undefined) {
      searchParams.showWithoutDate = filterValues.availability.showWithoutDate;
    }
  }
  if (filterValues.specialCondition) {
    searchParams.specialCondition = filterValues.specialCondition;
    if (filterValues.specialCondition.disabledAccess !== undefined) {
      searchParams.specialDisabledAccess = filterValues.specialCondition.disabledAccess;
    }
    if (filterValues.specialCondition.petsAllowed !== undefined) {
      searchParams.specialPetsAllowed = filterValues.specialCondition.petsAllowed;
    }
    if (filterValues.specialCondition.smokingAllowed !== undefined) {
      searchParams.specialSmokingAllowed = filterValues.specialCondition.smokingAllowed;
    }
    if (filterValues.specialCondition.negotiablePrice !== undefined) {
      searchParams.specialNegotiablePrice = filterValues.specialCondition.negotiablePrice;
    }
    if (filterValues.specialCondition.touristLicense !== undefined) {
      searchParams.specialTouristLicense = filterValues.specialCondition.touristLicense;
    }
    if (filterValues.specialCondition.loti !== undefined) {
      searchParams.specialLoti = filterValues.specialCondition.loti;
    }
    if (filterValues.specialCondition.titledLand !== undefined) {
      searchParams.specialTitledLand = filterValues.specialCondition.titledLand;
    }
  }
  if (filterValues.furnishing && filterValues.furnishing.length > 0) {
    searchParams.furnishing = filterValues.furnishing;
  }
  if (filterValues.layout && filterValues.layout.length > 0) {
    searchParams.layout = filterValues.layout;
  }
  if (filterValues.buildingAmenities && filterValues.buildingAmenities.length > 0) {
    searchParams.buildingAmenities = filterValues.buildingAmenities;
  }
  if (filterValues.safety && filterValues.safety.length > 0) {
    searchParams.safety = filterValues.safety;
  }
  if (filterValues.utilities && filterValues.utilities.length > 0) {
    searchParams.utilities = filterValues.utilities;
  }
  if (filterValues.basicSupplies && filterValues.basicSupplies.length > 0) {
    searchParams.basicSupplies = filterValues.basicSupplies;
  }
  if (filterValues.pricePeriod) {
    searchParams.pricePeriod = filterValues.pricePeriod;
  }

  return searchParams;
}
