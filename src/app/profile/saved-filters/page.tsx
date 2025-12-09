'use client';
import { ArrowNextIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';
import { NoSavedFilters, SavedFilterCard } from '@/components/filters';
import SideMenu from '../components/SideMenu';
import { useState } from 'react';
import { mockSavedFilters } from '@/utils/mockSavedFilters';

export default function SavedFiltersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const savedFilters = mockSavedFilters;

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[6rem]">
      {/* Title and filters block */}
      <div className="flex flex-col gap-8">
        <div className="hidden md:flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Profile Settings</h1>
          <p className="body-lg mt-1">Manage your account information and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="flex md:hidden items-center gap-2 cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <ArrowNextIcon className="w-6 h-6 rotate-180" />
            <p className="label-md-medium text-[var(--color-black)]">Back to Settings</p>
          </div>
          <div className="hidden md:flex w-full flex-col gap-2 md:max-w-[14.375rem] lg:max-w-[19.375rem]">
            <SideMenu />
            <button onClick={() => setIsOpen(!isOpen)}>1123</button>
          </div>

          <div className="flex-1">
            {savedFilters.length === 0 ? (
              <NoSavedFilters />
            ) : (
              <>
                {savedFilters.map((filter) => (
                  <SavedFilterCard
                    key={filter.id}
                    title={filter.title}
                    newCount={filter.newCount}
                    filterTags={Object.values(filter.filterQuery)}
                    updatedAt={filter.updatedAt}
                    propertyCount={filter.propertyCount}
                    onEdit={() => {}}
                    onShare={() => {}}
                    onDelete={() => {}}
                    onViewProperties={() => {}}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
