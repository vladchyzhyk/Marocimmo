import { FilterValue } from '@/components/filters/filter-types';

export function isFilterActive(filterId: string, value: FilterValue): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  switch (filterId) {
    case 'price': {
      const rangeValue = value as { min?: number; max?: number };
      return rangeValue.min !== undefined || rangeValue.max !== undefined;
    }
    case 'area': {
      const areaValue = value as {
        livingAreaMin?: number;
        livingAreaMax?: number;
        totalAreaMin?: number;
        totalAreaMax?: number;
      };
      return (
        areaValue.livingAreaMin !== undefined ||
        areaValue.livingAreaMax !== undefined ||
        areaValue.totalAreaMin !== undefined ||
        areaValue.totalAreaMax !== undefined
      );
    }

    case 'bedsBaths': {
      const bedsBathsValue = value as {
        bedrooms?: number;
        bathrooms?: number;
        exactMatch?: boolean;
      };
      return (
        (bedsBathsValue?.bedrooms !== undefined && bedsBathsValue.bedrooms > 0) ||
        (bedsBathsValue?.bathrooms !== undefined && bedsBathsValue.bathrooms > 0)
      );
    }

    case 'location': {
      const strValue = value as string;
      return strValue !== undefined && strValue !== null && strValue !== '';
    }

    case 'bedrooms':
    case 'bathrooms':
    case 'rooms':
    case 'parking': {
      const numValue = value as number;
      return numValue !== undefined && numValue !== null && numValue > 0;
    }
    case 'floor': {
      const floorValue = value as {
        floorLevelMin?: number;
        floorLevelMax?: number;
        totalFloorsMin?: number;
        totalFloorsMax?: number;
      };
      return (
        floorValue.floorLevelMin !== undefined ||
        floorValue.floorLevelMax !== undefined ||
        floorValue.totalFloorsMin !== undefined ||
        floorValue.totalFloorsMax !== undefined
      );
    }

    case 'furnished': {
      return value === true;
    }

    case 'zoningCategory': {
      const strValue = value as string;
      return strValue !== undefined && strValue !== null && strValue !== '';
    }

    case 'propertyType':
    case 'amenities':
    case 'furnishing':
    case 'layout':
    case 'buildingAmenities':
    case 'safety':
    case 'utilities':
    case 'basicSupplies': {
      const arrValue = value as string[];
      return Array.isArray(arrValue) && arrValue.length > 0;
    }

    case 'guests': {
      const guestsValue = value as {
        maxGuests?: number;
        disabledAccess?: boolean;
        petsAllowed?: boolean;
      };
      return (
        (guestsValue?.maxGuests !== undefined && guestsValue.maxGuests > 0) ||
        guestsValue?.disabledAccess === true ||
        guestsValue?.petsAllowed === true
      );
    }

    case 'building': {
      const buildingValue = value as {
        year?: string;
        condition?: string;
        renovation?: string;
        propertyClass?: string;
      };
      return (
        buildingValue?.year !== undefined ||
        buildingValue?.condition !== undefined ||
        buildingValue?.renovation !== undefined ||
        buildingValue?.propertyClass !== undefined
      );
    }

    case 'view': {
      const strValue = value as string;
      return strValue !== undefined && strValue !== null && strValue !== '' && strValue !== 'any';
    }

    case 'ceiling': {
      const ceilingValue = value as { min?: number; max?: number };
      return ceilingValue.min !== undefined || ceilingValue.max !== undefined;
    }

    case 'availability': {
      const availabilityValue = value as {
        moveInDate?: string;
        showWithoutDate?: boolean;
      };
      return (
        availabilityValue?.moveInDate !== undefined || availabilityValue?.showWithoutDate === true
      );
    }

    case 'specialCondition': {
      const conditionValue = value as {
        disabledAccess?: boolean;
        petsAllowed?: boolean;
        smokingAllowed?: boolean;
        negotiablePrice?: boolean;
        touristLicense?: boolean;
        loti?: boolean;
        titledLand?: boolean;
      };
      return (
        conditionValue?.disabledAccess === true ||
        conditionValue?.petsAllowed === true ||
        conditionValue?.smokingAllowed === true ||
        conditionValue?.negotiablePrice === true ||
        conditionValue?.touristLicense === true ||
        conditionValue?.loti === true ||
        conditionValue?.titledLand === true
      );
    }

    default:
      return false;
  }
}
