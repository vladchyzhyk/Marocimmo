'use client';

import Footer from '@/components/Footer';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import { LocationSuggestion } from '@/components/ui/LocationDropdown';
import PhoneInput from '@/components/ui/PhoneInput';
import SelectCard from '@/components/ui/SelectCard';
import { AgencyIcon, OwnerIcon } from '@/utils/icons';
import { cleanupImagePreview, processImageUpload } from '@/utils/imageUtils';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

// Types for form data
interface OwnerFormData {
  contactPerson: string;
  phoneNumber: string;
  countryCode: string;
}

interface AgencyFormData {
  logoUrl: string;
  agencyName: string;
  contactPerson: string;
  phoneNumber: string;
  countryCode: string;
  officeAddress: string;
}

const Page = () => {
  const router = useRouter();

  // Main state
  const [selectedPostedBy, setSelectedPostedBy] = useState<'owner' | 'agency' | ''>('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);

  // Owner form state
  const [ownerFormData, setOwnerFormData] = useState<OwnerFormData>({
    contactPerson: '',
    phoneNumber: '',
    countryCode: '+212',
  });

  // Agency form state
  const [agencyFormData, setAgencyFormData] = useState<AgencyFormData>({
    logoUrl: '',
    agencyName: '',
    contactPerson: '',
    phoneNumber: '',
    countryCode: '+212',
    officeAddress: '',
  });

  // Reset form helpers
  const resetOwnerForm = () => {
    setOwnerFormData({
      contactPerson: '',
      phoneNumber: '',
      countryCode: '+212',
    });
  };

  const resetAgencyForm = () => {
    setAgencyFormData({
      logoUrl: '',
      agencyName: '',
      contactPerson: '',
      phoneNumber: '',
      countryCode: '+212',
      officeAddress: '',
    });
  };

  const handleSelectPostedBy = (value: 'owner' | 'agency') => {
    resetOwnerForm();
    resetAgencyForm();
    setSelectedPostedBy(value);
  };

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

  // Validation functions
  const isOwnerFormValid = useMemo(() => {
    return ownerFormData.contactPerson.trim() !== '' && ownerFormData.phoneNumber.trim() !== '';
  }, [ownerFormData]);

  const isAgencyFormValid = useMemo(() => {
    return (
      agencyFormData.agencyName.trim() !== '' &&
      agencyFormData.contactPerson.trim() !== '' &&
      agencyFormData.phoneNumber.trim().length > 6
    );
  }, [agencyFormData]);

  const isFormValid = useMemo(() => {
    if (selectedPostedBy === 'owner') {
      return isOwnerFormValid;
    }
    if (selectedPostedBy === 'agency') {
      return isAgencyFormValid;
    }
    return false;
  }, [selectedPostedBy, isOwnerFormValid, isAgencyFormValid]);

  // Owner form handlers
  const handleOwnerContactPersonChange = (value: string) => {
    setOwnerFormData((prev) => ({ ...prev, contactPerson: value }));
  };

  const handleOwnerPhoneChange = (value: string) => {
    setOwnerFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleOwnerCountryCodeChange = (code: string) => {
    setOwnerFormData((prev) => ({ ...prev, countryCode: code }));
  };

  // Agency form handlers
  const handleAgencyLogoUpload = (file: File) => {
    const processedImage = processImageUpload(file);
    if (processedImage) {
      setAgencyFormData((prev) => ({ ...prev, logoUrl: processedImage.previewUrl }));
    }
  };

  const handleAgencyLogoDelete = () => {
    if (agencyFormData.logoUrl) {
      cleanupImagePreview(agencyFormData.logoUrl);
      setAgencyFormData((prev) => ({ ...prev, logoUrl: '' }));
    }
  };

  const handleAgencyNameChange = (value: string) => {
    setAgencyFormData((prev) => ({ ...prev, agencyName: value }));
  };

  const handleAgencyContactPersonChange = (value: string) => {
    setAgencyFormData((prev) => ({ ...prev, contactPerson: value }));
  };

  const handleAgencyPhoneChange = (value: string) => {
    setAgencyFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleAgencyCountryCodeChange = (code: string) => {
    setAgencyFormData((prev) => ({ ...prev, countryCode: code }));
  };

  const handleAgencyAddressChange = (value: string) => {
    setAgencyFormData((prev) => ({ ...prev, officeAddress: value }));
  };

  const handleAgencyAddressClear = () => {
    setAgencyFormData((prev) => ({ ...prev, officeAddress: '' }));
  };

  const handleLocationSelect = (suggestion: LocationSuggestion) => {
    setAgencyFormData((prev) => ({
      ...prev,
      officeAddress: `${suggestion.street}, ${suggestion.city}`,
    }));
  };

  const handleAddressFocus = () => {
    setLocationLoading(true);
    setTimeout(() => {
      setLocationLoading(false);
    }, 2000);
  };

  const handleLogoClick = () => {
    console.log('Logo button clicked');
  };

  const handleContinue = () => {
    setFooterLoading(true);
    router.push('/add-property/base-property-info');
  };

  return (
    <div
      className={classNames(
        'px-4 md:px-0 h-full flex justify-center w-full bg-white mt-20 min-h-screen md:min-h-fit scrollbar-none pb-25',
      )}
    >
      <div className="flex flex-col gap-14 w-full max-w-[39.375rem] mt-[2.5rem]">
        <div className="flex flex-col gap-6">
          <div className="title-xl ">Listing posted by</div>

          <div className="flex flex-col gap-3">
            <div className="hidden md:flex justify-center items-center gap-4">
              <SelectCard
                title="Owner"
                Icon={OwnerIcon}
                selected={selectedPostedBy === 'owner'}
                onClick={() => handleSelectPostedBy('owner')}
              />
              <SelectCard
                title="Agency"
                Icon={AgencyIcon}
                selected={selectedPostedBy === 'agency'}
                onClick={() => handleSelectPostedBy('agency')}
              />
            </div>
            <div className="md:hidden flex justify-start items-center gap-4">
              <SelectCard
                title="Owner"
                variant="small"
                Icon={OwnerIcon}
                selected={selectedPostedBy === 'owner'}
                onClick={() => handleSelectPostedBy('owner')}
              />
              <SelectCard
                title="Agency"
                variant="small"
                Icon={AgencyIcon}
                selected={selectedPostedBy === 'agency'}
                onClick={() => handleSelectPostedBy('agency')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full">
          {selectedPostedBy !== '' && (
            <div className="flex flex-col gap-2">
              <div className="title-xl">Add your contact info</div>
              <div className="body-lg text-[var(--text-body-tint)]">
                Make sure these details are correct, clients will reach out to you using them
              </div>
            </div>
          )}

          {selectedPostedBy === 'owner' && (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col gap-2">
                  <Input
                    value={ownerFormData.contactPerson}
                    onChange={(e) => handleOwnerContactPersonChange(e.target.value)}
                    type="text"
                    required
                    label="Contact person"
                    className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex-1">
                  <PhoneInput
                    value={ownerFormData.phoneNumber}
                    onChange={handleOwnerPhoneChange}
                    defaultCountryCode={ownerFormData.countryCode}
                    onCountryCodeChange={handleOwnerCountryCodeChange}
                  />
                </div>
              </div>
            </div>
          )}

          {selectedPostedBy === 'agency' && (
            <div className="flex flex-col gap-4 w-full pb-6 md:pb-0">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-end items-center md:items-end ">
                <IconButton
                  variant={agencyFormData.logoUrl ? 'with-photo' : 'base'}
                  icon={agencyFormData.logoUrl ? undefined : <PlusIcon />}
                  label={agencyFormData.logoUrl ? undefined : 'Add Logo'}
                  imageUrl={agencyFormData.logoUrl}
                  onClick={agencyFormData.logoUrl ? undefined : handleLogoClick}
                  onImageUpload={agencyFormData.logoUrl ? undefined : handleAgencyLogoUpload}
                  onDelete={handleAgencyLogoDelete}
                  showDeleteButton={!!agencyFormData.logoUrl}
                  className="w-full max-w-[6.25rem] h-[6.25rem]"
                />
                <Input
                  value={agencyFormData.agencyName}
                  onChange={(e) => handleAgencyNameChange(e.target.value)}
                  type="text"
                  required
                  label="Agency name"
                  className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                  placeholder="Enter the name of your agency"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col">
                  <Input
                    value={agencyFormData.contactPerson}
                    onChange={(e) => handleAgencyContactPersonChange(e.target.value)}
                    type="text"
                    required
                    label="Contact person"
                    className="w-full outline-none placeholder:text-[var(--text-body-tint)] body-lg text-[var(--color-black)]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex-1">
                  <PhoneInput
                    value={agencyFormData.phoneNumber}
                    onChange={handleAgencyPhoneChange}
                    defaultCountryCode={agencyFormData.countryCode}
                    onCountryCodeChange={handleAgencyCountryCodeChange}
                  />
                </div>
              </div>
              <Input
                value={agencyFormData.officeAddress}
                onChange={(e) => handleAgencyAddressChange(e.target.value)}
                onClear={handleAgencyAddressClear}
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
      {selectedPostedBy !== '' && (
        <Footer onContinue={handleContinue} loading={footerLoading} disabled={!isFormValid} />
      )}
    </div>
  );
};

export default Page;
