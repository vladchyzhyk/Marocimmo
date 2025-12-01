import { FilterValue } from '@/components/filters/filter-types';

export function isFilterActive(filterId: string, value: FilterValue): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  switch (filterId) {
    case 'price':
    case 'area': {
      const rangeValue = value as { min?: number; max?: number };
      return rangeValue.min !== undefined || rangeValue.max !== undefined;
    }

    case 'bedsBaths': {
      const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number };
      return (
        (bedsBathsValue?.bedrooms !== undefined && bedsBathsValue.bedrooms > 0) ||
        (bedsBathsValue?.bathrooms !== undefined && bedsBathsValue.bathrooms > 0)
      );
    }

    case 'bedrooms':
    case 'bathrooms':
    case 'rooms':
    case 'parking':
    case 'floor': {
      const numValue = value as number;
      return numValue !== undefined && numValue !== null && numValue > 0;
    }

    case 'furnished': {
      return value === true;
    }

    case 'zoningCategory': {
      const strValue = value as string;
      return strValue !== undefined && strValue !== null && strValue !== '';
    }

    case 'propertyType':
    case 'amenities': {
      const arrValue = value as string[];
      return Array.isArray(arrValue) && arrValue.length > 0;
    }

    default:
      return false;
  }
}
