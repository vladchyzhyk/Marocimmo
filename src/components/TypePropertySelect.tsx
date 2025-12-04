'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  className?: string;
  labelClassName?: string;
};

export default function TypePropertySelect({
  id,
  value = [],
  onChange,
  placeholder = 'Type of property',
  options,
  showDivider = false,
  className = '',
  labelClassName = '',
}: TypePropertySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempSelection(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTempSelection(value);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setTempSelection(value);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [value, isOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current && containerRef.current) {
      const triggerRect = containerRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;

      dropdown.style.position = 'fixed';
      dropdown.style.zIndex = '1000';
      dropdown.style.left = 'auto';
      dropdown.style.right = 'auto';
      dropdown.style.top = 'auto';
      dropdown.style.bottom = 'auto';
      dropdown.style.margin = '0';

      let top = triggerRect.bottom + 8;
      let left = triggerRect.left;

      if (left + dropdown.offsetWidth > window.innerWidth) {
        left = window.innerWidth - dropdown.offsetWidth - 16;
      }
      if (left < 0) {
        left = 16;
      }

      if (
        top + dropdown.offsetHeight > window.innerHeight &&
        triggerRect.top > window.innerHeight - triggerRect.bottom
      ) {
        top = triggerRect.top - dropdown.offsetHeight - 8;
      }

      dropdown.style.top = `${top}px`;
      dropdown.style.left = `${left}px`;
      dropdown.style.width = `${Math.min(triggerRect.width, 400)}px`;
    }
  }, [isOpen]);

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
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div
        className={`${hasSelection ? 'rounded-[8px]' : 'rounded-[8px] '} relative w-full h-12 md:h-10 lg:h-10 xl:h-10 px-4 pr-10 bg-white cursor-pointer transition-colors flex items-center ${
          showDivider ? 'border-r border-[var(--border-input)]' : ''
        } ${hasSelection ? 'border border-[var(--accent-green)] text-[var(--accent-green)]' : ''}`}
        onClick={handleToggle}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
      >
        <span
          className={`flex-1 body-lg text-left ${
            !hasSelection ? labelClassName : ''
          } ${hasSelection ? 'text-[var(--accent-green)]' : ''}`}
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

      {isOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            id={id ? `${id}-listbox` : undefined}
            className="fixed bg-white border border-[var(--border-input)] rounded-[8px] shadow-lg min-h-[200px] flex flex-col"
            role="listbox"
            style={{ zIndex: 1000 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] flex-shrink-0">
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

            <div className="flex-1 min-h-0">
              {options.map((option) => {
                const isChecked = tempSelection.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="group flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-[var(--bg-tint)] transition-colors"
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

            <div className="px-4 py-3 border-t border-[var(--border)] flex-shrink-0">
              <Button label="Apply" onClick={handleApply} variant="primary" size="md" fullWidth />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
