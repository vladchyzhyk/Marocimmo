'use client';

import type { ReactNode } from 'react';
import type { PropertyCardVariant } from '@/hooks/usePropertyCardVariant';
import { PropertyCardWithDialogs } from './property-card/PropertyCardWithDialogs';

export type { PropertyCardBaseProps } from './property-card/types';
export { PropertyCardCompactBase } from './property-card/PropertyCardCompactBase';
export { PropertyCardFullBase } from './property-card/PropertyCardFullBase';
export { PropertyCardWithDialogs } from './property-card/PropertyCardWithDialogs';

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
  onClick?: (id: string) => void;
};

export const PropertyCard = (props: PropertyCardProps) => {
  return <PropertyCardWithDialogs {...props} />;
};

export default PropertyCard;
