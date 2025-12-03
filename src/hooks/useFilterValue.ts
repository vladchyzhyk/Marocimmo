'use client';

import { useCallback } from 'react';
import { useSearchParams } from './useSearchParams';
import { FilterValue } from '@/components/filters/filter-types';
import { PropertyType } from '@/components/filters/filters-config';

export const useFilterValue = (filterId: string) => {
  const { searchParams, setSearchParams } = useSearchParams();

  const getValue = useCallback((): FilterValue => {
    switch (filterId) {
      case 'price':
        return {
          min: searchParams.priceMin,
          max: searchParams.priceMax,
          period: searchParams.pricePeriod,
        };
      case 'area':
        return {
          livingAreaMin: searchParams.livingAreaMin,
          livingAreaMax: searchParams.livingAreaMax,
          totalAreaMin: searchParams.totalAreaMin,
          totalAreaMax: searchParams.totalAreaMax,
        };
      case 'bedrooms':
        return searchParams.bedrooms;
      case 'bathrooms':
        return searchParams.bathrooms;
      case 'rooms':
        return searchParams.rooms;
      case 'parking':
        return searchParams.parking;
      case 'floor':
        return {
          floorLevelMin: searchParams.floorLevelMin,
          floorLevelMax: searchParams.floorLevelMax,
          totalFloorsMin: searchParams.totalFloorsMin,
          totalFloorsMax: searchParams.totalFloorsMax,
        };
      case 'furnished':
        return searchParams.furnished;
      case 'zoningCategory':
        return searchParams.zoningCategory;
      case 'amenities':
        return searchParams.amenities;
      case 'guests':
        return searchParams.guests;
      case 'building':
        return searchParams.building;
      case 'view':
        return searchParams.view;
      case 'ceiling':
        return {
          min: searchParams.ceilingMin,
          max: searchParams.ceilingMax,
        };
      case 'availability':
        return searchParams.availability;
      case 'specialCondition':
        return searchParams.specialCondition;
      case 'furnishing':
        return searchParams.furnishing;
      case 'layout':
        return searchParams.layout;
      case 'buildingAmenities':
        return searchParams.buildingAmenities;
      case 'safety':
        return searchParams.safety;
      case 'utilities':
        return searchParams.utilities;
      case 'basicSupplies':
        return searchParams.basicSupplies;
      case 'bedsBaths':
        return {
          bedrooms: searchParams.bedrooms,
          bathrooms: searchParams.bathrooms,
          exactMatch: searchParams.exactMatch,
        };
      case 'propertyType':
        return searchParams.propertyTypes;
      default:
        return undefined;
    }
  }, [filterId, searchParams]);

  const setValue = useCallback(
    (value: FilterValue) => {
      const updates: Partial<typeof searchParams> = {};

      switch (filterId) {
        case 'price': {
          const priceValue = value as {
            min?: number;
            max?: number;
            period?: 'per-day' | 'per-month';
          };
          updates.priceMin = priceValue?.min;
          updates.priceMax = priceValue?.max;
          updates.pricePeriod = priceValue?.period;
          break;
        }
        case 'area': {
          const areaValue = value as {
            livingAreaMin?: number;
            livingAreaMax?: number;
            totalAreaMin?: number;
            totalAreaMax?: number;
          };
          updates.livingAreaMin = areaValue?.livingAreaMin;
          updates.livingAreaMax = areaValue?.livingAreaMax;
          updates.totalAreaMin = areaValue?.totalAreaMin;
          updates.totalAreaMax = areaValue?.totalAreaMax;
          break;
        }
        case 'bedrooms':
          updates.bedrooms = value as number | undefined;
          break;
        case 'bathrooms':
          updates.bathrooms = value as number | undefined;
          break;
        case 'rooms':
          updates.rooms = value as number | undefined;
          break;
        case 'parking':
          updates.parking = value as number | undefined;
          break;
        case 'floor': {
          const floorValue = value as {
            floorLevelMin?: number;
            floorLevelMax?: number;
            totalFloorsMin?: number;
            totalFloorsMax?: number;
          };
          updates.floorLevelMin = floorValue?.floorLevelMin;
          updates.floorLevelMax = floorValue?.floorLevelMax;
          updates.totalFloorsMin = floorValue?.totalFloorsMin;
          updates.totalFloorsMax = floorValue?.totalFloorsMax;
          break;
        }
        case 'furnished':
          updates.furnished = value as boolean | undefined;
          break;
        case 'zoningCategory':
          updates.zoningCategory = value as string | undefined;
          break;
        case 'amenities':
          updates.amenities = value as string[] | undefined;
          break;
        case 'guests': {
          const guestsValue = value as {
            maxGuests?: number;
            disabledAccess?: boolean;
            petsAllowed?: boolean;
          };
          updates.maxGuests = guestsValue?.maxGuests;
          updates.guestsDisabledAccess = guestsValue?.disabledAccess;
          updates.guestsPetsAllowed = guestsValue?.petsAllowed;
          break;
        }
        case 'building': {
          const buildingValue = value as {
            year?: string;
            condition?: string;
            renovation?: string;
            propertyClass?: string;
          };
          updates.buildingYear = buildingValue?.year;
          updates.buildingCondition = buildingValue?.condition;
          updates.buildingRenovation = buildingValue?.renovation;
          updates.buildingPropertyClass = buildingValue?.propertyClass;
          break;
        }
        case 'view':
          updates.view = value as string | undefined;
          break;
        case 'ceiling': {
          const ceilingValue = value as { min?: number; max?: number };
          updates.ceilingMin = ceilingValue?.min;
          updates.ceilingMax = ceilingValue?.max;
          break;
        }
        case 'availability': {
          const availabilityValue = value as {
            moveInDate?: string;
            showWithoutDate?: boolean;
          };
          updates.moveInDate = availabilityValue?.moveInDate;
          updates.showWithoutDate = availabilityValue?.showWithoutDate;
          break;
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
          updates.specialDisabledAccess = conditionValue?.disabledAccess;
          updates.specialPetsAllowed = conditionValue?.petsAllowed;
          updates.specialSmokingAllowed = conditionValue?.smokingAllowed;
          updates.specialNegotiablePrice = conditionValue?.negotiablePrice;
          updates.specialTouristLicense = conditionValue?.touristLicense;
          updates.specialLoti = conditionValue?.loti;
          updates.specialTitledLand = conditionValue?.titledLand;
          break;
        }
        case 'furnishing':
          updates.furnishing = value as string[] | undefined;
          break;
        case 'layout':
          updates.layout = value as string[] | undefined;
          break;
        case 'buildingAmenities':
          updates.buildingAmenities = value as string[] | undefined;
          break;
        case 'safety':
          updates.safety = value as string[] | undefined;
          break;
        case 'utilities':
          updates.utilities = value as string[] | undefined;
          break;
        case 'basicSupplies':
          updates.basicSupplies = value as string[] | undefined;
          break;
        case 'bedsBaths': {
          const bedsBathsValue = value as { bedrooms?: number; bathrooms?: number; exactMatch?: boolean };
          updates.bedrooms = bedsBathsValue?.bedrooms;
          updates.bathrooms = bedsBathsValue?.bathrooms;
          updates.exactMatch = bedsBathsValue?.exactMatch;
          break;
        }
        case 'propertyType':
          updates.propertyTypes = value as PropertyType[] | undefined;
          break;
      }

      setSearchParams(updates);
    },
    [filterId, setSearchParams],
  );

  return {
    value: getValue(),
    setValue,
  };
};
