'use client';

import Footer from '@/components/Footer'
import SelectablePill from '@/components/ui/SelectablePill'
import Image from 'next/image'
import { useState } from 'react'

interface Feature {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const features: Feature[] = [
  // Indoor Amenities
  { id: 'wifi', name: 'Wi-Fi', icon: '/icons/ic_wifi.svg', category: 'indoor' },
  { id: 'tv', name: 'TV', icon: '/icons/ic_tv.svg', category: 'indoor' },
  {
    id: 'satellite_tv',
    name: 'Satellite TV',
    icon: '/icons/ic_satellite_tv.svg',
    category: 'indoor',
  },
  {
    id: 'fiber_optic',
    name: 'Fiber optic cable',
    icon: '/icons/ic_fiber_optic_cable.svg',
    category: 'indoor',
  },
  {
    id: 'telephone',
    name: 'Telephone wiring',
    icon: '/icons/ic_telephone_wiring.svg',
    category: 'indoor',
  },
  { id: 'hot_water', name: 'Hot Water', icon: '/icons/ic_hot_water.svg', category: 'indoor' },
  {
    id: 'air_conditioning',
    name: 'Air Conditioning',
    icon: '/icons/ic_air_conditioning.svg',
    category: 'indoor',
  },
  { id: 'heating', name: 'Heating', icon: '/icons/ic_heating.svg', category: 'indoor' },

  // Furnishing & Essentials
  { id: 'furnished', name: 'Furnished', icon: '/icons/ic_furnished.svg', category: 'furnishing' },
  {
    id: 'shower_cabin',
    name: 'Shower cabin',
    icon: '/icons/ic_shower_cabin.svg',
    category: 'furnishing',
  },
  { id: 'bathtub', name: 'Bathtub', icon: '/icons/ic_bathtub.svg', category: 'furnishing' },
  {
    id: 'washing_machine',
    name: 'Washing machine',
    icon: '/icons/ic_washing_machine.svg',
    category: 'furnishing',
  },
  {
    id: 'equipped_kitchen',
    name: 'Equipped Kitchen',
    icon: '/icons/ic_kitchen.svg',
    category: 'furnishing',
  },
  { id: 'fridge', name: 'Fridge', icon: '/icons/ic_fridge.svg', category: 'furnishing' },
  { id: 'stove', name: 'Stove', icon: '/icons/ic_stove.svg', category: 'furnishing' },
  { id: 'microwave', name: 'Microwave', icon: '/icons/ic_microwave.svg', category: 'furnishing' },
  {
    id: 'coffee_machine',
    name: 'Coffee Machine',
    icon: '/icons/ic_coffee.svg',
    category: 'furnishing',
  },

  // Layout Style
  {
    id: 'moroccan_lounge',
    name: 'Moroccan Lounge',
    icon: '/icons/ic_moroccan_lounge.svg',
    category: 'layout',
  },
  {
    id: 'european_lounge',
    name: 'European Lounge',
    icon: '/icons/ic_european_lounge.svg',
    category: 'layout',
  },
  { id: 'duplex', name: 'Duplex', icon: '/icons/ic_duplex.svg', category: 'layout' },
  { id: 'balcony', name: 'Balcony', icon: '/icons/ic_balcony.svg', category: 'layout' },
  { id: 'terrace', name: 'Terrace', icon: '/icons/ic_terrace.svg', category: 'layout' },

  // Building & Site
  {
    id: 'swimming_pool',
    name: 'Swimming Pool',
    icon: '/icons/ic_swimming_pool.svg',
    category: 'building',
  },
  { id: 'gym', name: 'Gym', icon: '/icons/ic_gym.svg', category: 'building' },
  { id: 'parking', name: 'Parking', icon: '/icons/ic_parking.svg', category: 'building' },
  { id: 'elevator', name: 'Elevator', icon: '/icons/ic_elevator.svg', category: 'building' },
  { id: 'storage', name: 'Storage room', icon: '/icons/ic_storage.svg', category: 'building' },
  { id: 'concierge', name: 'Concierge', icon: '/icons/ic_concierge.svg', category: 'building' },
  {
    id: 'accessibility',
    name: 'Accessibility for Disabled',
    icon: '/icons/ic_accessibility.svg',
    category: 'building',
  },

  // Security & Access
  {
    id: 'security_system',
    name: 'Security system',
    icon: '/icons/ic_security_system.svg',
    category: 'security',
  },
  { id: 'intercom', name: 'Intercom', icon: '/icons/ic_intercom.svg', category: 'security' },
  { id: 'coded_lock', name: 'Coded lock', icon: '/icons/ic_coded_lock.svg', category: 'security' },
];

const categories = [
  { id: 'indoor', name: 'Indoor Amenities' },
  { id: 'furnishing', name: 'Furnishing & Essentials' },
  { id: 'layout', name: 'Layout Style' },
  { id: 'building', name: 'Building & Site' },
  { id: 'security', name: 'Security & Access' },
];

interface FeaturesStepProps {
  onNext?: (selectedFeatures: string[]) => void;
  onBack?: () => void;
  initialFeatures?: string[];
}

const FeaturesStep = ({ onNext, onBack, initialFeatures = [] }: FeaturesStepProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures);
  const [footerLoading, setFooterLoading] = useState(false);

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    );
  };

  const getFeaturesByCategory = (categoryId: string) => {
    return features.filter((feature) => feature.category === categoryId);
  };

  const handleContinue = () => {
    setFooterLoading(true);
    if (onNext) {
      onNext(selectedFeatures);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="title-xl text-[var(--color-black)]">
          What are you offering in your property?
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-4">
            <h2 className="label-lg-medium text-[var(--color-black)] w-35">{category.name}</h2>
            <div className="flex flex-wrap gap-2">
              {getFeaturesByCategory(category.id).map((feature) => (
                <SelectablePill
                  key={feature.id}
                  selected={selectedFeatures.includes(feature.id)}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className="flex items-center gap-2 px-4 py-4 h-11"
                >
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="body-lg">{feature.name}</span>
                  {selectedFeatures.includes(feature.id) && (
                    <Image
                      src="/icons/ic_check.svg"
                      alt="Selected"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  )}
                </SelectablePill>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer onContinue={handleContinue} loading={footerLoading} />
    </div>
  );
};

export default FeaturesStep;
