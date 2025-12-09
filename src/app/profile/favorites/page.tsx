'use client';
import { ArrowNextIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';
import { NoFavorites } from '@/components/NoFavorites';
import SideMenu from '../components/SideMenu';
import { ClearAllButton } from '@/components/filters';
import { SortDropdown, SortValue } from '@/components/search-results/SortDropdown';
import { useState } from 'react';

export default function FavoritesPage() {
  const router = useRouter();
  const [sortValue, setSortValue] = useState<SortValue>('newest');

  const handleClearAll = () => {
    console.log('clear all');
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[6rem]">
      {/* Title and filters block */}
      <div className="flex flex-col gap-8">
        <div className="flex">
          <div className="hidden md:flex flex-col">
            <h1 className="text-[var(--color-black)] title-xl">Profile Settings</h1>
            <p className="body-lg mt-1">Manage your account information and preferences</p>
          </div>
          <div className="hidden md:flex justify-end w-full items-center gap-2">
            <ClearAllButton onClick={handleClearAll} />
            <SortDropdown value={sortValue} onChange={(value) => setSortValue(value)} />
          </div>
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
          </div>

          <div className="flex-1">
            <NoFavorites />
          </div>
        </div>
      </div>
    </div>
  );
}
