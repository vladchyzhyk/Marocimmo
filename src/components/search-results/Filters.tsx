import { useSearchParams } from '@/hooks/useSearchParams';
import { LocationSearch, LocationSearchOption } from '../LocationSearch';
import { useState, useMemo, useEffect } from 'react';
import { LOCATION_SEARCH_OPTIONS } from '@/utils/constants';

export const LocationFilter = () => {
  const { searchParams, setSearchParams } = useSearchParams();
  const [locationText, setLocationText] = useState<string>('');
  const [locationSearchHistory, setLocationSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!searchParams.locationId) {
      const isLocationTextFromOption = LOCATION_SEARCH_OPTIONS.some((opt) => {
        const optionText = opt.region
          ? `${opt.street}, ${opt.city}`
          : `${opt.street}, ${opt.city}`;
        return locationText === optionText || locationText === 'Current location';
      });
      if (isLocationTextFromOption) {
        setLocationText('');
      }
      return;
    }

    if (searchParams.locationId && !locationText) {
      const locationOption = LOCATION_SEARCH_OPTIONS.find(
        (opt) => opt.id === searchParams.locationId,
      );
      if (locationOption) {
        if (searchParams.locationId === 'current') {
          setLocationText('Current location');
        } else {
          const locationTextValue = locationOption.region
            ? `${locationOption.street}, ${locationOption.city}`
            : `${locationOption.street}, ${locationOption.city}`;
          setLocationText(locationTextValue);
        }
      }
    }
  }, [searchParams.locationId, locationText]);

  const locationDisplayValue = useMemo(() => {
    if (locationText) {
      return locationText;
    }
    if (searchParams.locationId) {
      const locationOption = LOCATION_SEARCH_OPTIONS.find(
        (opt) => opt.id === searchParams.locationId,
      );
      if (locationOption) {
        return locationOption.region
          ? `${locationOption.street}, ${locationOption.city}`
          : `${locationOption.street}, ${locationOption.city}`;
      }
    }
    return '';
  }, [locationText, searchParams.locationId]);

  const handleLocationChange = (value: string) => {
    setLocationText(value);
    if (!value.trim() && searchParams.locationId) {
      setSearchParams({ locationId: null });
    }
  };

  const handleLocationSelect = (option: LocationSearchOption) => {
    const locationTextValue = option.region
      ? `${option.street}, ${option.city}`
      : `${option.street}, ${option.city}`;

    if (!locationSearchHistory.includes(locationTextValue)) {
      setLocationSearchHistory((prev) => [locationTextValue, ...prev.slice(0, 4)]);
    }
    setLocationText(locationTextValue);
    setSearchParams({ locationId: option.id });
  };

  const handleDeleteFromHistory = (locationToDelete: string) => {
    setLocationSearchHistory((prev) => prev.filter((item) => item !== locationToDelete));
  };

  const handleCurrentLocationClick = async () => {
    const currentLocationId = 'current';
    setLocationText('Current location');
    setSearchParams({ locationId: currentLocationId });
  };

  return (
    <div className="w-[268px]">
      <LocationSearch
        onDeleteFromHistory={handleDeleteFromHistory}
        onCurrentLocationClick={handleCurrentLocationClick}
        showCurrentLocation={true}
        searchHistory={locationSearchHistory}
        onSelect={handleLocationSelect}
        value={locationDisplayValue}
        onChange={handleLocationChange}
        options={LOCATION_SEARCH_OPTIONS}
        className="flex-1 border rounded-[8px] border-[var(--border)]"
        textClassName="text-[var(--color-black)] placeholder:text-[var(--color-black)]"
      />
    </div>
  );
};
