'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { CloseIcon } from '@/utils/icons';

interface EditFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (filterName: string) => void;
  currentFilterName?: string;
}

export const EditFilterModal = ({
  isOpen,
  onClose,
  onSave,
  currentFilterName = '',
}: EditFilterModalProps) => {
  const [filterName, setFilterName] = useState(currentFilterName);

  useEffect(() => {
    if (isOpen) {
      setFilterName(currentFilterName);
    }
  }, [isOpen, currentFilterName]);

  const handleSave = () => {
    if (filterName.trim() && onSave) {
      onSave(filterName.trim());
    }
    handleClose();
  };

  const handleClose = () => {
    setFilterName(currentFilterName);
    onClose();
  };

  const handleClear = () => {
    setFilterName('');
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
        <div className="flex flex-col items-center justify-center w-full py-6 pb-2 gap-6">
          <div className="flex flex-col items-start w-full gap-2">
            <h2 className="w-full h-[29px] text-[24px] font-bold leading-[120%] tracking-[-0.02em] text-[#222222]">
              Rename saved filter
            </h2>
            <p className="w-full h-[22px] text-base font-normal leading-[140%] text-[#222222]">
              Enter new name
            </p>
          </div>

          <div className="flex flex-col items-start w-full gap-2">
            <div className="flex flex-row items-center w-full h-12 pl-4 pr-2 py-0 gap-2 border border-[#519C2C] rounded-lg">
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
                className="flex-1 w-[280px] h-[22px] text-base font-normal leading-[140%] text-[#222222] bg-transparent border-0 outline-none placeholder:text-[#222222]"
                autoFocus
              />
              {filterName && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex flex-row items-center justify-center w-10 h-10 p-2 gap-2 flex-none"
                  aria-label="Clear input"
                  tabIndex={0}
                >
                  <CloseIcon className="w-6 h-6 text-[#222222] flex-none" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-full gap-4 py-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="!font-medium !bg-[#FAFAFA] hover:!bg-white !rounded-lg flex-1"
            fullWidth={false}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!filterName.trim()}
            className="!font-medium !rounded-lg flex-1"
            fullWidth={false}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

