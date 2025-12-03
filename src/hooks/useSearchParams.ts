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
  page?: number;
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
  guests?: {
    maxGuests?: number;
    disabledAccess?: boolean;
    petsAllowed?: boolean;
  };
  building?: {
    year?: string;
    condition?: string;
    renovation?: string;
    propertyClass?: string;
  };
  view?: string;
  ceilingMin?: number;
  ceilingMax?: number;
  availability?: {
    moveInDate?: string;
    showWithoutDate?: boolean;
  };
  specialCondition?: {
    disabledAccess?: boolean;
    petsAllowed?: boolean;
    smokingAllowed?: boolean;
    negotiablePrice?: boolean;
    touristLicense?: boolean;
    loti?: boolean;
    titledLand?: boolean;
  };
  furnishing?: string[];
  layout?: string[];
  buildingAmenities?: string[];
  safety?: string[];
  utilities?: string[];
  basicSupplies?: string[];
  pricePeriod?: 'per-day' | 'per-month';
  maxGuests?: number;
  guestsDisabledAccess?: boolean;
  guestsPetsAllowed?: boolean;
  buildingYear?: string;
  buildingCondition?: string;
  buildingRenovation?: string;
  buildingPropertyClass?: string;
  ceilingMin?: number;
  ceilingMax?: number;
  moveInDate?: string;
  showWithoutDate?: boolean;
  specialDisabledAccess?: boolean;
  specialPetsAllowed?: boolean;
  specialSmokingAllowed?: boolean;
  specialNegotiablePrice?: boolean;
  specialTouristLicense?: boolean;
  specialLoti?: boolean;
  specialTitledLand?: boolean;
  furnishing?: string[];
  layout?: string[];
  buildingAmenities?: string[];
  safety?: string[];
  utilities?: string[];
  basicSupplies?: string[];
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
      page: parseAsInteger.withDefault(1),
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
      maxGuests: parseAsInteger,
      guestsDisabledAccess: parseAsBoolean,
      guestsPetsAllowed: parseAsBoolean,
      buildingYear: parseAsString,
      buildingCondition: parseAsString,
      buildingRenovation: parseAsString,
      buildingPropertyClass: parseAsString,
      view: parseAsString,
      ceilingMin: parseAsInteger,
      ceilingMax: parseAsInteger,
      moveInDate: parseAsString,
      showWithoutDate: parseAsBoolean,
      specialDisabledAccess: parseAsBoolean,
      specialPetsAllowed: parseAsBoolean,
      specialSmokingAllowed: parseAsBoolean,
      specialNegotiablePrice: parseAsBoolean,
      specialTouristLicense: parseAsBoolean,
      specialLoti: parseAsBoolean,
      specialTitledLand: parseAsBoolean,
      furnishing: parseAsArrayOf(parseAsString),
      layout: parseAsArrayOf(parseAsString),
      buildingAmenities: parseAsArrayOf(parseAsString),
      safety: parseAsArrayOf(parseAsString),
      utilities: parseAsArrayOf(parseAsString),
      basicSupplies: parseAsArrayOf(parseAsString),
      pricePeriod: parseAsString,
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
      page: null,
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
      maxGuests: null,
      guestsDisabledAccess: null,
      guestsPetsAllowed: null,
      buildingYear: null,
      buildingCondition: null,
      buildingRenovation: null,
      buildingPropertyClass: null,
      view: null,
      ceilingMin: null,
      ceilingMax: null,
      moveInDate: null,
      showWithoutDate: null,
      specialDisabledAccess: null,
      specialPetsAllowed: null,
      specialSmokingAllowed: null,
      specialNegotiablePrice: null,
      specialTouristLicense: null,
      specialLoti: null,
      specialTitledLand: null,
      furnishing: null,
      layout: null,
      buildingAmenities: null,
      safety: null,
      utilities: null,
      basicSupplies: null,
      pricePeriod: null,
    });
  };

  return {
    searchParams: {
      dealType: searchParams.dealType as DealType | null,
      locationId: searchParams.locationId,
      propertyTypes: (searchParams.propertyTypes || []) as PropertyType[],
      page: searchParams.page ?? 1,
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
      guests:
        searchParams.maxGuests ||
        searchParams.guestsDisabledAccess ||
        searchParams.guestsPetsAllowed
          ? {
              maxGuests: searchParams.maxGuests ?? undefined,
              disabledAccess: searchParams.guestsDisabledAccess ?? undefined,
              petsAllowed: searchParams.guestsPetsAllowed ?? undefined,
            }
          : undefined,
      building:
        (searchParams.buildingYear && searchParams.buildingYear !== 'undefined') ||
        (searchParams.buildingCondition && searchParams.buildingCondition !== 'undefined') ||
        (searchParams.buildingRenovation && searchParams.buildingRenovation !== 'undefined') ||
        (searchParams.buildingPropertyClass && searchParams.buildingPropertyClass !== 'undefined')
          ? {
              year:
                searchParams.buildingYear && searchParams.buildingYear !== 'undefined'
                  ? searchParams.buildingYear
                  : undefined,
              condition:
                searchParams.buildingCondition && searchParams.buildingCondition !== 'undefined'
                  ? searchParams.buildingCondition
                  : undefined,
              renovation:
                searchParams.buildingRenovation && searchParams.buildingRenovation !== 'undefined'
                  ? searchParams.buildingRenovation
                  : undefined,
              propertyClass:
                searchParams.buildingPropertyClass &&
                searchParams.buildingPropertyClass !== 'undefined'
                  ? searchParams.buildingPropertyClass
                  : undefined,
            }
          : undefined,
      view: searchParams.view ?? undefined,
      ceilingMin: searchParams.ceilingMin ?? undefined,
      ceilingMax: searchParams.ceilingMax ?? undefined,
      availability:
        searchParams.moveInDate || searchParams.showWithoutDate
          ? {
              moveInDate: searchParams.moveInDate ?? undefined,
              showWithoutDate: searchParams.showWithoutDate ?? undefined,
            }
          : undefined,
      specialCondition:
        searchParams.specialDisabledAccess ||
        searchParams.specialPetsAllowed ||
        searchParams.specialSmokingAllowed ||
        searchParams.specialNegotiablePrice ||
        searchParams.specialTouristLicense ||
        searchParams.specialLoti ||
        searchParams.specialTitledLand
          ? {
              disabledAccess: searchParams.specialDisabledAccess ?? undefined,
              petsAllowed: searchParams.specialPetsAllowed ?? undefined,
              smokingAllowed: searchParams.specialSmokingAllowed ?? undefined,
              negotiablePrice: searchParams.specialNegotiablePrice ?? undefined,
              touristLicense: searchParams.specialTouristLicense ?? undefined,
              loti: searchParams.specialLoti ?? undefined,
              titledLand: searchParams.specialTitledLand ?? undefined,
            }
          : undefined,
      furnishing: searchParams.furnishing ?? undefined,
      layout: searchParams.layout ?? undefined,
      buildingAmenities: searchParams.buildingAmenities ?? undefined,
      safety: searchParams.safety ?? undefined,
      utilities: searchParams.utilities ?? undefined,
      basicSupplies: searchParams.basicSupplies ?? undefined,
      pricePeriod: (searchParams.pricePeriod as 'per-day' | 'per-month') ?? undefined,
    },
    setSearchParams,
    clearSearchParams,
  };
};
