'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import InputSelect from '@/components/ui/InputSelect';
import { FilterTriggerButton } from './FilterTriggerButton';

interface AreaFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  unit?: string;
}

const AREA_OPTIONS = [
  { label: 'No min', value: 'no-min' },
  { label: '10 m²', value: '10' },
  { label: '20 m²', value: '20' },
  { label: '30 m²', value: '30' },
  { label: '50 m²', value: '50' },
  { label: '75 m²', value: '75' },
  { label: '100 m²', value: '100' },
  { label: '150 m²', value: '150' },
  { label: '200 m²', value: '200' },
  { label: '300 m²', value: '300' },
  { label: '400 m²', value: '400' },
  { label: '500 m²', value: '500' },
  { label: '750 m²', value: '750' },
  { label: '1,000 m²', value: '1000' },
  { label: '1,500 m²', value: '1500' },
  { label: '2,000 m²', value: '2000' },
  { label: '3,000 m²', value: '3000' },
  { label: '5,000 m²', value: '5000' },
];

const AREA_MAX_OPTIONS = [
  { label: 'No max', value: 'no-max' },
  { label: '10 m²', value: '10' },
  { label: '20 m²', value: '20' },
  { label: '30 m²', value: '30' },
  { label: '50 m²', value: '50' },
  { label: '75 m²', value: '75' },
  { label: '100 m²', value: '100' },
  { label: '150 m²', value: '150' },
  { label: '200 m²', value: '200' },
  { label: '300 m²', value: '300' },
  { label: '400 m²', value: '400' },
  { label: '500 m²', value: '500' },
  { label: '750 m²', value: '750' },
  { label: '1,000 m²', value: '1000' },
  { label: '1,500 m²', value: '1500' },
  { label: '2,000 m²', value: '2000' },
  { label: '3,000 m²', value: '3000' },
  { label: '5,000 m²', value: '5000' },
];

