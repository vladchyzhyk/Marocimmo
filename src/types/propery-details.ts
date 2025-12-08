export interface BasicInfo {
  title: string;
  transactionType: 'Sale' | 'Rent';
  propertyType: string;
  rooms: number;
  bathrooms: number;
  area: number;
  location: {
    city: string;
    district: string;
    fullAddress: string;
  };
}

export interface Pricing {
  price: number;
  currency: string;
  pricePeriod: 'per month' | 'per week' | 'per day' | '';
  isNegotiable: boolean;
  deposit: {
    amount: number;
    period: 'month' | 'week';
  };
  syndicFees: {
    amount: number;
    currency: string;
    period: 'per month' | 'per week';
  };
  availableFrom: string;
}

export interface Description {
  fullText: string;
}

export interface PropertyDetails {
  floor: number;
  totalArea: number;
  livingArea: number;
  ceilingHeight?: number;
  parkingSpaces?: number;
  windowView?: string;
}

export interface BuildingInfo {
  yearBuilt: string;
  condition: string;
  propertyClass: string;
  renovation: string;
  totalFloors?: number;
}

export interface SpecialConditions {
  petsAllowed: boolean;
  smokingAllowed: boolean;
  disabledAccess?: boolean;
  touristLicense?: boolean;
  loti?: boolean;
  titledLand?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  category?: string;
}

export interface Amenities {
  list: Amenity[];
  visibleCount: number;
  totalCount: number;
}

export interface AgentInfo {
  id: string;
  name: string;
  title: string;
  company: {
    name: string;
    logo: string;
    logoText?: string;
  };
  contacts: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  showContactsByDefault: boolean;
}

export interface SimilarProperty {
  id: string;
  title: string;
  location: {
    city: string;
    district: string;
    fullAddress: string;
  };
  price: number;
  currency: string;
  pricePeriod: string;
  rooms?: number;
  bathrooms?: number;
  area: number;
  mainImage: string;
  propertyType: string;
  tags?: string[];
  isFavorite?: boolean;
  hasVideo?: boolean;
  url: string;
}

export interface Property {
  id: string;
  basicInfo: BasicInfo;
  pricing: Pricing;
  description: string;
  details: PropertyDetails;
  building: BuildingInfo;
  specialConditions: SpecialConditions;
  amenities: Amenity[];
  photos: string[];
  agent: AgentInfo;
  similarProperties: SimilarProperty[];
}
