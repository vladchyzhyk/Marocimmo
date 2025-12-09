'use client';

import { EditIcon, Share, DeleteIcon, Watch, MenuIcon, CloseIcon } from '@/utils/icons';
import { FilterTip } from './FilterTip';
import { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FilterValues } from '@/utils/filterUtils';
import { collectAllFilters } from '@/utils/collectFilters';
import { FILTERS_CONFIG } from './filters-config';
import { generateFilterTips } from '@/utils/filterTips';
import { useRouter } from 'next/navigation';
import { convertFilterValuesToSearchParams } from '@/utils/savedFiltersStorage';
import { serializeSearchParams } from '@/hooks/useSearchParams';

interface SavedFilterCardProps {
  title: string;
  newCount?: number;
  filterQuery: FilterValues;
  updatedAt: string;
  propertyCount: number;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  onViewProperties?: () => void;
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 1) {
    return 'Updated just now';
  }
  if (diffInMinutes < 60) {
    return `Updated ${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffInHours < 24) {
    return `Updated ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffInDays < 7) {
    return `Updated ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  if (diffInWeeks < 4) {
    return `Updated ${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffInMonths < 12) {
    return `Updated ${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  return `Updated ${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

export const SavedFilterCard = ({
  title,
  newCount,
  filterQuery,
  updatedAt,
  propertyCount,
  onEdit,
  onShare,
  onDelete,
  onViewProperties,
}: SavedFilterCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const formattedTimeAgo = useMemo(() => formatTimeAgo(updatedAt), [updatedAt]);

  const filterTips = useMemo(() => {
    const collectedFilters = collectAllFilters(filterQuery, {
      onlyActive: true,
      dealType: null,
      checkVisibility: false,
    });

    return generateFilterTips(collectedFilters, FILTERS_CONFIG);
  }, [filterQuery]);

  const handleEdit = () => {
    onEdit?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const handleViewProperties = () => {
    onViewProperties?.();
    const searchParams = convertFilterValuesToSearchParams(filterQuery);
    const queryString = serializeSearchParams(searchParams);
    router.push(`/search${queryString}`);
  };

  const handleMenuToggle = () => {
    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleShareClick = () => {
    handleShare();
    handleMenuClose();
  };

  const handleEditClick = () => {
    handleEdit();
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleDelete();
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isMenuOpen]);

  return (
    <div className="box-border flex flex-row items-start p-4 md:p-6 w-full max-w-[848px] bg-white border border-[#E5E5E5] rounded-lg flex-none self-stretch flex-grow-0 overflow-hidden">
      <div className="flex flex-col justify-between items-start p-0 gap-4 md:gap-6 w-full flex-none self-stretch flex-grow-1 min-w-0">
        <div className="flex flex-row items-start p-0 gap-2 md:gap-4 w-full flex-none self-stretch flex-grow-0 min-w-0">
          <div className="flex flex-col items-start p-0 gap-2 min-w-0 max-w-full lg:max-w-[672px]">
            <div className="flex flex-row items-center p-0 gap-2 w-full flex-none self-stretch flex-grow-0 min-w-0">
              <h3 className="w-auto title-md text-[#222222] flex items-center tracking-[-0.02em] flex-none flex-grow-0 truncate">
                {title}
              </h3>
              {newCount !== undefined && newCount > 0 && (
                <div className="flex flex-row justify-center items-center py-1 px-2 gap-2 w-auto bg-[#498C28] rounded-lg flex-none flex-grow-0 shrink-0">
                  <span className="w-auto label-sm-medium text-white flex items-center flex-none flex-grow-0">
                    {newCount} news
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start p-0 gap-2 w-full flex-none flex-grow-0 min-w-0">
              <div className="flex flex-row items-center p-0 gap-2 w-full flex-none flex-grow-0 flex-wrap">
                {filterTips.map((tip, index) => (
                  <FilterTip key={`${tip.filterId}-${index}`} text={tip.text} onClear={undefined} />
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex flex-row items-center p-0 gap-2 w-auto h-8 flex-none shrink-0 ml-auto">
            <div className="hidden lg:flex flex-row items-center p-0 gap-2">
              <button
                type="button"
                onClick={handleEdit}
                className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
                aria-label="Edit filter"
              >
                <EditIcon className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
                aria-label="Share filter"
              >
                <Share className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
                aria-label="Delete filter"
              >
                <DeleteIcon className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
              </button>
            </div>
            <button
              ref={buttonRef}
              type="button"
              onClick={handleMenuToggle}
              className="lg:hidden box-border flex flex-row justify-center items-center px-2 py-0 gap-2 w-8 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex-none flex-grow-0 hover:opacity-70 transition-opacity"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="w-5 h-5 text-[#222222] flex-none flex-grow-0" />
            </button>
            {isMenuOpen &&
              typeof window !== 'undefined' &&
              createPortal(
                <div
                  ref={menuRef}
                  className="lg:hidden fixed flex flex-col bg-white border border-[#E5E5E5] rounded-lg shadow-lg min-w-[200px] overflow-hidden z-[1000]"
                  style={{
                    top: `${menuPosition.top}px`,
                    right: `${menuPosition.right}px`,
                  }}
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={handleMenuClose}
                    className="absolute top-2 right-2 z-10"
                    aria-label="Close menu"
                  >
                    <CloseIcon className="w-5 h-5 text-[#222222]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors"
                    role="menuitem"
                  >
                    <Share className="w-4 h-4 text-[#222222]" />
                    <span className="body-md text-[#222222]">Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors"
                    role="menuitem"
                  >
                    <EditIcon className="w-4 h-4 text-[#222222]" />
                    <span className="body-md text-[#222222]">Rename</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors"
                    role="menuitem"
                  >
                    <DeleteIcon className="w-4 h-4 text-[#FF3B30]" />
                    <span className="body-md text-[#FF3B30]">Delete</span>
                  </button>
                </div>,
                document.body,
              )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-0 gap-2 w-full flex-none self-stretch flex-grow-0 min-w-0">
          <div className="flex flex-row items-center p-0 gap-2 w-auto flex-none flex-grow-0">
            <Watch className="w-4 h-4 text-[#222222] flex-none flex-grow-0" />
            <span className="w-auto body-md text-[#222222] flex items-center flex-none flex-grow-0">
              {formattedTimeAgo}
            </span>
          </div>
          <div className="flex flex-row items-center p-0 gap-1 w-full md:w-auto flex-none flex-grow-0">
            <button
              type="button"
              onClick={handleViewProperties}
              className="flex flex-row justify-center items-center py-2 px-4 gap-2 w-full md:w-auto bg-[#498C28] rounded-lg flex-none flex-grow-0 hover:opacity-90 transition-opacity"
              aria-label={`View ${propertyCount} properties`}
            >
              <span className="w-auto body-md text-white flex-none flex-grow-0 whitespace-nowrap">
                {propertyCount} Properties
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
