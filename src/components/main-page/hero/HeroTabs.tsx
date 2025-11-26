'use client';

import React from 'react';

export type HeroTabOption = {
  label: string;
  value: string;
};

export type HeroTabsProps = {
  options: HeroTabOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function HeroTabs({ options, value, onChange }: HeroTabsProps) {
  return (
    <div className="flex items-center rounded-[8px] sm:rounded-b-none  bg-white overflow-hidden w-full sm:w-fit mb-4 sm:mb-0">
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(opt.value)}
            className={`w-full sm:w-fit px-6 py-4 h-[50px] whitespace-nowrap text-center label-sm-medium  transition-colors ${
              isSelected ? 'bg-[var(--accent-green)] text-white' : 'text-[var(--color-black)]'
            }`}
          >
            <span className="body-md lg: body-lg">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
