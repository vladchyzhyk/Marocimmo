'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import { PlusIcon, MinusIcon } from '@/utils/icons';
import Toggle from '@/components/Toggle';
import Image from 'next/image';

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

  const handleIncrement = () => {
    setTempMaxGuests((prev) => Math.min(prev + 1, 20));
  };

  const handleDecrement = () => {
    setTempMaxGuests((prev) => Math.max(prev - 1, 0));
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Guests</h3>
        <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">Max guests</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-[8px] hover:bg-[var(--bg-tint)] transition-colors"
          >
            <MinusIcon className="w-4 h-4 text-[var(--color-black)]" />
          </button>
          <span className="body-lg text-[var(--color-black)] min-w-[40px] text-center">
            {tempMaxGuests}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-[8px] hover:bg-[var(--bg-tint)] transition-colors"
          >
            <PlusIcon className="w-4 h-4 text-[var(--color-black)]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="body-md text-[var(--color-black)]">Disabled Access</label>
          <Toggle checked={tempDisabledAccess} onChange={setTempDisabledAccess} />
        </div>
        <div className="flex items-center justify-between">
          <label className="body-md text-[var(--color-black)]">Pets Allowed</label>
          <Toggle checked={tempPetsAllowed} onChange={setTempPetsAllowed} />
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
          {getDisplayValue() || 'Guests'}
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
        onClear={handleClear}
        showActions={true}
        placement="bottom-start"
        className={className}
        contentClassName="min-w-[300px]"
      />
    );
  }

  return <div className={className}>{content}</div>;
};

