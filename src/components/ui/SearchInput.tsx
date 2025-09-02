import Image from 'next/image';
import React from 'react';

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
};

const getInputStyles = (variant: 'default' | 'outline', size: 'sm' | 'md' | 'lg') => {
  const base = 'flex items-center gap-2 border rounded-lg bg-white px-3';

  const sizeStyles = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
  };

  const paddingStyles = {
    sm: 'pr-6',
    md: 'pr-8',
    lg: 'pr-10',
  };

  const variantStyles = {
    default: 'border-[var(--border-input)]',
    outline:
      'border border-[var(--border)] hover:border-[var(--accent-green)] focus:border-[var(--accent-green)]',
  };

  return `${base} ${sizeStyles[size]} ${paddingStyles[size]} ${variantStyles[variant]}`;
};

const getIconSize = (size: 'sm' | 'md' | 'lg') => {
  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 18,
  };
  return sizeMap[size];
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
}) => {
  return (
    <label htmlFor={id} className={`${fullWidth ? 'w-full' : ''} block`}>
      <div className={`${getInputStyles(variant, size)} ${className}`}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none body-lg text-[var(--color-black)] placeholder-[var(--text-body-tint)]"
          aria-label={ariaLabel}
        />{' '}
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={ariaLabel}
            width={getIconSize(size)}
            height={getIconSize(size)}
          />
        ) : null}
      </div>
    </label>
  );
};

export default SearchInput;
