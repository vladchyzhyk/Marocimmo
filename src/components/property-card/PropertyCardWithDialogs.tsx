'use client';

import type { ReactNode } from 'react';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { AuthModal } from '../AuthModal';
import { usePropertyCardLogic } from '@/hooks/usePropertyCardLogic';
import { usePropertyCardVariant, type PropertyCardVariant } from '@/hooks/usePropertyCardVariant';
import { PropertyCardCompactBase } from './PropertyCardCompactBase';
import { PropertyCardFullBase } from './PropertyCardFullBase';

export interface PropertyCardWithDialogsProps {
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
  variant?: PropertyCardVariant;
  onClick?: (id: string) => void;
}

export const PropertyCardWithDialogs = ({
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
  variant: variantProp,
  onClick,
}: PropertyCardWithDialogsProps) => {
  const variant = usePropertyCardVariant(1024, variantProp);

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

  const baseProps = {
    title,
    price,
    currency,
    propertyType,
    location,
    pricePerPeriod,
    className,
    propertyIcons,
    phone,
    whatsapp,
    email,
    id,
    isFav,
    currentImageIndex,
    showContacts,
    hasMultipleImages,
    currentImage,
    onFavoriteClick: handleFavoriteClick,
    onShareClick: handleShareClick,
    onContactClick: handleContactClick,
    onPhoneClick: handlePhoneClick,
    onWhatsAppClick: handleWhatsAppClick,
    onEmailClick: handleEmailClick,
    onPreviousImage: handlePreviousImage,
    onNextImage: handleNextImage,
    onCardClick: onClick,
  };

  return (
    <>
      {variant === 'full' ? (
        <PropertyCardFullBase {...baseProps} />
      ) : (
        <PropertyCardCompactBase {...baseProps} />
      )}
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

