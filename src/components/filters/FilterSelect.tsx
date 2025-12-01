'use client';

import InputSelect from '@/components/ui/InputSelect';

interface FilterSelectProps {
  label: string;
  value?: string;
  onChange: (value?: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className = '',
}: FilterSelectProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue || undefined);
  };

  return (
    <div className={className}>
      <InputSelect
        label={label}
        value={value || ''}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        size="md"
      />
    </div>
  );
};
