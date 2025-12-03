'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';

interface SaveFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (filterName: string) => void;
  defaultFilterName?: string;
}

export const SaveFilterModal = ({
  isOpen,
  onClose,
  onSave,
  defaultFilterName = '',
}: SaveFilterModalProps) => {
  const [filterName, setFilterName] = useState(defaultFilterName);

  useEffect(() => {
    if (isOpen) {
      setFilterName(defaultFilterName);
    }
  }, [isOpen, defaultFilterName]);

  const handleSave = () => {
    if (filterName.trim() && onSave) {
      onSave(filterName.trim());
    }
    handleClose();
  };

  const handleClose = () => {
    setFilterName(defaultFilterName);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      widthClassName="w-[392px]"
      className="!rounded-2xl !border-0 p-6"
    >
      <div className="flex flex-col items-start justify-center w-full">
        <div className="flex flex-col items-center justify-center w-full gap-6 py-6">
          <div className="flex flex-col items-start w-full gap-2">
            <h2 className="w-full text-[24px] font-bold leading-[120%] tracking-[-0.02em] text-[#222222]">
              Save filter
            </h2>
            <p className="w-full text-base font-normal leading-[140%] text-[#222222]">
              You will receive email notifications about new listings that match your criteria.
            </p>
          </div>

          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="filter-name-input"
              className="flex flex-row items-start w-full gap-1"
            >
              <span className="text-sm font-normal leading-[140%] text-[#222222]">
                Create name for your saved filter:
              </span>
            </label>
            <input
              id="filter-name-input"
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Long-term Rent Apartment in Casabarata"
              className="w-full h-12 px-4 py-0 border border-[#CBE1C0] rounded-lg text-base font-normal leading-[140%] text-[#222222] placeholder:text-[#A7A7A7] focus:outline-none focus:ring-2 focus:ring-[#519C2C] focus:border-[#519C2C]"
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-row items-center w-full gap-4 py-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex flex-row justify-center items-center flex-1 h-12 px-4 gap-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg box-border hover:opacity-80 transition-opacity"
            tabIndex={0}
            aria-label="Cancel saving filter"
          >
            <span className="text-base font-medium leading-[100%] text-center text-[#222222]">
              Cancel
            </span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!filterName.trim()}
            className="flex flex-row justify-center items-center flex-1 h-12 px-6 py-4 gap-2 bg-[#519C2C] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            tabIndex={0}
            aria-label="Save filter"
          >
            <span className="text-base font-medium leading-[100%] text-center text-white">
              Save
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

