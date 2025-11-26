'use client';

import { useState } from 'react';

const TAB_OPTIONS = [
  { label: 'Buy', value: 'buy' },
  { label: 'Long-term Rent', value: 'long-term-rent' },
  { label: 'Short-term Rent', value: 'short-term-rent' },
];

export default function PropertyTypeTabs() {
  const [activeTab, setActiveTab] = useState('buy');
  return (
    <div className="flex items-center bg-[var(--bg-tint)] h-10">
      {TAB_OPTIONS.map((opt) => {
        const isSelected = opt.value === activeTab;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => setActiveTab(opt.value)}
            className={`px-6 py-4 h-10 whitespace-nowrap text-center transition-colors ${
              isSelected
                ? 'border-b-[3px] border-[var(--accent-green)] text-[var(--accent-green)] label-md-medium'
                : 'text-[var(--text-pill)] body-md hover:text-[var(--color-black)]'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
