'use client';

import { useMemo } from 'react';
import { useFilters } from './useFilters';
import { collectAllFilters, CollectFiltersOptions } from '@/utils/collectFilters';

export const useCollectFilters = (options: CollectFiltersOptions = {}) => {
  const { filterValues, propertyTypes, dealType } = useFilters();

  const { checkVisibility = true } = options;

  const allFilters = useMemo(() => {
    return collectAllFilters(filterValues, {
      ...options,
      propertyTypes,
      dealType,
      checkVisibility,
    });
  }, [filterValues, propertyTypes, dealType, options, checkVisibility]);

  const activeFilters = useMemo(() => {
    return collectAllFilters(filterValues, {
      ...options,
      onlyActive: true,
      propertyTypes,
      dealType,
      checkVisibility,
    });
  }, [filterValues, propertyTypes, dealType, options, checkVisibility]);

  const activeCount = useMemo(() => {
    return activeFilters.length;
  }, [activeFilters]);

  return {
    allFilters,
    activeFilters,
    activeCount,
  };
};
