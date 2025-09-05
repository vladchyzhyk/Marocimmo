import Image from 'next/image'
import React from 'react'

export type LocationSuggestion = {
  id: string;
  street: string;
  city: string;
};

export type LocationDropdownProps = {
  suggestions: LocationSuggestion[];
  onSelect: (suggestion: LocationSuggestion) => void;
  visible: boolean;
  loading?: boolean;
  className?: string;
  value?: string;
};

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  suggestions,
  onSelect,
  visible,
  loading = false,
  className = '',
  value,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`
        absolute top-full left-0 right-0 z-50 scrollbar-none
        bg-[var(--bg-tint)] border border-[var(--border)] 
        rounded-b-[16px] shadow-lg
        max-h-40 md:max-h-64 overflow-y-auto
        ${className}
      `}
    >
      {loading ? (
        <div className="flex justify-center items-center py-3 px-4">
          <div className="w-12 h-12 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 animate-spin"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="16" stroke="#E5E5E5" strokeWidth="4" fill="none" />
              <path
                d="M24 8C24 8 24 16 24 16C24 16 32 16 32 16"
                stroke="#519C2C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
                style={{
                  transformOrigin: '24px 24px',
                }}
              />
            </svg>
          </div>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="flex justify-center items-center py-4 px-4">
          <span className="body-md text-[var(--text-body-tint)]">No locations found</span>
        </div>
      ) : (
        suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            className={`
            w-full flex items-center gap-2 p-4 md:p-3 lg:p-3 xl:p-3
            hover:bg-white transition-colors
            ${value === suggestion.street ? 'bg-white' : ''}
          `}
          >
            {/* Location Icon */}
            <div className="flex-shrink-0 w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 flex items-center justify-center">
              <Image src="/icons/ic_location.svg" alt="Location" width={24} height={24} />
            </div>

            {/* Address Text */}
            <div className="flex items-center gap-1 flex-1 text-left">
              <span className="body-lg text-[var(--color-black)]">{suggestion.street},</span>
              <span
                className={`body-lg ${
                  value === `${suggestion.street}, ${suggestion.city}`
                    ? 'text-[var(--accent-green)]'
                    : 'text-[var(--color-black)]'
                }`}
              >
                {suggestion.city}
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default LocationDropdown;
