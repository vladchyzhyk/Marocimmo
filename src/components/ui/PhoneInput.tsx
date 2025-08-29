'use client';

import { useState } from 'react';

type PhoneInputProps = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultCountryCode?: string; // e.g. "+212"
  onCountryCodeChange?: (code: string) => void;
};

const COUNTRY_CODES = ['+212', '+33', '+34', '+1'];

export default function PhoneInput({
  label = 'Contact phone number',
  required = true,
  placeholder = 'Enter phone number',
  value,
  onChange,
  defaultCountryCode = '+212',
  onCountryCodeChange,
}: PhoneInputProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [localCode, setLocalCode] = useState<string>(defaultCountryCode);
  const [localValue, setLocalValue] = useState<string>(value ?? '');

  const currentValue = value !== undefined ? value : localValue;

  const handleValueChange = (val: string) => {
    if (onChange) onChange(val);
    setLocalValue(val);
  };

  const handleCodeChange = (code: string) => {
    setLocalCode(code);
    if (onCountryCodeChange) onCountryCodeChange(code);
    setCountryOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1">
        <div className="body-md text-[var(--color-black)]">{label}</div>
        {required && <div className="body-md font-medium text-[var(--error)]">*</div>}
      </div>

      <div className="flex items-center gap-2 border border-[var(--border)] rounded-[8px] px-4 py-3 w-full">
        <div className="relative">
          <button
            type="button"
            onClick={() => setCountryOpen((o) => !o)}
            className="flex items-center gap-2 text-[var(--color-black)] body-lg"
            aria-haspopup="listbox"
            aria-expanded={countryOpen}
          >
            <span>{localCode}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {countryOpen && (
            <ul
              role="listbox"
              className="absolute z-10 mt-2 max-h-60 w-28 overflow-auto rounded-md border border-[var(--border)] bg-white shadow"
            >
              {COUNTRY_CODES.map((code) => (
                <li
                  key={code}
                  role="option"
                  aria-selected={code === localCode}
                  onClick={() => handleCodeChange(code)}
                  className="cursor-pointer px-3 py-2 hover:bg-[var(--bg-tint)] text-[var(--color-black)] body-md"
                >
                  {code}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="tel"
          inputMode="tel"
          className="flex-1 outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, '');
            handleValueChange(digitsOnly);
          }}
        />
      </div>
    </div>
  );
}
