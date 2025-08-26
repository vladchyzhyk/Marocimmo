import React, { useState } from 'react';

type IconButtonVariant = 'base' | 'with-photo';
type IconButtonState = 'default' | 'hover';

export type IconButtonProps = {
  variant?: IconButtonVariant;
  state?: IconButtonState;
  icon?: React.ReactNode;
  label?: string;
  imageUrl?: string;
  onClick?: () => void;
  onDelete?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'base',
  state = 'default',
  icon,
  label,
  imageUrl,
  onClick,
  onDelete,
  loading = false,
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentState = isHovered ? 'hover' : state;

  const baseStyles = `
    flex flex-col justify-center items-center gap-4 p-8 rounded-[14px] 
    transition-all duration-200 cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
    ${className}
  `;

  const getVariantStyles = () => {
    if (variant === 'with-photo') {
      if (currentState === 'hover') {
        return 'relative bg-black/50 text-white';
      }
      return 'bg-white text-black';
    }

    // Base variant
    if (currentState === 'hover') {
      return 'bg-[var(--bg-tint)] border border-[var(--border)] text-[var(--accent-green)]';
    }
    return 'bg-[var(--bg-tint)] border border-[var(--border)] text-[var(--color-black)]';
  };

  const getIconStyles = () => {
    if (variant === 'with-photo' && currentState === 'hover') {
      return 'text-white';
    }
    if (currentState === 'hover') {
      return 'text-[var(--accent-green)]';
    }
    return 'text-[var(--color-black)]';
  };

  const getLabelStyles = () => {
    if (variant === 'with-photo' && currentState === 'hover') {
      return 'text-white';
    }
    if (currentState === 'hover') {
      return 'text-[var(--accent-green)]';
    }
    return 'text-[var(--color-black)]';
  };

  const Spinner: React.FC = () => (
    <svg
      className="h-6 w-6 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );

  const backgroundStyle =
    variant === 'with-photo' && imageUrl
      ? {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

  return (
    <div
      className={`${baseStyles} ${getVariantStyles()}`}
      style={backgroundStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            className={`flex flex-col justify-center items-center gap-2 px-2.5 ${getIconStyles()}`}
          >
            {icon}
            {label && <span className={`text-center body-lg ${getLabelStyles()}`}>{label}</span>}
          </div>

          {variant === 'with-photo' && currentState === 'hover' && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="absolute top-2 right-2 flex justify-center items-center w-9 h-9 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:bg-[var(--border-input)] transition-colors"
            >
              <svg
                className="w-5 h-5 text-[var(--error)]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default IconButton;
