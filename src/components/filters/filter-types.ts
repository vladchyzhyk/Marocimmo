export type FilterValue =
  | number
  | string
  | boolean
  | string[]
  | { min?: number; max?: number; period?: 'per-day' | 'per-month' }
  | {
      livingAreaMin?: number;
      livingAreaMax?: number;
      totalAreaMin?: number;
      totalAreaMax?: number;
    }
  | {
      floorLevelMin?: number;
      floorLevelMax?: number;
      totalFloorsMin?: number;
      totalFloorsMax?: number;
    }
  | {
      bedrooms?: number;
      bathrooms?: number;
      exactMatch?: boolean;
    }
  | {
      maxGuests?: number;
      disabledAccess?: boolean;
      petsAllowed?: boolean;
    }
  | {
      year?: string;
      condition?: string;
      renovation?: string;
      propertyClass?: string;
    }
  | {
      moveInDate?: string;
      showWithoutDate?: boolean;
    }
  | {
      disabledAccess?: boolean;
      petsAllowed?: boolean;
      smokingAllowed?: boolean;
      negotiablePrice?: boolean;
      touristLicense?: boolean;
      loti?: boolean;
      titledLand?: boolean;
    }
  | undefined;

export interface BaseFilterProps {
  filterId: string;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  className?: string;
}

export interface FilterComponent {
  Desktop: React.ComponentType<BaseFilterProps>;
  Mobile: React.ComponentType<BaseFilterProps>;
}
