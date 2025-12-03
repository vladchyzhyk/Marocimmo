import { FilterComponent } from './filter-types';
import { PriceRangeDesktop } from './PriceRangeDesktop';
import { PriceRangeMobile } from './PriceRangeMobile';
import { BedsBathsFilterDesktop } from './BedsBathsFilterDesktop';
import { BedsBathsFilterMobile } from './BedsBathsFilterMobile';
import { PropertyTypeFilterDesktop } from './PropertyTypeFilterDesktop';
import { PropertyTypeFilterMobile } from './PropertyTypeFilterMobile';
import { AreaFilterDesktop } from './AreaFilterDesktop';
import { AreaFilterMobile } from './AreaFilterMobile';
import { FloorFilterDesktop } from './FloorFilterDesktop';
import { FloorFilterMobile } from './FloorFilterMobile';
import { GuestsFilterDesktop } from './GuestsFilterDesktop';
import { GuestsFilterMobile } from './GuestsFilterMobile';
import { BuildingFilterDesktop } from './BuildingFilterDesktop';
import { BuildingFilterMobile } from './BuildingFilterMobile';
import { ViewFilterDesktop } from './ViewFilterDesktop';
import { ViewFilterMobile } from './ViewFilterMobile';
import { CeilingFilterDesktop } from './CeilingFilterDesktop';
import { CeilingFilterMobile } from './CeilingFilterMobile';
import { AvailabilityFilterDesktop } from './AvailabilityFilterDesktop';
import { AvailabilityFilterMobile } from './AvailabilityFilterMobile';
import { SpecialConditionFilterDesktop } from './SpecialConditionFilterDesktop';
import { SpecialConditionFilterMobile } from './SpecialConditionFilterMobile';
import { AmenitiesFilterDesktop } from './AmenitiesFilterDesktop';
import { AmenitiesFilterMobile } from './AmenitiesFilterMobile';
import { FurnishingFilterDesktop } from './FurnishingFilterDesktop';
import { FurnishingFilterMobile } from './FurnishingFilterMobile';
import { LayoutFilterDesktop } from './LayoutFilterDesktop';
import { LayoutFilterMobile } from './LayoutFilterMobile';
import { BuildingAmenitiesFilterDesktop } from './BuildingAmenitiesFilterDesktop';
import { BuildingAmenitiesFilterMobile } from './BuildingAmenitiesFilterMobile';
import { SafetyFilterDesktop } from './SafetyFilterDesktop';
import { SafetyFilterMobile } from './SafetyFilterMobile';
import { UtilitiesFilterDesktop } from './UtilitiesFilterDesktop';
import { UtilitiesFilterMobile } from './UtilitiesFilterMobile';
import { BasicSuppliesFilterDesktop } from './BasicSuppliesFilterDesktop';
import { BasicSuppliesFilterMobile } from './BasicSuppliesFilterMobile';
import { createDefaultComponents } from './createDefaultComponents';

export type PropertyType = 'apartment' | 'house' | 'villa' | 'office' | 'commercial' | 'land';
export type DealType = 'sale' | 'long-term' | 'short-term';

export type FilterType = 'range' | 'select' | 'multiselect' | 'toggle' | 'number' | 'custom';

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
    showInBar: true,
    priority: 5,
  },

  min: 0,
  max: 10000,
  step: 1,
  unit: 'm²',
};

