'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import InputSelect from '@/components/ui/InputSelect';
import { FilterDropdown } from './FilterDropdown';

interface ViewFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

const VIEW_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'Sea view', value: 'sea' },
  { label: 'Mountain view', value: 'mountain' },
  { label: 'City view', value: 'city' },
  { label: 'Garden view', value: 'garden' },
  { label: 'Pool view', value: 'pool' },
  { label: 'No view', value: 'no-view' },
];

export const ViewFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: ViewFilterProps) => {
  const viewValue = (value as string) || 'any';
  const [tempValue, setTempValue] = useState<string>(viewValue);

  useEffect(() => {
    setTempValue(viewValue);
  }, [viewValue]);

  const handleChange = (val: string) => {
    setTempValue(val);
    onChange(val === 'any' ? undefined : val);
  };

  const content = (
    <div className="flex flex-col gap-2">
      <label className="body-md text-[var(--color-black)]">View from the window</label>
      <InputSelect
        value={tempValue}
        onChange={handleChange}
        options={VIEW_OPTIONS}
        placeholder="Any"
        size="md"
        variant="outline"
        fullWidth
      />
    </div>
  );

  if (variant === 'compact') {
    const selectedOption = VIEW_OPTIONS.find((opt) => opt.value === viewValue);
    const displayValue = selectedOption?.label || 'View';

    const trigger = (
      <button
        type="button"
        className="flex items-center justify-between w-full min-w-[200px] h-10 px-4 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors"
      >
        <span
          className={`text-base leading-[140%] truncate ${
            viewValue !== 'any' ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]'
          }`}
        >
          {displayValue}
        </span>
      </button>
    );

    const handleClear = () => {
      setTempValue('any');
      onChange(undefined);
    };

    return (
      <FilterDropdown
        trigger={trigger}
        content={content}
        onApply={() => {}}
        onClear={handleClear}
        showActions={false}
        placement="bottom-start"
        className={className}
      />
    );
  }

  return <div className={className}>{content}</div>;
};

