'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { CheckBox } from '@/components/ui/CheckBox';
import { FilterDropdown } from './FilterDropdown';
import { DatePickerInput } from '@/components/ui/DatePickerInput';

interface AvailabilityFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

export const AvailabilityFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: AvailabilityFilterProps) => {
  const availabilityValue = value as
    | {
        moveInDate?: string;
        showWithoutDate?: boolean;
      }
    | undefined;

  const [tempMoveInDate, setTempMoveInDate] = useState<string>(availabilityValue?.moveInDate || '');
  const [tempShowWithoutDate, setTempShowWithoutDate] = useState<boolean>(
    availabilityValue?.showWithoutDate || false,
  );

  useEffect(() => {
    setTempMoveInDate(availabilityValue?.moveInDate || '');
    setTempShowWithoutDate(availabilityValue?.showWithoutDate || false);
  }, [availabilityValue?.moveInDate, availabilityValue?.showWithoutDate]);

  const buildAvailabilityValue = (moveInDate: string, showWithoutDate: boolean) => {
    const result: {
      moveInDate?: string;
      showWithoutDate?: boolean;
    } = {};

    if (moveInDate) {
      result.moveInDate = moveInDate;
    }
    if (showWithoutDate) {
      result.showWithoutDate = showWithoutDate;
    }

    return Object.keys(result).length > 0 ? result : undefined;
  };

  const handleMoveInDateChange = (nextValue: string) => {
    setTempMoveInDate(nextValue);
    if (variant === 'select') {
      onChange(buildAvailabilityValue(nextValue, tempShowWithoutDate));
    }
  };

  const handleShowWithoutDateChange = (nextValue: boolean) => {
    setTempShowWithoutDate(nextValue);
    if (variant === 'select') {
      onChange(buildAvailabilityValue(tempMoveInDate, nextValue));
    }
  };

  const handleApply = () => {
    onChange(buildAvailabilityValue(tempMoveInDate, tempShowWithoutDate));
  };

  const handleClear = () => {
    setTempMoveInDate('');
    setTempShowWithoutDate(false);
    onChange(undefined);
  };

  const hasSelection = availabilityValue?.moveInDate || availabilityValue?.showWithoutDate;

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Availability</h3>
        {hasSelection && (
          <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <DatePickerInput
            id="availability-move-in-date"
            label="I want to move in no later than:"
            value={tempMoveInDate}
            onChange={handleMoveInDateChange}
            placeholder="mm/dd/yyyy"
            inputClassName="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <CheckBox checked={tempShowWithoutDate} onChange={handleShowWithoutDateChange} />
          <label className="body-md text-[var(--color-black)] cursor-pointer">
            Also show properties without a specified move-in date
          </label>
        </div>
      </div>
    </div>
  );

  const getDisplayValue = () => {
    if (availabilityValue?.moveInDate) {
      return `Move in: ${new Date(availabilityValue.moveInDate).toLocaleDateString()}`;
    }
    if (availabilityValue?.showWithoutDate) {
      return 'Show without date';
    }
    return 'Availability';
  };

  if (variant === 'compact') {
    const trigger = (
      <button
        type="button"
        className="flex items-center justify-between w-full min-w-[200px] h-10 px-4 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors"
      >
        <span
          className={`text-base leading-[140%] truncate ${
            hasSelection ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]'
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
        showActions={true}
        placement="bottom-start"
        className={className}
      />
    );
  }

  return <div className={className}>{content}</div>;
};
