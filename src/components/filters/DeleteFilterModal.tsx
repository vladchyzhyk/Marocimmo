'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { DeleteIcon } from '@/utils/icons';

interface DeleteFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  filterName: string;
}

export const DeleteFilterModal = ({
  isOpen,
  onClose,
  onConfirm,
  filterName,
}: DeleteFilterModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      widthClassName="w-[392px]"
      className="!rounded-2xl !border-0 p-6"
    >
      <div
        className="flex flex-col justify-center items-start w-full relative"
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-row justify-center items-center pt-6 px-6 gap-2.5 w-[344px] h-20 flex-none self-stretch flex-grow-0">
          <DeleteIcon className="w-14 h-14 text-[#D23131] flex-none flex-grow-0" />
        </div>

        <div className="flex flex-col justify-center items-center py-6 gap-4 w-[344px] flex-none self-stretch flex-grow-0">
          <h2 className="w-[344px] h-[29px] text-[24px] font-bold leading-[120%] tracking-[-0.02em] text-center text-[#222222] flex-none self-stretch flex-grow-0">
            Delete saved filter?
          </h2>
          <p className="w-[344px] text-base font-normal leading-[140%] text-center text-[#222222] flex-none self-stretch flex-grow-0">
            Are you sure you want to permanently delete &quot;{filterName}&quot;? This action cannot
            be undone.
          </p>
        </div>

        <div className="flex flex-row items-center py-6 gap-4 w-[344px] h-24 flex-none self-stretch flex-grow-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="!font-medium !bg-[#FAFAFA] hover:!bg-white !rounded-lg flex-1"
            fullWidth={false}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            className="!font-medium !rounded-lg flex-1"
            fullWidth={false}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

