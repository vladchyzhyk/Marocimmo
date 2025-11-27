'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import { CheckIcon } from '@/utils/icons';

export type TypePropertySelectOption = {
  label: string;
  value: string;
};

export type TypePropertySelectProps = {
  id?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  options: TypePropertySelectOption[];
  showDivider?: boolean;
};

export default function TypePropertySelect({
  id,
  value = [],
  onChange,
  placeholder = 'Type of property',
  options,
  showDivider = false,
}: TypePropertySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempSelection(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempSelection(value);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [value]);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setTempSelection(value);
    } else {
      setTempSelection(value);
      setIsOpen(true);
    }
  };

  const handleCheckboxChange = (optionValue: string) => {
    setTempSelection((prev) => {
      if (prev.includes(optionValue)) {
        return prev.filter((v) => v !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const handleApply = () => {
    onChange(tempSelection);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempSelection([]);
    onChange([]);
  };

  const getDisplayText = () => {
    if (value.length === 0) {
      return placeholder;
    }

    if (value.length === 1) {
      const selectedOption = options.find((opt) => opt.value === value[0]);
      return selectedOption ? selectedOption.label : placeholder;
    }

    const firstOption = options.find((opt) => opt.value === value[0]);
    const remainingCount = value.length - 1;
    return firstOption ? `${firstOption.label}, +${remainingCount}` : placeholder;
  };

  const hasSelection = value.length > 0;
  const hasTempSelection = tempSelection.length > 0;

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={`rounded-[8px] sm:rounded-none relative w-full h-12 md:h-10 lg:h-10 xl:h-10 px-4 pr-10 bg-white cursor-pointer transition-colors flex items-center ${
          showDivider ? 'border-r border-[var(--border-input)]' : ''
        } ${hasSelection ? 'text-[var(--accent-green)]' : ''}`}
        onClick={handleToggle}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
      >
        <span
          className={`flex-1 body-lg text-left ${
            hasSelection ? 'text-[var(--accent-green)]' : 'text-[var(--text-body-tint)]'
          }`}
        >
          {getDisplayText()}
        </span>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
          <Image
            src="/icons/ic_arrow_down.svg"
            alt="Select"
            width={24}
            height={24}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          id={id ? `${id}-listbox` : undefined}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border-input)] rounded-[8px] shadow-lg z-[9999]"
          role="listbox"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <span className="title-md text-[var(--color-black)]">{placeholder}</span>
            {hasTempSelection && (
              <button
                type="button"
                onClick={handleClear}
                className="body-md text-[var(--accent-green)] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div>
            {options.map((option) => {
              const isChecked = tempSelection.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="group flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--bg-tint)] transition-colors"
                  role="option"
                  aria-selected={isChecked}
                >
                  <div className="relative flex-shrink-0 w-5 h-5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded-[4px] flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'border-[var(--accent-green)] bg-[var(--accent-green)]'
                          : 'border-[var(--border)] bg-white'
                      }`}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span
                    className={`body-lg flex-1 text-left transition-colors ${
                      isChecked
                        ? 'text-[var(--color-black)]'
                        : 'text-[var(--color-black)] group-hover:text-[var(--accent-green)]'
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-[var(--border)]">
            <Button label="Apply" onClick={handleApply} variant="primary" size="md" fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}
