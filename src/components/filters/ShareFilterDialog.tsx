'use client';

import { useState, useRef, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { WhatsAppIcon, FacebookIcon2, EmailIcon, CloseIcon } from '@/utils/icons';
import { FilterValues } from '@/utils/filterUtils';
import { convertFilterValuesToSearchParams } from '@/utils/savedFiltersStorage';
import { serializeSearchParams } from '@/hooks/useSearchParams';

export interface ShareFilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filter: {
    title: string;
    filterQuery: FilterValues;
  };
}

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

const CopyButton = ({ copied, onClick }: CopyButtonProps) => {
  return (
    <Button
      label={copied ? 'Copied!' : 'Copy'}
      onClick={onClick}
      variant="primary"
      size="lg"
      fullWidth={false}
    />
  );
};

interface SocialShareButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

const SocialShareButton = ({ icon, label, onClick, ariaLabel }: SocialShareButtonProps) => {
  return (
    <Button
      leftIcon={icon}
      label={label}
      onClick={onClick}
      variant="secondary"
      size="lg"
      fullWidth={true}
      className="!bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg"
      aria-label={ariaLabel}
    />
  );
};

export const ShareFilterDialog = ({ isOpen, onClose, filter }: ShareFilterDialogProps) => {
  const [copied, setCopied] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const { title, filterQuery } = filter;

  const searchParams = convertFilterValuesToSearchParams(filterQuery);
  const queryString = serializeSearchParams(searchParams);
  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/search${queryString}` : '';

  useEffect(() => {
    if (isOpen && urlInputRef.current) {
      setTimeout(() => {
        if (urlInputRef.current) {
          urlInputRef.current.focus();
          urlInputRef.current.select();
        }
      }, 200);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      widthClassName="w-[calc(100%-32px)] max-w-[472px]"
      className="p-0 rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col items-start gap-6 w-full p-6 relative">
        <button
          onClick={onClose}
          onKeyDown={handleKeyDown}
          className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Close dialog"
          tabIndex={0}
        >
          <CloseIcon className="w-5 h-5 text-[var(--color-black)]" />
        </button>

        <div className="flex flex-col items-start gap-6 w-full">
          <h2 className="text-[24px] font-bold leading-[120%] tracking-[-0.02em] text-[var(--color-black)] w-full">
            Share this filter
          </h2>

          <div className="flex flex-row items-start gap-2 p-2 w-full bg-[var(--bg-tint)] rounded-lg">
            <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
              <h3 className="text-sm font-medium leading-[110%] text-[var(--color-black)] line-clamp-2">
                {title}
              </h3>
            </div>
          </div>

          <div className="w-full h-px bg-[var(--border)]" />


          <div className="flex flex-row items-end gap-2 w-full">
            <div className="w-[70%]">
              <Input
                ref={urlInputRef}
                id="share-url"
                type="text"
                value={shareUrl}
                onChange={() => {}}
                label="Copy Link"
                appearance="filled"
                className="w-full"
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </div>
            <div className="flex-1">
              <CopyButton copied={copied} onClick={handleCopyLink} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

