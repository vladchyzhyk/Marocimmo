'use client';

import { ArrowNextIcon } from '@/utils/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();
  const isBackDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isBackDisabled}
        aria-label="Go to previous page"
        aria-disabled={isBackDisabled}
        className={`flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg transition-opacity ${
          isBackDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-80 cursor-pointer'
        }`}
      >
        <ArrowNextIcon className="w-4 h-4 rotate-180 text-[var(--color-black)]" />
        <span className="text-base leading-[140%] text-[var(--color-black)]">Back</span>
      </button>

      <div className="flex items-center gap-2">
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="text-base leading-[140%] text-[var(--color-black)] px-2"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              className={`text-base leading-[140%] px-3 py-2 transition-colors ${
                isActive
                  ? 'text-[var(--accent-green)]'
                  : 'text-[var(--color-black)] hover:opacity-80 cursor-pointer'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label="Go to next page"
        aria-disabled={isNextDisabled}
        className={`flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg transition-opacity ${
          isNextDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-80 cursor-pointer'
        }`}
      >
        <span className="text-base leading-[140%] text-[var(--color-black)]">Next</span>
        <ArrowNextIcon className="w-4 h-4 text-[var(--color-black)]" />
      </button>
    </div>
  );
};

export default Pagination;

