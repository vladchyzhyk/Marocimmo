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
};

const baseContainer = 'flex flex-col gap-2 w-full';
const labelStyles = 'body-md text-[var(--color-black)]';
const helperTextStyles = 'label-sm-medium text-[var(--text-body-tint)]';

const inputBase =
  'w-full h-12 rounded-[8px] px-4 border bg-white text-[var(--color-black)] body-lg outline-none transition-colors cursor-pointer pr-10 flex items-center relative ';

const rightIconContainer = 'absolute right-2 top-1/2 -translate-y-1/2 p-2';

const dropdownBase =
  'absolute top-full left-0 right-0 bg-[var(--white)] border border-[var(--border-input)] rounded-[8px] shadow-lg max-h-48 overflow-y-auto mt-[-0.5rem] pt-2 ';

const dropdownOptionBase =
  'relative px-4 py-3 bg-white cursor-pointer text-[var(--color-black)] body-lg hover:text-[var(--accent-green)] transition-colors';

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
      inputBase,
      hasError ? 'border-[var(--error)]' : 'border-[var(--border-input)]',
      disabled ? 'opacity-40 cursor-not-allowed' : '',
      inputClassName,
    ]
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
      <div className={[baseContainer, className].filter(Boolean).join(' ')} ref={containerRef}>
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
            className={classNames(rightIconContainer, isOpen ? 'z-[32]' : 'z-[20]')}
            onClick={handleToggle}
          >
            <Image
              src="/icons/ic_arrow_down.svg"
              alt="Select"
              width={24}
              height={24}
              className={` transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className={dropdownBase} role="listbox" id={`${id}-listbox`}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={classNames(dropdownOptionBase, isOpen ? 'z-[31]' : 'z-[20]')}
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
