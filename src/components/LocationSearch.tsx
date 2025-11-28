'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LocationSuggestion } from '@/components/ui/LocationDropdown';
import { Watch } from '@/utils/icons';

export type LocationSearchOption = LocationSuggestion & { region?: string; id: string };

export type LocationSearchProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (location: LocationSearchOption) => void;
  placeholder?: string;
  options?: LocationSearchOption[];
  loading?: boolean;
  searchHistory?: string[];
  onDeleteFromHistory?: (location: string) => void;
  onCurrentLocationClick?: () => void;
  showCurrentLocation?: boolean;
  className?: string;
  showDivider?: boolean;
};

export const LocationSearch = ({
  id,
  value,
  onChange,
  onSelect,
  placeholder = 'Location',
  options = [],
  loading = false,
  searchHistory = [],
  onDeleteFromHistory,
  onCurrentLocationClick,
  showCurrentLocation = true,
  className = '',
  showDivider = false,
}: LocationSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLocations = useMemo(() => {
    if (!value.trim()) {
      return [];
    }

    const searchLower = value.toLowerCase();
    return options.filter(
      (location) =>
        location.street.toLowerCase().includes(searchLower) ||
        location.city.toLowerCase().includes(searchLower) ||
        (location.region && location.region.toLowerCase().includes(searchLower)),
    );
  }, [value, options]);

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="text-[var(--accent-green)]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleLocationSelect = (location: LocationSearchOption) => {
    const locationText = location.region
      ? `${location.street}, ${location.city}`
      : `${location.street}, ${location.city}`;
    onChange(locationText);
    onSelect?.(location);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleDeleteFromHistory = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteFromHistory?.(location);
  };

  const handleCurrentLocationClick = () => {
    if (onCurrentLocationClick) {
      onCurrentLocationClick();
    } else {
      onChange('Current location');
    }
    setIsOpen(false);
  };

  const handleHistoryItemClick = (location: string) => {
    onChange(location);
    setIsOpen(false);
  };

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

  const isSelected = value && !value.trim().startsWith('Current location');
  const showDropdown =
    isOpen && (filteredLocations.length > 0 || !value.trim() || searchHistory.length > 0);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div
        className={`rounded-[8px] sm:rounded-none relative w-full h-12 md:h-10 lg:h-10 xl:h-10 px-4 pr-10 bg-white transition-colors flex items-center 
         ${showDivider ? 'border-r border-[var(--border-input)]' : ''}`}
      >
        <div className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-[20px] h-[20px]  text-[var(--text-body-tint)] z-10">
          <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
        </div>
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={isSelected ? '' : placeholder}
          className={`flex-1 body-lg text-left bg-transparent border-none outline-none pl-5 ${
            isSelected
              ? 'text-[var(--accent-green)]'
              : value
                ? 'text-[var(--color-black)]'
                : 'text-[var(--text-body-tint)]'
          }`}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-[var(--bg-tint)] rounded transition-colors"
              aria-label="Clear"
            >
              <Image src="/icons/ic_close.svg" alt="Clear" width={16} height={16} />
            </button>
          )}
          {!value && (
            <div className="p-2">
              <Image
                src="/icons/ic_arrow_down.svg"
                alt="Select"
                width={24}
                height={24}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          id={id ? `${id}-listbox` : undefined}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border-input)] rounded-[8px] shadow-lg max-h-64 overflow-y-auto z-50"
          role="listbox"
        >
          {showCurrentLocation && !value.trim() && (
            <button
              className="w-full flex items-center gap-2 p-4 md:p-3 lg:p-3 xl:p-3 hover:bg-[var(--bg-tint)] transition-colors"
              onClick={handleCurrentLocationClick}
            >
              <div className="flex-shrink-0 w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 flex items-center justify-center">
                <Image src="/icons/ic_location.svg" alt="Location" width={24} height={24} />
              </div>
              <span className="body-lg text-[var(--accent-green)]">Current location</span>
            </button>
          )}

          {loading && value.trim() && (
            <div className="flex justify-center items-center py-3 px-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 animate-spin"
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
                    style={{ transformOrigin: '24px 24px' }}
                  />
                </svg>
              </div>
            </div>
          )}

          {!loading && filteredLocations.length > 0 && (
            <>
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  className="w-full flex items-center gap-2 p-4 md:p-3 lg:p-3 xl:p-3 hover:bg-[var(--bg-tint)] transition-colors text-left"
                  onClick={() => handleLocationSelect(location)}
                  role="option"
                  aria-selected={false}
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 flex items-center justify-center">
                    <Image src="/icons/ic_location.svg" alt="Location" width={24} height={24} />
                  </div>
                  <div className="flex-1">
                    {location.region && location.city === 'region' ? (
                      <span className="body-lg text-[var(--color-black)]">
                        {highlightText(`${location.street}, ${location.city}`, value)}
                      </span>
                    ) : (
                      <span className="body-lg text-[var(--color-black)]">
                        {highlightText(`${location.street}, ${location.city}`, value)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </>
          )}

          {!loading && value.trim() && filteredLocations.length === 0 && (
            <div className="flex justify-center items-center py-4 px-4">
              <span className="body-md text-[var(--text-body-tint)]">No locations found</span>
            </div>
          )}

          {searchHistory.length > 0 && (
            <>
              <div className="px-4 py-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="title-sm">Search history</span>
                </div>
              </div>
              {searchHistory.map((location, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between gap-2 p-4 md:p-3 lg:p-3 xl:p-3 hover:bg-[var(--bg-tint)] transition-colors text-left cursor-pointer"
                  onClick={() => handleHistoryItemClick(location)}
                  role="option"
                  aria-selected={false}
                >
                  <span className="body-lg text-[var(--color-black)] flex items-center gap-2">
                    <Watch className="w-[16px] h-[16px]" />
                    {location}
                  </span>
                  {onDeleteFromHistory && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteFromHistory(location, e)}
                      className="p-1 hover:bg-white rounded transition-colors"
                      aria-label="Delete from history"
                    >
                      <Image src="/icons/ic_close.svg" alt="Delete" width={16} height={16} />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
