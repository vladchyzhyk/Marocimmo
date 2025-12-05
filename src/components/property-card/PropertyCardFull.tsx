'use client';

import Image from 'next/image';
import { ArrowRightIcon, Favorite, Share, PhoneIcon, WhatsAppIcon, EmailIcon } from '@/utils/icons';
import Button from '../ui/Button';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { AuthModal } from '../AuthModal';
import type { ReactNode } from 'react';
import { usePropertyCardLogic } from '@/hooks/usePropertyCardLogic';
import type { PropertyCardProps } from '../PropertyCard';

export const PropertyCardFull = ({
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
        <div className="flex flex-row h-full gap-6">
          <div className="relative w-[370px] h-[208px] bg-[var(--bg-tint)] overflow-hidden group">
            <Image
              key={currentImageIndex}
              src={currentImage}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="370px"
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
          </div>

          <div className="flex-1 py-2 pr-4 pl-0 flex flex-col justify-between relative">
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity ${
                  isFav ? 'text-[var(--accent-green)]' : ''
                }`}
                aria-label="Add to favorites"
              >
                <Favorite
                  className={`w-5 h-5 ${
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
                className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Share"
              >
                <Share className="w-5 h-5 text-[var(--text-body-tint)]" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 flex-1">
                    <span className="title-xl text-[var(--accent-green)]">
                      {formattedPrice} {currency}
                    </span>
                    {pricePerPeriod && (
                      <span className="body-md text-[var(--text-pill)]">
                        / per {pricePerPeriod}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="title-lg text-[var(--color-black)] line-clamp-2">{title}</h3>
              </div>

              <div className="flex items-start gap-4">{propertyIcons}</div>
            </div>

            <div className="flex items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2 flex-1">
                <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
                <span className="body-lg text-[var(--color-black)]">{location}</span>
              </div>
              <div>
                {showContacts ? (
                  <div className="flex items-center gap-2">
                    {phone && (
                      <button
                        type="button"
                        onClick={handlePhoneClick}
                        className="flex items-center justify-center gap-2 pl-2 pr-4 h-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <PhoneIcon className="w-4 h-4 text-[#519C2C]" />
                        <span className="text-base leading-[140%] text-[#222222]">{phone}</span>
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
                  <Button
                    label="Show contact"
                    onClick={handleContactClick}
                    variant="primary"
                    size="md"
                    fullWidth={false}
                    className="whitespace-nowrap bg-[var(--primarybutton-hover)] text-white body-md px-4 h-8 rounded-[8px]"
                  />
                )}
              </div>
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

