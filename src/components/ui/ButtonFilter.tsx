import Image from 'next/image';
import React from 'react';

type ButtonFilterState = 'default' | 'hover' | 'active';
type ButtonFilterVariant =
  | 'no-icon'
  | 'icon-left'
  | 'icon-right'
  | 'icon-both'
  | 'badge'
  | 'badge-icon-left'
  | 'badge-icon-right'
  | 'badge-icon-both';

export type ButtonFilterProps = {
  children: React.ReactNode;
  state?: ButtonFilterState;
  variant?: ButtonFilterVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  className?: string;
};

const ButtonFilter = ({
  children,
  state = 'default',
  variant = 'no-icon',
  leftIcon,
  rightIcon,
  badge,
  onClick,
  className = '',
}: ButtonFilterProps) => {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus:outline-none cursor-pointer shadow-sm';

  // State-specific styles
  const stateStyles = {
    default: 'bg-white text-[#222222] border border-[#E5E5E5]',
    hover: 'bg-white text-[#519C2C] border border-[#519C2C]',
    active: 'bg-[#222222] text-white border border-[#222222]',
  };

  // Padding based on variant
  const getPadding = () => {
    if (
      variant.includes('icon-left') ||
      variant.includes('icon-right') ||
      variant.includes('icon-both')
    ) {
      return 'px-4 py-2';
    }
    return 'px-6 py-2';
  };

  // Layout based on variant
  const getLayout = () => {
    if (variant.includes('badge')) {
      return 'relative';
    }
    return '';
  };

  // Badge styles
  const badgeStyles =
    'absolute -top-1 -right-1 w-4 h-4 bg-[#D23131] text-white text-xs rounded-full flex items-center justify-center';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${stateStyles[state]} ${getPadding()} ${getLayout()} ${className}`}
    >
      {/* Left Icon */}
      {variant.includes('icon-left') && leftIcon && (
        <Image
          className="shrink-0 fill-[#519C2C]"
          src="/icons/ic_edit.svg"
          alt="right icon"
          width={16}
          height={16}
        />
      )}

      {/* Text Content */}
      <span className="text-sm font-normal leading-[1.4]">{children}</span>

      {/* Right Icon */}
      {variant.includes('icon-right') && rightIcon && (
        <Image
          className="text-[#519C2C] w-4 h-4"
          src="/icons/ic_edit.svg"
          alt="right icon"
          width={16}
          height={16}
        />
      )}

      {/* Badge */}
      {variant.includes('badge') && badge && <span className={badgeStyles}>{badge}</span>}
    </button>
  );
};

export default ButtonFilter;
