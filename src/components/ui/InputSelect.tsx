import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
    sm: 'h-10 md:h-8 lg:h-8 xl:h-8',
    md: 'h-12 md:h-10 lg:h-10 xl:h-10',
    lg: 'h-14 md:h-12 lg:h-12 xl:h-12',
  };

  const paddingStyles = {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
  };

  const variantStyles = {
    default: 'border-[var(--border-input)]',
    outline: 'border border-[var(--border)]',
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
  'fixed bg-[var(--white)] border border-[var(--border-input)] rounded-[8px] shadow-lg max-h-48 overflow-y-auto overflow-x-hidden pt-2 md:pt-1';

const dropdownOptionBase =
  'relative px-4 py-2 bg-[var(--bg-tint)] cursor-pointer text-[var(--color-black)] body-lg hover:bg-white hover:text-[var(--accent-green)] transition-colors whitespace-nowrap';

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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement | HTMLInputElement>(null);
    const hasError = Boolean(error);

    const selectedOption = options.find((option) => option.value === value);

    // Filter options based on input value when typing
    const filteredOptions = isTyping
      ? options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      : options;

    const computedInputClasses = [
      getInputStyles(variant, size),
      fullWidth ? 'w-full' : '',
      hasError ? 'border-[var(--error)]' : selectedOption ? 'border-[var(--accent-green)]' : '',
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

    // Calculate dropdown position
    useEffect(() => {
      if (isOpen && dropdownRef.current && inputRef.current) {
        const updatePosition = () => {
          if (!dropdownRef.current || !inputRef.current) return;

          const rect = inputRef.current.getBoundingClientRect();
          const dropdown = dropdownRef.current;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const padding = 16;

          dropdown.style.width = `${rect.width}px`;
          dropdown.style.minWidth = `${rect.width}px`;

          const spaceBottom = viewportHeight - rect.bottom;
          const spaceTop = rect.top;

          let top = 0;
          let left = rect.left;

          if (spaceBottom < dropdown.offsetHeight + padding && spaceTop > spaceBottom) {
            top = rect.top - dropdown.offsetHeight - 8;
          } else {
            top = rect.bottom + 8;
          }

          if (left < padding) {
            left = padding;
          }
          const dropdownWidth = dropdown.offsetWidth || rect.width;
          if (left + dropdownWidth > viewportWidth - padding) {
            left = viewportWidth - dropdownWidth - padding;
          }

          dropdown.style.top = `${Math.max(padding, Math.min(top, viewportHeight - dropdown.offsetHeight - padding))}px`;
          dropdown.style.left = `${left}px`;
        };

        const handleResize = () => {
          updatePosition();
        };

        requestAnimationFrame(() => {
          updatePosition();
        });

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize, true);

        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleResize, true);
        };
      }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

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
              ref={inputRef as React.RefObject<HTMLInputElement>}
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
              ref={inputRef as React.RefObject<HTMLDivElement>}
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
              <span className="text-[var(--color-black)]">
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
        </div>

        {/* Dropdown Portal */}
        {isOpen &&
          typeof window !== 'undefined' &&
          createPortal(
            <div
              ref={dropdownRef}
              className={classNames(dropdownBase)}
              style={{ zIndex: 1000 }}
              role="listbox"
              id={`${id}-listbox`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <div
                      key={option.value}
                      className={classNames(
                        dropdownOptionBase,
                        isSelected ? 'flex items-center justify-between' : '',
                      )}
                      onClick={() => handleOptionSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className={isSelected ? 'text-[var(--accent-green)]' : ''}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <Image
                          src="/icons/ic_check.svg"
                          alt="Selected"
                          width={16}
                          height={16}
                          className="ml-2"
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-[var(--text-body-tint)] body-lg">
                  No matching options
                </div>
              )}
            </div>,
            document.body,
          )}

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
