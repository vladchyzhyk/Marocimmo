'use client';

import PropertyTypeTabs from './PropertyTypeTabs';
import PropertyTypeCard from './PropertyTypeCard';
import {
  ApartmentIcon,
  CommercialIcon2,
  HouseIcon2,
  LandIcon2,
  OfficeIcon2,
  VillaIcon2,
} from '@/utils/icons';

const PROPERTY_TYPE_CARDS = [
  {
    id: '1',
    icon: <ApartmentIcon className="text-[var(--accent-green)]" />,
    label: 'Apartment',
  },
  { id: '2', icon: <HouseIcon2 className="fill-[var(--accent-green)]" />, label: 'House' },
  { id: '3', icon: <VillaIcon2 className="" />, label: 'Villa' },
  { id: '4', icon: <OfficeIcon2 className="" />, label: 'Office' },
  { id: '5', icon: <LandIcon2 className="" />, label: 'Land' },
  { id: '6', icon: <CommercialIcon2 className="" />, label: 'Commercial' },
];

export const AllPropertyTypes = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] pt-[110px] lg:pt-[100px] ">
      <div className="w-full mx-auto flex flex-col gap-6">
        <h3 className="heading-h3 text-[var(--color-black)]">All Property Types</h3>
        <PropertyTypeTabs />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PROPERTY_TYPE_CARDS.map((card) => (
            <PropertyTypeCard key={card.id} icon={card.icon} label={card.label} />
          ))}
        </div>
      </div>
    </section>
  );
};
