'use client';

import SelectablePill from '@/components/ui/SelectablePill';
import classNames from 'classnames';
import { useState } from 'react';

// Import all icons from utility
import {
  AirConditioningIcon,
  BalconyIcon,
  BathtubIcon,
  CheckIcon,
  CodedLockIcon,
  CoffeeIcon,
  ConciergeIcon,
  DuplexIcon,
  EuropeanLoungeIcon,
  FiberOpticIcon,
  FridgeIcon,
  FurnishedIcon,
  GymIcon,
  HeatingIcon,
  HotWaterIcon,
  IntercomIcon,
  KitchenIcon,
  MicrowaveIcon,
  MoroccanLoungeIcon,
  ParkingIcon,
  SatelliteTvIcon,
  SecuritySystemIcon,
  ShowerCabinIcon,
  StoveIcon,
  SwimmingPoolIcon,
  TelephoneIcon,
  TerraceIcon,
  TvIcon,
  WashingMachineIcon,
  WifiIcon,
} from '@/utils/icons';

interface EditFeature {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: string;
}

const features: EditFeature[] = [
  // Indoor Amenities
  { id: 'wifi', name: 'Wi-Fi', icon: WifiIcon, category: 'indoor' },
  { id: 'tv', name: 'TV', icon: TvIcon, category: 'indoor' },
  { id: 'satellite_tv', name: 'Satellite TV', icon: SatelliteTvIcon, category: 'indoor' },
  { id: 'fiber_optic', name: 'Fiber optic cable', icon: FiberOpticIcon, category: 'indoor' },
  { id: 'telephone', name: 'Telephone wiring', icon: TelephoneIcon, category: 'indoor' },
  { id: 'hot_water', name: 'Hot Water', icon: HotWaterIcon, category: 'indoor' },
  {
    id: 'air_conditioning',
    name: 'Air Conditioning',
    icon: AirConditioningIcon,
    category: 'indoor',
  },
  { id: 'heating', name: 'Heating', icon: HeatingIcon, category: 'indoor' },

  // Furnishing & Essentials
  { id: 'furnished', name: 'Furnished', icon: FurnishedIcon, category: 'furnishing' },
  { id: 'shower_cabin', name: 'Shower cabin', icon: ShowerCabinIcon, category: 'furnishing' },
  { id: 'bathtub', name: 'Bathtub', icon: BathtubIcon, category: 'furnishing' },
  {
    id: 'washing_machine',
    name: 'Washing machine',
    icon: WashingMachineIcon,
    category: 'furnishing',
  },
  { id: 'equipped_kitchen', name: 'Equipped Kitchen', icon: KitchenIcon, category: 'furnishing' },
  { id: 'fridge', name: 'Fridge', icon: FridgeIcon, category: 'furnishing' },
  { id: 'stove', name: 'Stove', icon: StoveIcon, category: 'furnishing' },
  { id: 'microwave', name: 'Microwave', icon: MicrowaveIcon, category: 'furnishing' },
  { id: 'coffee_machine', name: 'Coffee Machine', icon: CoffeeIcon, category: 'furnishing' },

  // Layout Style
  { id: 'moroccan_lounge', name: 'Moroccan Lounge', icon: MoroccanLoungeIcon, category: 'layout' },
  { id: 'european_lounge', name: 'European Lounge', icon: EuropeanLoungeIcon, category: 'layout' },
  { id: 'duplex', name: 'Duplex', icon: DuplexIcon, category: 'layout' },
  { id: 'balcony', name: 'Balcony', icon: BalconyIcon, category: 'layout' },
  { id: 'terrace', name: 'Terrace', icon: TerraceIcon, category: 'layout' },

  // Building & Site
  { id: 'swimming_pool', name: 'Swimming Pool', icon: SwimmingPoolIcon, category: 'building' },
  { id: 'parking', name: 'Parking', icon: ParkingIcon, category: 'building' },
  { id: 'gym', name: 'Gym', icon: GymIcon, category: 'building' },
  { id: 'concierge', name: 'Concierge', icon: ConciergeIcon, category: 'building' },

  // Security & Access
  {
    id: 'security_system',
    name: 'Security System',
    icon: SecuritySystemIcon,
    category: 'security',
  },
  { id: 'intercom', name: 'Intercom', icon: IntercomIcon, category: 'security' },
  { id: 'coded_lock', name: 'Coded Lock', icon: CodedLockIcon, category: 'security' },
];

const categories = [
  { id: 'indoor', name: 'Indoor Amenities' },
  { id: 'furnishing', name: 'Furnishing & Essentials' },
  { id: 'layout', name: 'Layout Style' },
  { id: 'building', name: 'Building & Site' },
  { id: 'security', name: 'Security & Access' },
];

interface EditFeaturesStepProps {
  onDataChange?: (selectedFeatures: string[]) => void;
  onBack?: () => void;
  initialFeatures?: string[];
}

const EditFeaturesStep = ({ onDataChange, initialFeatures = [] }: EditFeaturesStepProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures);

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter((id) => id !== featureId)
      : [...selectedFeatures, featureId];
    setSelectedFeatures(newFeatures);
    onDataChange?.(newFeatures);
  };

  const getFeaturesByCategory = (categoryId: string) => {
    return features.filter((feature) => feature.category === categoryId);
  };

  return (
    <div className="flex flex-col gap-6 w-full px-4 md:px-4 lg:px-6 xl:px-0">
      <div className="flex flex-col gap-1">
        <h1 className="title-xl text-[var(--color-black)]">
          What are you offering in your property?
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-6 lg:gap-8 xl:gap-8 min-h-screen md:min-h-fit pb-25">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-4 md:gap-2 lg:gap-3 xl:gap-4">
            <h2 className="label-lg-medium text-[var(--color-black)] whitespace-nowrap">
              {category.name}
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-2 lg:gap-3 xl:gap-4">
              {getFeaturesByCategory(category.id).map((feature) => (
                <SelectablePill
                  key={feature.id}
                  selected={selectedFeatures.includes(feature.id)}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className="flex items-center gap-2 px-4 py-4 h-11 group"
                >
                  <feature.icon
                    className={classNames(
                      'w-4 h-4 transition-colors duration-200',
                      selectedFeatures.includes(feature.id)
                        ? 'text-white group-hover:text-[var(--accent-green)] fill-transparent'
                        : 'text-[var(--text-pill)] group-hover:text-[var(--accent-green)] fill-transparent',
                    )}
                  />
                  <span
                    className={classNames(
                      'flex-1 body-lg transition-colors duration-200',
                      selectedFeatures.includes(feature.id)
                        ? 'text-white group-hover:text-[var(--accent-green)]'
                        : 'text-[var(--text-pill)] group-hover:text-[var(--accent-green)]',
                    )}
                  >
                    {feature.name}
                  </span>

                  <div
                    className={classNames(
                      'flex items-center justify-center transition-all duration-300',
                      {
                        'w-4': selectedFeatures.includes(feature.id),
                        'w-0': !selectedFeatures.includes(feature.id),
                      },
                    )}
                  >
                    <CheckIcon className="w-4 h-4 text-[var(--text-pill)]" />
                  </div>
                </SelectablePill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditFeaturesStep;