export const AreaFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
  unit = 'm²',
}: AreaFilterProps) => {
  const areaValue = value as
    | {
        livingAreaMin?: number;
        livingAreaMax?: number;
        totalAreaMin?: number;
        totalAreaMax?: number;
      }
    | undefined;

  const [tempLivingAreaMin, setTempLivingAreaMin] = useState<number | undefined>(
    areaValue?.livingAreaMin,
  );
  const [tempLivingAreaMax, setTempLivingAreaMax] = useState<number | undefined>(
    areaValue?.livingAreaMax,
  );
  const [tempTotalAreaMin, setTempTotalAreaMin] = useState<number | undefined>(
    areaValue?.totalAreaMin,
  );
  const [tempTotalAreaMax, setTempTotalAreaMax] = useState<number | undefined>(
    areaValue?.totalAreaMax,
  );

  useEffect(() => {
    setTempLivingAreaMin(areaValue?.livingAreaMin);
    setTempLivingAreaMax(areaValue?.livingAreaMax);
    setTempTotalAreaMin(areaValue?.totalAreaMin);
    setTempTotalAreaMax(areaValue?.totalAreaMax);
  }, [
    areaValue?.livingAreaMin,
    areaValue?.livingAreaMax,
    areaValue?.totalAreaMin,
    areaValue?.totalAreaMax,
  ]);

  const handleLivingAreaMinChange = (val: string) => {
    const numValue = val === 'no-min' ? undefined : parseInt(val, 10);
    setTempLivingAreaMin(numValue);
  };

  const handleLivingAreaMaxChange = (val: string) => {
    const numValue = val === 'no-max' ? undefined : parseInt(val, 10);
    setTempLivingAreaMax(numValue);
  };

  const handleTotalAreaMinChange = (val: string) => {
    const numValue = val === 'no-min' ? undefined : parseInt(val, 10);
    setTempTotalAreaMin(numValue);
  };

  const handleTotalAreaMaxChange = (val: string) => {
    const numValue = val === 'no-max' ? undefined : parseInt(val, 10);
    setTempTotalAreaMax(numValue);
  };

  const getLivingAreaMinValue = () =>
    tempLivingAreaMin !== undefined ? tempLivingAreaMin.toString() : 'no-min';
  const getLivingAreaMaxValue = () =>
    tempLivingAreaMax !== undefined ? tempLivingAreaMax.toString() : 'no-max';
  const getTotalAreaMinValue = () =>
    tempTotalAreaMin !== undefined ? tempTotalAreaMin.toString() : 'no-min';
  const getTotalAreaMaxValue = () =>
    tempTotalAreaMax !== undefined ? tempTotalAreaMax.toString() : 'no-max';

  const handleApply = () => {
    onChange({
      livingAreaMin: tempLivingAreaMin,
      livingAreaMax: tempLivingAreaMax,
      totalAreaMin: tempTotalAreaMin,
      totalAreaMax: tempTotalAreaMax,
    });
  };

  const handleClear = () => {
    setTempLivingAreaMin(undefined);
    setTempLivingAreaMax(undefined);
    setTempTotalAreaMin(undefined);
    setTempTotalAreaMax(undefined);
    onChange(undefined);
  };

  const getDisplayValue = () => {
    const hasLivingArea = tempLivingAreaMin !== undefined || tempLivingAreaMax !== undefined;
    const hasTotalArea = tempTotalAreaMin !== undefined || tempTotalAreaMax !== undefined;

    if (hasLivingArea) {
      if (tempLivingAreaMin !== undefined && tempLivingAreaMax !== undefined) {
        return `${tempLivingAreaMin}-${tempLivingAreaMax} ${unit}`;
      }
      if (tempLivingAreaMin !== undefined) {
        return `From ${tempLivingAreaMin} ${unit}`;
      }
      if (tempLivingAreaMax !== undefined) {
        return `To ${tempLivingAreaMax} ${unit}`;
      }
    }

    if (hasTotalArea) {
      if (tempTotalAreaMin !== undefined && tempTotalAreaMax !== undefined) {
        return `${tempTotalAreaMin}-${tempTotalAreaMax} ${unit}`;
      }
      if (tempTotalAreaMin !== undefined) {
        return `From ${tempTotalAreaMin} ${unit}`;
      }
      if (tempTotalAreaMax !== undefined) {
        return `To ${tempTotalAreaMax} ${unit}`;
      }
    }

    return '';
  };

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Area</h3>
        <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">Living Area (m²)</label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputSelect
              value={getLivingAreaMinValue()}
              onChange={handleLivingAreaMinChange}
              options={AREA_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-min' ||
                  parseInt(opt.value, 10) <= (tempLivingAreaMax || Infinity),
              )}
              placeholder="No min"
              size="md"
              variant="outline"
              fullWidth
              className="w-full"
            />
          </div>
          <span className="text-[var(--text-body-tint)] body-lg mb-2">-</span>
          <div className="flex-1">
            <InputSelect
              value={getLivingAreaMaxValue()}
              onChange={handleLivingAreaMaxChange}
              options={AREA_MAX_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-max' || parseInt(opt.value, 10) >= (tempLivingAreaMin || 0),
              )}
              placeholder="No max"
              size="md"
              variant="outline"
              fullWidth
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">Total Area (m²)</label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputSelect
              value={getTotalAreaMinValue()}
              onChange={handleTotalAreaMinChange}
              options={AREA_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-min' ||
                  parseInt(opt.value, 10) <= (tempTotalAreaMax || Infinity),
              )}
              placeholder="No min"
              size="md"
              variant="outline"
              fullWidth
              className="w-full"
            />
          </div>
          <span className="text-[var(--text-body-tint)] body-lg mb-2">-</span>
          <div className="flex-1">
            <InputSelect
              value={getTotalAreaMaxValue()}
              onChange={handleTotalAreaMaxChange}
              options={AREA_MAX_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-max' || parseInt(opt.value, 10) >= (tempTotalAreaMin || 0),
              )}
              placeholder="No max"
              size="md"
              variant="outline"
              fullWidth
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    const trigger = (
      <FilterTriggerButton displayValue={getDisplayValue()} placeholder="Area" />
    );

    return (
      <FilterDropdown
        trigger={trigger}
        content={content}
        onApply={handleApply}
        showActions={true}
        placement="bottom-start"
        className={className}
        contentClassName="min-w-[400px]"
      />
    );
  }

  return <div className={className}>{content}</div>;
};
