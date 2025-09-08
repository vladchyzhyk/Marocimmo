import SegmentControl, { SegmentControlOption } from '@/components/SegmentControl';
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
  // Optional segmented control next to label
  segmentType?: 'switch' | 'segment';
  segmentOptions?: SegmentControlOption[];
  segmentValue?: string;
  onSegmentChange?: (value: string) => void;
  // Calendar variant
  calendar?: boolean;
  onCalendarClick?: () => void;
  // Numeric-only input helper
  numbersOnly?: boolean;
};

const baseContainer = 'flex flex-col gap-2 w-full';
const labelStyles = 'body-md text-[var(--color-black)]';
const helperTextStyles = 'label-sm-medium text-[var(--text-body-tint)]';

const inputBase = [
  'relative w-full h-12 md:h-10 lg:h-10 xl:h-10 rounded-[8px] px-4 z-[5]',
  'border',
  'placeholder-[var(--text-body-tint)]',
  'text-[var(--color-black)] body-lg',
  'outline-none transition-colors',
].join(' ');

const inputAppearance: Record<InputAppearance, string> = {
  default: 'hover:bg-[var(--bg-tint)]',
  filled: 'bg-white hover:bg-[var(--bg-tint)]',
};

const inputBorders = {
  default: 'border-[var(--border-input)]',
  focus: 'focus:border-[var(--accent-green)]',
  error: 'border-[var(--error)]',
  disabled: 'opacity-40 cursor-not-allowed',
};

const leftIconBase =
  'absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 text-[var(--text-body-tint)] z-[10]';

const rightIconButtonBase =
  'absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 rounded-[8px] hover:bg-[var(--bg-tint)] z-[10]';

const clearButtonBase =
  'absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-[var(--bg-tint)] text-[var(--text-body-tint)] z-[10]';

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
      segmentType = 'switch',
      segmentOptions = [],
      segmentValue,
      onSegmentChange,
      calendar = false,
      onCalendarClick,
      numbersOnly = false,
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
      variant === 'address' ? 'pl-10' : '', // Add left padding for address variant
      (calendar || rightIcon) && showClear
        ? 'pr-20'
        : calendar || rightIcon || showClear
          ? 'pr-10'
          : '',
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

    const handleFilteredChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!onChange) return;
      if (!numbersOnly) {
        onChange(e);
        return;
      }
      const filteredValue = e.target.value.replace(/\D/g, '');
      if (filteredValue === e.target.value) {
        onChange(e);
      } else {
        const clonedEvent = {
          ...e,
          target: { ...e.target, value: filteredValue },
          currentTarget: { ...e.currentTarget, value: filteredValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(clonedEvent);
      }
    };

    const handleBeforeInput: React.FormEventHandler<HTMLInputElement> = (e) => {
      if (!numbersOnly) return;
      const nativeEvent = e.nativeEvent as unknown;
      const inputEvent =
        nativeEvent &&
        typeof nativeEvent === 'object' &&
        'data' in (nativeEvent as Record<string, unknown>)
          ? (nativeEvent as { data: unknown })
          : null;
      const data = inputEvent?.data;
      if (typeof data === 'string' && /\D/.test(data)) {
        e.preventDefault();
      }
    };

    const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
      if (!numbersOnly) return;
      const pasted = e.clipboardData.getData('text');
      if (/\D/.test(pasted)) {
        e.preventDefault();
        const digitsOnly = pasted.replace(/\D/g, '');
        const target = e.target as HTMLInputElement;
        const start = target.selectionStart ?? target.value.length;
        const end = target.selectionEnd ?? target.value.length;
        const newValue = target.value.slice(0, start) + digitsOnly + target.value.slice(end);
        const clonedEvent = {
          // minimal shape for our onChange consumer
          target: { ...target, value: newValue },
          currentTarget: { ...target, value: newValue },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange?.(clonedEvent);
      }
    };

    return (
      <div className={[baseContainer, className].filter(Boolean).join(' ')}>
        {label ? (
          <div className="flex items-center justify-between gap-2">
            <label htmlFor={id} className={labelStyles}>
              {label}
              {required ? (
                <span className="ml-1 font-medium text-[var(--error)]" aria-hidden>
                  *
                </span>
              ) : null}
            </label>
            {segmentType &&
            segmentOptions &&
            segmentOptions.length > 0 &&
            segmentValue !== undefined ? (
              <SegmentControl
                type={segmentType}
                options={segmentOptions}
                value={segmentValue}
                onChange={(val) => onSegmentChange?.(val)}
              />
            ) : null}
          </div>
        ) : null}

        <div className="relative">
          {/* Location Icon for address variant */}
          {variant === 'address' && (
            <div className={leftIconBase}>
              <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
            </div>
          )}

          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleFilteredChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onBeforeInput={handleBeforeInput}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText ? `${id}-help` : undefined}
            autoComplete={autoComplete}
            inputMode={numbersOnly ? 'numeric' : undefined}
            pattern={numbersOnly ? '[0-9]*' : undefined}
            ref={ref}
            className={computedInputClasses}
          />

          {/* Location Dropdown */}
          {variant === 'address' && (
            <div className="absolute bottom-[0.25rem] left-0 right-0 z-[1]">
              <LocationDropdown
                suggestions={locationSuggestions}
                value={value}
                onSelect={handleLocationSelect}
                visible={showLocationDropdown}
                loading={locationLoading}
              />
            </div>
          )}

          {showClear && type !== 'password' && label !== 'Password' ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className={[clearButtonBase, calendar || rightIcon ? 'right-10' : 'right-2'].join(
                ' ',
              )}
              aria-label="Clear input"
              disabled={disabled}
            >
              <Image src="/icons/ic_close.svg" alt="Clear" width={24} height={24} />
            </button>
          ) : null}

          {calendar ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={onCalendarClick}
              className={rightIconButtonBase}
              aria-label="Open calendar"
              disabled={disabled}
            >
              <span className="text-[var(--color-black)] opacity-80">
                <Image src="/icons/ic_calendar.svg" alt="Calendar" width={24} height={24} />
              </span>
            </button>
          ) : rightIcon ? (
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
