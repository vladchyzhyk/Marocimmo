'use client';

import Image from 'next/image';

interface FilterTriggerButtonProps {
  displayValue: string | null | undefined;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
}

export const FilterTriggerButton = ({
  displayValue,
  placeholder = '',
  onClick,
  className = '',
}: FilterTriggerButtonProps) => {
  const hasValue = Boolean(displayValue);
  const text = displayValue || placeholder;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-10 rounded-[8px] px-4 border bg-white text-[var(--color-black)] body-lg outline-none transition-colors cursor-pointer flex items-center justify-between hover:bg-[var(--bg-tint)] focus:border-[var(--accent-green)] ${
        hasValue ? 'border-[var(--accent-green)]' : 'border-[var(--border)]'
      } ${className}`}
    >
      <span className={`${hasValue ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]'}`}>
        {text}
      </span>
      <Image
        src="/icons/ic_arrow_down.svg"
        alt="Select"
        width={20}
        height={20}
        className="transition-transform"
      />
    </button>
  );
};
