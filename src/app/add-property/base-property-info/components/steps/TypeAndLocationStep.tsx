'use client';

import Footer from '@/components/Footer';
import Input from '@/components/ui/Input';
import { LocationSuggestion } from '@/components/ui/LocationDropdown';
import SelectCard from '@/components/ui/SelectCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const propertyTypes = [
  {
    id: '1',
    title: 'Apartment',
  },
  {
    id: '2',
    title: 'House',
  },

  {
    id: '3',
    title: 'Villa/Riad',
  },

  {
    id: '4',
    title: 'Office',
  },

  {
    id: '5',
    title: 'Commercial',
  },

  {
    id: '6',
    title: 'Land',
  },
];

const TypeAndLocationStep = () => {
  const router = useRouter();
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedPostedBy, setSelectedPostedBy] = useState('');
  const [logoLoading, setLogoLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);

  const PlusIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleLogoClick = () => {
    setLogoLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLogoLoading(false);
    }, 2000);
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    setAddress(`${suggestion.street}, ${suggestion.city}`);
  };

  const handleAddressClear = () => {
    setAddress('');
  };

  const handleAddressFocus = () => {
    // Simulate loading locations
    setLocationLoading(true);
    setTimeout(() => {
      setLocationLoading(false);
    }, 2000);
  };

  const handleContinue = () => {
    setFooterLoading(true);
    router.push('/add-property/base-property-info');
  };

  return (
    <div className="flex justify-center min-h-screen w-full bg-gray-50 pb-10">
      <div className="flex flex-col gap-6 w-full max-w-[53rem] mt-[2rem]">
        <div className="flex flex-col gap-6">
          <div className="title-xl ">Choose transaction type</div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-4">
              <SelectCard
                title="Short-term Rent"
                variant="pill"
                selected={selectedPostedBy === 'owner'}
                onClick={() => setSelectedPostedBy('owner')}
              />
              <SelectCard
                title="Long-term Rent"
                variant="pill"
                selected={selectedPostedBy === 'agency'}
                onClick={() => setSelectedPostedBy('agency')}
              />
              <SelectCard
                title="Sale"
                variant="pill"
                selected={selectedPostedBy === 'agency'}
                onClick={() => setSelectedPostedBy('agency')}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {propertyTypes.map((type) => (
                <SelectCard
                  key={type.id}
                  title={type.title}
                  variant="type"
                  selected={selectedPropertyType === type.id}
                  onClick={() => setSelectedPropertyType(type.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <div className="title-xl">Location</div>
            <div className="body-lg text-[var(--text-body-tint)]">
              Tell us about your property&apos;s location
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Input
              placeholder="Enter your address"
              label="Region"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Enter your address"
              label="City"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Enter your address"
              label="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="address"
            />
          </div>
        </div>
      </div>
      {selectedPostedBy !== '' && <Footer onContinue={handleContinue} loading={footerLoading} />}
    </div>
  );
};

export default TypeAndLocationStep;
