'use client';

import { useQueryStates, parseAsString, parseAsArrayOf } from 'nuqs';

export interface SearchParams {
  dealType: string | null;
  location: string | null;
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
      location: parseAsString,
      propertyTypes: parseAsArrayOf(parseAsString).withDefault([]),
    },
    {
      history: 'push',
    }
  );

  const clearSearchParams = async () => {
    return await setSearchParams({
      dealType: null,
      location: null,
      propertyTypes: null,
    });
  };

  return {
    searchParams: {
      dealType: searchParams.dealType,
      location: searchParams.location,
      propertyTypes: searchParams.propertyTypes,
    },
    setSearchParams,
    clearSearchParams,
  };
};

