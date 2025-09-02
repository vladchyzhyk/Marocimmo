'use client';

import Input from '@/components/ui/Input';
import InputSelect from '@/components/ui/InputSelect';
import SelectCard from '@/components/ui/SelectCard';
import {
  ApartmentIcon,
  CommercialIcon,
  HouseIcon,
  LandIcon,
  OfficeIcon,
  VillaIcon,
} from '@/utils/icons';
import classNames from 'classnames';

const transactionTypes = [
  {
    id: '1',
    title: 'Short-term Rent',
    variant: 'short-term',
    propertyTypes: [
      {
        id: '1',
        title: 'Apartment',
        icon: ApartmentIcon,
      },
      {
        id: '2',
        title: 'House',
        icon: HouseIcon,
      },

      {
        id: '3',
        title: 'Villa/Riad',
        icon: VillaIcon,
      },
    ],
  },
  {
    id: '2',
    title: 'Long-term Rent',
    variant: 'long-term',
    propertyTypes: [
      {
        id: '1',
        title: 'Apartment',
        icon: ApartmentIcon,
      },
      {
        id: '2',
        title: 'House',
        icon: HouseIcon,
      },

      {
        id: '3',
        title: 'Villa/Riad',
        icon: VillaIcon,
      },

      {
        id: '4',
        title: 'Office',
        icon: OfficeIcon,
      },

      {
        id: '5',
        title: 'Commercial',
        icon: CommercialIcon,
      },

      {
        id: '6',
        title: 'Land',
        icon: LandIcon,
        zoningCategories: [
          {
            id: '1',
            title: 'Residential',
          },
          {
            id: '2',
            title: 'Commercial',
          },
          {
            id: '3',
            title: 'Agricultural',
          },
          {
            id: '4',
            title: 'Industrial',
          },
          {
            id: '5',
            title: 'Public Services',
          },
          {
            id: '6',
            title: 'Mixed-Use',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Sale',
    variant: 'sale',
    propertyTypes: [
      {
        id: '1',
        title: 'Apartment',
        icon: ApartmentIcon,
      },
      {
        id: '2',
        title: 'House',
        icon: HouseIcon,
      },

      {
        id: '3',
        title: 'Villa/Riad',
        icon: VillaIcon,
      },

      {
        id: '4',
        title: 'Office',
        icon: OfficeIcon,
      },

      {
        id: '5',
        title: 'Commercial',
        icon: CommercialIcon,
      },

      {
        id: '6',
        title: 'Land',
        icon: LandIcon,
      },
    ],
  },
];

const regions = [
  {
    id: '1',
    title: 'Casablanca',
  },
  {
    id: '2',
    title: 'Tangier',
  },
  {
    id: '3',
    title: 'Fez',
  },
];

const cities = [
  {
    id: '1',
    title: 'Casablanca',
  },
  {
    id: '2',
    title: 'Tangier',
  },
  {
    id: '3',
    title: 'Fez',
  },
];

interface EditTypeAndLocationData {
  transactionType: string;
  propertyType: { id: string; name: string };
  zoningCategory?: string;
  address: {
    region: string;
    city: string;
    streetAddress: string;
  };
}

interface Props {
  onDataChange?: (data: EditTypeAndLocationData) => void;
  initialData?: EditTypeAndLocationData | null;
}

const EditTypeAndLocationStep = ({ onDataChange, initialData }: Props) => {
  const selectedPropertyType = initialData?.propertyType || { id: '', name: '' };
  const selectedPostedBy = initialData?.transactionType || '';
  const address = {
    region: initialData?.address.region || '',
    city: initialData?.address.city || '',
    streetAddress: initialData?.address.streetAddress || '',
  };
  const selectedZoningCategory = initialData?.zoningCategory || '';

  return (
    <div className="flex justify-center w-full bg-white pb-10 px-4 md:px-4 lg:px-6 xl:px-0">
      <div className="h-full flex flex-col gap-6 w-full min-h-screen md:min-h-fit pb-[14rem]">
        <div className="flex flex-col gap-14 md:gap-10 lg:gap-14 xl:gap-14">
          <div className="flex flex-col gap-6 md:gap-4 lg:gap-6 xl:gap-6">
            <div className="title-xl ">Choose transaction type</div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2 lg:gap-4 xl:gap-4">
                {transactionTypes.map((type) => (
                  <SelectCard
                    key={type.id}
                    title={type.title}
                    variant="pill"
                    selected={selectedPostedBy === type.variant}
                    onClick={() => {
                      if (selectedPostedBy === type.variant) {
                        return;
                      }
                      const clearedAddress = { region: '', city: '', streetAddress: '' };
                      onDataChange?.({
                        transactionType: type.variant,
                        propertyType: { id: '', name: '' },
                        zoningCategory: '',
                        address: clearedAddress,
                      });
                    }}
                  />
                ))}
              </div>
              {selectedPostedBy !== '' && (
                <div
                  className={classNames('gap-4 md:gap-2 lg:gap-3 xl:gap-4 w-full hidden md:grid', {
                    'grid-cols-2 md:grid-cols-3': selectedPostedBy === 'short-term',
                    'grid-cols-2 md:grid-cols-6':
                      selectedPostedBy === 'sale' || selectedPostedBy === 'long-term',
                  })}
                >
                  {transactionTypes
                    .find((type) => type.variant === selectedPostedBy)
                    ?.propertyTypes.map((type) => (
                      <div key={type.id} className="w-full">
                        <SelectCard
                          title={type.title}
                          Icon={type.icon}
                          variant="type"
                          selected={
                            selectedPropertyType.id !== '' && selectedPropertyType.id === type.id
                          }
                          onClick={() => {
                            if (selectedPropertyType.id === type.id) {
                              return;
                            }
                            const clearedAddress = { region: '', city: '', streetAddress: '' };
                            onDataChange?.({
                              transactionType: selectedPostedBy,
                              propertyType: { id: type.id, name: type.title },
                              zoningCategory: '',
                              address: clearedAddress,
                            });
                          }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden flex-col gap-6 md:gap-4 lg:gap-6 xl:gap-6">
            {selectedPostedBy !== '' && <div className="title-xl ">Choose property type</div>}
            {selectedPostedBy !== '' && (
              <div
                className={classNames('grid gap-4 md:gap-2 lg:gap-3 xl:gap-4 w-full', {
                  'grid-cols-2 md:grid-cols-3': selectedPostedBy === 'short-term',
                  'grid-cols-2 md:grid-cols-6':
                    selectedPostedBy === 'sale' || selectedPostedBy === 'long-term',
                })}
              >
                {transactionTypes
                  .find((type) => type.variant === selectedPostedBy)
                  ?.propertyTypes.map((type) => (
                    <div key={type.id} className="w-full">
                      <SelectCard
                        title={type.title}
                        Icon={type.icon}
                        variant="type"
                        selected={
                          selectedPropertyType.id !== '' && selectedPropertyType.id === type.id
                        }
                        onClick={() => {
                          if (selectedPropertyType.id === type.id) {
                            return;
                          }
                          const clearedAddress = { region: '', city: '', streetAddress: '' };
                          onDataChange?.({
                            transactionType: selectedPostedBy,
                            propertyType: { id: type.id, name: type.title },
                            zoningCategory: '',
                            address: clearedAddress,
                          });
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {selectedPropertyType.id !== '' &&
            (transactionTypes
              .find((type) => type.variant === selectedPostedBy)
              ?.propertyTypes.find((type) => type.id === selectedPropertyType.id)?.zoningCategories
              ?.length ?? 0) > 0 && (
              <div className="flex flex-col gap-8 md:gap-6 lg:gap-8 xl:gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <div className="title-xl">Zoning</div>
                  <div className="body-lg text-[var(--text-body-tint)]">
                    Select the zoning category
                  </div>
                </div>

                <div className="grid grid-cols-2 md:flex gap-4 md:gap-2 lg:gap-3 xl:gap-4 w-full">
                  {transactionTypes
                    .find((type) => type.variant === selectedPostedBy)
                    ?.propertyTypes.find((type) => type.id === selectedPropertyType.id)
                    ?.zoningCategories?.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => {
                          onDataChange?.({
                            transactionType: selectedPostedBy,
                            propertyType: selectedPropertyType || { id: '', name: '' },
                            zoningCategory: category.id,
                            address,
                          });
                        }}
                        className={classNames(
                          'w-full py-4 border flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer',
                          selectedZoningCategory === category.id
                            ? 'border-[var(--accent-green)] text-[var(--accent-green)]'
                            : 'border-[var(--border)] text-[var(--text-body)]',
                        )}
                      >
                        {category.title}
                      </div>
                    ))}
                </div>
              </div>
            )}

          {selectedPropertyType.id !== '' && selectedPostedBy !== '' && (
            <div className="flex flex-col gap-6 md:gap-4 lg:gap-6 xl:gap-6 w-full pb-20 md:pb-0">
              <div className="flex flex-col gap-2">
                <div className="title-xl">Location</div>
                <div className="body-lg text-[var(--text-body-tint)]">
                  Tell us about your property&apos;s location
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:gap-3 xl:gap-4 w-full">
                <InputSelect
                  options={regions.map((region) => ({
                    label: region.title,
                    value: region.title,
                  }))}
                  placeholder="Type or select region"
                  label="Region"
                  name="region"
                  required
                  isTyping
                  value={address.region}
                  onChange={(e) => {
                    const newAddress = { ...address, region: e };
                    onDataChange?.({
                      transactionType: selectedPostedBy,
                      propertyType: selectedPropertyType || { id: '', name: '' },
                      address: newAddress,
                    });
                  }}
                />
                <InputSelect
                  options={cities.map((city) => ({
                    label: city.title,
                    value: city.title,
                  }))}
                  placeholder="Type or select city"
                  label="City"
                  name="city"
                  required
                  isTyping
                  value={address.city}
                  onChange={(e) => {
                    const newAddress = { ...address, city: e };
                    onDataChange?.({
                      transactionType: selectedPostedBy,
                      propertyType: selectedPropertyType || { id: '', name: '' },
                      address: newAddress,
                    });
                  }}
                />
                <Input
                  placeholder="Enter the address"
                  label="Street Address"
                  name="address"
                  value={address.streetAddress}
                  onChange={(e) => {
                    const newAddress = { ...address, streetAddress: e.target.value };
                    onDataChange?.({
                      transactionType: selectedPostedBy,
                      propertyType: selectedPropertyType || { id: '', name: '' },
                      address: newAddress,
                    });
                  }}
                  variant="address"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTypeAndLocationStep;
