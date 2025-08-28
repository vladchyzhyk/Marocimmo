import React from 'react';

export type SegmentControlOption = {
  label: string;
  value: string;
};

export type SegmentControlProps = {
  type: 'switch' | 'segment';
  options: SegmentControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

const SegmentControl = ({
  type = 'segment',
  options,
  value,
  onChange,
  className = '',
  disabled = false,
}: SegmentControlProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const currentIndex = options.findIndex((o) => o.value === value);
    if (currentIndex === -1) return;
    if (type === 'switch') {
      // Simpler: only advance on Enter/Space in switch mode
      if (e.key === 'Enter' || e.key === ' ') {
        const next = (currentIndex + 1) % options.length;
        onChange(options[next].value);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      const next = (currentIndex + 1) % options.length;
      onChange(options[next].value);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prev = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prev].value);
      e.preventDefault();
    }
  };

  if (type === 'switch') {
    const currentIndex = Math.max(
      0,
      options.findIndex((o) => o.value === value),
    );
    const current = options[currentIndex] ?? options[0];
    const cycleNext = () => {
      if (disabled || options.length === 0) return;
      const next = (currentIndex + 1) % options.length;
      onChange(options[next].value);
    };

    return (
      <div
        role="group"
        aria-disabled={disabled || undefined}
        className={`flex items-center h-[22px] rounded-lg outline-none border border-[var(--border-input)] bg-white ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={cycleNext}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              cycleNext();
              e.preventDefault();
            }
          }}
          className={`px-3 h-6 whitespace-nowrap text-center label-sm-medium rounded-lg transition-colors bg-[var(--color-black)] text-white`}
          aria-label={`Toggle: ${current?.label}`}
        >
          {current?.label}
        </button>
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={`flex items-center h-[22px] rounded-lg border border-[var(--border-input)] bg-white ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => !disabled && onChange(opt.value)}
            className={`px-4 h-6 whitespace-nowrap text-center label-sm-medium rounded-lg transition-colors ${
              isSelected
                ? 'bg-[var(--color-black)] text-white'
                : 'text-[var(--text-body-tint)] hover:text-[var(--color-black)]'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentControl;
