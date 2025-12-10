'use client';

import { useState, useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { usePropertyCardVariant, type PropertyCardVariant } from '@/hooks/usePropertyCardVariant';
import { PropertyCardCompactBase } from './PropertyCardCompactBase';
import { PropertyCardFullBase } from './PropertyCardFullBase';
import { SharePropertyDialog } from '../SharePropertyDialog';
import { useRouter } from 'next/navigation';

export interface PropertyCardWithUndoProps {
  title: string;
  price: number;
  currency?: string;
  propertyType: string;
  location: string;
  images: string[];
  pricePerPeriod: string;
  isFavorite?: boolean;
  className?: string;
  propertyIcons?: ReactNode;
  phone?: string;
  whatsapp?: string;
  email?: string;
  id?: string;
  url?: string;
  variant?: PropertyCardVariant;
  undoTimeout?: number;
}

export const PropertyCardWithUndo = ({
  title,
  price,
  currency = 'DH',
  propertyType,
  location,
  images,
  pricePerPeriod,
  isFavorite = false,
  className = '',
  propertyIcons,
  phone,
  whatsapp,
  email,
  id,
  url,
  variant: variantProp,
  undoTimeout = 5000,
}: PropertyCardWithUndoProps) => {
  const variant = usePropertyCardVariant(1024, variantProp);

  const [isFav, setIsFav] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const previousFavRef = useRef(isFavorite);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];
  const shareUrl =
    url ||
    (id
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}/property/${id}`
      : undefined);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    previousFavRef.current = isFav;
    const newFavState = !isFav;
    setIsFav(newFavState);
    setShowUndo(true);

    undoTimerRef.current = setTimeout(() => {
      setShowUndo(false);
    }, undoTimeout);
  };

  const handleUndoClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    setIsFav(previousFavRef.current);
    setShowUndo(false);
  };

  const handleShareClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const handleContactClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowContacts(!showContacts);
  };

  const handlePhoneClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleWhatsAppClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleEmailClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handlePreviousImage = (e: MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextImage = (e: MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/property/${cardId}`);
  };

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
    showUndo,
    onFavoriteClick: handleFavoriteClick,
    onShareClick: handleShareClick,
    onContactClick: handleContactClick,
    onPhoneClick: handlePhoneClick,
    onWhatsAppClick: handleWhatsAppClick,
    onEmailClick: handleEmailClick,
    onPreviousImage: handlePreviousImage,
    onNextImage: handleNextImage,
    onCardClick: handleCardClick,
    onUndoClick: handleUndoClick,
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
    </>
  );
};
