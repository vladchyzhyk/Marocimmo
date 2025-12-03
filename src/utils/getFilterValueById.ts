import { FilterValues } from './filterUtils';

export function getFilterValueById(filterId: string, filterValues: FilterValues) {
  switch (filterId) {
    case 'price':
      return { min: filterValues.priceMin, max: filterValues.priceMax };
    case 'propertyType':
      return filterValues.propertyTypes;
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
      };
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
    case 'location':
      return filterValues.location;
    case 'guests':
      return filterValues.guests;
    case 'building':
      return filterValues.building;
    case 'view':
      return filterValues.view;
    case 'ceiling':
      return { min: filterValues.ceilingMin, max: filterValues.ceilingMax };
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


