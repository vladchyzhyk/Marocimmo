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
