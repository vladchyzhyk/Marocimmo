import { FilterConfig } from '@/components/filters/filters-config';
import { FilterValue } from '@/components/filters/filter-types';
import { CollectedFilter } from './collectFilters';
import { formatFilterValue as formatNumberValue } from './filterUtils';

export interface FilterTipItem {
  filterId: string;
  text: string;
  onClear?: () => void;
}

export interface FilterHandlers {
  updateFilter?: (id: string, value: unknown) => void;
  clearFilterItem?: (id: string, value: string) => void;
  clearFilterField?: (id: string, key: string) => void;
}

export const generateFilterTips = (
  activeFilters: CollectedFilter[],
  filtersConfig: FilterConfig[],
  handlers: FilterHandlers = {}
): FilterTipItem[] => {
  const { updateFilter, clearFilterItem, clearFilterField } = handlers;

  const getFilterConfig = (filterId: string) => {
    return filtersConfig.find((config) => config.id === filterId);
  };

  const getOptionLabel = (filterId: string, value: string): string => {
    const config = getFilterConfig(filterId);
    if (config?.options) {
      const option = config.options.find((opt) => opt.value === value);
      return option?.label || value;
    }
    return value;
  };

  const formatFilterValue = (filterId: string, value: FilterValue): string[] => {
    if (value === undefined || value === null) {
      return [];
    }

    switch (filterId) {
      case 'location': {
        if (typeof value === 'string' && value.trim().length > 0) {
          return [value];
        }
        return [];
      }

      case 'propertyType': {
        if (Array.isArray(value) && value.length > 0) {
          return value.map((v) => getOptionLabel(filterId, v));
        }
        return [];
      }

      case 'amenities':
      case 'furnishing':
      case 'layout':
      case 'buildingAmenities':
      case 'safety':
      case 'utilities':
      case 'basicSupplies': {
        if (Array.isArray(value) && value.length > 0) {
          return value.map((v) => getOptionLabel(filterId, v));
        }
        return [];
      }

      case 'price': {
        const priceValue = value as {
          min?: number;
          max?: number;
          period?: 'per-day' | 'per-month';
        };
        const parts: string[] = [];
        if (priceValue.min !== undefined) {
          parts.push(`From ${formatNumberValue(priceValue.min, 'DH')}`);
        }
        if (priceValue.max !== undefined) {
          parts.push(`Up to ${formatNumberValue(priceValue.max, 'DH')}`);
        }
        if (priceValue.min !== undefined && priceValue.max !== undefined) {
          return [
            `${formatNumberValue(priceValue.min, 'DH')} - ${formatNumberValue(priceValue.max, 'DH')}`,
          ];
        }
        return parts;
      }

      case 'area': {
        const areaValue = value as {
          livingAreaMin?: number;
          livingAreaMax?: number;
          totalAreaMin?: number;
          totalAreaMax?: number;
        };
        const parts: string[] = [];
        if (areaValue.livingAreaMin !== undefined && areaValue.livingAreaMax !== undefined) {
          parts.push(`Living: ${areaValue.livingAreaMin}-${areaValue.livingAreaMax} m²`);
        } else if (areaValue.livingAreaMin !== undefined) {
          parts.push(`Living: From ${areaValue.livingAreaMin} m²`);
        } else if (areaValue.livingAreaMax !== undefined) {
          parts.push(`Living: Up to ${areaValue.livingAreaMax} m²`);
        }
        if (areaValue.totalAreaMin !== undefined && areaValue.totalAreaMax !== undefined) {
          parts.push(`Total: ${areaValue.totalAreaMin}-${areaValue.totalAreaMax} m²`);
        } else if (areaValue.totalAreaMin !== undefined) {
          parts.push(`Total: From ${areaValue.totalAreaMin} m²`);
        } else if (areaValue.totalAreaMax !== undefined) {
          parts.push(`Total: Up to ${areaValue.totalAreaMax} m²`);
        }
        return parts;
      }

      case 'ceiling': {
        const ceilingValue = value as { min?: number; max?: number };
        if (ceilingValue.min !== undefined && ceilingValue.max !== undefined) {
          return [`${ceilingValue.min} - ${ceilingValue.max} m`];
        }
        if (ceilingValue.min !== undefined) {
          return [`From ${ceilingValue.min} m`];
        }
        if (ceilingValue.max !== undefined) {
          return [`Up to ${ceilingValue.max} m`];
        }
        return [];
      }

      case 'bedrooms':
      case 'bathrooms':
      case 'rooms':
      case 'parking': {
        if (typeof value === 'number' && value > 0) {
          return [value.toString()];
        }
        return [];
      }

      case 'bedsBaths': {
        const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number };
        const parts: string[] = [];
        if (bedsBathsValue.bedrooms !== undefined && bedsBathsValue.bedrooms > 0) {
          parts.push(`${bedsBathsValue.bedrooms} Room${bedsBathsValue.bedrooms > 1 ? 's' : ''}`);
        }
        if (bedsBathsValue.bathrooms !== undefined && bedsBathsValue.bathrooms > 0) {
          parts.push(
            `${bedsBathsValue.bathrooms} Bath${bedsBathsValue.bathrooms > 1 ? 's' : ''}`,
          );
        }
        return parts;
      }

      case 'floor': {
        const floorValue = value as {
          floorLevelMin?: number;
          floorLevelMax?: number;
          totalFloorsMin?: number;
          totalFloorsMax?: number;
        };
        const parts: string[] = [];
        if (floorValue.floorLevelMin !== undefined && floorValue.floorLevelMax !== undefined) {
          parts.push(`Floor: ${floorValue.floorLevelMin}-${floorValue.floorLevelMax}`);
        } else if (floorValue.floorLevelMin !== undefined) {
          parts.push(`Floor: From ${floorValue.floorLevelMin}`);
        } else if (floorValue.floorLevelMax !== undefined) {
          parts.push(`Floor: Up to ${floorValue.floorLevelMax}`);
        }
        if (floorValue.totalFloorsMin !== undefined && floorValue.totalFloorsMax !== undefined) {
          parts.push(`Total: ${floorValue.totalFloorsMin}-${floorValue.totalFloorsMax}`);
        } else if (floorValue.totalFloorsMin !== undefined) {
          parts.push(`Total: From ${floorValue.totalFloorsMin}`);
        } else if (floorValue.totalFloorsMax !== undefined) {
          parts.push(`Total: Up to ${floorValue.totalFloorsMax}`);
        }
        return parts;
      }

      case 'furnished': {
        if (value === true) {
          return ['Furnished'];
        }
        return [];
      }

      case 'zoningCategory':
      case 'view': {
        if (typeof value === 'string' && value.trim().length > 0) {
          return [getOptionLabel(filterId, value)];
        }
        return [];
      }

      case 'building': {
        const buildingValue = value as {
          year?: string;
          condition?: string;
          renovation?: string;
          propertyClass?: string;
        };
        const parts: string[] = [];
        if (buildingValue.year && buildingValue.year !== 'any') {
          parts.push(`Year: ${buildingValue.year}`);
        }
        if (buildingValue.condition && buildingValue.condition !== 'any') {
          parts.push(`Condition: ${getOptionLabel('building', buildingValue.condition)}`);
        }
        if (buildingValue.renovation && buildingValue.renovation !== 'any') {
          parts.push(`Renovation: ${getOptionLabel('building', buildingValue.renovation)}`);
        }
        if (buildingValue.propertyClass && buildingValue.propertyClass !== 'any') {
          parts.push(`Class: ${getOptionLabel('building', buildingValue.propertyClass)}`);
        }
        return parts;
      }

      case 'guests': {
        const guestsValue = value as {
          maxGuests?: number;
          disabledAccess?: boolean;
          petsAllowed?: boolean;
        };
        const parts: string[] = [];
        if (guestsValue.maxGuests !== undefined && guestsValue.maxGuests > 0) {
          parts.push(`${guestsValue.maxGuests} Guests`);
        }
        if (guestsValue.disabledAccess) {
          parts.push('Disabled Access');
        }
        if (guestsValue.petsAllowed) {
          parts.push('Pets Allowed');
        }
        return parts;
      }

      case 'availability': {
        const availabilityValue = value as { moveInDate?: string; showWithoutDate?: boolean };
        const parts: string[] = [];
        if (availabilityValue.moveInDate) {
          parts.push(`Move-in: ${availabilityValue.moveInDate}`);
        }
        if (availabilityValue.showWithoutDate) {
          parts.push('No date');
        }
        return parts;
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
        const parts: string[] = [];
        if (conditionValue.disabledAccess) parts.push('Disabled Access');
        if (conditionValue.petsAllowed) parts.push('Pets Allowed');
        if (conditionValue.smokingAllowed) parts.push('Smoking Allowed');
        if (conditionValue.negotiablePrice) parts.push('Negotiable Price');
        if (conditionValue.touristLicense) parts.push('Tourist License');
        if (conditionValue.loti) parts.push('Loti');
        if (conditionValue.titledLand) parts.push('Titled Land');
        return parts;
      }

      default:
        return [];
    }
  };

  const tips: FilterTipItem[] = [];

  activeFilters.forEach((filter) => {
    const formattedValues = formatFilterValue(filter.id, filter.value);

    if (formattedValues.length === 0) {
      return;
    }

    const isArrayFilter =
      filter.id === 'propertyType' ||
      filter.id === 'amenities' ||
      filter.id === 'furnishing' ||
      filter.id === 'layout' ||
      filter.id === 'buildingAmenities' ||
      filter.id === 'safety' ||
      filter.id === 'utilities' ||
      filter.id === 'basicSupplies';

    if (isArrayFilter && Array.isArray(filter.value)) {
      formattedValues.forEach((text, index) => {
        const itemValue = (filter.value as string[])[index];
        tips.push({
          filterId: filter.id,
          text,
          onClear: clearFilterItem ? () => clearFilterItem(filter.id, itemValue) : undefined,
        });
      });
    } else if (formattedValues.length === 1) {
      tips.push({
        filterId: filter.id,
        text: formattedValues[0],
        onClear: updateFilter ? () => updateFilter(filter.id, undefined) : undefined,
      });
    } else {
      const getKeyForIndex = (
        filterId: string,
        index: number,
        value: FilterValue,
      ): string | null => {
        if (filterId === 'bedsBaths') {
          const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number };
          const keys: string[] = [];
          if (bedsBathsValue.bedrooms !== undefined && bedsBathsValue.bedrooms > 0) {
            keys.push('bedrooms');
          }
          if (bedsBathsValue.bathrooms !== undefined && bedsBathsValue.bathrooms > 0) {
            keys.push('bathrooms');
          }
          return keys[index] || null;
        }

        if (filterId === 'area') {
          const areaValue = value as {
            livingAreaMin?: number;
            livingAreaMax?: number;
            totalAreaMin?: number;
            totalAreaMax?: number;
          };
          const keys: string[] = [];
          if (areaValue.livingAreaMin !== undefined && areaValue.livingAreaMax !== undefined) {
            keys.push('livingAreaMin', 'livingAreaMax');
          } else if (areaValue.livingAreaMin !== undefined) {
            keys.push('livingAreaMin');
          } else if (areaValue.livingAreaMax !== undefined) {
            keys.push('livingAreaMax');
          }
          if (areaValue.totalAreaMin !== undefined && areaValue.totalAreaMax !== undefined) {
            keys.push('totalAreaMin', 'totalAreaMax');
          } else if (areaValue.totalAreaMin !== undefined) {
            keys.push('totalAreaMin');
          } else if (areaValue.totalAreaMax !== undefined) {
            keys.push('totalAreaMax');
          }
          return keys[index] || null;
        }

        if (filterId === 'floor') {
          const floorValue = value as {
            floorLevelMin?: number;
            floorLevelMax?: number;
            totalFloorsMin?: number;
            totalFloorsMax?: number;
          };
          const keys: string[] = [];
          if (floorValue.floorLevelMin !== undefined && floorValue.floorLevelMax !== undefined) {
            keys.push('floorLevelMin', 'floorLevelMax');
          } else if (floorValue.floorLevelMin !== undefined) {
            keys.push('floorLevelMin');
          } else if (floorValue.floorLevelMax !== undefined) {
            keys.push('floorLevelMax');
          }
          if (
            floorValue.totalFloorsMin !== undefined &&
            floorValue.totalFloorsMax !== undefined
          ) {
            keys.push('totalFloorsMin', 'totalFloorsMax');
          } else if (floorValue.totalFloorsMin !== undefined) {
            keys.push('totalFloorsMin');
          } else if (floorValue.totalFloorsMax !== undefined) {
            keys.push('totalFloorsMax');
          }
          return keys[index] || null;
        }

        if (filterId === 'price') {
          const priceValue = value as { min?: number; max?: number };
          if (priceValue.min !== undefined && priceValue.max !== undefined) {
            return index === 0 ? 'min' : 'max';
          }
          if (priceValue.min !== undefined) return 'min';
          if (priceValue.max !== undefined) return 'max';
          return null;
        }

        if (filterId === 'ceiling') {
          const ceilingValue = value as { min?: number; max?: number };
          if (ceilingValue.min !== undefined && ceilingValue.max !== undefined) {
            return index === 0 ? 'min' : 'max';
          }
          if (ceilingValue.min !== undefined) return 'min';
          if (ceilingValue.max !== undefined) return 'max';
          return null;
        }

        if (filterId === 'building') {
          const buildingValue = value as {
            year?: string;
            condition?: string;
            renovation?: string;
            propertyClass?: string;
          };
          const keys: string[] = [];
          if (buildingValue.year && buildingValue.year !== 'any') keys.push('year');
          if (buildingValue.condition && buildingValue.condition !== 'any')
            keys.push('condition');
          if (buildingValue.renovation && buildingValue.renovation !== 'any')
            keys.push('renovation');
          if (buildingValue.propertyClass && buildingValue.propertyClass !== 'any')
            keys.push('propertyClass');
          return keys[index] || null;
        }

        if (filterId === 'guests') {
          const guestsValue = value as {
            maxGuests?: number;
            disabledAccess?: boolean;
            petsAllowed?: boolean;
          };
          const keys: string[] = [];
          if (guestsValue.maxGuests !== undefined && guestsValue.maxGuests > 0)
            keys.push('maxGuests');
          if (guestsValue.disabledAccess) keys.push('disabledAccess');
          if (guestsValue.petsAllowed) keys.push('petsAllowed');
          return keys[index] || null;
        }

        if (filterId === 'availability') {
          const availabilityValue = value as { moveInDate?: string; showWithoutDate?: boolean };
          const keys: string[] = [];
          if (availabilityValue.moveInDate) keys.push('moveInDate');
          if (availabilityValue.showWithoutDate) keys.push('showWithoutDate');
          return keys[index] || null;
        }

        if (filterId === 'specialCondition') {
          const conditionValue = value as {
            disabledAccess?: boolean;
            petsAllowed?: boolean;
            smokingAllowed?: boolean;
            negotiablePrice?: boolean;
            touristLicense?: boolean;
            loti?: boolean;
            titledLand?: boolean;
          };
          const keys: string[] = [];
          if (conditionValue.disabledAccess) keys.push('disabledAccess');
          if (conditionValue.petsAllowed) keys.push('petsAllowed');
          if (conditionValue.smokingAllowed) keys.push('smokingAllowed');
          if (conditionValue.negotiablePrice) keys.push('negotiablePrice');
          if (conditionValue.touristLicense) keys.push('touristLicense');
          if (conditionValue.loti) keys.push('loti');
          if (conditionValue.titledLand) keys.push('titledLand');
          return keys[index] || null;
        }

        const keys = Object.keys(value as Record<string, unknown>);
        return keys[index] || null;
      };

      formattedValues.forEach((text, index) => {
        const key = getKeyForIndex(filter.id, index, filter.value);
        if (key) {
          tips.push({
            filterId: filter.id,
            text,
            onClear: clearFilterField ? () => clearFilterField(filter.id, key) : undefined,
          });
        }
      });
    }
  });

  return tips;
};

