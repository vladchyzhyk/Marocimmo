import type { ReactNode, MouseEvent } from 'react';

export interface PropertyCardBaseProps {
  title: string;
  price: number;
  currency?: string;
  propertyType: string;
  location: string;
  pricePerPeriod: string;
  className?: string;
  propertyIcons?: ReactNode;
  phone?: string;
  whatsapp?: string;
  email?: string;
  id?: string;

  isFav: boolean;
  currentImageIndex: number;
  showContacts: boolean;
  hasMultipleImages: boolean;
  currentImage: string;
  showUndo?: boolean;

  onFavoriteClick: (e: MouseEvent) => void;
  onShareClick: (e: MouseEvent) => void;
  onContactClick: (e: MouseEvent) => void;
  onPhoneClick: (e: MouseEvent) => void;
  onWhatsAppClick: (e: MouseEvent) => void;
  onEmailClick: (e: MouseEvent) => void;
  onPreviousImage: (e: MouseEvent) => void;
  onNextImage: (e: MouseEvent) => void;
  onCardClick?: (id: string) => void;
  onUndoClick?: (e: MouseEvent) => void;
}

