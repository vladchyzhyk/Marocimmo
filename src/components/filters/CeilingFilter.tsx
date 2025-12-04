'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import InputSelect from '@/components/ui/InputSelect';
import { FilterDropdown } from './FilterDropdown';

interface CeilingFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

const CEILING_OPTIONS = [
  { label: 'No min', value: 'no-min' },
  { label: '2.0 m', value: '2.0' },
  { label: '2.5 m', value: '2.5' },
  { label: '3.0 m', value: '3.0' },
  { label: '3.5 m', value: '3.5' },
  { label: '4.0 m', value: '4.0' },
  { label: '4.5 m', value: '4.5' },
  { label: '5.0 m', value: '5.0' },
  { label: '5.5 m', value: '5.5' },
  { label: '6.0+ m', value: '6.0' },
];

const CEILING_MAX_OPTIONS = [
  { label: 'No max', value: 'no-max' },
  { label: '2.0 m', value: '2.0' },
  { label: '2.5 m', value: '2.5' },
  { label: '3.0 m', value: '3.0' },
  { label: '3.5 m', value: '3.5' },
  { label: '4.0 m', value: '4.0' },
  { label: '4.5 m', value: '4.5' },
  { label: '5.0 m', value: '5.0' },
  { label: '5.5 m', value: '5.5' },
  { label: '6.0+ m', value: '6.0' },
];

export const CeilingFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: CeilingFilterProps) => {
  const ceilingValue = value as { min?: number; max?: number } | undefined;

  const [tempMin, setTempMin] = useState<number | undefined>(ceilingValue?.min);
  const [tempMax, setTempMax] = useState<number | undefined>(ceilingValue?.max);

  useEffect(() => {
    setTempMin(ceilingValue?.min);
    setTempMax(ceilingValue?.max);
  }, [ceilingValue?.min, ceilingValue?.max]);

  const applyFilter = (min: number | undefined, max: number | undefined) => {
    const result: { min?: number; max?: number } = {};
    if (min !== undefined) result.min = min;
    if (max !== undefined) result.max = max;
    onChange(Object.keys(result).length > 0 ? result : undefined);
  };

  const handleMinChange = (val: string) => {
    const numValue = val === 'no-min' ? undefined : parseFloat(val);
    setTempMin(numValue);
    if (variant === 'select') {
      applyFilter(numValue, tempMax);
    }
  };

  const handleMaxChange = (val: string) => {
    const numValue = val === 'no-max' ? undefined : parseFloat(val);
    setTempMax(numValue);
    if (variant === 'select') {
      applyFilter(tempMin, numValue);
    }
  };

  const formatValue = (val: number | undefined): string => {
    if (val === undefined) return '';
    if (Number.isInteger(val)) {
      return `${val}.0`;
    }
    return val.toString();
  };

  const getMinValue = () => {
    if (tempMin === undefined) return 'no-min';
    return formatValue(tempMin);
  };

  const getMaxValue = () => {
    if (tempMax === undefined) return 'no-max';
    return formatValue(tempMax);
  };

  const handleApply = () => {
    applyFilter(tempMin, tempMax);
  };

  const handleClear = () => {
    setTempMin(undefined);
    setTempMax(undefined);
    onChange(undefined);
  };

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Ceiling</h3>
        {(tempMin !== undefined || tempMax !== undefined) && (
          <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">Ceiling height (m)</label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputSelect
              value={getMinValue()}
              onChange={handleMinChange}
              options={CEILING_OPTIONS.filter(
                (opt) => opt.value === 'no-min' || parseFloat(opt.value) <= (tempMax || Infinity),
              )}
              placeholder="No min"
              size="md"
              variant="outline"
              fullWidth
            />
          </div>
          <span className="text-[var(--text-body-tint)] body-lg mb-2">-</span>
          <div className="flex-1">
            <InputSelect
              value={getMaxValue()}
              onChange={handleMaxChange}
              options={CEILING_MAX_OPTIONS.filter(
                (opt) => opt.value === 'no-max' || parseFloat(opt.value) >= (tempMin || 0),
              )}
              placeholder="No max"
              size="md"
              variant="outline"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );

  const getDisplayValue = () => {
    if (tempMin !== undefined && tempMax !== undefined) {
      return `${tempMin} - ${tempMax} m`;
    }
    if (tempMin !== undefined) {
      return `From ${tempMin} m`;
    }
    if (tempMax !== undefined) {
      return `Up to ${tempMax} m`;
    }
    return 'Ceiling';
  };

  if (variant === 'compact') {
    const trigger = (
      <button
        type="button"
        className="flex items-center justify-between w-full min-w-[200px] h-10 px-4 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors"
      >
        <span
          className={`text-base leading-[140%] truncate ${
            tempMin !== undefined || tempMax !== undefined
              ? 'text-[var(--accent-green)]'
              : 'text-[var(--color-black)]'
          }`}
        >
          {getDisplayValue()}
        </span>
      </button>
    );

    return (
      <FilterDropdown
        trigger={trigger}
        content={content}
        onApply={handleApply}
        onClear={handleClear}
        showActions={false}
        placement="bottom-start"
        className={className}
      />
    );
  }

  return <div className={className}>{content}</div>;
};

