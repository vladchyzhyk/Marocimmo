import { useSearchParams } from '@/hooks/useSearchParams';
import { LocationSearch, LocationSearchOption } from '../LocationSearch';
import TypePropertySelect from '../TypePropertySelect';
import { useState, useMemo } from 'react';
import { LOCATION_SEARCH_OPTIONS, PROPERTY_TYPE_OPTIONS } from '@/utils/constants';

export const Filters = () => {
  const { searchParams, setSearchParams } = useSearchParams();
  const [locationText, setLocationText] = useState<string>('');
  const [propertyTypes, setPropertyTypes] = useState<string[]>(searchParams.propertyTypes || []);
  const [locationSearchHistory, setLocationSearchHistory] = useState<string[]>([]);

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

  const handlePropertyTypesChange = (value: string[]) => {
    setPropertyTypes(value);
    setSearchParams({ propertyTypes: value });
  };

  return (
    <div className="flex gap-2">
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
      />
      <TypePropertySelect
        className="flex-1 border rounded-[8px] border-[var(--border)]"
        options={PROPERTY_TYPE_OPTIONS}
        value={propertyTypes}
        onChange={handlePropertyTypesChange}
      />
    </div>
  );
};
