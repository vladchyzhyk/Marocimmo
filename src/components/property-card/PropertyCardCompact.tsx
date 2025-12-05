'use client';

import Image from 'next/image';
import { ArrowRightIcon, Favorite, Share, PhoneIcon, WhatsAppIcon, EmailIcon } from '@/utils/icons';
import Button from '../ui/Button';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { AuthModal } from '../AuthModal';
import type { ReactNode } from 'react';
import { usePropertyCardLogic } from '@/hooks/usePropertyCardLogic';
import type { PropertyCardProps } from '../PropertyCard';

export const PropertyCardCompact = ({
  title,
  price,
  currency = 'DH',
  propertyType,
  location,
  images,
  isFavorite = false,
  onFavoriteClick,
  onShareClick,
  className = '',
  propertyIcons,
  phone,
  whatsapp,
  email,
  pricePerPeriod,
  id,
  url,
}: PropertyCardProps) => {
  const {
    isFav,
    currentImageIndex,
    showContacts,
    isShareDialogOpen,
    isAuthModalOpen,
    hasMultipleImages,
    currentImage,
    handleFavoriteClick,
    handleShareClick,
    handleCloseShareDialog,
    handleContactClick,
    handlePhoneClick,
    handleWhatsAppClick,
    handleEmailClick,
    handlePreviousImage,
    handleNextImage,
    setIsAuthModalOpen,
  } = usePropertyCardLogic({
    isFavorite,
    onFavoriteClick,
    onShareClick,
    phone,
    whatsapp,
    email,
    images,
  });

  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  const shareUrl =
    url ||
    (id
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}/search/${id}`
      : undefined);

  return (
    <div>
      <div
        className={`w-full border border-[var(--border)] rounded-[8px] overflow-hidden bg-[var(--white)] hover:shadow-lg transition-shadow ${className}`}
      >
        <div className="flex flex-col h-full gap-6">
          <div className="relative w-full h-[200px] bg-[var(--bg-tint)] overflow-hidden group">
            <Image
              key={currentImageIndex}
              src={currentImage}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="100vw"
            />

            <div className="absolute top-2 left-2 z-[1]">
              <span className="px-2 py-1 label-sm-medium bg-[var(--pill-pending-bg)] text-[var(--color-black)] rounded-[8px] shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)]">
                {propertyType}
              </span>
            </div>

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePreviousImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-[24px] bg-[rgba(34,34,34,0.4)] flex items-center justify-center hover:bg-[rgba(34,34,34,0.5)] transition-colors z-0"
                  aria-label="Previous image"
                >
                  <ArrowRightIcon className="w-5 h-5 text-white scale-x-[-1]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-[24px] bg-[rgba(34,34,34,0.4)] flex items-center justify-center hover:bg-[rgba(34,34,34,0.5)] transition-colors z-0"
                  aria-label="Next image"
                >
                  <ArrowRightIcon className="w-5 h-5 text-white" />
                </button>
              </>
            )}

            <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`w-9 h-9 flex items-center justify-center bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:opacity-70 transition-opacity ${
                  isFav ? 'text-[var(--accent-green)]' : 'text-white'
                }`}
                aria-label="Add to favorites"
              >
                <Favorite
                  className={`w-4 h-4 ${
                    isFav
                      ? 'fill-[var(--accent-green)] stroke-[var(--accent-green)]'
                      : 'fill-white stroke-[var(--color-black)]'
                  }`}
                  style={{ strokeWidth: '0.5' }}
                />
              </button>
              <button
                type="button"
                onClick={handleShareClick}
                className="w-9 h-9 flex items-center justify-center bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:opacity-70 transition-opacity text-[var(--text-body-tint)]"
                aria-label="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white z-10">
              <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
              <span className="body-sm text-white drop-shadow-md">{location}</span>
            </div>
          </div>

          <div className="flex-1 p-2 flex flex-col justify-between relative">
            <div className="flex flex-col items-start gap-2 px-2 relative">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-end justify-start gap-1 w-full">
                  <span className="title-xl text-[var(--accent-green)] font-bold">
                    {formattedPrice} {currency}
                  </span>
                  {pricePerPeriod && (
                    <span className="body-md text-[var(--text-pill)]">/ per {pricePerPeriod}</span>
                  )}
                </div>
                <div className="flex items-start gap-4">{propertyIcons}</div>
              </div>
              {showContacts ? (
                <div className="flex items-center gap-2 flex-wrap w-full">
                  {phone && (
                    <button
                      type="button"
                      onClick={handlePhoneClick}
                      className="flex items-center justify-center gap-2 pl-2 pr-4 h-8 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <PhoneIcon className="w-4 h-4 text-[var(--accent-green)]" />
                      <span className="text-base leading-[140%] text-[var(--color-black)]">
                        {phone}
                      </span>
                    </button>
                  )}
                  {whatsapp && (
                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="flex items-center justify-center w-8 h-8 p-2 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </button>
                  )}
                  {email && (
                    <button
                      type="button"
                      onClick={handleEmailClick}
                      className="flex items-center justify-center w-8 h-8 p-2 bg-[var(--bg-tint)] border border-[var(--border)] rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <EmailIcon className="w-5 h-5 text-[var(--text-body-tint)]" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="absolute right-0 bottom-0">
                  <Button
                    label="Contact"
                    onClick={handleContactClick}
                    variant="primary"
                    size="md"
                    fullWidth={false}
                    className="whitespace-nowrap"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SharePropertyDialog
        isOpen={isShareDialogOpen}
        onClose={handleCloseShareDialog}
        property={{
          title,
          location,
          price,
          currency,
          image: currentImage,
          url: shareUrl,
        }}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </div>
  );
};
