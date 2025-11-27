'use client';

import Image from 'next/image';
import { useState } from 'react';
import HeroTabs from './HeroTabs';
import HeroSelect from './HeroSelect';
import Button from '../../ui/Button';
import {
  DEAL_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  LOCATION_SEARCH_OPTIONS,
} from '@/utils/constants';
import { LocationSearch, LocationSearchOption } from '../../LocationSearch';
import { reverseGeocode } from '@/utils/geocoding';

export default function Hero() {
  const [dealType, setDealType] = useState('sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationSearchHistory, setLocationSearchHistory] = useState<string[]>([]);

  const handleSearch = () => {
    console.log('Search:', { dealType, location, propertyType });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value.trim()) {
      setIsLocationLoading(true);
      setTimeout(() => setIsLocationLoading(false), 500);
    } else {
      setIsLocationLoading(false);
    }
  };

  const handleLocationSelect = (option: LocationSearchOption) => {
    const locationText = option.region
      ? `${option.street}, ${option.city}`
      : `${option.street}, ${option.city}`;

    if (!locationSearchHistory.includes(locationText)) {
      setLocationSearchHistory((prev) => [locationText, ...prev.slice(0, 4)]);
    }

    console.log('Selected location:', option);
  };

  const handleDeleteFromHistory = (locationToDelete: string) => {
    setLocationSearchHistory((prev) => prev.filter((item) => item !== locationToDelete));
  };

  const handleCurrentLocationClick = async () => {
    setLocation('Current location');
  };

  return (
    <section className="relative w-full mt-[69px] min-h-[686px] md:min-h-[800px] lg:min-h-[520px]  flex flex-col ">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Hero background"
          fill
          className="object-cover object-[50%_20%] md:object-[50%_25%] lg:object-[50%_40%] brightness-75"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black)]/30 via-[var(--color-black)]/20 to-[var(--color-black)]/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center text-center sm:text-center py-[64px] md:py-[138px] lg:py-[68px] gap-[64px] sm:gap-[85px] lg:gap-[68px]">
          <h1 className="heading-h1 text-[var(--white)] max-w-4xl px-2 text-left sm:text-center">
            <span className="sm:hidden">
              Find the property
              <br />
              that&apos;s right
              <br />
              for you
            </span>

            <span className="hidden sm:inline">
              Find your next home
              <br />
              in Morocco
            </span>
          </h1>

          <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-0">
            <div className="flex justify-center mb-0">
              <HeroTabs options={DEAL_TYPE_OPTIONS} value={dealType} onChange={setDealType} />
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 sm:bg-[var(--white)] p-0 sm:p-4 rounded-[8px] box-border sm:h-[80px]">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 w-full">
                  <LocationSearch
                    id="hero-location"
                    value={location}
                    onChange={handleLocationChange}
                    onSelect={handleLocationSelect}
                    placeholder="Location"
                    options={LOCATION_SEARCH_OPTIONS}
                    loading={isLocationLoading}
                    searchHistory={locationSearchHistory}
                    onDeleteFromHistory={handleDeleteFromHistory}
                    onCurrentLocationClick={handleCurrentLocationClick}
                    showCurrentLocation={true}
                    showDivider={true}
                  />
                </div>

                <div className="flex-1 w-full">
                  <HeroSelect
                    id="hero-property-type"
                    value={propertyType}
                    onChange={setPropertyType}
                    placeholder="Type of property"
                    options={PROPERTY_TYPE_OPTIONS}
                    showDivider={true}
                  />
                </div>

                <Button
                  label="Search"
                  onClick={handleSearch}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="sm:w-[100px] h-12 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
