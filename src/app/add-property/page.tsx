'use client';

import Footer from '@/components/Footer';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import { LocationSuggestion } from '@/components/ui/LocationDropdown';
import PhoneInput from '@/components/ui/PhoneInput';
import SelectCard from '@/components/ui/SelectCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [selectedPostedBy, setSelectedPostedBy] = useState('');
  const [logoLoading, setLogoLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);

  // Mock location suggestions
  const locationSuggestions: LocationSuggestion[] = [
    {
      id: '1',
      street: 'Rue Al Massira',
      city: 'Casablanca',
    },
    {
      id: '2',
      street: 'Rue Al Massira',
      city: 'Tangier',
      isHighlighted: true,
    },
    {
      id: '3',
      street: 'Rue Al Massira',
      city: 'Fez',
    },
    {
      id: '4',
      street: 'Avenue Mohammed V',
      city: 'Rabat',
    },
    {
      id: '5',
      street: 'Boulevard Hassan II',
      city: 'Marrakech',
    },
  ];

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
      <div className="flex flex-col gap-6 w-full max-w-[39.375rem] mt-[2.5rem]">
        <div className="flex flex-col gap-6">
          <div className="title-xl ">Listing posted by</div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-4">
              <SelectCard
                title="Owner"
                selected={selectedPostedBy === 'owner'}
                onClick={() => setSelectedPostedBy('owner')}
              />
              <SelectCard
                title="Agency"
                selected={selectedPostedBy === 'agency'}
                onClick={() => setSelectedPostedBy('agency')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="title-xl">Add your contact info</div>
            <div className="body-lg text-[var(--text-body-tint)]">
              Make sure these details are correct, clients will reach out to you using them
            </div>
          </div>

          {selectedPostedBy === 'owner' && (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <div className="body-md text-[var(--color-black)]">Contact person</div>
                    <div className="body-md font-medium text-[var(--error)]">*</div>
                  </div>
                  <div className="flex items-center border border-[var(--border)] rounded-[8px] px-4 py-3">
                    <input
                      type="text"
                      className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <PhoneInput />
                </div>
              </div>

              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onClear={handleAddressClear}
                onFocus={handleAddressFocus}
                placeholder="Enter your address"
                label="Address"
                required
                clearable
                variant="address"
                locationSuggestions={locationSuggestions}
                onLocationSelect={handleLocationSelect}
                locationLoading={locationLoading}
              />
            </div>
          )}
          {selectedPostedBy === 'agency' && (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full justify-end items-end ">
                <IconButton
                  variant="base"
                  icon={<PlusIcon />}
                  label="Add Logo"
                  onClick={handleLogoClick}
                  loading={logoLoading}
                  className="w-[120px] h-[120px]"
                />
                <Input
                  value=""
                  onChange={() => {}}
                  type="text"
                  required
                  label="Agency name"
                  className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                  placeholder="Enter the name of your agency"
                />
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex-1 flex flex-col">
                  <Input
                    value=""
                    onChange={() => {}}
                    type="text"
                    required
                    label="Contact person"
                    className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex-1">
                  <PhoneInput />
                </div>
              </div>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onClear={handleAddressClear}
                onFocus={handleAddressFocus}
                placeholder="Enter your address"
                label="Office address"
                clearable
                variant="address"
                locationSuggestions={locationSuggestions}
                onLocationSelect={handleLocationSelect}
                locationLoading={locationLoading}
              />
            </div>
          )}
        </div>
      </div>
      {selectedPostedBy !== '' && <Footer onContinue={handleContinue} loading={footerLoading} />}
    </div>
  );
};

export default Page;
