'use client';

import NumberStepper from '@/components/ui/NumberStepper';

interface FilterNumberProps {
  label: string;
  value?: number;
  onChange: (value?: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const FilterNumber = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  className = '',
}: FilterNumberProps) => {
  const handleChange = (newValue: number) => {
    if (newValue === min) {
      onChange(undefined);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      <NumberStepper
        label={label}
        value={value || min}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </div>
  );
};
