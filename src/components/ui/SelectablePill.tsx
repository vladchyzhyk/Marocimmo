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
    'items-center justify-center py-2.5 px-4 rounded-full border transition-colors cursor-pointer';

  const stateStyles = selected
    ? 'bg-[var(--color-black)] text-white border-[var(--color-black)]'
    : 'bg-[var(--bg-tint)] text-[var(--text-pill)] border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]';

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${disabledStyles} ${className}`}
    >
      <div className="flex items-center justify-center gap-2 body-lg">{children}</div>
    </button>
  );
};

export default SelectablePill;
