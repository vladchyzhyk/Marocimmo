import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export type SelectOption = {
  label: string;
  value: string;
};

export type InputSelectProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  options: SelectOption[];
  className?: string;
  inputClassName?: string;
  isTyping?: boolean;
  onInputChange?: (value: string) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

const baseContainer = 'flex flex-col gap-2';
const labelStyles = 'body-md text-[var(--color-black)]';
const helperTextStyles = 'label-sm-medium text-[var(--text-body-tint)]';

const getInputStyles = (variant: 'default' | 'outline', size: 'sm' | 'md' | 'lg') => {
  const base =
    'rounded-[8px] px-4 border bg-white text-[var(--color-black)] body-lg outline-none transition-colors cursor-pointer flex items-center relative whitespace-nowrap';

  const sizeStyles = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
  };

  const paddingStyles = {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
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
    sm: 20,
    md: 24,
    lg: 28,
  };
  return sizeMap[size];
};

const getRightIconContainer = (size: 'sm' | 'md' | 'lg') => {
  const sizeMap = {
    sm: 'absolute right-2 top-1/2 -translate-y-1/2 p-1.5',
    md: 'absolute right-2 top-1/2 -translate-y-1/2 p-2',
    lg: 'absolute right-2 top-1/2 -translate-y-1/2 p-2.5',
  };
  return sizeMap[size];
};

const dropdownBase =
  'absolute top-full left-0 right-0 bg-[var(--white)] border border-[var(--border-input)] rounded-[8px] shadow-lg max-h-48 overflow-y-auto mt-[-0.5rem] pt-2';

const dropdownOptionBase =
  'relative px-4 py-3 bg-white cursor-pointer text-[var(--color-black)] body-lg hover:text-[var(--accent-green)] transition-colors whitespace-nowrap';

const InputSelect = React.forwardRef<HTMLDivElement, InputSelectProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      disabled,
      required,
      label,
      helperText,
      error,
      options,
      className = '',
      inputClassName = '',
      isTyping = false,
      onInputChange,
      variant = 'default',
      size = 'md',
      fullWidth = true,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasError = Boolean(error);

    const selectedOption = options.find((option) => option.value === value);

    // Filter options based on input value when typing
    const filteredOptions = isTyping
      ? options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      : options;

    const computedInputClasses = [
      getInputStyles(variant, size),
      fullWidth ? 'w-full' : '',
      hasError ? 'border-[var(--error)]' : '',
      disabled ? 'opacity-40 cursor-not-allowed' : '',
      inputClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [baseContainer, fullWidth ? 'w-full' : '', className]
      .filter(Boolean)
      .join(' ');

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          onFocus?.();
        }
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onInputChange?.(newValue);

      if (!isOpen) {
        setIsOpen(true);
      }
    };

    const handleOptionSelect = (optionValue: string) => {
      onChange(optionValue);
      setInputValue(optionValue);
      setIsOpen(false);
      onBlur?.();
    };

    const handleBlur = () => {
      // Delay to allow for option clicks
      setTimeout(() => {
        setIsOpen(false);
        onBlur?.();
      }, 150);
    };

    const handleFocus = () => {
      onFocus?.();
    };

    // Sync inputValue with value prop
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className={containerClasses} ref={containerRef}>
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

        <div className={fullWidth ? 'relative w-full' : 'relative inline-block'}>
          {isTyping ? (
            <input
              id={id}
              name={name}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleToggle}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder={placeholder}
              disabled={disabled}
              className={classNames(computedInputClasses, isOpen ? 'z-[30]' : 'z-[10]')}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${id}-listbox`}
              aria-labelledby={label ? `${id}-label` : undefined}
              aria-describedby={helperText ? `${id}-help` : undefined}
              aria-invalid={hasError || undefined}
            />
          ) : (
            <div
              className={classNames(computedInputClasses, isOpen ? 'z-[35]' : 'z-[10]')}
              onClick={handleToggle}
              onBlur={handleBlur}
              onFocus={handleFocus}
              tabIndex={disabled ? -1 : 0}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${id}-listbox`}
              aria-labelledby={label ? `${id}-label` : undefined}
              aria-describedby={helperText ? `${id}-help` : undefined}
              aria-invalid={hasError || undefined}
            >
              <span
                className={
                  selectedOption ? 'text-[var(--color-black)]' : 'text-[var(--text-body-tint)]'
                }
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
          )}

          {/* Arrow Icon */}
          <div
            className={classNames(getRightIconContainer(size), isOpen ? 'z-[36]' : 'z-[20]')}
            onClick={handleToggle}
          >
            <Image
              src="/icons/ic_arrow_down.svg"
              alt="Select"
              width={getIconSize(size)}
              height={getIconSize(size)}
              className={` transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div
              className={classNames(dropdownBase, isOpen ? 'z-[31]' : 'z-[25]')}
              role="listbox"
              id={`${id}-listbox`}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={classNames(dropdownOptionBase, isOpen ? 'z-[31]' : 'z-[25]')}
                    onClick={() => handleOptionSelect(option.value)}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-[var(--text-body-tint)] body-lg">
                  No matching options
                </div>
              )}
            </div>
          )}
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

InputSelect.displayName = 'InputSelect';

export default InputSelect;
