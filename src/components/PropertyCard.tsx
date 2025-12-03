'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRightIcon, Favorite, Share, PhoneIcon, WhatsAppIcon, EmailIcon } from '@/utils/icons';
import Button from './ui/Button';
import { SharePropertyDialog } from './SharePropertyDialog';
import type { ReactNode } from 'react';

export type PropertyCardProps = {
  title: string;
  price: number;
  currency?: string;
  propertyType: string;
  location: string;
  images: string[];
  pricePerPeriod: string;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
  className?: string;
  propertyIcons?: ReactNode;
  phone?: string;
  whatsapp?: string;
  email?: string;
  id?: string;
  url?: string;
};

export const PropertyCard = ({
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
  const [isFav, setIsFav] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    onFavoriteClick?.();
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareDialogOpen(true);
    onShareClick?.();
  };

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContacts(!showContacts);
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (whatsapp) {
      window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];
  const shareUrl =
    url ||
    (id
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}/search/${id}`
      : undefined);

  return (
    <div>
      <div
        className={`w-full border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--white)] hover:shadow-lg transition-shadow ${className}`}
      >
        <div className="flex flex-col lg:flex-row h-full">
          <div className="relative w-full lg:w-1/2 h-[200px] lg:h-auto bg-[var(--bg-tint)] overflow-hidden group">
            <Image
              key={currentImageIndex}
              src={currentImage}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 label-sm-medium bg-[var(--pill-pending-bg)] text-[var(--color-black)] rounded">
                {propertyType}
              </span>
            </div>

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePreviousImage}
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-[24px] bg-[rgba(34,34,34,0.4)] flex items-center justify-center hover:bg-[rgba(34,34,34,0.5)] transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ArrowRightIcon className="w-6 h-6 text-white scale-x-[-1]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 rounded-[24px] bg-[rgba(34,34,34,0.4)] flex items-center justify-center hover:bg-[rgba(34,34,34,0.5)] transition-colors z-10"
                  aria-label="Next image"
                >
                  <ArrowRightIcon className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            <div className="absolute top-2 right-2 flex items-center gap-2 z-10 lg:hidden">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`w-9 h-9 flex items-center justify-center bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:opacity-70 transition-opacity ${
                  isFav ? 'text-[var(--accent-green)]' : 'text-[var(--text-body-tint)]'
                }`}
                aria-label="Add to favorites"
              >
                <Favorite
                  className={`w-5 h-5 ${isFav ? 'fill-current' : 'fill-white'} stroke-current`}
                />
              </button>
              <button
                type="button"
                onClick={handleShareClick}
                className="w-9 h-9 flex items-center justify-center bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg shadow-[0px_8px_24px_2px_rgba(23,23,23,0.12)] hover:opacity-70 transition-opacity text-[var(--text-body-tint)]"
                aria-label="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white z-10 lg:hidden">
              <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
              <span className="body-sm text-white drop-shadow-md">{location}</span>
            </div>
          </div>

          <div className="flex-1 p-2 lg:p-4 md:p-6 flex flex-col justify-between relative">
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10 hidden lg:flex">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity ${
                  isFav ? 'text-[var(--accent-green)]' : 'text-[var(--text-body-tint)]'
                }`}
                aria-label="Add to favorites"
              >
                <Favorite
                  className={`w-5 h-5 ${isFav ? 'fill-current' : 'fill-white'} stroke-current`}
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

            <div className="lg:hidden flex flex-col items-start gap-2 px-2 relative">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-end justify-start gap-1 w-full">
                  <span className="title-xl text-[var(--accent-green)] font-bold">
                    {formattedPrice} {currency}
                  </span>
                  {pricePerPeriod && (
                    <span className="body-md text-[#787878]">/ per {pricePerPeriod}</span>
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
                      className="flex items-center justify-center w-8 h-8 p-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </button>
                  )}
                  {email && (
                    <button
                      type="button"
                      onClick={handleEmailClick}
                      className="flex items-center justify-center w-8 h-8 p-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:opacity-80 transition-opacity"
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

            <div className="hidden lg:flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  <span className="title-xl text-[var(--accent-green)]">
                    {formattedPrice} {currency}
                  </span>
                  {pricePerPeriod && (
                    <span className="body-md text-[var(--text-body-tint)]">
                      / per {pricePerPeriod}
                    </span>
                  )}
                </div>
                <h3 className="title-lg text-[var(--color-black)] line-clamp-2">{title}</h3>
              </div>

              {propertyIcons}
            </div>

            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="hidden lg:flex items-center gap-1 text-[var(--text-body-tint)]">
                <Image src="/icons/ic_location.svg" alt="Location" width={16} height={16} />
                <span className="body-lg text-[var(--color-black)]">{location}</span>
              </div>
              <div className="hidden lg:block">
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
                        className="flex items-center justify-center w-8 h-8 p-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <WhatsAppIcon className="w-5 h-5" />
                      </button>
                    )}
                    {email && (
                      <button
                        type="button"
                        onClick={handleEmailClick}
                        className="flex items-center justify-center w-8 h-8 p-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg hover:opacity-80 transition-opacity"
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
                    className="whitespace-nowrap"
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
    </div>
  );
};

export default PropertyCard;
