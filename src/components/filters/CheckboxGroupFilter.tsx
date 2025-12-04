'use client';

import { useState, useEffect, useRef } from 'react';
import { BaseFilterProps } from './filter-types';
import { CheckBox } from '@/components/ui/CheckBox';

interface CheckboxGroupFilterProps extends BaseFilterProps {
  title: string;
  options: { label: string; value: string }[];
  variant?: 'compact' | 'select';
}

const arraysEqual = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
};

export const CheckboxGroupFilter = ({
  title,
  options,
  value,
  onChange,
  className = '',
  variant = 'select',
}: CheckboxGroupFilterProps) => {
  const selectedValues = (value as string[]) || [];
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);
  const prevValueRef = useRef<string[]>(selectedValues);

  useEffect(() => {
    const valueArray = (value as string[]) || [];
    if (!arraysEqual(prevValueRef.current, valueArray)) {
      setTempSelected(valueArray);
      prevValueRef.current = valueArray;
    }
  }, [value]);

  const handleToggle = (optionValue: string) => {
    const newSelected = tempSelected.includes(optionValue)
      ? tempSelected.filter((v) => v !== optionValue)
      : [...tempSelected, optionValue];
    setTempSelected(newSelected);
    onChange(newSelected);
  };

  const handleClear = () => {
    setTempSelected([]);
    onChange([]);
  };

  const hasSelection = tempSelected.length > 0;

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center justify-between">
          <h3 className="title-sm font-medium text-[var(--color-black)]">{title}</h3>
          {hasSelection && (
            <button
              className="title-sm text-[var(--accent-green)] hover:underline"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {options.map((option) => {
            const isChecked = tempSelected.includes(option.value);
            return (
              <div key={option.value} className="flex items-center gap-2">
                <CheckBox checked={isChecked} onChange={() => handleToggle(option.value)} />
                <label className="body-md text-[var(--color-black)] cursor-pointer">
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h3 className="title-sm font-medium text-[var(--color-black)]">{title}</h3>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isChecked = tempSelected.includes(option.value);
          return (
            <div key={option.value} className="flex items-center gap-2">
              <CheckBox checked={isChecked} onChange={() => handleToggle(option.value)} />
              <label className="body-md text-[var(--color-black)] cursor-pointer">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

