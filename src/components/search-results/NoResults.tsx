'use client';

import { NoPropertiesIcon } from '@/utils/icons';
import Button from '@/components/ui/Button';
import { useFilters } from '@/hooks/useFilters';

export const NoResults = () => {
  const { clearAllFilters } = useFilters();

  const handleClearFilters = () => {
    clearAllFilters();
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto gap-4 max-w-[600px] py-16 px-4">
      <div className="flex items-center justify-center mb-4">
        <NoPropertiesIcon className="w-16 h-16" />
      </div>
      <h1 className="title-xl text-[var(--color-black)]">No properties found</h1>
      <p className="body-lg text-[var(--text-pill)] text-center max-w-[480px]">
        Currently there are no properties matching your search criteria. Edit or remove filters for
        best results.
      </p>
      <div className="mt-4 w-full max-w-[150px]">
        <Button
          label="Clear all filters"
          onClick={handleClearFilters}
          variant="outline"
          size="lg"
          className=""
        />
      </div>
    </div>
  );
};
