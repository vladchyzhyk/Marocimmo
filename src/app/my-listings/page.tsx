'use client';

import FilterPopup from '@/components/FilterPopup';
import ListingCard from '@/components/ListingCard';
import Button from '@/components/ui/Button';
import ButtonFilter from '@/components/ui/ButtonFilter';
import InputSelect, { type SelectOption } from '@/components/ui/InputSelect';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import {
  ArrowNextIcon,
  CheckIcon,
  DeleteIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from '@/utils/icons';
import classNames from 'classnames';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const dealTypeOptions: SelectOption[] = [
  { label: 'All deals', value: '' },
  { label: 'Short-term Rent', value: 'short-term' },
  { label: 'Long-term Rent', value: 'long-term' },
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
  { label: 'All statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Expired', value: 'expired' },
  { label: 'Archived', value: 'archived' },
  { label: 'Draft', value: 'draft' },
];

type Listing = {
  id: string;
  title: string;
  dealType: 'short-term' | 'long-term' | 'sale';
  propertyType: string;
  location: string;
  price: number;
  status: 'active' | 'pending' | 'inactive' | 'expired' | 'archived' | 'draft';
  imageUrl?: string;
};
type FilterStatus = '' | 'active' | 'pending' | 'expired' | 'archived' | 'draft';

const statusFilterMatches = (listingStatus: Listing['status'], filterStatus: FilterStatus) => {
  if (filterStatus === '') return true;
  if (filterStatus === 'active') return listingStatus === 'active';
  if (filterStatus === 'pending') return listingStatus === 'pending';
  if (filterStatus === 'expired') return listingStatus === 'expired';
  if (filterStatus === 'archived') return listingStatus === 'archived';
  if (filterStatus === 'draft') return listingStatus === 'draft';

  return false;
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
  const [propertyTypes, setPropertyTypes] = useState<
    Array<'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial'>
  >([]);

  const [status, setStatus] = useState<FilterStatus>('');
  const [minPrice] = useState(0);
  const [maxPrice] = useState(10000000);
  const [search, setSearch] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const filteredListings = useMemo(() => {
    return mockListings.filter((l) => {
      const byDeal = dealType ? l.dealType === dealType : true;
      const byType = propertyTypes.length
        ? propertyTypes.includes(l.propertyType as (typeof propertyTypes)[number])
        : true;
      const byStatus = statusFilterMatches(l.status, status);
      const byPrice = l.price >= minPrice && l.price <= maxPrice;
      const bySearch = search
        ? [l.title, l.location, l.propertyType]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      return byDeal && byType && byStatus && byPrice && bySearch;
    });
  }, [dealType, propertyTypes, status, minPrice, maxPrice, search]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / pageSize));
  const visibleListings = filteredListings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // const handleResetFilters = () => {
  //   setDealType('');
  //   setPropertyType('');
  //   setStatus('');
  //   setMinPrice(0);
  //   setMaxPrice(10000000);
  //   setSearch('');
  // };

  const handleDeleteListing = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[7rem]">
      {/* Title and filters block */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between">
        <div className="flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Manage Listings</h1>
          <p className="body-lg mt-1">Manage all your property listings in one place.</p>
        </div>

        <div className="w-full lg:w-auto flex justify-between lg:items-end gap-4 md:gap-3 xl:gap-4">
          <div className="hidden lg:block w-full flex-1">
            <InputSelect
              variant="outline"
              size="sm"
              id="status"
              value={status}
              inputClassName="w-full py-1"
              onChange={(v) => setStatus(v as FilterStatus)}
              options={statusOptions}
              placeholder="Any status"
            />
          </div>
          <div className="hidden md:block lg:hidden w-full max-w-[8rem]">
            <InputSelect
              variant="outline"
              size="sm"
              id="propertyType"
              value={status}
              inputClassName="w-full py-1"
              onChange={(v) => setStatus(v as FilterStatus)}
              options={statusOptions}
            />
          </div>

          <div
            className={classNames('relative flex md:hidden w-full transition-all duration-300')}
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
                iconPosition="left"
                id="search"
                className="w-full py-1"
                value={search}
                onChange={setSearch}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="hidden lg:block w-full max-w-[10.5rem] lg:max-w-none">
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
                  iconPosition="left"
                  id="search"
                  className="w-full py-1"
                  value={search}
                  onChange={setSearch}
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex lg:hidden w-fit">
              <ButtonFilter
                className="!px-2.25 py-2.25"
                variant="icon-left"
                onClick={() => {
                  setIsFilterPopupOpen(true);
                }}
              >
                <FilterIcon className="w-5 h-5" />
              </ButtonFilter>
            </div>
          </div>

          <div className="hidden lg:block w-full flex-1">
            <InputSelect
              variant="outline"
              size="sm"
              id="propertyType"
              value={propertyTypes[0] || ''}
              inputClassName="w-full py-1"
              onChange={(v) => {
                setPropertyTypes(
                  v
                    ? ([v] as Array<
                        'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial'
                      >)
                    : [],
                );
              }}
              options={propertyTypeOptions}
              placeholder="Property type"
            />
          </div>
          <div className="hidden lg:block w-full min-w-[9.5rem]">
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
        {visibleListings.length > 0 && (
          <div className="flex flex-col justify-center items-center">
            <div className="w-full hidden lg:flex lg:justify-between gap-4 xl:gap-8 p-4 pl-2 bg-[var(--bg-tint)] rounded-t-[1.25rem] label-md-medium">
              <div className="w-full lg:max-w-[16rem] xl:max-w-[19.75rem]">Property</div>
              <div className="w-full lg:max-w-[7rem] xl:max-w-[10rem]">Deal type</div>
              <div className="w-full lg:max-w-[5.5rem] xl:max-w-[7.5rem]">Property type</div>
              <div className="w-full lg:max-w-[7.5rem] xl:max-w-[7.5rem]">Location</div>
              <div className="w-full lg:max-w-[9rem] xl:max-w-[10rem]">Price</div>
              <div className="w-full lg:max-w-[4.5rem] xl:max-w-[5rem]">Status</div>
              <div className="w-full lg:max-w-[3.5rem] xl:max-w-[6rem] flex justify-end">
                Actions
              </div>
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
        )}
      </div>
      {/* Pagination */}
      {visibleListings.length > 0 && (
        <div className="fixed md:relative bottom-0 left-0 right-0 flex items-center md:justify-end justify-between gap-6 py-4 px-4 md:px-0">
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
      )}
      {visibleListings.length === 0 && (
        <div className="flex flex-col items-center justify-center mx-auto gap-4 max-w-[53rem] py-18.5 mt-25">
          <h1 className="title-xl text-[var(--color-black)]">No listings found</h1>
          <p className="body-lg text-[var(--color-black)] text-center md:text-left">
            Start by adding your first property and reach potential buyers or renters
          </p>
          <Button className={classNames('!flex items-center justify-center max-w-[200px]')}>
            <Link className="w-full h-full flex justify-center items-center gap-1" href={'/'}>
              {'/add-property' === '/add-property' && (
                <PlusIcon className="w-4 h-4 text-[var(--color-black)] fill-white" />
              )}
              <span className="whitespace-nowrap">Add your property</span>
            </Link>
          </Button>
        </div>
      )}
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <CheckIcon className="w-14 h-14 text-[var(--accent-green)] mt-6" />
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">
                Your account has been permanently deleted.
              </h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                We’re sorry to see you go. You can always create a new account if you decide to
                return
              </p>
            </div>
          </div>
          <div className="flex pb-6">
            <Button
              label="Ok"
              onClick={() => {
                setIsSuccessModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <DeleteIcon className="w-14 h-14 text-[var(--error)] mt-6" />
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">Delete Listing</h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Are you sure you want to permanently delete “[Property name]”? This action cannot be
                undone.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" className="!font-medium" onClick={handleDeleteListing}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        status={status}
        dealType={dealType as '' | 'short-term' | 'long-term' | 'sale'}
        propertyTypes={propertyTypes}
        onChangeStatus={(s) => {
          setStatus(s as FilterStatus);
        }}
        onChangeDealType={(d) => {
          setDealType(d as '' | 'short-term' | 'long-term' | 'sale');
        }}
        onChangePropertyTypes={(pts) => {
          setPropertyTypes(
            (pts as Array<'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial'>) ||
              [],
          );
        }}
        onReset={() => {
          setStatus('');
          setDealType('');
          setPropertyTypes([]);
          setCurrentPage(1);
        }}
        resultCount={filteredListings.length}
        computeCount={({ status: s, dealType: d, propertyTypes: pts }) => {
          return mockListings.filter((l) => {
            const byDeal = d ? l.dealType === d : true;
            const byTypeMulti =
              pts && pts.length
                ? (
                    pts as Array<'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial'>
                  ).includes(
                    l.propertyType as
                      | 'apartment'
                      | 'house'
                      | 'villa'
                      | 'office'
                      | 'land'
                      | 'commercial',
                  )
                : true;
            const byStatus = statusFilterMatches(l.status, s);
            return byDeal && byTypeMulti && byStatus;
          }).length;
        }}
        onApply={({ status: s, dealType: d, propertyTypes: pts }) => {
          setStatus(s as FilterStatus);
          setDealType(d as '' | 'short-term' | 'long-term' | 'sale');
          setPropertyTypes(
            (pts as Array<'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial'>) ||
              [],
          );
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Page;
