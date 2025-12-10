'use client';

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ArrowDownIcon, CheckIcon, SortIcon } from '@/utils/icons';

export type SortValue = 'newest' | 'price-asc' | 'price-desc';

export interface SortOption<T extends string | number> {
  value: T;
  label: string;
}

export const SORT_OPTIONS: SortOption<SortValue>[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
];

export interface SortDropdownProps<T extends string | number> {
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function SortDropdown<T extends string | number>({
  value,
  options,
  onChange,
  className,
}: SortDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (event.target instanceof Node && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function handleSelect(option: SortOption<T>) {
    onChange(option.value);
    setIsOpen(false);
  }

  function getLabelForValue(currentValue: T) {
    const found = options.find((option) => option.value === currentValue);
    return found?.label ?? options[0]?.label ?? '';
  }

  return (
    <div
      ref={containerRef}
      className={classNames('relative flex items-center justify-end', className)}
    >
      <button
        type="button"
        aria-label="Open sort options"
        className={classNames(
          'flex md:hidden items-center justify-center h-8 w-8 rounded-lg border border-[#E5E5E5] bg-white',
          'hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2',
        )}
        onClick={handleToggle}
      >
        <SortIcon className="w-4 h-4 text-[#222222]" />
      </button>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={classNames(
          'hidden md:flex flex-row items-center pl-2 pr-0 gap-2 w-40 h-8 bg-white border rounded-lg box-border flex-none',
          isOpen
            ? 'border-[var(--accent-green)] text-[var(--accent-green)]'
            : 'border-[#E5E5E5] text-[#222222]',
          'hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2',
        )}
        onClick={handleToggle}
      >
        <SortIcon
          className={classNames(
            'w-4 h-4 flex-none',
            isOpen ? 'text-[var(--accent-green)]' : 'text-[#222222]',
          )}
        />
        <span
          className={classNames(
            'text-base leading-[140%] flex-grow text-left',
            isOpen ? 'text-[var(--accent-green)]' : 'text-[#222222]',
          )}
        >
          {getLabelForValue(value)}
        </span>
        <ArrowDownIcon
          className={classNames(
            'w-6 h-6 flex-none transition-transform duration-150',
            isOpen ? 'rotate-180 text-[var(--accent-green)]' : 'text-[#222222]',
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-9 z-50 w-[185px] rounded-lg bg-[#FAFAFA] shadow-[0_8px_24px_2px_rgba(23,23,23,0.12)]">
          <ul
            role="listbox"
            aria-label="Sort results"
            className="flex flex-col py-2"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={String(option.value)}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={classNames(
                      'flex w-full items-center gap-2 px-4 py-2 text-left text-base',
                      isSelected
                        ? 'text-[var(--accent-green)] font-normal bg-white'
                        : 'text-[#222222]',
                      !isSelected && 'hover:bg-white hover:text-[var(--accent-green)]',
                      'focus-visible:outline-none focus-visible:bg-white',
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    {isSelected && (
                      <CheckIcon className="mr-1 h-4 w-4 text-[var(--accent-green)]" />
                    )}
                    <span className="flex-1">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}


