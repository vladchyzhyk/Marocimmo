'use client';

import Toggle from '@/components/Toggle';

interface FilterToggleProps {
  label: string;
  value?: boolean;
  onChange: (value?: boolean) => void;
  className?: string;
}

export const FilterToggle = ({ label, value, onChange, className = '' }: FilterToggleProps) => {
  const handleChange = (checked: boolean) => {
    onChange(checked || undefined);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label className="body-md text-[var(--color-black)]">{label}</label>
      <Toggle checked={value || false} onChange={handleChange} />
    </div>
  );
};
