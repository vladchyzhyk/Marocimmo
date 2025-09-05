import { DeleteIcon } from '@/utils/icons'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

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
  deleteButtonClassName?: string;
  onImageUpload?: (file: File) => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  accept?: string;
  showDeleteButton?: boolean;
  isDeleteButtonOverlay?: boolean;
};

const IconButton = ({
  variant = 'base',
  state = 'default',
  icon,
  label,
  imageUrl,
  onClick,
  onDelete,
  deleteButtonClassName = '',
  onImageUpload,
  isDeleteButtonOverlay = false,
  loading = false,
  disabled = false,
  className = '',
  accept = 'image/*',
  showDeleteButton = false,
}: IconButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentState = isHovered ? 'hover' : state;
  const [shouldAnimateDeleteButton, setShouldAnimateDeleteButton] = useState(false);
  const previousImageUrlRef = useRef<string | undefined>(undefined);

  // Animate delete button only when image changes
  useEffect(() => {
    if (imageUrl !== previousImageUrlRef.current) {
      if (imageUrl) {
        setShouldAnimateDeleteButton(true);
        const timeoutId = window.setTimeout(() => setShouldAnimateDeleteButton(false), 300);
        return () => window.clearTimeout(timeoutId);
      }
    }
    previousImageUrlRef.current = imageUrl;
  }, [imageUrl]);

  const baseStyles = {
    layout: 'flex flex-col justify-center items-center gap-4 md:gap-3 p-8 md:p-6 rounded-[14px]',
    interactions: 'transition-all duration-200 cursor-pointer group',
    disabled: 'disabled:opacity-60 disabled:cursor-not-allowed',
  };

  const variantStyles = {
    base: 'bg-[var(--bg-tint)] border border-dashed border-[var(--border)] text-[var(--color-black)] group-hover:text-[var(--accent-green)]',
    'with-photo':
      'bg-white text-black group-hover:relative group-hover:bg-black/50 group-hover:text-white',
  };

  const iconStyles = {
    base: 'text-[var(--color-black)] group-hover:text-[var(--accent-green)] transition-colors duration-200 overflow-hidden',
    'with-photo': 'text-[var(--color-black)] group-hover:text-white transition-colors duration-200',
  };

  const labelStyles = {
    base: 'text-[var(--color-black)] group-hover:text-[var(--accent-green)] transition-colors duration-200',
    'with-photo': 'text-[var(--color-black)] group-hover:text-white transition-colors duration-200',
  };

  const deleteButtonStyles = {
    container: 'absolute top-1 right-1 flex justify-center items-center w-5 h-5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 z-50',
    base: 'bg-white border border-gray-300 rounded-lg shadow-lg',
    hover: 'hover:bg-gray-100 transition-colors',
    icon: 'w-5 h-5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 text-red-500',
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
  const DeleteButton = ({ className }: { className?: string }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete?.();
      }}
      className={`${deleteButtonStyles.container} ${deleteButtonStyles.base} ${deleteButtonStyles.hover} h-10 w-10 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-8 xl:w-8 ${className}`}
    >
      <DeleteIcon className={deleteButtonStyles.icon} />
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
        className={`${combinedBaseStyles} ${getCurrentVariantStyles()} relative overflow-hidden`}
        style={backgroundStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div
          className={`flex flex-col justify-center items-center gap-2 px-2.5 md:gap-1.5 md:px-1.5 lg:gap-1.5 lg:px-1.5 xl:gap-1 xl:px-1.5 ${getCurrentIconStyles()}`}
        >
          {icon}
          {label && (
            <span className={`text-center whitespace-nowrap body-lg ${getCurrentLabelStyles()}`}>
              {label}
            </span>
          )}
        </div>

        {/* Show delete button for photo variant on hover OR for base variant when showDeleteButton is true */}

        <div
          className={classNames(
            'w-full h-full absolute !top-0 !right-0 flex justify-center items-center bg-black/60 transition-opacity duration-300',
            isDeleteButtonOverlay &&
              currentState === 'hover' &&
              onDelete &&
              (variant === 'with-photo' || (variant === 'base' && showDeleteButton))
              ? 'opacity-100'
              : 'opacity-0',
          )}
        >
          <DeleteButton className={classNames(deleteButtonClassName, 'static')} />
        </div>

        <DeleteButton
          className={classNames(
            deleteButtonClassName,
            shouldAnimateDeleteButton ? 'transition-opacity duration-300' : 'transition-none',
            !isDeleteButtonOverlay &&
              currentState === 'hover' &&
              onDelete &&
              (variant === 'with-photo' || (variant === 'base' && showDeleteButton))
              ? 'opacity-100'
              : 'opacity-0',
          )}
        />
      </div>
    </>
  );
};

export default IconButton;
