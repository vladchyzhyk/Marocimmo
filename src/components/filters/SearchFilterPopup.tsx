'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowNextIcon } from '@/utils/icons';
import { useFilters } from '@/hooks/useFilters';
import { FilterItem } from './FilterItem';
import classNames from 'classnames';

interface SearchFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount?: number;
}

export const SearchFilterPopup = ({ isOpen, onClose, resultCount = 0 }: SearchFilterPopupProps) => {
  const { popupFilters, clearAllFilters } = useFilters();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return null;
  }

  const handleApply = () => {
    onClose();
  };

  return (
    <div
      className={classNames(
        'fixed inset-0 bg-white z-[95] flex flex-col transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="sticky top-0 z-[96] bg-white border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-[8px] hover:bg-[var(--bg-tint)] transition-colors duration-300"
            >
              <ArrowNextIcon className="w-5 h-5 text-[var(--color-black)] rotate-180" />
            </button>
            <p className="body-lg text-[var(--color-black)]">Filter</p>
          </div>
          <Button
            variant="outline"
            size="md"
            fullWidth={false}
            className="!w-auto !bg-[var(--bg-tint)] hover:!bg-white !px-4"
            onClick={clearAllFilters}
          >
            Clean
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
        {popupFilters.map((filter) => (
          <FilterItem key={filter.id} config={filter} context="popup" />
        ))}
        {popupFilters.length === 0 && (
          <p className="text-[var(--text-body-tint)] body-lg text-center py-8">
            No additional filters available
          </p>
        )}
      </div>

      <div className="sticky bottom-0 z-[96] bg-white border-t border-[var(--border)] px-4 py-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<ArrowNextIcon className="w-5 h-5" />}
          onClick={handleApply}
          className="!font-medium"
        >
          {`Show ${resultCount} properties`}
        </Button>
      </div>
    </div>
  );
};
