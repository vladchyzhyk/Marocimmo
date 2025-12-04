'use client';

import Input from '@/components/ui/Input';

interface FilterRangeProps {
  label: string;
  min?: number;
  max?: number;
  valueMin?: number;
  valueMax?: number;
  onChange: (min?: number, max?: number) => void;
  unit?: string;
  className?: string;
}

export const FilterRange = ({
  label,
  valueMin,
  valueMax,
  onChange,
  unit = '',
  className = '',
}: FilterRangeProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
    onChange(value, valueMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
    onChange(valueMin, value);
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="body-md text-[var(--color-black)]">{label}</label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={valueMin?.toString() || ''}
          onChange={handleMinChange}
          placeholder={`Min ${unit}`}
          numbersOnly
          className="flex-1"
          inputClassName="h-10"
        />
        <span className="text-[var(--text-body-tint)] body-lg">-</span>
        <Input
          type="number"
          value={valueMax?.toString() || ''}
          onChange={handleMaxChange}
          placeholder={`Max ${unit}`}
          numbersOnly
          className="flex-1"
          inputClassName="h-10"
        />
      </div>
    </div>
  );
};
