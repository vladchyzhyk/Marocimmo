'use client';

import type { ReactNode } from 'react';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { AuthModal } from '../AuthModal';
import { usePropertyCardLogic } from '@/hooks/usePropertyCardLogic';
import { PropertyCardFullBase } from './PropertyCardFullBase';

export interface PropertyCardFullProps {
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
  onClick?: (id: string) => void;
}

export const PropertyCardFull = ({
  title,
  price,
  currency = 'DH',
  propertyType,
  location,
  images,
  pricePerPeriod,
  isFavorite = false,
  onFavoriteClick,
  onShareClick,
  className = '',
  propertyIcons,
  phone,
  whatsapp,
  email,
  id,
  url,
  onClick,
}: PropertyCardFullProps) => {
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

  const shareUrl =
    url ||
    (id
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}/search/${id}`
      : undefined);

  return (
    <>
      <PropertyCardFullBase
        title={title}
        price={price}
        currency={currency}
        propertyType={propertyType}
        location={location}
        pricePerPeriod={pricePerPeriod}
        className={className}
        propertyIcons={propertyIcons}
        phone={phone}
        whatsapp={whatsapp}
        email={email}
        id={id}
        isFav={isFav}
        currentImageIndex={currentImageIndex}
        showContacts={showContacts}
        hasMultipleImages={hasMultipleImages}
        currentImage={currentImage}
        onFavoriteClick={handleFavoriteClick}
        onShareClick={handleShareClick}
        onContactClick={handleContactClick}
        onPhoneClick={handlePhoneClick}
        onWhatsAppClick={handleWhatsAppClick}
        onEmailClick={handleEmailClick}
        onPreviousImage={handlePreviousImage}
        onNextImage={handleNextImage}
        onCardClick={onClick}
      />
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
    </>
  );
};
