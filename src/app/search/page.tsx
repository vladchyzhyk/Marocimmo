'use client';

import { useSearchParams } from '@/hooks/useSearchParams';
import PropertyCard from '@/components/PropertyCard';
import { Filters } from '@/components/search-results/Filters';
import {
  HousePropertyIcons,
  OfficePropertyIcons,
  LandPropertyIcons,
} from '@/components/property-icons';

const mockProperties = [
  {
    id: '1',
    title: 'Beautiful 3-Bedroom Apartment with Ocean Views with sea view',
    price: 7500,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 78,
    location: 'Casablanca, Ain Diab',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/cozzy-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '2',
    title: 'Modern Apartment in Prime Location',
    price: 8500,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    location: 'Rabat, Agdal',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Luxury Villa with Private Pool and Garden',
    price: 25000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    location: 'Marrakech, Palmeraie',
    images: [
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
    ],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '4',
    title: 'Spacious Family House with Large Terrace',
    price: 12000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    location: 'Casablanca, Maarif',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: true,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '5',
    title: 'Cozy 2-Bedroom Apartment in City Center',
    price: 6000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    location: 'Tangier, Old Medina',
    locationId: '1',
    images: [
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
    ],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '6',
    title: 'Premium Land for Development - 500m²',
    price: 1500000,
    pricePerMonth: false,
    currency: 'DH',
    propertyType: 'Land',
    area: 500,
    location: 'Casablanca, Anfa',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '7',
    title: 'Elegant Villa with Sea View',
    price: 30000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Villa',
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    location: 'Casablanca, Ain Diab',
    locationId: '1',
    images: [
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
    ],
    isFavorite: true,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '8',
    title: 'Traditional Moroccan House in Historic District',
    price: 10000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'House',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    location: 'Fez, Medina',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '9',
    title: 'Bright Office Space in Business District',
    price: 14600,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Offices',
    area: 100,
    rooms: 2,
    bathrooms: 1,
    parkings: 5,
    location: 'Casablanca, Sidi Maârouf',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '10',
    title: 'Investment Land - Commercial Zone',
    price: 2500000,
    pricePerMonth: false,
    currency: 'DH',
    propertyType: 'Land',
    area: 800,
    location: 'Casablanca, Sidi Maarouf',
    locationId: '1',
    images: ['/images/light-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
  {
    id: '11',
    title: 'Penthouse Apartment with Panoramic Views',
    price: 15000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    location: 'Casablanca, Corniche',
    locationId: '1',
    images: [
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
      '/images/light-styled-interior.jpg',
    ],
    isFavorite: true,
    phone: '0600000000',
    whatsapp: '0600000000',
    email: 'test@test.com',
  },
  {
    id: '12',
    title: 'Modern Villa with Contemporary Design',
    price: 22000,
    pricePerMonth: true,
    currency: 'DH',
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    location: 'Rabat, Hay Riad',
    locationId: '2',
    images: ['/images/light-styled-interior.jpg', '/images/light-styled-interior.jpg'],
    isFavorite: false,
    phone: '0600000000',
    whatsapp: '+212600000000',
    email: 'test@test.com',
  },
];

export default function SearchPage() {
  const { searchParams } = useSearchParams();

  const filteredProperties = mockProperties.filter((property) => {
    if (searchParams.dealType && searchParams.dealType !== 'sale') {
      return true;
    }
    if (searchParams.locationId && property.locationId !== searchParams.locationId) {
      return false;
    }
    if (
      searchParams.propertyTypes.length > 0 &&
      !searchParams.propertyTypes.includes(property.propertyType.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getPropertyIcons = (property: (typeof mockProperties)[0]) => {
    const propertyType = property.propertyType.toLowerCase();

    if (propertyType === 'land') {
      return <LandPropertyIcons area={property.area} location={property.location} />;
    }

    if (propertyType === 'office' || propertyType === 'offices') {
      return (
        <OfficePropertyIcons
          rooms={property.rooms}
          area={property.area}
          bathrooms={property.bathrooms}
          parkings={property.parkings}
        />
      );
    }

    return (
      <HousePropertyIcons
        rooms={property.bedrooms}
        area={property.area}
        bathrooms={property.bathrooms}
      />
    );
  };

  return (
    <main className="w-full min-h-screen">
      <div className="w-full max-w-[1240px] mx-auto px-4 py-8 mt-[69px]">
        <div className="w-full lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="heading-h1 text-[var(--color-black)]">
              {filteredProperties.length} properties found
            </h1>
          </div>

          <Filters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                pricePerMonth={property.pricePerMonth}
                currency={property.currency}
                propertyType={property.propertyType}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                rooms={property.rooms}
                parkings={property.parkings}
                location={property.location}
                images={property.images}
                isFavorite={property.isFavorite}
                onContactClick={() => console.log('Contact clicked')}
                propertyIcons={getPropertyIcons(property)}
                phone={property.phone}
                whatsapp={property.whatsapp}
                email={property.email}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
