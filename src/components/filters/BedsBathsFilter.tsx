'use client';

import { useState, useEffect, useMemo } from 'react';
import { BaseFilterProps } from './filter-types';
import { FilterDropdown } from './FilterDropdown';
import { useSearchParams } from '@/hooks/useSearchParams';
import { CheckBox } from '../ui/CheckBox';
import { FilterTriggerButton } from './FilterTriggerButton';

interface BedsBathsFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

const NUMBER_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
];

const EXACT_MATCH_NUMBER_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

export const BedsBathsFilter = ({
  filterId,
  value,
  onChange,
  className = '',
  variant = 'select',
}: BedsBathsFilterProps) => {
  const { searchParams, setSearchParams } = useSearchParams();
  const [tempBedrooms, setTempBedrooms] = useState<number | undefined>(searchParams.bedrooms);
  const [tempBathrooms, setTempBathrooms] = useState<number | undefined>(searchParams.bathrooms);
  const [tempExactMatch, setTempExactMatch] = useState<boolean>(searchParams.exactMatch || false);

  const numberOptions = useMemo(
    () => (tempExactMatch ? EXACT_MATCH_NUMBER_OPTIONS : NUMBER_OPTIONS),
    [tempExactMatch],
  );

  useEffect(() => {
    setTempBedrooms(searchParams.bedrooms);
    setTempBathrooms(searchParams.bathrooms);
    setTempExactMatch(searchParams.exactMatch || false);
  }, [searchParams.bedrooms, searchParams.bathrooms, searchParams.exactMatch]);

  const handleExactMatchChange = (checked: boolean) => {
    setTempExactMatch(checked);
    if (checked) {
      if (tempBedrooms === 0 || tempBedrooms === undefined) {
        setTempBedrooms(undefined);
      }
      if (tempBathrooms === 0 || tempBathrooms === undefined) {
        setTempBathrooms(undefined);
      }
    }
  };

  const getDisplayValue = () => {
    const parts: string[] = [];
    if (tempBedrooms !== undefined && tempBedrooms > 0) {
      const suffix = tempExactMatch ? '' : '+';
      parts.push(`${tempBedrooms}${suffix} ro`);
    }
    if (tempBathrooms !== undefined && tempBathrooms > 0) {
      const suffix = tempExactMatch ? '' : '+';
      parts.push(`${tempBathrooms}${suffix}`);
    }
    return parts.length > 0 ? parts.join(', ') : '';
  };

  const handleBedroomsChange = (val: number) => {
    setTempBedrooms(val === 0 ? undefined : val);
  };

  const handleBathroomsChange = (val: number) => {
    setTempBathrooms(val === 0 ? undefined : val);
  };

  const handleApply = () => {
    setSearchParams({
      bedrooms: tempBedrooms,
      bathrooms: tempBathrooms,
      exactMatch: tempExactMatch,
    });
  };

  const handleClear = () => {
    setTempBedrooms(undefined);
    setTempBathrooms(undefined);
    setTempExactMatch(false);
    setSearchParams({
      bedrooms: undefined,
      bathrooms: undefined,
      exactMatch: undefined,
    });
  };

  const renderNumberSelector = (
    label: string,
    value: number | undefined,
    onChange: (val: number) => void,
  ) => {
    const currentValue = value !== undefined ? value : tempExactMatch ? undefined : 0;

    const getIsSelected = (optionValue: number) => {
      if (currentValue === undefined) {
        return !tempExactMatch && optionValue === 0;
      }
      return currentValue === optionValue;
    };

    return (
      <div className="flex flex-col gap-2">
        <label className="body-md text-[var(--color-black)]">{label}</label>
        <div className="flex items-center border border-[var(--border)] rounded-[8px] overflow-hidden">
          {numberOptions.map((option, index) => {
            const isFirst = index === 0;
            const isLast = index === numberOptions.length - 1;
            const isSelected = getIsSelected(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`
                  flex-1 px-2 py-2.5 body-lg transition-colors
                  ${isFirst ? 'rounded-l-[8px]' : ''}
                  ${isLast ? 'rounded-r-[8px]' : ''}
                  ${index > 0 ? 'border-l border-[var(--border)]' : ''}
                  ${
                    isSelected
                      ? 'bg-white text-[var(--accent-green)]'
                      : 'bg-white text-[var(--text-body-tint)] hover:bg-[var(--bg-tint)]'
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const selectContent = (
    <div className="flex flex-col gap-4 min-w-[400px]">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-bold text-[var(--color-black)]">Rooms</h3>
        <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
          Clear
        </button>
      </div>

      {renderNumberSelector('Number of Rooms', tempBedrooms, handleBedroomsChange)}

      <div className="flex items-center gap-2">
        <CheckBox checked={tempExactMatch} onChange={handleExactMatchChange} />
        <label className="body-md text-[var(--accent-green)]">Use exact match</label>
      </div>

      {renderNumberSelector('Number of Bathrooms', tempBathrooms, handleBathroomsChange)}
    </div>
  );

  if (variant === 'compact') {
    const displayValue = getDisplayValue();

    const trigger = <FilterTriggerButton displayValue={displayValue} placeholder="Beds & Baths" />;

    return (
      <FilterDropdown
        trigger={trigger}
        content={selectContent}
        onApply={handleApply}
        showActions={true}
        placement="bottom-start"
        className={className}
        contentClassName="min-w-[400px] z-[1000]"
      />
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="title-sm font-bold text-[var(--color-black)]">Rooms</h3>

      {renderNumberSelector('Number of Rooms', tempBedrooms, handleBedroomsChange)}

      <div className="flex items-center gap-2">
        <CheckBox checked={tempExactMatch} onChange={handleExactMatchChange} />
        <label className="body-md text-[var(--accent-green)]">Use exact match</label>
      </div>

      {renderNumberSelector('Number of Bathrooms', tempBathrooms, handleBathroomsChange)}
    </div>
  );
};
