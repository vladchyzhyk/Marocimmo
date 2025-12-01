export type FilterValue =
  | number
  | string
  | boolean
  | string[]
  | { min?: number; max?: number }
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
