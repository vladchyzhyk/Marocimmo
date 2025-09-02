'use client';

import ListingCard from '@/components/ListingCard';
import Button from '@/components/ui/Button';
import InputSelect, { type SelectOption } from '@/components/ui/InputSelect';
import SearchInput from '@/components/ui/SearchInput';
import { ArrowNextIcon } from '@/utils/icons';
import classNames from 'classnames';
import { useMemo, useState } from 'react';

const dealTypeOptions: SelectOption[] = [
  { label: 'All deals', value: '' },
  { label: 'Rent', value: 'rent' },
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

type Listing = {
  id: string;
  title: string;
  dealType: 'rent' | 'sale';
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
    dealType: 'rent',
    propertyType: 'apartment',
    location: 'Marrakesh, Gueliz',
    price: 7500,
    status: 'active',
    imageUrl: '/images/light-styled-interior.jpg',
  },
  {
    id: 'ID: SV 000001',
    title: 'Modern Villa with Pool',
    dealType: 'sale',
    propertyType: 'villa',
    location: 'Casablanca, Ain Diab',
    price: 5200000,
    status: 'pending',
    imageUrl: '/images/light-styled-interior.jpg',
  },
  {
    id: 'ID: LTO 000001',
    title: 'Cozy Office Space',
    dealType: 'rent',
    propertyType: 'office',
    location: 'Rabat, Agdal',
    price: 12000,
    status: 'inactive',
    imageUrl: '/images/light-styled-interior.jpg',
  },
  {
    id: 'ID: SV 000002',
    title: 'Beachfront House',
    dealType: 'sale',
    propertyType: 'house',
    location: 'Agadir, City Center',
    price: 3100000,
    status: 'active',
    imageUrl: '/images/light-styled-interior.jpg',
  },
];

const PageItem = ({ page, isCurrent }: { page: number; isCurrent: boolean }) => {
  return (
    <div
      className={classNames(
        'py-2 px-3 rounded-lg bg-white body-md',
        isCurrent ? 'text-[var(--accent-green)]' : ' text-[var(--color-black)]',
      )}
    >
      <div>{page}</div>
    </div>
  );
};

const Page = () => {
  // Filters state
  const [dealType, setDealType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [status, setStatus] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [search, setSearch] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-8 px-4 py-6 md:py-8 mt-[7rem]">
      {/* Title and filters block */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">My Listings</h1>
          <p className="body-lg mt-1">Manage all your property listings in one place.</p>
        </div>

        <div className="flex items-end gap-4">
          <div className="w-full flex-1">
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

          <div className="w-full flex-1">
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
          <div className="w-full flex-1">
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
          <div className="w-full flex-1">
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
          <div className="w-full flex gap-8 p-4 pl-2 bg-[var(--bg-tint)] rounded-t-[1.25rem] label-md-medium">
            <div className="w-full max-w-[19.75rem]">Property</div>
            <div className="w-full max-w-[10rem]">Deal type</div>
            <div className="w-full max-w-[7.5rem]">Property type</div>
            <div className="w-full max-w-[7.5rem]">Location</div>
            <div className="w-full max-w-[10rem]">Price</div>
            <div className="w-full max-w-[5rem]">Status</div>
            <div className="w-full max-w-[6.75rem] flex justify-end">Actions</div>
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
        <div className="label-sm-medium">
          <PageItem page={currentPage} isCurrent={true} />
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
