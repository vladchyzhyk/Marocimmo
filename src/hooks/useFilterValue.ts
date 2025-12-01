'use client';

import { useCallback } from 'react';
import { useSearchParams } from './useSearchParams';
import { FilterValue } from '@/components/filters/filter-types';

export const useFilterValue = (filterId: string) => {
  const { searchParams, setSearchParams } = useSearchParams();

  const getValue = useCallback((): FilterValue => {
    switch (filterId) {
      case 'price':
        return {
          min: searchParams.priceMin,
          max: searchParams.priceMax,
        };
      case 'area':
        return {
          min: searchParams.areaMin,
          max: searchParams.areaMax,
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
        return searchParams.floor;
      case 'furnished':
        return searchParams.furnished;
      case 'zoningCategory':
        return searchParams.zoningCategory;
      case 'amenities':
        return searchParams.amenities;
      default:
        return undefined;
    }
  }, [filterId, searchParams]);

  const setValue = useCallback(
    (value: FilterValue) => {
      const updates: Partial<typeof searchParams> = {};

      switch (filterId) {
        case 'price':
          updates.priceMin = (value as { min?: number; max?: number })?.min;
          updates.priceMax = (value as { min?: number; max?: number })?.max;
          break;
        case 'area':
          updates.areaMin = (value as { min?: number; max?: number })?.min;
          updates.areaMax = (value as { min?: number; max?: number })?.max;
          break;
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
    },
    [filterId, setSearchParams],
  );

  return {
    value: getValue(),
    setValue,
  };
};
