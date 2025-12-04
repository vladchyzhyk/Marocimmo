'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import { PlusIcon, MinusIcon } from '@/utils/icons';
import Toggle from '@/components/Toggle';
import { FilterTriggerButton } from './FilterTriggerButton';

interface GuestsFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

export const GuestsFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: GuestsFilterProps) => {
  const guestsValue = value as
    | {
        maxGuests?: number;
        disabledAccess?: boolean;
        petsAllowed?: boolean;
      }
    | undefined;

  const [tempMaxGuests, setTempMaxGuests] = useState<number>(guestsValue?.maxGuests || 0);
  const [tempDisabledAccess, setTempDisabledAccess] = useState<boolean>(
    guestsValue?.disabledAccess || false,
  );
  const [tempPetsAllowed, setTempPetsAllowed] = useState<boolean>(guestsValue?.petsAllowed || false);

  useEffect(() => {
    setTempMaxGuests(guestsValue?.maxGuests || 0);
    setTempDisabledAccess(guestsValue?.disabledAccess || false);
    setTempPetsAllowed(guestsValue?.petsAllowed || false);
  }, [guestsValue?.maxGuests, guestsValue?.disabledAccess, guestsValue?.petsAllowed]);

  const applyImmediateChange = (
    nextMaxGuests: number,
    nextDisabledAccess: boolean,
    nextPetsAllowed: boolean,
  ) => {
    if (variant !== 'select') {
      return;
    }

    onChange({
      maxGuests: nextMaxGuests > 0 ? nextMaxGuests : undefined,
      disabledAccess: nextDisabledAccess,
      petsAllowed: nextPetsAllowed,
    });
  };

  const handleIncrement = () => {
    setTempMaxGuests((prev) => {
      const next = Math.min(prev + 1, 20);
      applyImmediateChange(next, tempDisabledAccess, tempPetsAllowed);
      return next;
    });
  };

  const handleDecrement = () => {
    setTempMaxGuests((prev) => {
      const next = Math.max(prev - 1, 0);
      applyImmediateChange(next, tempDisabledAccess, tempPetsAllowed);
      return next;
    });
  };

  const handleDisabledAccessChange = (nextValue: boolean) => {
    setTempDisabledAccess(nextValue);
    applyImmediateChange(tempMaxGuests, nextValue, tempPetsAllowed);
  };

  const handlePetsAllowedChange = (nextValue: boolean) => {
    setTempPetsAllowed(nextValue);
    applyImmediateChange(tempMaxGuests, tempDisabledAccess, nextValue);
  };

  const handleApply = () => {
    onChange({
      maxGuests: tempMaxGuests > 0 ? tempMaxGuests : undefined,
      disabledAccess: tempDisabledAccess,
      petsAllowed: tempPetsAllowed,
    });
  };

  const handleClear = () => {
    setTempMaxGuests(0);
    setTempDisabledAccess(false);
    setTempPetsAllowed(false);
    onChange(undefined);
  };

  const getDisplayValue = () => {
    if (tempMaxGuests > 0) {
      return `${tempMaxGuests} guests`;
    }
    return '';
  };

  const content = (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between py-2">
        <h3 className="title-sm font-bold text-[#222222]">Guests</h3>
        <button
          type="button"
          onClick={handleClear}
          className="title-sm font-bold text-[#519C2C]"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[#222222]">Max guests</label>
        <div className="flex h-12 w-full items-center rounded-[8px] border border-[#519C2C] bg-white px-1">
          <button
            type="button"
            onClick={handleDecrement}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#FAFAFA]"
          >
            <MinusIcon className="h-4 w-4 text-[#222222]" />
          </button>
          <div className="flex flex-1 items-center justify-center">
            <span className="body-lg flex min-w-[40px] items-center justify-center text-center text-[#519C2C]">
              {tempMaxGuests}
            </span>
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#FAFAFA]"
          >
            <PlusIcon className="h-4 w-4 text-[#222222]" />
          </button>
        </div>
      </div>

      <div className="h-px w-full border-b border-[#E5E5E5]" />

      <div className="flex flex-col gap-4">
        <h4 className="title-sm font-bold text-[#222222]">Options</h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="body-md text-[#222222]">Disabled Access</span>
            <Toggle checked={tempDisabledAccess} onChange={handleDisabledAccessChange} />
          </div>
          <div className="flex items-center justify-between">
            <span className="body-md text-[#222222]">Pets Allowed</span>
            <Toggle checked={tempPetsAllowed} onChange={handlePetsAllowedChange} />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    const trigger = (
      <FilterTriggerButton displayValue={getDisplayValue()} placeholder="Guests" />
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
        contentClassName="w-[248px] !bg-[#FAFAFA] !border-[#E5E5E5] shadow-[0_8px_24px_2px_rgba(23,23,23,0.12)]"
      />
    );
  }

  return <div className={className}>{content}</div>;
};

