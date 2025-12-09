'use client';

import { NotificationIcon } from '@/utils/icons';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const NoSavedFilters = () => {
  const router = useRouter();

  const handleStartSearching = () => {
    router.push('/search');
  };

  return (
    <div className="flex flex-col items-center gap-[34px] w-[330px] mx-auto">
      <div className="flex-none">
        <NotificationIcon className="w-16 h-16 text-[var(--text-body-tint)]" />
      </div>
      <div className="flex flex-col items-center gap-3 w-[330px]">
        <h3 className="w-[330px] flex items-center justify-center text-center tracking-[-0.02em] text-[var(--color-black)] title-lg">
          No saved filters yet
        </h3>
        <p className="w-[330px] flex items-center justify-center text-center text-[var(--text-pill)] body-lg">
          Save your search filters to quickly find properties that match your criteria.
        </p>
      </div>
      <div className="flex-none">
        <Button
          label="Start searching"
          onClick={handleStartSearching}
          variant="primary"
          size="lg"
          className="!w-[161px] !h-12 !rounded-lg"
          fullWidth={false}
        />
      </div>
    </div>
  );
};

