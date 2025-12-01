'use client';

import { FilterComponent } from './filter-types';
import { FilterConfig } from './filters-config';
import { FilterRange } from './FilterRange';
import { FilterNumber } from './FilterNumber';
import { FilterSelect } from './FilterSelect';
import { FilterToggle } from './FilterToggle';
import { BaseFilterProps } from './filter-types';

const createDefaultDesktop = (config: FilterConfig) => {
  return ({ filterId, value, onChange, className }: BaseFilterProps) => {
    switch (config.type) {
      case 'range':
        const rangeValue = value as { min?: number; max?: number } | undefined;
        return (
          <FilterRange
            label={config.label}
            min={config.min}
            max={config.max}
            valueMin={rangeValue?.min}
            valueMax={rangeValue?.max}
            onChange={(min, max) => onChange({ min, max })}
            unit={config.unit}
            className={className}
          />
        );

      case 'number':
        return (
          <FilterNumber
            label={config.label}
            value={value as number | undefined}
            onChange={(val) => onChange(val)}
            min={config.min}
            max={config.max}
            className={className}
          />
        );

      case 'select':
        return (
          <FilterSelect
            label={config.label}
            value={value as string | undefined}
            onChange={(val) => onChange(val)}
            options={config.options || []}
            className={className}
          />
        );

      case 'toggle':
        return (
          <FilterToggle
            label={config.label}
            value={value as boolean | undefined}
            onChange={(val) => onChange(val)}
            className={className}
          />
        );

      default:
        return null;
    }
  };
};

const createDefaultMobile = (config: FilterConfig) => {
  return ({ filterId, value, onChange, className }: BaseFilterProps) => {
    switch (config.type) {
      case 'range':
        const rangeValue = value as { min?: number; max?: number } | undefined;
        return (
          <FilterRange
            label={config.label}
            min={config.min}
            max={config.max}
            valueMin={rangeValue?.min}
            valueMax={rangeValue?.max}
            onChange={(min, max) => onChange({ min, max })}
            unit={config.unit}
            className={className}
          />
        );

      case 'number':
        return (
          <FilterNumber
            label={config.label}
            value={value as number | undefined}
            onChange={(val) => onChange(val)}
            min={config.min}
            max={config.max}
            className={className}
          />
        );

      case 'select':
        return (
          <FilterSelect
            label={config.label}
            value={value as string | undefined}
            onChange={(val) => onChange(val)}
            options={config.options || []}
            className={className}
          />
        );

      case 'toggle':
        return (
          <FilterToggle
            label={config.label}
            value={value as boolean | undefined}
            onChange={(val) => onChange(val)}
            className={className}
          />
        );

      default:
        return null;
    }
  };
};

export const createDefaultComponents = (config: FilterConfig): FilterComponent => ({
  Desktop: createDefaultDesktop(config),
  Mobile: createDefaultMobile(config),
});
