import {
  FILTERS_CONFIG,
  PropertyType,
  DealType,
  getVisibleFilters,
} from '@/components/filters/filters-config';
import { FilterValues } from './filterUtils';
import { FilterValue } from '@/components/filters/filter-types';
import { isFilterActive } from './countActiveFilters';

export interface CollectedFilter {
  id: string;
  value: FilterValue;
  isActive: boolean;
  applicableTo: PropertyType[];
  label?: string;
  type?: string;
}

export interface CollectFiltersOptions {
  onlyActive?: boolean;
  includeMetadata?: boolean;
  propertyTypes?: PropertyType[];
  dealType?: DealType | null;
  checkVisibility?: boolean;
}

function getFilterValue(filterId: string, filterValues: FilterValues): FilterValue {
  switch (filterId) {
    case 'price':
      return {
        min: filterValues.priceMin,
        max: filterValues.priceMax,
        period: filterValues.pricePeriod,
      };
    case 'area':
      return {
        livingAreaMin: filterValues.livingAreaMin,
        livingAreaMax: filterValues.livingAreaMax,
        totalAreaMin: filterValues.totalAreaMin,
        totalAreaMax: filterValues.totalAreaMax,
      };
    case 'bedsBaths':
      return {
        bedrooms: filterValues.bedrooms,
        bathrooms: filterValues.bathrooms,
        exactMatch: filterValues.exactMatch,
      };
    case 'location':
      return filterValues.location;
    case 'bedrooms':
      return filterValues.bedrooms;
    case 'bathrooms':
      return filterValues.bathrooms;
    case 'rooms':
      return filterValues.rooms;
    case 'parking':
      return filterValues.parking;
    case 'floor':
      return {
        floorLevelMin: filterValues.floorLevelMin,
        floorLevelMax: filterValues.floorLevelMax,
        totalFloorsMin: filterValues.totalFloorsMin,
        totalFloorsMax: filterValues.totalFloorsMax,
      };
    case 'furnished':
      return filterValues.furnished;
    case 'zoningCategory':
      return filterValues.zoningCategory;
    case 'propertyType':
      return filterValues.propertyTypes;
    case 'amenities':
      return filterValues.amenities;
    case 'guests':
      return filterValues.guests;
    case 'building':
      return filterValues.building;
    case 'view':
      return filterValues.view;
    case 'ceiling':
      return {
        min: filterValues.ceilingMin,
        max: filterValues.ceilingMax,
      };
    case 'availability':
      return filterValues.availability;
    case 'specialCondition':
      return filterValues.specialCondition;
    case 'furnishing':
      return filterValues.furnishing;
    case 'layout':
      return filterValues.layout;
    case 'buildingAmenities':
      return filterValues.buildingAmenities;
    case 'safety':
      return filterValues.safety;
    case 'utilities':
      return filterValues.utilities;
    case 'basicSupplies':
      return filterValues.basicSupplies;
    default:
      return undefined;
  }
}

export function collectAllFilters(
  filterValues: FilterValues,
  options: CollectFiltersOptions = {},
): CollectedFilter[] {
  const {
    onlyActive = false,
    includeMetadata = false,
    propertyTypes = [],
    dealType = null,
    checkVisibility = true,
  } = options;

  const collected: CollectedFilter[] = [];

  const allPropertyTypes: PropertyType[] = [
    'apartment',
    'house',
    'villa',
    'office',
    'commercial',
    'land',
  ];

  const locationValue = getFilterValue('location', filterValues);
  const locationActive = isFilterActive('location', locationValue);
  if (!onlyActive || locationActive) {
    collected.push({
      id: 'location',
      value: locationValue,
      isActive: locationActive,
      applicableTo: allPropertyTypes,
      ...(includeMetadata && { label: 'Location', type: 'select' }),
    });
  }

  const visibleFilters = checkVisibility
    ? getVisibleFilters(propertyTypes, dealType)
    : FILTERS_CONFIG;

  for (const config of visibleFilters) {
    const value = getFilterValue(config.id, filterValues);
    const isActive = isFilterActive(config.id, value);

    if (onlyActive && !isActive) {
      continue;
    }

    collected.push({
      id: config.id,
      value,
      isActive,
      applicableTo: config.visibleFor.propertyTypes,
      ...(includeMetadata && { label: config.label, type: config.type }),
    });
  }

  return collected;
}
