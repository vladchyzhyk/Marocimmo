import React, { useRef, useState } from 'react';

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
  onImageUpload?: (file: File) => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  accept?: string;
  showDeleteButton?: boolean;
};

const IconButton = ({
  variant = 'base',
  state = 'default',
  icon,
  label,
  imageUrl,
  onClick,
  onDelete,
  onImageUpload,
  loading = false,
  disabled = false,
  className = '',
  accept = 'image/*',
  showDeleteButton = false,
}: IconButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentState = isHovered ? 'hover' : state;

  const baseStyles = {
    layout: 'flex flex-col justify-center items-center gap-4 p-8 rounded-[14px]',
    interactions: 'transition-all duration-200 cursor-pointer group',
    disabled: 'disabled:opacity-60 disabled:cursor-not-allowed',
  };

  const variantStyles = {
    base: 'bg-[var(--bg-tint)] border border-dashed border-[var(--border)] text-[var(--color-black)] group-hover:text-[var(--accent-green)]',
    'with-photo':
      'bg-white text-black group-hover:relative group-hover:bg-black/50 group-hover:text-white',
  };

  const iconStyles = {
    base: 'text-[var(--color-black)] group-hover:text-[var(--accent-green)] transition-colors duration-200',
    'with-photo': 'text-[var(--color-black)] group-hover:text-white transition-colors duration-200',
  };

  const labelStyles = {
    base: 'text-[var(--color-black)] group-hover:text-[var(--accent-green)] transition-colors duration-200',
    'with-photo': 'text-[var(--color-black)] group-hover:text-white transition-colors duration-200',
  };

  const deleteButtonStyles = {
    container: 'absolute top-1 right-1 flex justify-center items-center w-5 h-5 z-50',
    base: 'bg-white border border-gray-300 rounded-lg shadow-lg',
    hover: 'hover:bg-gray-100 transition-colors',
    icon: 'w-5 h-5 text-red-500',
  };

  // Helper functions to get current styles
  const getCurrentVariantStyles = () => variantStyles[variant];
  const getCurrentIconStyles = () => iconStyles[variant];
  const getCurrentLabelStyles = () => labelStyles[variant];

  // Combine all base styles
  const combinedBaseStyles = `${baseStyles.layout} ${baseStyles.interactions} ${baseStyles.disabled} ${className}`;

  // Background style for photo variant
  const backgroundStyle =
    variant === 'with-photo' && imageUrl
      ? {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

  // Handle click based on variant
  const handleClick = () => {
    if (variant === 'base' && onImageUpload) {
      // For base variant with image upload, trigger file input
      fileInputRef.current?.click();
    } else if (onClick) {
      // For other cases, use the provided onClick
      onClick();
    }
    // If neither onImageUpload nor onClick is provided, do nothing
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete button component
  const DeleteButton: React.FC = () => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete?.();
      }}
      className={`${deleteButtonStyles.container} ${deleteButtonStyles.base} ${deleteButtonStyles.hover} h-10 w-10`}
    >
      <svg
        className={deleteButtonStyles.icon}
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
  );

  return (
    <>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || loading}
      />

      <div
        className={`${combinedBaseStyles} ${getCurrentVariantStyles()} relative`}
        style={backgroundStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div
          className={`flex flex-col justify-center items-center gap-2 px-2.5 ${getCurrentIconStyles()}`}
        >
          {icon}
          {label && (
            <span className={`text-center whitespace-nowrap body-lg ${getCurrentLabelStyles()}`}>
              {label}
            </span>
          )}
        </div>

        {/* Show delete button for photo variant on hover OR for base variant when showDeleteButton is true */}
        {currentState === 'hover' &&
          onDelete &&
          (variant === 'with-photo' || (variant === 'base' && showDeleteButton)) && (
            <DeleteButton />
          )}
      </div>
    </>
  );
};

export default IconButton;
