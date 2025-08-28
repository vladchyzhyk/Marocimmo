import Image from 'next/image';
import React from 'react';

export type NumberStepperProps = {
  id?: string;
  name?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string | boolean;
  className?: string;
};

const NumberStepper = React.forwardRef<HTMLInputElement, NumberStepperProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      min = 0,
      max,
      step = 1,
      disabled = false,
      required = false,
      label,
      error,
      className = '',
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const isMinDisabled = value <= min;
    const isMaxDisabled = max !== undefined && value >= max;

    const handleIncrement = () => {
      if (!disabled && !isMaxDisabled) {
        onChange(value + step);
      }
    };

    const handleDecrement = () => {
      if (!disabled && !isMinDisabled) {
        onChange(Math.max(min, value - step));
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        const clampedValue =
          max !== undefined ? Math.min(max, Math.max(min, newValue)) : Math.max(min, newValue);
        onChange(clampedValue);
      }
    };

    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && (
          <label htmlFor={id} className="body-md text-[var(--color-black)]">
            {label}
            {required && (
              <span className="ml-1 font-medium text-[var(--error)]" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="flex items-center w-full border border-[var(--border-input)] rounded-lg bg-white px-3">
          {/* Decrement Button */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || isMinDisabled}
            className={`flex items-center justify-center transition-colors ${
              disabled || isMinDisabled
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:bg-[var(--bg-tint)]'
            }`}
          >
            <Image src="/icons/ic_minus.svg" alt="Decrease" width={24} height={24} />
          </button>

          {/* Number Input */}
          <div className="flex-1 flex items-center justify-center px-4 py-3">
            <input
              ref={ref}
              id={id}
              name={name}
              type="number"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={`w-full text-center body-lg bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                hasError ? 'text-[var(--error)]' : 'text-[var(--color-black)]'
              } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || isMaxDisabled}
            className={`flex items-center justify-center transition-colors ${
              disabled || isMaxDisabled
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:bg-[var(--bg-tint)]'
            }`}
          >
            <Image src="/icons/ic_plus.svg" alt="Increase" width={24} height={24} />
          </button>
        </div>

        {hasError && (
          <p role="alert" className="label-sm-medium text-[var(--error)]">
            {typeof error === 'string' ? error : ' '}
          </p>
        )}
      </div>
    );
  },
);

NumberStepper.displayName = 'NumberStepper';

export default NumberStepper;
