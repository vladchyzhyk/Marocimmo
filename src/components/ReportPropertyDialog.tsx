'use client';

import { useState } from 'react';
import Modal from './ui/Modal';

export interface ReportPropertyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string;
}

type ReportReason =
  | 'incorrect_info'
  | 'already_rented_sold'
  | 'no_response'
  | 'fraud_scam'
  | 'offensive_content'
  | 'other';

const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: 'incorrect_info', label: 'Incorrect information (price, photos, phone number, etc.)' },
  { value: 'already_rented_sold', label: 'The property is already rented or sold' },
  { value: 'no_response', label: 'The advertiser does not respond' },
  { value: 'fraud_scam', label: 'Possible fraud or scam' },
  { value: 'offensive_content', label: 'Contains offensive or illegal content' },
  { value: 'other', label: 'Other' },
];

const MAX_REASON_LENGTH = 2000;

export const ReportPropertyDialog = ({
  isOpen,
  onClose,
  propertyId,
}: ReportPropertyDialogProps) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [otherReason, setOtherReason] = useState<string>('');

  const handleReasonChange = (reason: ReportReason) => {
    setSelectedReason(reason);
    if (reason !== 'other') {
      setOtherReason('');
    }
  };

  const handleOtherReasonChange = (value: string) => {
    if (value.length <= MAX_REASON_LENGTH) {
      setOtherReason(value);
    }
  };

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = () => {
    if (!selectedReason) return;

    const reportData = {
      propertyId,
      reason: selectedReason,
      otherReason: selectedReason === 'other' ? otherReason : undefined,
    };

    console.log('Report submitted:', reportData);
    onClose();

    setSelectedReason(null);
    setOtherReason('');
  };

  const handleClose = () => {
    setSelectedReason(null);
    setOtherReason('');
    onClose();
  };

  const isSubmitDisabled = !selectedReason || (selectedReason === 'other' && !otherReason.trim());

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      widthClassName="w-[calc(100%-32px)] max-w-[392px]"
      className="p-0 rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col items-start p-6 relative w-full">
        <div className="flex flex-col items-center w-full py-6 gap-6">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2 className="title-xl">Why are you reporting this property?</h2>
            <p className="body-lg">Describe the problem with this property</p>
          </div>

          <div className="flex flex-col items-start w-full gap-0">
            {REPORT_REASONS.map((reason) => {
              const isSelected = selectedReason === reason.value;
              return (
                <div key={reason.value} className="flex flex-row items-center py-2 gap-2 w-full">
                  <label
                    htmlFor={`reason-${reason.value}`}
                    className="flex flex-row items-start gap-2 cursor-pointer flex-1"
                  >
                    <div className="relative flex-shrink-0">
                      <input
                        type="radio"
                        id={`reason-${reason.value}`}
                        name="report-reason"
                        value={reason.value}
                        checked={isSelected}
                        onChange={() => handleReasonChange(reason.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#519C2C]' : 'border-[#222222]'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-[18px] h-[18px] rounded-full bg-[#519C2C]" />
                        )}
                      </div>
                    </div>
                    <span className="body-lg flex-1">{reason.label}</span>
                  </label>
                </div>
              );
            })}

            {selectedReason === 'other' && (
              <div className="flex flex-col items-start pt-4 gap-2 w-full">
                <div className="flex flex-row items-start gap-1 w-full">
                  <label className="text-sm font-normal leading-[140%] text-[#222222]">
                    Reason for report
                  </label>
                </div>

                <div className="flex flex-row items-start px-4 py-4 w-full border border-[#CBE1C0] rounded-lg">
                  <textarea
                    value={otherReason}
                    onChange={(e) => {
                      handleOtherReasonChange(e.target.value);
                      handleTextareaResize(e);
                    }}
                    placeholder="Write your reason here"
                    className="w-full min-h-[22px] resize-none outline-none text-base font-normal leading-[140%] text-[#222222] placeholder:text-[#A7A7A7] bg-transparent"
                    rows={1}
                  />
                </div>

                <div className="flex flex-row justify-end items-start w-full">
                  <p className="text-xs font-normal leading-[140%] text-right text-[#787878]">
                    {otherReason.length}/{MAX_REASON_LENGTH} characters
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center pt-6 gap-4 w-full">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-12 px-4 flex items-center justify-center gap-2 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] text-[#222222] text-base font-medium leading-[100%] hover:bg-[#F0F0F0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#519C2C]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="flex-1 h-12 px-6 flex items-center justify-center gap-2 rounded-lg bg-[#519C2C] text-white text-base font-medium leading-[100%] hover:bg-[#4a8d26] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#519C2C] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
