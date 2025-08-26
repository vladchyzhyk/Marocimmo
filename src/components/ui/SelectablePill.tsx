import React from 'react';

export type SelectablePillProps = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const SelectablePill = ({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = '',
}: SelectablePillProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-4 h-11 rounded-full border transition-colors cursor-pointer';

  const stateStyles = selected
    ? 'bg-[var(--color-black)] text-white border-[var(--color-black)]'
    : 'bg-white text-[var(--text-pill)] border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]';

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${disabledStyles} ${className}`}
    >
      <span className="body-lg">{children}</span>
    </button>
  );
};

export default SelectablePill;
