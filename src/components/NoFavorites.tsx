'use client';

import { Favorite } from '@/utils/icons';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const NoFavorites = () => {
  const router = useRouter();

  const handleFindProperty = () => {
    router.push('/search');
  };

  return (
    <div className="flex flex-col items-center gap-[34px] w-[330px] mx-auto">
      <div className="flex-none">
        <Favorite className="w-16 h-16 stroke-[var(--text-body-tint)]" />
      </div>
      <div className="flex flex-col items-center gap-3 w-[330px]">
        <h3 className="w-[330px] flex items-center justify-center text-center tracking-[-0.02em] text-[var(--color-black)] title-lg">
          You have no favorites yet
        </h3>
        <p className="w-[330px] flex items-center justify-center text-center text-[var(--text-pill)] body-lg">
          Use the favorite icon to save ads that you want to check later
        </p>
      </div>
      <div className="flex-none">
        <Button
          label="Find the property"
          onClick={handleFindProperty}
          variant="primary"
          size="lg"
          className="!w-[176px] !h-12 !rounded-lg"
          fullWidth={false}
        />
      </div>
    </div>
  );
};

