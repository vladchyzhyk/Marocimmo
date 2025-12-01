'use client';

import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsBoolean,
} from 'nuqs';
import { PropertyType, DealType } from '@/components/filters/filters-config';

export interface SearchParams {
  dealType: DealType | null;
  locationId: string | null;
  propertyTypes: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  livingAreaMin?: number;
  livingAreaMax?: number;
  totalAreaMin?: number;
  totalAreaMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  parking?: number;
  floor?: number;
  floorLevelMin?: number;
  floorLevelMax?: number;
  totalFloorsMin?: number;
  totalFloorsMax?: number;
  furnished?: boolean;
  zoningCategory?: string;
  amenities?: string[];
  exactMatch?: boolean;
}

export interface UseSearchParamsReturn {
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => Promise<URLSearchParams>;
  clearSearchParams: () => Promise<URLSearchParams>;
}

export const useSearchParams = (): UseSearchParamsReturn => {
  const [searchParams, setSearchParams] = useQueryStates(
    {
      dealType: parseAsString.withDefault('sale'),
      locationId: parseAsString,
      propertyTypes: parseAsArrayOf(parseAsString).withDefault([]),
      priceMin: parseAsInteger,
      priceMax: parseAsInteger,
      areaMin: parseAsInteger,
      areaMax: parseAsInteger,
      livingAreaMin: parseAsInteger,
      livingAreaMax: parseAsInteger,
      totalAreaMin: parseAsInteger,
      totalAreaMax: parseAsInteger,
      bedrooms: parseAsInteger,
      bathrooms: parseAsInteger,
      rooms: parseAsInteger,
      parking: parseAsInteger,
      floor: parseAsInteger,
      floorLevelMin: parseAsInteger,
      floorLevelMax: parseAsInteger,
      totalFloorsMin: parseAsInteger,
      totalFloorsMax: parseAsInteger,
      furnished: parseAsBoolean,
      zoningCategory: parseAsString,
      amenities: parseAsArrayOf(parseAsString),
      exactMatch: parseAsBoolean,
    },
    {
      history: 'push',
    },
  );

  const clearSearchParams = async () => {
    return await setSearchParams({
      dealType: null,
      locationId: null,
      propertyTypes: null,
      priceMin: null,
      priceMax: null,
      areaMin: null,
      areaMax: null,
      livingAreaMin: null,
      livingAreaMax: null,
      totalAreaMin: null,
      totalAreaMax: null,
      bedrooms: null,
      bathrooms: null,
      rooms: null,
      parking: null,
      floor: null,
      floorLevelMin: null,
      floorLevelMax: null,
      totalFloorsMin: null,
      totalFloorsMax: null,
      furnished: null,
      zoningCategory: null,
      amenities: null,
      exactMatch: null,
    });
  };

  return {
    searchParams: {
      dealType: searchParams.dealType as DealType | null,
      locationId: searchParams.locationId,
      propertyTypes: (searchParams.propertyTypes || []) as PropertyType[],
      priceMin: searchParams.priceMin ?? undefined,
      priceMax: searchParams.priceMax ?? undefined,
      areaMin: searchParams.areaMin ?? undefined,
      areaMax: searchParams.areaMax ?? undefined,
      livingAreaMin: searchParams.livingAreaMin ?? undefined,
      livingAreaMax: searchParams.livingAreaMax ?? undefined,
      totalAreaMin: searchParams.totalAreaMin ?? undefined,
      totalAreaMax: searchParams.totalAreaMax ?? undefined,
      bedrooms: searchParams.bedrooms ?? undefined,
      bathrooms: searchParams.bathrooms ?? undefined,
      rooms: searchParams.rooms ?? undefined,
      parking: searchParams.parking ?? undefined,
      floor: searchParams.floor ?? undefined,
      floorLevelMin: searchParams.floorLevelMin ?? undefined,
      floorLevelMax: searchParams.floorLevelMax ?? undefined,
      totalFloorsMin: searchParams.totalFloorsMin ?? undefined,
      totalFloorsMax: searchParams.totalFloorsMax ?? undefined,
      furnished: searchParams.furnished ?? undefined,
      zoningCategory: searchParams.zoningCategory ?? undefined,
      amenities: searchParams.amenities ?? undefined,
      exactMatch: searchParams.exactMatch ?? undefined,
    },
    setSearchParams,
    clearSearchParams,
  };
};
