import React from 'react';
import { DeleteIcon } from '@/utils/icons';

interface ClearAllButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ClearAllButton = ({ onClick, className = '' }: ClearAllButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`box-border flex flex-row items-center pl-2 pr-4 gap-2 w-[108px] h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:bg-neutral-100 transition-colors ${className}`}
    >
      <div className="w-4 h-4 flex-none order-0 flex-grow-0 flex items-center justify-center">
        <DeleteIcon className="w-4 h-4 fill-[#222222]" />
      </div>
      <span className="body-lg text-[var(--color-black)] text-nowrap">Clear All</span>
    </button>
  );
};
