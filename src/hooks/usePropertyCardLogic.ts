import { useState } from 'react';
import { user } from '@/components/Header';

export interface UsePropertyCardLogicProps {
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
  phone?: string;
  whatsapp?: string;
  email?: string;
  images: string[];
}

export function usePropertyCardLogic({
  isFavorite = false,
  onFavoriteClick,
  onShareClick,
  phone,
  whatsapp,
  email,
  images,
}: UsePropertyCardLogicProps) {
  const [isFav, setIsFav] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.isLoggedIn) {
      setIsFav(!isFav);
      console.log('Favorite toggled:', !isFav);
      onFavoriteClick?.();
    } else {
      setIsAuthModalOpen(true);
    }
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

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || images[0];

  return {
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
  };
}

