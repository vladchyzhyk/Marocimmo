'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { CheckBox } from '@/components/ui/CheckBox';
import Input from '@/components/ui/Input';
import { FilterDropdown } from './FilterDropdown';

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

  const handleApply = () => {
    const result: {
      moveInDate?: string;
      showWithoutDate?: boolean;
    } = {};
    if (tempMoveInDate) result.moveInDate = tempMoveInDate;
    if (tempShowWithoutDate) result.showWithoutDate = tempShowWithoutDate;
    onChange(Object.keys(result).length > 0 ? result : undefined);
  };

  const handleClear = () => {
    setTempMoveInDate('');
    setTempShowWithoutDate(false);
    onChange(undefined);
  };

  const hasSelection = tempMoveInDate || tempShowWithoutDate;

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
          <label className="body-md text-[var(--color-black)]">
            I want to move in no later than:
          </label>
          <Input
            type="date"
            value={tempMoveInDate}
            onChange={(e) => setTempMoveInDate(e.target.value)}
            placeholder="mm/dd/yyyy"
            calendar={true}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <CheckBox checked={tempShowWithoutDate} onChange={setTempShowWithoutDate} />
          <label className="body-md text-[var(--color-black)] cursor-pointer">
            Also show properties without a specified move-in date
          </label>
        </div>
      </div>
    </div>
  );

  const getDisplayValue = () => {
    if (tempMoveInDate) {
      return `Move in: ${new Date(tempMoveInDate).toLocaleDateString()}`;
    }
    if (tempShowWithoutDate) {
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
        showActions={false}
        placement="bottom-start"
        className={className}
      />
    );
  }

  return <div className={className}>{content}</div>;
};
