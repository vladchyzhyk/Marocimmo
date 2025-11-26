'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

export type HeroSelectOption = {
  label: string;
  value: string;
};

export type HeroSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: HeroSelectOption[];
  leftIcon?: ReactNode;
  showDivider?: boolean;
};

export default function HeroSelect({
  id,
  value,
  onChange,
  placeholder = 'Type of property',
  options,
  leftIcon,
  showDivider = false,
}: HeroSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={`rounded-[8px] sm:rounded-none relative w-full h-12 md:h-10 lg:h-10 xl:h-10 px-4 pr-10 bg-white cursor-pointer transition-colors flex items-center ${
          leftIcon ? 'pl-10' : ''
        } ${showDivider ? 'border-r border-[var(--border-input)]' : ''}`}
        onClick={handleToggle}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
      >
        {leftIcon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 text-[var(--text-body-tint)] z-10">
            {leftIcon}
          </div>
        )}
        <span
          className={`flex-1 body-lg text-left ${
            selectedOption ? 'text-[var(--color-black)]' : 'text-[var(--text-body-tint)]'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
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
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border-input)] rounded-[8px] shadow-lg max-h-48 overflow-y-auto z-50"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-3 bg-white cursor-pointer text-[var(--color-black)] body-lg hover:text-[var(--accent-green)] hover:bg-[var(--bg-tint)] transition-colors"
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
