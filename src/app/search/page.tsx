'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from '@/hooks/useSearchParams';
import { PropertyCard } from '@/components/PropertyCard';
import { LocationFilter } from '@/components/search-results/Filters';
import { FilterBar } from '@/components/filters/FilterBar';
import { SearchFilterPopup } from '@/components/filters/SearchFilterPopup';
import { SaveFilterModal } from '@/components/filters/SaveFilterModal';
import { SaveFilterSuccessModal } from '@/components/filters/SaveFilterSuccessModal';
import { NotificationIcon } from '@/utils/icons';
import { PropertyType, DealType } from '@/components/filters/filters-config';
import { ActiveFilters } from '@/components/filters/ActiveFilters';
import { NoResults } from '@/components/search-results/NoResults';
import Pagination from '@/components/search-results/Pagination';
import { SortDropdown, SortValue, SORT_OPTIONS } from '@/components/search-results/SortDropdown';
import { mockProperties } from '@/utils/mockProperties';
import { getPropertyIcons } from '@/utils/getPropertyIcons';
import { LOCATION_SEARCH_OPTIONS } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { saveFilterToStorage } from '@/utils/savedFiltersStorage';

const ITEMS_PER_PAGE = 10;

function SearchPageContent() {
  const { searchParams, setSearchParams } = useSearchParams();
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isSaveFilterModalOpen, setIsSaveFilterModalOpen] = useState(false);
  const [isSaveFilterSuccessModalOpen, setIsSaveFilterSuccessModalOpen] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState('');
  const [sortValue, setSortValue] = useState<SortValue>('newest');

  const router = useRouter();

  const currentPage = searchParams.page ?? 1;
  const prevFiltersRef = useRef<string>('');

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      if (searchParams.dealType && searchParams.dealType !== 'sale') {
        return true;
      }
      if (searchParams.locationId && property.locationId !== searchParams.locationId) {
        return false;
      }
      if (searchParams.propertyTypes.length > 0) {
        const propertyTypeLower = property.propertyType.toLowerCase() as PropertyType;
        if (!searchParams.propertyTypes.includes(propertyTypeLower)) {
          return false;
        }
      }

      if (searchParams.priceMin !== undefined && property.price < searchParams.priceMin) {
        return false;
      }
      if (searchParams.priceMax !== undefined && property.price > searchParams.priceMax) {
        return false;
      }
      if (searchParams.areaMin !== undefined && property.area < searchParams.areaMin) {
        return false;
      }
      if (searchParams.areaMax !== undefined && property.area > searchParams.areaMax) {
        return false;
      }
      if (searchParams.bedrooms !== undefined && property.bedrooms !== undefined) {
        if (searchParams.exactMatch) {
          if (property.bedrooms !== searchParams.bedrooms) {
            return false;
          }
        } else {
          if (property.bedrooms < searchParams.bedrooms) {
            return false;
          }
        }
      }
      if (searchParams.bathrooms !== undefined && property.bathrooms !== undefined) {
        if (searchParams.exactMatch) {
          if (property.bathrooms !== searchParams.bathrooms) {
            return false;
          }
        } else {
          if (property.bathrooms < searchParams.bathrooms) {
            return false;
          }
        }
      }

      return true;
    });
  }, [
    searchParams.dealType,
    searchParams.locationId,
    searchParams.propertyTypes,
    searchParams.priceMin,
    searchParams.priceMax,
    searchParams.areaMin,
    searchParams.areaMax,
    searchParams.bedrooms,
    searchParams.bathrooms,
    searchParams.exactMatch,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    const currentFilters = JSON.stringify({
      dealType: searchParams.dealType,
      locationId: searchParams.locationId,
      propertyTypes: searchParams.propertyTypes,
      priceMin: searchParams.priceMin,
      priceMax: searchParams.priceMax,
      areaMin: searchParams.areaMin,
      areaMax: searchParams.areaMax,
      bedrooms: searchParams.bedrooms,
      bathrooms: searchParams.bathrooms,
      exactMatch: searchParams.exactMatch,
    });

    if (prevFiltersRef.current && prevFiltersRef.current !== currentFilters && currentPage !== 1) {
      setSearchParams({ page: 1 });
    }

    prevFiltersRef.current = currentFilters;
  }, [
    searchParams.dealType,
    searchParams.locationId,
    searchParams.propertyTypes,
    searchParams.priceMin,
    searchParams.priceMax,
    searchParams.areaMin,
    searchParams.areaMax,
    searchParams.bedrooms,
    searchParams.bathrooms,
    searchParams.exactMatch,
    currentPage,
    setSearchParams,
  ]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page });
  };

  const generateFilterName = (): string => {
    const parts: string[] = [];

    if (searchParams.dealType) {
      const dealTypeLabels: Record<DealType, string> = {
        sale: 'Buy',
        'long-term': 'Long-term Rent',
        'short-term': 'Short-term Rent',
      };
      parts.push(dealTypeLabels[searchParams.dealType]);
    }

    if (searchParams.propertyTypes.length > 0) {
      const propertyTypeLabels: Record<PropertyType, string> = {
        apartment: 'Apartment',
        house: 'House',
        villa: 'Villa',
        office: 'Office',
        commercial: 'Commercial',
        land: 'Land',
      };
      const propertyTypeLabel =
        searchParams.propertyTypes.length === 1
          ? propertyTypeLabels[searchParams.propertyTypes[0]]
          : `${searchParams.propertyTypes.length} Property Types`;
      parts.push(propertyTypeLabel);
    }

    if (searchParams.locationId) {
      const location = LOCATION_SEARCH_OPTIONS.find((opt) => opt.id === searchParams.locationId);
      if (location) {
        if (searchParams.locationId === 'current') {
          parts.push('Current location');
        } else {
          parts.push(`in ${location.street}`);
        }
      }
    }

    return parts.length > 0 ? parts.join(' ') : 'Saved filter';
  };

  const handleSaveFilter = (filterName: string) => {
    try {
      saveFilterToStorage(filterName, searchParams, filteredProperties.length);
      setSavedFilterName(filterName);
      setIsSaveFilterModalOpen(false);
      setIsSaveFilterSuccessModalOpen(true);
    } catch (error) {
      console.error('Error saving filter:', error);
    }
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 mt-[69px]">
        <div className="flex flex-col gap-4 py-4 border-b-[var(--border)]">
          <div className="flex gap-2">
            <LocationFilter />
            <FilterBar onMoreFiltersClick={() => setIsFilterPopupOpen(true)} />
          </div>
        </div>
        <div className="mb-2 hidden md:block">
          <ActiveFilters />
        </div>
        <div className="divider w-screen h-[1px] relative left-[calc(-50vw+50%)] bg-[var(--border)]"></div>
        <div className="w-full lg:w-3/4 mt-4">
          <div className="flex items-center gap-2 p-0 ">
            <span className="text-base leading-[140%] text-[#222222] flex items-center flex-grow">
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </span>
            <div className="flex justify-end items-center gap-2 h-8 flex-none">
              <button
                type="button"
                onClick={() => setIsSaveFilterModalOpen(true)}
                className="hidden md:flex flex-row justify-center items-center px-4 gap-2 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg box-border flex-none hover:border-[var(--accent-green)] transition-opacity"
                tabIndex={0}
                aria-label="Save filter"
              >
                <NotificationIcon className="w-4 h-4 text-[#222222] flex-none" />
                <span className="block text-base leading-[140%] text-[#222222] flex-none">
                  Save filter
                </span>
              </button>

              <SortDropdown
                value={sortValue}
                options={SORT_OPTIONS}
                onChange={(value) => setSortValue(value)}
              />
            </div>
          </div>
          {filteredProperties.length === 0 ? (
            <NoResults />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 py-4">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    onClick={() => router.push(`/property/${property.id}`)}
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    pricePerPeriod={property.pricePerPeriod}
                    currency={property.currency}
                    propertyType={property.propertyType}
                    location={property.location}
                    images={property.images}
                    isFavorite={property.isFavorite}
                    propertyIcons={getPropertyIcons(property)}
                    phone={property.phone}
                    whatsapp={property.whatsapp}
                    email={property.email}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center py-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <SearchFilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        resultCount={filteredProperties.length}
      />
      <SaveFilterModal
        isOpen={isSaveFilterModalOpen}
        onClose={() => setIsSaveFilterModalOpen(false)}
        onSave={handleSaveFilter}
        defaultFilterName={generateFilterName()}
      />
      <SaveFilterSuccessModal
        isOpen={isSaveFilterSuccessModalOpen}
        onClose={() => setIsSaveFilterSuccessModalOpen(false)}
        filterName={savedFilterName}
      />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen" />}>
      <SearchPageContent />
    </Suspense>
  );
}
