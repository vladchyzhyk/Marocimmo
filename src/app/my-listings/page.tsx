'use client';

import ListingCard from '@/components/ListingCard';
import Button from '@/components/ui/Button';
import ButtonFilter from '@/components/ui/ButtonFilter';
import InputSelect, { type SelectOption } from '@/components/ui/InputSelect';
import SearchInput from '@/components/ui/SearchInput';
import { ArrowNextIcon, FilterIcon, SearchIcon } from '@/utils/icons';
import classNames from 'classnames';
import { useMemo, useState } from 'react';

const dealTypeOptions: SelectOption[] = [
  { label: 'All deals', value: '' },
  { label: 'Short-term Rent', value: 'rent' },
  { label: 'Long-term Rent', value: 'rent' },
  { label: 'Sale', value: 'sale' },
];

const propertyTypeOptions: SelectOption[] = [
  { label: 'All properties', value: '' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Office', value: 'office' },
  { label: 'Land', value: 'land' },
  { label: 'Commercial', value: 'commercial' },
];

const statusOptions: SelectOption[] = [
  { label: 'Any status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Sold', value: 'sold' },
  { label: 'Rented', value: 'rented' },
];

const itemsOptions: SelectOption[] = [
  { label: 'All (10)', value: '10' },
  { label: '8 items', value: '8' },
  { label: '5 items', value: '5' },
  { label: '3 items', value: '3' },
  { label: '2 items', value: '2' },
];

type Listing = {
  id: string;
  title: string;
  dealType: 'short-term' | 'long-term' | 'sale';
  propertyType: string;
  location: string;
  price: number;
  status: 'active' | 'pending' | 'inactive' | 'sold' | 'rented';
  imageUrl?: string;
};

const mockListings: Listing[] = [
  {
    id: 'ID: STA 000001',
    title: 'Sunny 2BR Apartment',
    dealType: 'short-term',
    propertyType: 'apartment',
    location: 'Marrakesh, Gueliz',
    price: 7500,
    status: 'active',
    imageUrl: '/images/light-styled-interior.jpg',
  },
  {
    id: 'ID: SV 000001',
    title: 'Modern Villa with Pool',
    dealType: 'long-term',
    propertyType: 'villa',
    location: 'Casablanca, Ain Diab',
    price: 5200000,
    status: 'pending',
    imageUrl: '/images/cozzy-styled-interior.jpg',
  },
  {
    id: 'ID: LTO 000001',
    title: 'Cozy Office Space',
    dealType: 'short-term',
    propertyType: 'office',
    location: 'Rabat, Agdal',
    price: 12000,
    status: 'inactive',
    imageUrl: '/images/cozzy-livingroom-interior.jpg',
  },
  {
    id: 'ID: SV 000002',
    title: 'Beachfront House',
    dealType: 'long-term',
    propertyType: 'house',
    location: 'Agadir, City Center',
    price: 3100000,
    status: 'active',
    imageUrl: '/images/kitchen-interior.png',
  },
];

const PageItem = ({
  page,
  isCurrent,
  onClick,
}: {
  page: number;
  isCurrent: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
      className={classNames(
        'py-2 px-3 rounded-lg bg-white body-md',
        isCurrent
          ? 'text-[var(--accent-green)]'
          : 'text-[var(--color-black)] hover:bg-[var(--bg-tint)]',
      )}
    >
      <span>{page}</span>
    </button>
  );
};

const Page = () => {
  // Filters state
  const [dealType, setDealType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [items, setItems] = useState('10');
  const [status, setStatus] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [search, setSearch] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const filteredListings = useMemo(() => {
    return mockListings.filter((l) => {
      const byDeal = dealType ? l.dealType === dealType : true;
      const byType = propertyType ? l.propertyType === propertyType : true;
      const byStatus = status ? l.status === status : true;
      const byPrice = l.price >= minPrice && l.price <= maxPrice;
      const bySearch = search
        ? [l.title, l.location, l.propertyType]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      return byDeal && byType && byStatus && byPrice && bySearch;
    });
  }, [dealType, propertyType, status, minPrice, maxPrice, search]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / pageSize));
  const visibleListings = filteredListings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleResetFilters = () => {
    setDealType('');
    setPropertyType('');
    setStatus('');
    setMinPrice(0);
    setMaxPrice(10000000);
    setSearch('');
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[7rem]">
      {/* Title and filters block */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between">
        <div className="flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Manage Listings</h1>
          <p className="body-lg mt-1">Manage all your property listings in one place.</p>
        </div>

        <div className="w-full lg:w-auto flex justify-between lg:items-end gap-4">
          <div className="hidden lg:block w-full flex-1">
            <InputSelect
              variant="outline"
              size="sm"
              id="status"
              value={status}
              inputClassName="w-full py-1"
              onChange={setStatus}
              options={statusOptions}
              placeholder="Any status"
            />
          </div>
          <div className="hidden md:block lg:hidden w-full max-w-[7rem]">
            <InputSelect
              variant="outline"
              size="sm"
              id="propertyType"
              value={items}
              inputClassName="w-full py-1"
              onChange={setItems}
              options={itemsOptions}
            />
          </div>

          <div
            className={classNames('relative flex md:hidden w-fit transition-all duration-300')}
            onClick={() => {
              if (isMobileSearchOpen) {
                return;
              }
              setIsMobileSearchOpen(true);
            }}
          >
            <div
              className={classNames(
                'absolute top-0 left-0 transition-all duration-300',
                isMobileSearchOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100',
              )}
            >
              <ButtonFilter className="!px-2.25 py-2.25" variant="icon-left" onClick={() => {}}>
                <SearchIcon className="w-5 h-5" />
              </ButtonFilter>
            </div>
            <div
              className={classNames(
                'md:block lg:hidden w-full transition-all duration-300',
                isMobileSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
              )}
            >
              <SearchInput
                variant="outline"
                size="sm"
                id="search"
                className="w-full py-1"
                value={search}
                onChange={setSearch}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="hidden lg:block w-full lg:flex-1">
            <SearchInput
              variant="outline"
              size="sm"
              id="search"
              className="w-full py-1"
              value={search}
              onChange={setSearch}
              placeholder="Search..."
            />
          </div>
          <div className="md:flex lg:hidden w-fit md:gap-2">
            <div className="relative hidden md:flex lg:hidden w-fit">
              <div
                className={classNames(
                  'absolute top-0 right-0 transition-all duration-300',
                  isMobileSearchOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100',
                )}
                onClick={() => {
                  if (isMobileSearchOpen) {
                    return;
                  }
                  setIsMobileSearchOpen(true);
                }}
              >
                <ButtonFilter className="!px-2.25 py-2.25" variant="icon-left" onClick={() => {}}>
                  <SearchIcon className="w-5 h-5" />
                </ButtonFilter>
              </div>
              <div
                className={classNames(
                  'md:block lg:hidden w-full transition-all duration-300',
                  isMobileSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                )}
              >
                <SearchInput
                  variant="outline"
                  size="sm"
                  id="search"
                  className="w-full py-1"
                  value={search}
                  onChange={setSearch}
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex lg:hidden w-fit">
              <ButtonFilter className="!px-2.25 py-2.25" variant="icon-left" onClick={() => {}}>
                <FilterIcon className="w-5 h-5" />
              </ButtonFilter>
            </div>
          </div>

          <div className="hidden lg:block w-full flex-1">
            <InputSelect
              variant="outline"
              size="sm"
              id="propertyType"
              value={propertyType}
              inputClassName="w-full py-1"
              onChange={setPropertyType}
              options={propertyTypeOptions}
              placeholder="Property type"
            />
          </div>
          <div className="hidden lg:block w-full flex-1">
            <InputSelect
              inputClassName="w-full py-1"
              variant="outline"
              size="sm"
              id="dealType"
              value={dealType}
              onChange={setDealType}
              options={dealTypeOptions}
              placeholder="Select deal"
            />
          </div>
        </div>
      </div>

      <div>
        {/* Listings grid */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-full hidden lg:flex lg:justify-between gap-4 xl:gap-8 p-4 pl-2 bg-[var(--bg-tint)] rounded-t-[1.25rem] label-md-medium">
            <div className="w-full lg:max-w-[16rem] xl:max-w-[19.75rem]">Property</div>
            <div className="w-full lg:max-w-[7rem] xl:max-w-[10rem]">Deal type</div>
            <div className="w-full lg:max-w-[5.5rem] xl:max-w-[7.5rem]">Property type</div>
            <div className="w-full lg:max-w-[7.5rem] xl:max-w-[7.5rem]">Location</div>
            <div className="w-full lg:max-w-[9rem] xl:max-w-[10rem]">Price</div>
            <div className="w-full lg:max-w-[4.5rem] xl:max-w-[5rem]">Status</div>
            <div className="w-full lg:max-w-[3.5rem] xl:max-w-[6rem] flex justify-end">Actions</div>
          </div>
          {visibleListings.map((l) => (
            <ListingCard
              key={l.id}
              propertyId={l.id}
              property={l.title}
              dealType={l.dealType}
              propertyType={l.propertyType}
              location={l.location}
              price={l.price}
              status={l.status}
              imageUrl={l.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-6 py-4">
        <Button
          variant="outline"
          className="!text-[var(--color-black)] max-w-fit rounded-lg"
          size="md"
          fullWidth={false}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ArrowNextIcon className="w-4 h-4 rotate-180" />
          <p className="body-md text-[var(--color-black)]">Prev</p>
        </Button>
        <div className="label-sm-medium flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageItem
              key={page}
              page={page}
              isCurrent={page === currentPage}
              onClick={() => setCurrentPage(page)}
            />
          ))}
        </div>
        <Button
          variant="outline"
          className="!text-[var(--color-black)] max-w-fit rounded-lg"
          size="md"
          fullWidth={false}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <p className="body-md text-[var(--color-black)]">Next</p>
          <ArrowNextIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
