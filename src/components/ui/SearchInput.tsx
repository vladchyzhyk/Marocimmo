import { CloseIcon, SearchIcon } from '@/utils/icons';
import React, { useRef } from 'react';

export type SearchInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  iconSrc?: string;
  ariaLabel?: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
};

const getInputStyles = (
  variant: 'default' | 'outline',
  size: 'sm' | 'md' | 'lg',
  iconPosition: 'left' | 'right',
  hasIcon: boolean,
) => {
  const base = 'flex items-center gap-2 border rounded-lg bg-white px-3';

  const sizeStyles = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
  };

  const paddingStyles = {
    sm: { left: 'pl-2', right: 'pr-2' },
    md: { left: 'pl-4', right: 'pr-4' },
    lg: { left: 'pl-6', right: 'pr-6' },
  } as const;

  const variantStyles = {
    default: 'border-[var(--border-input)]',
    outline:
      'border border-[var(--border)] hover:border-[var(--accent-green)] focus:border-[var(--accent-green)]',
  };

  const iconPadding = hasIcon ? paddingStyles[size][iconPosition] : '';
  return `${base} ${sizeStyles[size]} ${iconPadding} ${variantStyles[variant]}`;
};

const SearchInput: React.FC<SearchInputProps> = ({
  id,
  value,
  onChange,
  placeholder = 'Search',
  className = '',
  fullWidth = true,
  iconSrc = '/icons/ic_search.svg',
  ariaLabel = 'Search',
  variant = 'default',
  size = 'md',
  iconPosition = 'right',
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <label htmlFor={id} className={`${fullWidth ? 'w-full' : ''} block`}>
      <div className={`${getInputStyles(variant, size, iconPosition, !!iconSrc)} ${className}`}>
        {iconPosition === 'left' && iconSrc ? <SearchIcon className="w-6 h-6" /> : null}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none body-lg text-[var(--color-black)] placeholder-[var(--text-body-tint)]"
          aria-label={ariaLabel}
          ref={inputRef}
        />
        {iconPosition === 'right' && iconSrc ? <SearchIcon className="w-6 h-6" /> : null}
        {iconPosition === 'left' && value !== '' ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="p-1 rounded hover:bg-[var(--bg-default-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        ) : null}
      </div>
    </label>
  );
};

export default SearchInput;
