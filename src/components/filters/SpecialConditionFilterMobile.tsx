'use client';

import { BaseFilterProps } from './filter-types';
import { SpecialConditionFilter } from './SpecialConditionFilter';
import { useFilters } from '@/hooks/useFilters';

export const SpecialConditionFilterMobile = (props: BaseFilterProps) => {
  const { propertyTypes, dealType } = useFilters();

  const isApartment = propertyTypes.includes('apartment');
  const isLand = propertyTypes.includes('land');
  const isSale = dealType === 'sale';
  const isShortTerm = dealType === 'short-term';

  return (
    <SpecialConditionFilter
      {...props}
      variant="select"
      showDisabledAccess={!isLand}
      showPetsAllowed={!isLand}
      showSmokingAllowed={!isLand}
      showNegotiablePrice={isApartment && isSale}
      showTouristLicense={isApartment && isSale}
      showLoti={isLand}
      showTitledLand={isLand}
    />
  );
};

