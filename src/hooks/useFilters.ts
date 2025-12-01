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

export const useFilters = () => {
  const { searchParams, setSearchParams } = useSearchParams();

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
      bedrooms: searchParams.bedrooms,
      bathrooms: searchParams.bathrooms,
      rooms: searchParams.rooms,
      parking: searchParams.parking,
      floor: searchParams.floor,
      furnished: searchParams.furnished,
      zoningCategory: searchParams.zoningCategory,
      amenities: searchParams.amenities,
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
        const rangeValue = value as { min?: number; max?: number } | undefined;
        updates.priceMin = rangeValue?.min;
        updates.priceMax = rangeValue?.max;
        break;
      }
      case 'location':
        updates.locationId = value as string | undefined;
        break;
      case 'area': {
        const rangeValue = value as { min?: number; max?: number } | undefined;
        updates.areaMin = rangeValue?.min;
        updates.areaMax = rangeValue?.max;
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
      case 'floor':
        updates.floor = value as number | undefined;
        break;
      case 'furnished':
        updates.furnished = value as boolean | undefined;
        break;
      case 'zoningCategory':
        updates.zoningCategory = value as string | undefined;
        break;
      case 'amenities':
        updates.amenities = value as string[] | undefined;
        break;
    }

    setSearchParams(updates);
  };

  const resetFilters = () => {
    const resetValues = resetDependentFilters(propertyTypes, dealType, filterValues);
    setSearchParams(resetValues);
  };

  const clearAllFilters = () => {
    setSearchParams({
      locationId: undefined,
      priceMin: undefined,
      priceMax: undefined,
      areaMin: undefined,
      areaMax: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      rooms: undefined,
      parking: undefined,
      floor: undefined,
      furnished: undefined,
      zoningCategory: undefined,
      amenities: undefined,
    });
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
