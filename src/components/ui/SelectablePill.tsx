import React from 'react'

export type SelectablePillProps = {
  variant?: 'default' | 'half-square';
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const SelectablePill = ({
  variant = 'default',
  children,
  selected = false,
  onClick,
  disabled = false,
  className = '',
}: SelectablePillProps) => {
  const baseStyles =
    'items-center justify-center py-2.5 px-4 md:py-1.5 md:px-3 rounded-full border transition-colors cursor-pointer';

  const halfSquareStyles =
    'items-center justify-center py-2.5 px-4 md:py-1.5 md:px-3 rounded-[8px] border transition-colors cursor-pointer';

  const selectedDefaultStyles = 'bg-[var(--color-black)] text-white border-[var(--color-black)]';
  const selectedHalfSquareStyles =
    'bg-[var(--color-black)] text-[var(--color-white)] border-[var(--color-border)]';
  const unselectedDefaultStyles =
    'bg-[var(--bg-tint)] text-[var(--text-pill)] border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]';
  const unselectedHalfSquareStyles =
    'bg-[var(--color-white)] text-[var(--color-black)] border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]';

  const stateStyles = selected
    ? variant === 'half-square'
      ? selectedHalfSquareStyles
      : selectedDefaultStyles
    : variant === 'half-square'
      ? unselectedHalfSquareStyles
      : unselectedDefaultStyles;

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variant === 'default' ? baseStyles : halfSquareStyles} ${stateStyles} ${disabledStyles} ${className}`}
    >
      <div className="flex items-center justify-center gap-2 body-lg">{children}</div>
    </button>
  );
};

export default SelectablePill;