const floorConfig: Omit<FilterConfig, 'components'> = {
  id: 'floor',
  label: 'Floor',
  type: 'range',
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
    components: {
      Desktop: AreaFilterDesktop,
      Mobile: AreaFilterMobile,
    },
  },
  {
    ...floorConfig,
    components: {
      Desktop: FloorFilterDesktop,
      Mobile: FloorFilterMobile,
    },
  },
  {
    ...furnishedConfig,
    components: createDefaultComponents(furnishedConfig as FilterConfig),
  },
  {
    ...zoningCategoryConfig,
    components: createDefaultComponents(zoningCategoryConfig as FilterConfig),
  },
  {
    id: 'guests',
    label: 'Guests',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa'],
      dealTypes: ['short-term'],
    },
    mobile: {
      showInBar: true,
      priority: 2,
    },
    components: {
      Desktop: GuestsFilterDesktop,
      Mobile: GuestsFilterMobile,
    },
  },
  {
    id: 'building',
    label: 'Building',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term'],
    },
    mobile: {
      showInBar: false,
      priority: 10,
    },
    components: {
      Desktop: BuildingFilterDesktop,
      Mobile: BuildingFilterMobile,
    },
  },
  {
    id: 'view',
    label: 'View',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment'],
      dealTypes: ['short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 11,
    },
    components: {
      Desktop: ViewFilterDesktop,
      Mobile: ViewFilterMobile,
    },
  },
  {
    id: 'ceiling',
    label: 'Ceiling',
    type: 'range',
    visibleFor: {
      propertyTypes: ['office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 12,
    },
    min: 2.0,
    max: 6.0,
    step: 0.5,
    unit: 'm',
    components: {
      Desktop: CeilingFilterDesktop,
      Mobile: CeilingFilterMobile,
    },
  },
  {
    id: 'availability',
    label: 'Availability',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['house', 'villa', 'office', 'commercial'],
      dealTypes: ['long-term'],
    },
    mobile: {
      showInBar: false,
      priority: 13,
    },
    components: {
      Desktop: AvailabilityFilterDesktop,
      Mobile: AvailabilityFilterMobile,
    },
  },
  {
    id: 'specialCondition',
    label: 'Special Condition',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial', 'land'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 14,
    },
    components: {
      Desktop: SpecialConditionFilterDesktop,
      Mobile: SpecialConditionFilterMobile,
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 15,
    },
    options: [
      { label: 'Wi-Fi', value: 'wifi' },
      { label: 'TV', value: 'tv' },
      { label: 'Satellite TV', value: 'satellite-tv' },
      { label: 'Fiber optic cable', value: 'fiber-optic' },
      { label: 'Telephone wiring', value: 'telephone' },
      { label: 'Air conditioning', value: 'air-conditioning' },
      { label: 'Hot water', value: 'hot-water' },
      { label: 'Heating', value: 'heating' },
    ],
    components: {
      Desktop: AmenitiesFilterDesktop,
      Mobile: AmenitiesFilterMobile,
    },
  },
  {
    id: 'furnishing',
    label: 'Furnishing & Essentials',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 16,
    },
    options: [
      { label: 'Furnished', value: 'furnished' },
      { label: 'Equipped kitchen', value: 'equipped-kitchen' },
      { label: 'Fridge', value: 'fridge' },
      { label: 'Stove', value: 'stove' },
      { label: 'Microwave', value: 'microwave' },
      { label: 'Coffee machine', value: 'coffee-machine' },
      { label: 'Shower cabin', value: 'shower-cabin' },
      { label: 'Bathtub', value: 'bathtub' },
      { label: 'Washing machine', value: 'washing-machine' },
      { label: 'Mezzanine floor', value: 'mezzanine' },
    ],
    components: {
      Desktop: FurnishingFilterDesktop,
      Mobile: FurnishingFilterMobile,
    },
  },
  {
    id: 'layout',
    label: 'Layout & Style',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 17,
    },
    options: [
      { label: 'Moroccan lounge', value: 'moroccan-lounge' },
      { label: 'European lounge', value: 'european-lounge' },
      { label: 'Duplex', value: 'duplex' },
      { label: 'Balcony', value: 'balcony' },
      { label: 'Terrace', value: 'terrace' },
    ],
    components: {
      Desktop: LayoutFilterDesktop,
      Mobile: LayoutFilterMobile,
    },
  },
  {
    id: 'buildingAmenities',
    label: 'Building Amenities',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 18,
    },
    options: [
      { label: 'Parking', value: 'parking' },
      { label: 'Elevator', value: 'elevator' },
      { label: 'Swimming pool', value: 'swimming-pool' },
      { label: 'Gym', value: 'gym' },
      { label: 'Storage room', value: 'storage-room' },
      { label: 'Concierge', value: 'concierge' },
      { label: 'Garden', value: 'garden' },
      { label: 'Fireplace', value: 'fireplace' },
      { label: 'Grill zone', value: 'grill-zone' },
    ],
    components: {
      Desktop: BuildingAmenitiesFilterDesktop,
      Mobile: BuildingAmenitiesFilterMobile,
    },
  },
  {
    id: 'safety',
    label: 'Safety & Security',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'office', 'commercial'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 19,
    },
    options: [
      { label: 'Security system', value: 'security-system' },
      { label: 'Concierge', value: 'concierge' },
      { label: 'Intercom', value: 'intercom' },
      { label: 'Coded lock', value: 'coded-lock' },
      { label: 'Security personnel', value: 'security-personnel' },
    ],
    components: {
      Desktop: SafetyFilterDesktop,
      Mobile: SafetyFilterMobile,
    },
  },
  {
    id: 'utilities',
    label: 'Utilities available',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['commercial', 'land'],
      dealTypes: ['sale', 'long-term', 'short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 20,
    },
    options: [
      { label: 'Water system', value: 'water-system' },
      { label: 'Electricity', value: 'electricity' },
      { label: 'Drainage', value: 'drainage' },
      { label: 'Gas', value: 'gas' },
    ],
    components: {
      Desktop: UtilitiesFilterDesktop,
      Mobile: UtilitiesFilterMobile,
    },
  },
  {
    id: 'basicSupplies',
    label: 'Basic Supplies & Extras',
    type: 'custom',
    visibleFor: {
      propertyTypes: ['apartment', 'house', 'villa'],
      dealTypes: ['short-term'],
    },
    mobile: {
      showInBar: false,
      priority: 21,
    },
    options: [
      { label: 'Towels', value: 'towels' },
      { label: 'Toiletries', value: 'toiletries' },
      { label: "Children's equipment", value: 'children-equipment' },
      { label: 'Iron', value: 'iron' },
      { label: 'Hair dryer', value: 'hair-dryer' },
    ],
    components: {
      Desktop: BasicSuppliesFilterDesktop,
      Mobile: BasicSuppliesFilterMobile,
    },
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
      if (
        isMobile &&
        (f.id === 'price' ||
          f.id === 'bedsBaths' ||
          f.id === 'propertyType' ||
          f.id === 'area' ||
          f.id === 'guests')
      ) {
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
