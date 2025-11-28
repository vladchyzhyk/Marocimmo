'use client';

import { useQueryStates, parseAsString, parseAsArrayOf } from 'nuqs';

export interface SearchParams {
  dealType: string | null;
  locationId: string | null;
  propertyTypes: string[];
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
    });
  };

  return {
    searchParams: {
      dealType: searchParams.dealType,
      locationId: searchParams.locationId,
      propertyTypes: searchParams.propertyTypes,
    },
    setSearchParams,
    clearSearchParams,
  };
};
