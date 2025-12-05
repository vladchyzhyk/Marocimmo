'use client';

import type { ReactNode } from 'react';
import { usePropertyCardVariant, type PropertyCardVariant } from '@/hooks/usePropertyCardVariant';
import { PropertyCardCompact } from './property-card/PropertyCardCompact';
import { PropertyCardFull } from './property-card/PropertyCardFull';

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
  variant?: PropertyCardVariant;
};

export const PropertyCard = (props: PropertyCardProps) => {
  const variant = usePropertyCardVariant(1024, props.variant);

  if (variant === 'full') {
    return <PropertyCardFull {...props} />;
  }

  return <PropertyCardCompact {...props} />;
};

export default PropertyCard;
