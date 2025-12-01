import { FilterComponent } from './filter-types';
import { PriceRangeDesktop } from './PriceRangeDesktop';
import { PriceRangeMobile } from './PriceRangeMobile';
import { BedsBathsFilterDesktop } from './BedsBathsFilterDesktop';
import { BedsBathsFilterMobile } from './BedsBathsFilterMobile';
import { PropertyTypeFilterDesktop } from './PropertyTypeFilterDesktop';
import { PropertyTypeFilterMobile } from './PropertyTypeFilterMobile';
import { createDefaultComponents } from './createDefaultComponents';

export type PropertyType = 'apartment' | 'house' | 'villa' | 'office' | 'commercial' | 'land';
export type DealType = 'sale' | 'long-term' | 'short-term';

export type FilterType = 'range' | 'select' | 'multiselect' | 'toggle' | 'number';

export interface FilterConfig {
  id: string;
  label: string;
  type: FilterType;
  visibleFor: {
    propertyTypes: PropertyType[];
    dealTypes: DealType[];
  };
  mobile: {
    showInBar: boolean;
    priority: number;
  };
  components: FilterComponent;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const areaConfig: Omit<FilterConfig, 'components'> = {
  id: 'area',
  label: 'Area',
  type: 'range',
  visibleFor: {
    propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial', 'land'],
    dealTypes: ['sale', 'long-term', 'short-term'],
  },
  mobile: {
    showInBar: false,
    priority: 2,
  },
  min: 0,
  max: 10000,
  step: 1,
  unit: 'm²',
};

const bedroomsConfig: Omit<FilterConfig, 'components'> = {
  id: 'bedrooms',
  label: 'Bedrooms',
  type: 'number',
  visibleFor: {
    propertyTypes: ['apartment', 'house', 'villa'],
    dealTypes: ['sale', 'long-term', 'short-term'],
  },
  mobile: {
    showInBar: false,
    priority: 3,
  },
  min: 0,
  max: 20,
};

const bathroomsConfig: Omit<FilterConfig, 'components'> = {
  id: 'bathrooms',
  label: 'Bathrooms',
  type: 'number',
  visibleFor: {
    propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
    dealTypes: ['sale', 'long-term', 'short-term'],
  },
  mobile: {
    showInBar: false,
    priority: 4,
  },
  min: 0,
  max: 20,
};

const roomsConfig: Omit<FilterConfig, 'components'> = {
  id: 'rooms',
  label: 'Rooms',
  type: 'number',
  visibleFor: {
    propertyTypes: ['office'],
    dealTypes: ['sale', 'long-term'],
  },
  mobile: {
    showInBar: false,
    priority: 5,
  },
  min: 0,
  max: 50,
};

const parkingConfig: Omit<FilterConfig, 'components'> = {
  id: 'parking',
  label: 'Parking',
  type: 'number',
  visibleFor: {
    propertyTypes: ['office', 'commercial'],
    dealTypes: ['sale', 'long-term'],
  },
  mobile: {
    showInBar: false,
    priority: 6,
  },
  min: 0,
  max: 20,
};

const floorConfig: Omit<FilterConfig, 'components'> = {
  id: 'floor',
  label: 'Floor',
  type: 'number',
  visibleFor: {
    propertyTypes: ['apartment', 'office'],
    dealTypes: ['sale', 'long-term', 'short-term'],
  },
  mobile: {
    showInBar: false,
    priority: 7,
  },
  min: 0,
  max: 100,
};

const furnishedConfig: Omit<FilterConfig, 'components'> = {
  id: 'furnished',
  label: 'Furnished',
  type: 'toggle',
  visibleFor: {
    propertyTypes: ['apartment', 'house', 'villa'],
    dealTypes: ['long-term', 'short-term'],
  },
  mobile: {
    showInBar: false,
    priority: 8,
  },
};

const zoningCategoryConfig: Omit<FilterConfig, 'components'> = {
  id: 'zoningCategory',
  label: 'Zoning Category',
  type: 'select',
  visibleFor: {
    propertyTypes: ['land'],
    dealTypes: ['sale', 'long-term'],
  },
  mobile: {
    showInBar: false,
    priority: 9,
  },
  options: [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Agricultural', value: 'agricultural' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Public Services', value: 'public-services' },
    { label: 'Mixed-Use', value: 'mixed-use' },
  ],
};

export const FILTERS_CONFIG: FilterConfig[] = [
  {
    id: 'propertyType',
    label: 'Type of property',
    type: 'multiselect',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial', 'land'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: true,
      priority: 1,
    },
    components: {
      Desktop: PropertyTypeFilterDesktop,
      Mobile: PropertyTypeFilterMobile,
    },
  },
  {
    id: 'price',
    label: 'Price',
    type: 'range',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial', 'land'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: true,
      priority: 2,
    },
    components: {
      Desktop: PriceRangeDesktop,
      Mobile: PriceRangeMobile,
    },
    min: 0,
    max: 10000000,
    step: 1000,
    unit: 'DH',
  },
  {
    id: 'bedsBaths',
    label: 'Beds & Baths',
    type: 'number',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: true,
      priority: 3,
    },
    components: {
      Desktop: BedsBathsFilterDesktop,
      Mobile: BedsBathsFilterMobile,
    },
  },
  {
    ...areaConfig,
    components: createDefaultComponents(areaConfig as FilterConfig),
  },
  {
    ...roomsConfig,
    components: createDefaultComponents(roomsConfig as FilterConfig),
  },
  {
    ...parkingConfig,
    components: createDefaultComponents(parkingConfig as FilterConfig),
  },
  {
    ...floorConfig,
    components: createDefaultComponents(floorConfig as FilterConfig),
  },
  {
    ...furnishedConfig,
    components: createDefaultComponents(furnishedConfig as FilterConfig),
  },
  {
    ...zoningCategoryConfig,
    components: createDefaultComponents(zoningCategoryConfig as FilterConfig),
  },
];

export function getVisibleFilters(
  propertyTypes: PropertyType[],
  dealType: DealType | null,
): FilterConfig[] {
  if (!dealType) return [];

  return FILTERS_CONFIG.filter((filter) => {
    const matchesPropertyType =
      propertyTypes.length === 0 ||
      propertyTypes.some((pt) => filter.visibleFor.propertyTypes.includes(pt));
    const matchesDealType = filter.visibleFor.dealTypes.includes(dealType);

    return matchesPropertyType && matchesDealType;
  });
}

export function getFiltersForMobileBar(
  propertyTypes: PropertyType[],
  dealType: DealType | null,
  isMobile: boolean = false,
): FilterConfig[] {
  const visible = getVisibleFilters(propertyTypes, dealType);
  return visible
    .filter((f) => {
      if (isMobile && (f.id === 'price' || f.id === 'bedsBaths' || f.id === 'propertyType')) {
        return false;
      }
      return f.mobile.showInBar;
    })
    .sort((a, b) => a.mobile.priority - b.mobile.priority);
}

export function getFiltersForPopup(
  propertyTypes: PropertyType[],
  dealType: DealType | null,
  isMobile: boolean = false,
): FilterConfig[] {
  const visible = getVisibleFilters(propertyTypes, dealType);
  const barFilters = getFiltersForMobileBar(propertyTypes, dealType, isMobile);
  const barFilterIds = new Set(barFilters.map((f) => f.id));
  return visible.filter((f) => !barFilterIds.has(f.id));
}
