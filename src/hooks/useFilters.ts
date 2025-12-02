'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from './useSearchParams';
import {
  getVisibleFilters,
  getFiltersForMobileBar,
  getFiltersForPopup,
  PropertyType,
  DealType,
} from '@/components/filters/filters-config';
import { FilterValues, resetDependentFilters } from '@/utils/filterUtils';
import { SearchParams } from 'nuqs';

export const useFilters = () => {
  const { searchParams, setSearchParams, clearSearchParams } = useSearchParams();

  const propertyTypes = useMemo(
    () => (searchParams.propertyTypes || []) as PropertyType[],
    [searchParams.propertyTypes],
  );

  const dealType = useMemo(
    () => (searchParams.dealType || null) as DealType | null,
    [searchParams.dealType],
  );

  const filterValues: FilterValues = useMemo(() => {
    return {
      propertyTypes: searchParams.propertyTypes || [],
      location: searchParams.locationId || undefined,
      priceMin: searchParams.priceMin,
      priceMax: searchParams.priceMax,
      areaMin: searchParams.areaMin,
      areaMax: searchParams.areaMax,
      livingAreaMin: searchParams.livingAreaMin,
      livingAreaMax: searchParams.livingAreaMax,
      totalAreaMin: searchParams.totalAreaMin,
      totalAreaMax: searchParams.totalAreaMax,
      bedrooms: searchParams.bedrooms,
      bathrooms: searchParams.bathrooms,
      rooms: searchParams.rooms,
      parking: searchParams.parking,
      floorLevelMin: searchParams.floorLevelMin,
      floorLevelMax: searchParams.floorLevelMax,
      totalFloorsMin: searchParams.totalFloorsMin,
      totalFloorsMax: searchParams.totalFloorsMax,
      furnished: searchParams.furnished,
      zoningCategory: searchParams.zoningCategory,
      amenities: searchParams.amenities,
      exactMatch: searchParams.exactMatch,
      guests: searchParams.guests,
      building: searchParams.building,
      view: searchParams.view,
      ceilingMin: searchParams.ceilingMin,
      ceilingMax: searchParams.ceilingMax,
      availability: searchParams.availability,
      specialCondition: searchParams.specialCondition,
      furnishing: searchParams.furnishing,
      layout: searchParams.layout,
      buildingAmenities: searchParams.buildingAmenities,
      safety: searchParams.safety,
      utilities: searchParams.utilities,
      basicSupplies: searchParams.basicSupplies,
      pricePeriod: searchParams.pricePeriod,
    };
  }, [searchParams]);

  const visibleFilters = useMemo(
    () => getVisibleFilters(propertyTypes, dealType),
    [propertyTypes, dealType],
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileBarFilters = useMemo(
    () => getFiltersForMobileBar(propertyTypes, dealType, isMobile),
    [propertyTypes, dealType, isMobile],
  );

  const popupFilters = useMemo(
    () => getFiltersForPopup(propertyTypes, dealType, isMobile),
    [propertyTypes, dealType, isMobile],
  );

  const updateFilter = useCallback(
    (filterId: string, value: unknown) => {
      const updates: Partial<typeof searchParams> = {};

      switch (filterId) {
        case 'price': {
          const rangeValue = value as
            | { min?: number; max?: number; period?: 'per-day' | 'per-month' }
            | undefined;
          updates.priceMin = rangeValue?.min;
          updates.priceMax = rangeValue?.max;
          updates.pricePeriod = rangeValue?.period;
          break;
        }
        case 'location':
          updates.locationId = value as string | undefined;
          break;
        case 'area': {
          const areaValue = value as
            | {
                livingAreaMin?: number;
                livingAreaMax?: number;
                totalAreaMin?: number;
                totalAreaMax?: number;
              }
            | undefined;
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
        case 'bedsBaths': {
          const bedsBathsValue = value as
            | {
                bedrooms?: number;
                bathrooms?: number;
                exactMatch?: boolean;
              }
            | undefined;
          updates.bedrooms = bedsBathsValue?.bedrooms;
          updates.bathrooms = bedsBathsValue?.bathrooms;
          updates.exactMatch = bedsBathsValue?.exactMatch;
          break;
        }
        case 'rooms':
          updates.rooms = value as number | undefined;
          break;
        case 'parking':
          updates.parking = value as number | undefined;
          break;
        case 'floor': {
          const floorValue = value as
            | {
                floorLevelMin?: number;
                floorLevelMax?: number;
                totalFloorsMin?: number;
                totalFloorsMax?: number;
              }
            | undefined;
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
        case 'propertyType':
          // propertyTypes uses .withDefault([]), so we need to set to null to remove from URL
          updates.propertyTypes =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as PropertyType[])
              : (value as PropertyType[]);
          break;
        case 'amenities':
          updates.amenities =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'guests': {
          const guestsValue = value as
            | {
                maxGuests?: number;
                disabledAccess?: boolean;
                petsAllowed?: boolean;
              }
            | undefined;
          updates.maxGuests = guestsValue?.maxGuests;
          updates.guestsDisabledAccess = guestsValue?.disabledAccess;
          updates.guestsPetsAllowed = guestsValue?.petsAllowed;
          break;
        }
        case 'building': {
          const buildingValue = value as
            | {
                year?: string;
                condition?: string;
                renovation?: string;
                propertyClass?: string;
              }
            | undefined;
          // Only set values that are not undefined and not 'any', otherwise set to undefined to remove from URL
          updates.buildingYear =
            buildingValue?.year && buildingValue.year !== 'any' ? buildingValue.year : undefined;
          updates.buildingCondition =
            buildingValue?.condition && buildingValue.condition !== 'any'
              ? buildingValue.condition
              : undefined;
          updates.buildingRenovation =
            buildingValue?.renovation && buildingValue.renovation !== 'any'
              ? buildingValue.renovation
              : undefined;
          updates.buildingPropertyClass =
            buildingValue?.propertyClass && buildingValue.propertyClass !== 'any'
              ? buildingValue.propertyClass
              : undefined;
          break;
        }
        case 'view':
          updates.view = value as string | undefined;
          break;
        case 'ceiling': {
          const ceilingValue = value as { min?: number; max?: number } | undefined;
          updates.ceilingMin = ceilingValue?.min;
          updates.ceilingMax = ceilingValue?.max;
          break;
        }
        case 'availability': {
          const availabilityValue = value as
            | {
                moveInDate?: string;
                showWithoutDate?: boolean;
              }
            | undefined;
          updates.moveInDate = availabilityValue?.moveInDate;
          updates.showWithoutDate = availabilityValue?.showWithoutDate;
          break;
        }
        case 'specialCondition': {
          const conditionValue = value as
            | {
                disabledAccess?: boolean;
                petsAllowed?: boolean;
                smokingAllowed?: boolean;
                negotiablePrice?: boolean;
                touristLicense?: boolean;
                loti?: boolean;
                titledLand?: boolean;
              }
            | undefined;
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
          updates.furnishing =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'layout':
          updates.layout =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'buildingAmenities':
          updates.buildingAmenities =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'safety':
          updates.safety =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'utilities':
          updates.utilities =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
        case 'basicSupplies':
          updates.basicSupplies =
            value === undefined || (Array.isArray(value) && value.length === 0)
              ? (null as unknown as string[])
              : (value as string[]);
          break;
      }

      setSearchParams(updates);
    },
    [setSearchParams],
  );

  const resetFilters = () => {
    const resetValues = resetDependentFilters(propertyTypes, dealType, filterValues);
    setSearchParams(resetValues as Partial<SearchParams>);
  };

  const clearAllFilters = async () => {
    await clearSearchParams();
    setSearchParams({ dealType: 'sale' });
  };

  const clearFilterItem = useCallback(
    (filterId: string, itemValue: string) => {
      const arrayFilters = [
        'propertyType',
        'amenities',
        'furnishing',
        'layout',
        'buildingAmenities',
        'safety',
        'utilities',
        'basicSupplies',
      ];

      if (!arrayFilters.includes(filterId)) {
        return;
      }

      let currentArray: string[] = [];
      switch (filterId) {
        case 'propertyType':
          currentArray = filterValues.propertyTypes || [];
          break;
        case 'amenities':
          currentArray = filterValues.amenities || [];
          break;
        case 'furnishing':
          currentArray = filterValues.furnishing || [];
          break;
        case 'layout':
          currentArray = filterValues.layout || [];
          break;
        case 'buildingAmenities':
          currentArray = filterValues.buildingAmenities || [];
          break;
        case 'safety':
          currentArray = filterValues.safety || [];
          break;
        case 'utilities':
          currentArray = filterValues.utilities || [];
          break;
        case 'basicSupplies':
          currentArray = filterValues.basicSupplies || [];
          break;
      }

      const newArray = currentArray.filter((v) => v !== itemValue);
      updateFilter(filterId, newArray.length > 0 ? newArray : undefined);
    },
    [filterValues, updateFilter],
  );

  const clearFilterField = useCallback(
    (filterId: string, fieldKey: string) => {
      switch (filterId) {
        case 'bedsBaths': {
          const currentValue = {
            bedrooms: filterValues.bedrooms,
            bathrooms: filterValues.bathrooms,
            exactMatch: searchParams.exactMatch,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue =
            (currentValue.bedrooms !== undefined && currentValue.bedrooms > 0) ||
            (currentValue.bathrooms !== undefined && currentValue.bathrooms > 0);
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'price': {
          const currentValue = {
            min: filterValues.priceMin,
            max: filterValues.priceMax,
            period: filterValues.pricePeriod,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = currentValue.min !== undefined || currentValue.max !== undefined;
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'area': {
          const currentValue = {
            livingAreaMin: filterValues.livingAreaMin,
            livingAreaMax: filterValues.livingAreaMax,
            totalAreaMin: filterValues.totalAreaMin,
            totalAreaMax: filterValues.totalAreaMax,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue =
            currentValue.livingAreaMin !== undefined ||
            currentValue.livingAreaMax !== undefined ||
            currentValue.totalAreaMin !== undefined ||
            currentValue.totalAreaMax !== undefined;
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'ceiling': {
          const currentValue = {
            min: filterValues.ceilingMin,
            max: filterValues.ceilingMax,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = currentValue.min !== undefined || currentValue.max !== undefined;
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'floor': {
          const currentValue = {
            floorLevelMin: filterValues.floorLevelMin,
            floorLevelMax: filterValues.floorLevelMax,
            totalFloorsMin: filterValues.totalFloorsMin,
            totalFloorsMax: filterValues.totalFloorsMax,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue =
            currentValue.floorLevelMin !== undefined ||
            currentValue.floorLevelMax !== undefined ||
            currentValue.totalFloorsMin !== undefined ||
            currentValue.totalFloorsMax !== undefined;
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'building': {
          const currentValue: {
            year?: string;
            condition?: string;
            renovation?: string;
            propertyClass?: string;
          } = {};
          if (filterValues.building?.year && filterValues.building.year !== 'any') {
            currentValue.year = filterValues.building.year;
          }
          if (filterValues.building?.condition && filterValues.building.condition !== 'any') {
            currentValue.condition = filterValues.building.condition;
          }
          if (filterValues.building?.renovation && filterValues.building.renovation !== 'any') {
            currentValue.renovation = filterValues.building.renovation;
          }
          if (
            filterValues.building?.propertyClass &&
            filterValues.building.propertyClass !== 'any'
          ) {
            currentValue.propertyClass = filterValues.building.propertyClass;
          }
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = Object.keys(currentValue).length > 0;
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'guests': {
          const currentValue = {
            maxGuests: filterValues.guests?.maxGuests,
            disabledAccess: filterValues.guests?.disabledAccess,
            petsAllowed: filterValues.guests?.petsAllowed,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = Object.values(currentValue).some(
            (v) => v !== undefined && v !== null && v !== false,
          );
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'availability': {
          const currentValue = {
            moveInDate: filterValues.availability?.moveInDate,
            showWithoutDate: filterValues.availability?.showWithoutDate,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = Object.values(currentValue).some(
            (v) => v !== undefined && v !== null && v !== false,
          );
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        case 'specialCondition': {
          const currentValue = {
            disabledAccess: filterValues.specialCondition?.disabledAccess,
            petsAllowed: filterValues.specialCondition?.petsAllowed,
            smokingAllowed: filterValues.specialCondition?.smokingAllowed,
            negotiablePrice: filterValues.specialCondition?.negotiablePrice,
            touristLicense: filterValues.specialCondition?.touristLicense,
            loti: filterValues.specialCondition?.loti,
            titledLand: filterValues.specialCondition?.titledLand,
          };
          delete (currentValue as Record<string, unknown>)[fieldKey];
          const hasAnyValue = Object.values(currentValue).some((v) => v === true);
          updateFilter(filterId, hasAnyValue ? currentValue : undefined);
          break;
        }
        default:
          break;
      }
    },
    [filterValues, searchParams.exactMatch, updateFilter],
  );

  return {
    propertyTypes,
    dealType,
    filterValues,
    visibleFilters,
    mobileBarFilters,
    popupFilters,
    updateFilter,
    resetFilters,
    clearAllFilters,
    clearFilterItem,
    clearFilterField,
  };
};
