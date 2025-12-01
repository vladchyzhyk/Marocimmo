'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import InputSelect from '@/components/ui/InputSelect';
import Image from 'next/image';

interface FloorFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

const FLOOR_LEVEL_OPTIONS = [
  { label: 'No min', value: 'no-min' },
  { label: 'Ground', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30+', value: '30' },
];

const FLOOR_LEVEL_MAX_OPTIONS = [
  { label: 'No max', value: 'no-max' },
  { label: 'Ground', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30+', value: '30' },
];

const TOTAL_FLOORS_OPTIONS = [
  { label: 'No min', value: 'no-min' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30+', value: '30' },
];

const TOTAL_FLOORS_MAX_OPTIONS = [
  { label: 'No max', value: 'no-max' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30+', value: '30' },
];

export const FloorFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: FloorFilterProps) => {
  const floorValue = value as
    | {
        floorLevelMin?: number;
        floorLevelMax?: number;
        totalFloorsMin?: number;
        totalFloorsMax?: number;
      }
    | undefined;

  const [tempFloorLevelMin, setTempFloorLevelMin] = useState<number | undefined>(
    floorValue?.floorLevelMin,
  );
  const [tempFloorLevelMax, setTempFloorLevelMax] = useState<number | undefined>(
    floorValue?.floorLevelMax,
  );
  const [tempTotalFloorsMin, setTempTotalFloorsMin] = useState<number | undefined>(
    floorValue?.totalFloorsMin,
  );
  const [tempTotalFloorsMax, setTempTotalFloorsMax] = useState<number | undefined>(
    floorValue?.totalFloorsMax,
  );

  useEffect(() => {
    setTempFloorLevelMin(floorValue?.floorLevelMin);
    setTempFloorLevelMax(floorValue?.floorLevelMax);
    setTempTotalFloorsMin(floorValue?.totalFloorsMin);
    setTempTotalFloorsMax(floorValue?.totalFloorsMax);
  }, [
    floorValue?.floorLevelMin,
    floorValue?.floorLevelMax,
    floorValue?.totalFloorsMin,
    floorValue?.totalFloorsMax,
  ]);

  const handleFloorLevelMinChange = (val: string) => {
    const numValue = val === 'no-min' ? undefined : parseInt(val, 10);
    setTempFloorLevelMin(numValue);
  };

  const handleFloorLevelMaxChange = (val: string) => {
    const numValue = val === 'no-max' ? undefined : parseInt(val, 10);
    setTempFloorLevelMax(numValue);
  };

  const handleTotalFloorsMinChange = (val: string) => {
    const numValue = val === 'no-min' ? undefined : parseInt(val, 10);
    setTempTotalFloorsMin(numValue);
  };

  const handleTotalFloorsMaxChange = (val: string) => {
    const numValue = val === 'no-max' ? undefined : parseInt(val, 10);
    setTempTotalFloorsMax(numValue);
  };

  const getFloorLevelMinValue = () =>
    tempFloorLevelMin !== undefined ? tempFloorLevelMin.toString() : 'no-min';
  const getFloorLevelMaxValue = () =>
    tempFloorLevelMax !== undefined ? tempFloorLevelMax.toString() : 'no-max';
  const getTotalFloorsMinValue = () =>
    tempTotalFloorsMin !== undefined ? tempTotalFloorsMin.toString() : 'no-min';
  const getTotalFloorsMaxValue = () =>
    tempTotalFloorsMax !== undefined ? tempTotalFloorsMax.toString() : 'no-max';

  const handleApply = () => {
    onChange({
      floorLevelMin: tempFloorLevelMin,
      floorLevelMax: tempFloorLevelMax,
      totalFloorsMin: tempTotalFloorsMin,
      totalFloorsMax: tempTotalFloorsMax,
    });
  };

  const handleClear = () => {
    setTempFloorLevelMin(undefined);
    setTempFloorLevelMax(undefined);
    setTempTotalFloorsMin(undefined);
    setTempTotalFloorsMax(undefined);
    onChange(undefined);
  };

  const getDisplayValue = () => {
    const hasFloorLevel = tempFloorLevelMin !== undefined || tempFloorLevelMax !== undefined;
    const hasTotalFloors = tempTotalFloorsMin !== undefined || tempTotalFloorsMax !== undefined;

    if (hasFloorLevel) {
      if (tempFloorLevelMin !== undefined && tempFloorLevelMax !== undefined) {
        return `${tempFloorLevelMin === 0 ? 'Ground' : tempFloorLevelMin}-${tempFloorLevelMax === 0 ? 'Ground' : tempFloorLevelMax}`;
      }
      if (tempFloorLevelMin !== undefined) {
        return `From ${tempFloorLevelMin === 0 ? 'Ground' : tempFloorLevelMin}`;
      }
      if (tempFloorLevelMax !== undefined) {
        return `To ${tempFloorLevelMax === 0 ? 'Ground' : tempFloorLevelMax}`;
      }
    }

    if (hasTotalFloors) {
      if (tempTotalFloorsMin !== undefined && tempTotalFloorsMax !== undefined) {
        return `${tempTotalFloorsMin}-${tempTotalFloorsMax} floors`;
      }
      if (tempTotalFloorsMin !== undefined) {
        return `From ${tempTotalFloorsMin} floors`;
      }
      if (tempTotalFloorsMax !== undefined) {
        return `To ${tempTotalFloorsMax} floors`;
      }
    }

    return '';
  };

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Floor</h3>
        <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">Floor level</label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputSelect
              value={getFloorLevelMinValue()}
              onChange={handleFloorLevelMinChange}
              options={FLOOR_LEVEL_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-min' ||
                  parseInt(opt.value, 10) <= (tempFloorLevelMax ?? Infinity),
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
              value={getFloorLevelMaxValue()}
              onChange={handleFloorLevelMaxChange}
              options={FLOOR_LEVEL_MAX_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-max' ||
                  parseInt(opt.value, 10) >= (tempFloorLevelMin ?? -Infinity),
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
        <label className="body-md text-[var(--color-black)]">Number of floors</label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <InputSelect
              value={getTotalFloorsMinValue()}
              onChange={handleTotalFloorsMinChange}
              options={TOTAL_FLOORS_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-min' ||
                  parseInt(opt.value, 10) <= (tempTotalFloorsMax || Infinity),
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
              value={getTotalFloorsMaxValue()}
              onChange={handleTotalFloorsMaxChange}
              options={TOTAL_FLOORS_MAX_OPTIONS.filter(
                (opt) =>
                  opt.value === 'no-max' ||
                  parseInt(opt.value, 10) >= (tempTotalFloorsMin || 0),
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
      <button
        type="button"
        className="w-full h-10 rounded-[8px] px-4 border border-[var(--border)] bg-white text-[var(--color-black)] body-lg outline-none transition-colors cursor-pointer flex items-center justify-between hover:bg-[var(--bg-tint)] focus:border-[var(--accent-green)]"
      >
        <span
          className={
            getDisplayValue() ? 'text-[var(--accent-green)]' : 'text-[var(--text-body-tint)]'
          }
        >
          {getDisplayValue() || 'Floor'}
        </span>
        <Image
          src="/icons/ic_arrow_down.svg"
          alt="Select"
          width={20}
          height={20}
          className="transition-transform"
        />
      </button>
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

