'use client';

import Modal from '@/components/ui/Modal';
import { CheckIcon } from '@/utils/icons';

interface SaveFilterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterName: string;
}

export const SaveFilterSuccessModal = ({
  isOpen,
  onClose,
  filterName,
}: SaveFilterSuccessModalProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
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
      <div className="flex flex-col items-start justify-center w-full">
        <div className="flex flex-row justify-center items-center w-full h-20 px-6 pt-6 pb-0 gap-2.5">
          <CheckIcon className="w-14 h-14 text-[#519C2C]" />
        </div>

        <div className="flex flex-col items-center justify-center w-[344px] gap-2 py-6 self-stretch">
          <h2 className="w-[344px] text-[24px] font-bold leading-[120%] tracking-[-0.02em] text-[#222222] text-center self-stretch">
            New saved filter
          </h2>
          <p className="w-[344px] text-base font-normal leading-[140%] text-[#222222] text-center self-stretch">
            You have saved your filter
          </p>
          <p className="w-[344px] text-base font-normal leading-[140%] text-[#519C2C] text-center self-stretch">
            &quot;{filterName}&quot;
          </p>
          <p className="w-[344px] text-base font-normal leading-[140%] text-[#222222] text-center self-stretch">
            Check it anytime in Saved filters section of your account.
          </p>
        </div>

        <div className="flex flex-row items-center w-full gap-4 py-6">
          <button
            type="button"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            className="flex flex-row justify-center items-center flex-1 h-12 px-6 py-4 gap-2 bg-[#519C2C] rounded-lg hover:opacity-90 transition-opacity"
            tabIndex={0}
            aria-label="Close"
          >
            <span className="text-base font-medium leading-[100%] text-center text-white">
              Close
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

