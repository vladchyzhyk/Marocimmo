import Image from 'next/image';
import React from 'react';
import LocationDropdown, { LocationSuggestion } from './LocationDropdown';

type InputAppearance = 'default' | 'filled';
type InputVariant = 'default' | 'address';

export type InputProps = {
  id?: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  clearable?: boolean;
  appearance?: InputAppearance;
  variant?: InputVariant;
  locationSuggestions?: LocationSuggestion[];
  onLocationSelect?: (suggestion: LocationSuggestion) => void;
  locationLoading?: boolean;
  className?: string;
  inputClassName?: string;
};

const baseContainer = 'flex flex-col gap-2 w-full';
const labelStyles = 'body-md text-[var(--color-black)]';
const helperTextStyles = 'label-sm-medium text-[var(--text-body-tint)]';

const inputBase = [
  'w-full h-12 rounded-[8px] px-4',
  'border bg-[var(--white)]',
  'placeholder-[var(--text-body-tint)]',
  'text-[var(--color-black)] body-lg',
  'outline-none transition-colors',
].join(' ');

const inputAppearance: Record<InputAppearance, string> = {
  default: 'bg-[var(--white)] hover:bg-[var(--bg-tint)]',
  filled: 'bg-[var(--bg-tint)] hover:bg-[var(--bg-tint)]',
};

const inputBorders = {
  default: 'border-[var(--border-input)]',
  focus:
    'focus:ring-2 focus:ring-[var(--accent-green)] focus:ring-offset-0 border-[var(--accent-green)]',
  error: 'border-[var(--error)]',
  disabled: 'opacity-40 cursor-not-allowed',
};

const leftIconBase =
  'absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 text-[var(--text-body-tint)]';

const rightIconButtonBase =
  'absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-[var(--bg-tint)]';

const clearButtonBase =
  'absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-[var(--bg-tint)] text-[var(--text-body-tint)]';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = 'text',
      value,
      onChange,
      onClear,
      onBlur,
      onFocus,
      placeholder,
      disabled,
      required,
      autoComplete,
      label,
      helperText,
      error,
      rightIcon,
      onRightIconClick,
      clearable,
      appearance = value ? 'filled' : 'default',
      variant = 'default',
      locationSuggestions = [],
      onLocationSelect,
      locationLoading = false,
      className = '',
      inputClassName = '',
    },
    ref,
  ) => {
    const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
    const hasError = Boolean(error);
    const showClear = Boolean(clearable && value && !disabled);

    const computedInputClasses = [
      inputBase,
      inputAppearance[appearance],
      hasError ? inputBorders.error : inputBorders.default,
      inputBorders.focus,
      disabled ? inputBorders.disabled : '',
      variant === 'address' ? 'pl-12' : '', // Add left padding for address variant
      rightIcon && showClear ? 'pr-20' : rightIcon || showClear ? 'pr-10' : '',
      inputClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (variant === 'address') {
        setShowLocationDropdown(true);
      }
      onFocus?.(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Delay hiding dropdown to allow for clicks on suggestions
      setTimeout(() => setShowLocationDropdown(false), 150);
      onBlur?.(e);
    };

    const handleLocationSelect = (suggestion: LocationSuggestion) => {
      if (onLocationSelect) {
        onLocationSelect(suggestion);
      }
      setShowLocationDropdown(false);
    };

    return (
      <div className={[baseContainer, className].filter(Boolean).join(' ')}>
        {label ? (
          <label htmlFor={id} className={labelStyles}>
            {label}
            {required ? (
              <span className="ml-1 font-medium text-[var(--error)]" aria-hidden>
                *
              </span>
            ) : null}
          </label>
        ) : null}

        <div className="relative">
          {/* Location Icon for address variant */}
          {variant === 'address' && (
            <div className={leftIconBase}>
              <Image src="/icons/ic_location.svg" alt="Location" width={24} height={24} />
            </div>
          )}

          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText ? `${id}-help` : undefined}
            autoComplete={autoComplete}
            ref={ref}
            className={computedInputClasses}
          />

          {/* Location Dropdown */}
          {variant === 'address' && (
            <LocationDropdown
              suggestions={locationSuggestions}
              onSelect={handleLocationSelect}
              visible={showLocationDropdown}
              loading={locationLoading}
            />
          )}

          {showClear && type !== 'password' && label !== 'Password' ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className={[clearButtonBase, rightIcon ? 'right-10' : 'right-2'].join(' ')}
              aria-label="Clear input"
              disabled={disabled}
            >
              <Image src="/icons/ic_close.svg" alt="Clear" width={24} height={24} />
            </button>
          ) : null}

          {rightIcon ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onRightIconClick}
              className={rightIconButtonBase}
              aria-label="input action"
              disabled={disabled}
            >
              <span className="text-[var(--color-black)] opacity-80">{rightIcon}</span>
            </button>
          ) : null}
        </div>

        {hasError ? (
          <p id={`${id}-help`} role="alert" className="label-sm-medium text-[var(--error)]">
            {typeof error === 'string' ? error : ' '}
          </p>
        ) : helperText ? (
          <p id={`${id}-help`} className={helperTextStyles}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
