'use client';

import { useMemo, useState, useEffect } from 'react';
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

  const updateFilter = (filterId: string, value: unknown) => {
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
      case 'amenities':
        updates.amenities = value as string[] | undefined;
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
    }

    setSearchParams(updates);
  };

  const resetFilters = () => {
    const resetValues = resetDependentFilters(propertyTypes, dealType, filterValues);
    setSearchParams(resetValues as Partial<SearchParams>);
  };

  const clearAllFilters = async () => {
    await clearSearchParams();
    setSearchParams({ dealType: 'sale' });
  };

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
  };
};
