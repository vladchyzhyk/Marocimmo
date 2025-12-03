'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import { formatFilterValue } from '@/utils/filterUtils';
import InputSelect from '@/components/ui/InputSelect';
import SegmentControl from '@/components/SegmentControl';
import { FilterTriggerButton } from './FilterTriggerButton';

interface PriceRangeProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  unit?: string;
  showPeriodToggle?: boolean;
}

const PRICE_MIN_OPTIONS = [
  { label: 'No min', value: 'no-min' },
  { label: '1,000 DH', value: '1000' },
  { label: '2,000 DH', value: '2000' },
  { label: '5,000 DH', value: '5000' },
  { label: '10,000 DH', value: '10000' },
  { label: '15,000 DH', value: '15000' },
  { label: '20,000 DH', value: '20000' },
  { label: '30,000 DH', value: '30000' },
  { label: '50,000 DH', value: '50000' },
  { label: '100,000 DH', value: '100000' },
  { label: '200,000 DH', value: '200000' },
  { label: '500,000 DH', value: '500000' },
  { label: '1,000,000 DH', value: '1000000' },
  { label: '2,000,000 DH', value: '2000000' },
  { label: '5,000,000 DH', value: '5000000' },
];

const PRICE_MAX_OPTIONS = [
  { label: 'No max', value: 'no-max' },
  { label: '1,000 DH', value: '1000' },
  { label: '2,000 DH', value: '2000' },
  { label: '5,000 DH', value: '5000' },
  { label: '10,000 DH', value: '10000' },
  { label: '15,000 DH', value: '15000' },
  { label: '20,000 DH', value: '20000' },
  { label: '30,000 DH', value: '30000' },
  { label: '50,000 DH', value: '50000' },
  { label: '100,000 DH', value: '100000' },
  { label: '200,000 DH', value: '200000' },
  { label: '500,000 DH', value: '500000' },
  { label: '1,000,000 DH', value: '1000000' },
  { label: '2,000,000 DH', value: '2000000' },
  { label: '5,000,000 DH', value: '5000000' },
];

export const PriceRange = ({
  value,
  onChange,
  className = '',
  variant = 'select',
  unit = 'DH',
  showPeriodToggle = false,
}: PriceRangeProps) => {
  const rangeValue = value as
    | { min?: number; max?: number; period?: 'per-day' | 'per-month' }
    | undefined;

  const [tempPeriod, setTempPeriod] = useState<'per-day' | 'per-month'>(
    rangeValue?.period || 'per-month',
  );

  useEffect(() => {
    setTempPeriod(rangeValue?.period || 'per-month');
  }, [rangeValue?.period]);

  const handleMinChange = (value: string) => {
    if (value === 'no-min') {
      onChange({ min: undefined, max: rangeValue?.max, period: rangeValue?.period });
    } else {
      const numValue = parseInt(value, 10);
      onChange({ min: numValue, max: rangeValue?.max, period: rangeValue?.period });
    }
  };

  const handleMaxChange = (value: string) => {
    if (value === 'no-max') {
      onChange({ min: rangeValue?.min, max: undefined, period: rangeValue?.period });
    } else {
      const numValue = parseInt(value, 10);
      onChange({ min: rangeValue?.min, max: numValue, period: rangeValue?.period });
    }
  };

  const getMinValue = () => {
    if (!rangeValue?.min) return 'no-min';
    return rangeValue.min.toString();
  };

  const getMaxValue = () => {
    if (!rangeValue?.max) return 'no-max';
    return rangeValue.max.toString();
  };

  const getDisplayValue = () => {
    if (!rangeValue?.min && !rangeValue?.max) {
      return '';
    }

    const minStr = rangeValue.min ? formatFilterValue(rangeValue.min, unit) : 'No min';
    const maxStr = rangeValue.max ? formatFilterValue(rangeValue.max, unit) : 'No max';

    if (rangeValue.min && rangeValue.max) {
      return `${minStr} - ${maxStr}`;
    }
    if (rangeValue.min) {
      return `From ${minStr}`;
    }
    if (rangeValue.max) {
      return `Up to ${maxStr}`;
    }

    return '';
  };

  const handlePeriodChange = (val: string) => {
    setTempPeriod(val as 'per-day' | 'per-month');
    onChange({ ...rangeValue, period: val as 'per-day' | 'per-month' });
  };

  const selectContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Price range</h3>
        {showPeriodToggle && (
          <SegmentControl
            type="switch"
            options={[
              { label: 'Price range', value: 'per-month' },
              { label: 'per day', value: 'per-day' },
            ]}
            value={tempPeriod}
            onChange={handlePeriodChange}
          />
        )}
        {!showPeriodToggle && (
          <span className="px-2 py-1 bg-[var(--color-black)] text-white rounded-full text-xs">
            per month
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="body-md text-[var(--color-black)] mb-2 block">Minimum</label>
          <InputSelect
            value={getMinValue()}
            onChange={handleMinChange}
            options={PRICE_MIN_OPTIONS}
            placeholder="No min"
            size="md"
            variant="outline"
            fullWidth
            className="w-full"
          />
        </div>
        <span className="text-[var(--text-body-tint)] body-lg mb-2">-</span>
        <div className="flex-1">
          <label className="body-md text-[var(--color-black)] mb-2 block">Maximum</label>
          <InputSelect
            value={getMaxValue()}
            onChange={handleMaxChange}
            options={PRICE_MAX_OPTIONS}
            placeholder="No max"
            size="md"
            variant="outline"
            fullWidth
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    const displayValue = getDisplayValue();

    const trigger = <FilterTriggerButton displayValue={displayValue} placeholder="Price range" />;

    return (
      <FilterDropdown
        trigger={trigger}
        content={selectContent}
        onApply={() => {}}
        showActions={true}
        placement="bottom-start"
        className={className}
        contentClassName="min-w-[400px] z-[1000]"
      />
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Price range</h3>
        {showPeriodToggle && (
          <SegmentControl
            type="switch"
            options={[
              { label: 'Price range', value: 'per-month' },
              { label: 'per day', value: 'per-day' },
            ]}
            value={tempPeriod}
            onChange={handlePeriodChange}
          />
        )}
        {!showPeriodToggle && (
          <span className="px-2 py-1 bg-[var(--color-black)] text-white rounded-full text-xs">
            per month
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="body-md text-[var(--color-black)] mb-2 block">Minimum</label>
          <InputSelect
            value={getMinValue()}
            onChange={handleMinChange}
            options={PRICE_MIN_OPTIONS}
            placeholder="No min"
            size="md"
            variant="outline"
            fullWidth
            className="w-full"
          />
        </div>
        <span className="text-[var(--text-body-tint)] body-lg mb-2">-</span>
        <div className="flex-1">
          <label className="body-md text-[var(--color-black)] mb-2 block">Maximum</label>
          <InputSelect
            value={getMaxValue()}
            onChange={handleMaxChange}
            options={PRICE_MAX_OPTIONS}
            placeholder="No max"
            size="md"
            variant="outline"
            fullWidth
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
