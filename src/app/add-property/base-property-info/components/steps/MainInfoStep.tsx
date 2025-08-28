'use client';

import Input from '@/components/ui/Input';
import NumberStepper from '@/components/ui/NumberStepper';
import SelectablePill from '@/components/ui/SelectablePill';
import {} from 'react';

type Props = {
  onDataChange?: (data: MainInfoData) => void;
  onBack?: () => void;
  initialData?: Partial<MainInfoData>;
  selectedPropertyType?: { id: string; name: string };
  transactionType?: string;
};

export interface MainInfoData {
  livingArea: string;
  totalArea: string;
  floor: number;
  numberOfFloors: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  ceilingHeight: number;
  numberOfParkingSpaces: number;
  windowView: string;
  yearBuilt: string;
  condition: string;
  propertyType: string;
  renovationLevel: string;
}

const MainInfoStep = ({
  onDataChange,
  onBack,
  initialData,
  selectedPropertyType,
  transactionType,
}: Props) => {
  const formData: MainInfoData = {
    livingArea: initialData?.livingArea || '',
    totalArea: initialData?.totalArea || '',
    floor: initialData?.floor || 0,
    numberOfFloors: initialData?.numberOfFloors || 0,
    numberOfRooms: initialData?.numberOfRooms || 0,
    numberOfBathrooms: initialData?.numberOfBathrooms || 0,
    ceilingHeight: initialData?.ceilingHeight || 0,
    numberOfParkingSpaces: initialData?.numberOfParkingSpaces || 0,
    windowView: initialData?.windowView || '',
    yearBuilt: initialData?.yearBuilt || '',
    condition: initialData?.condition || '',
    propertyType: initialData?.propertyType || '',
    renovationLevel: initialData?.renovationLevel || '',
  };

  const handleInputChange = (field: keyof MainInfoData, value: string | number) => {
    const newFormData = { ...formData, [field]: value } as MainInfoData;
    onDataChange?.(newFormData);
  };

  return (
    <div className="flex justify-center w-full bg-white px-4 md:px-6 lg:px-0">
      <div className="flex flex-col gap-6 w-full max-w-[53rem]">
        <div className="flex flex-col gap-14 w-full max-w-[848px] min-h-screen md:min-h-fit scrollbar-none pb-25">
          {/* Main Property Info Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 pb-2">
              <h2 className="title-xl text-[var(--color-black)]">
                Add the main info about property
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Area Row */}

              {transactionType === 'short-term' && selectedPropertyType?.name === 'Apartment' && (
                <>
                  <div className="flex gap-4">
                    <Input
                      label="Living Area (m²)"
                      value={formData.livingArea}
                      onChange={(e) => handleInputChange('livingArea', e.target.value)}
                      placeholder="56"
                      required
                      className="flex-1"
                    />
                    <Input
                      label="Total area (m²)"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="64"
                      className="flex-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumberStepper
                      label="Max number of people"
                      value={formData.floor}
                      onChange={(value) => handleInputChange('floor', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Rooms"
                      value={formData.numberOfRooms}
                      onChange={(value) => handleInputChange('numberOfRooms', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Bathrooms"
                      value={formData.numberOfBathrooms}
                      onChange={(value) => handleInputChange('numberOfBathrooms', value)}
                      className="flex-1"
                    />
                    <div className="hidden md:block w-full bg-transparent"></div>
                    <NumberStepper
                      label="One-person beds"
                      value={formData.ceilingHeight}
                      onChange={(value) => handleInputChange('ceilingHeight', value)}
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Two-person beds"
                      value={formData.numberOfParkingSpaces}
                      onChange={(value) => handleInputChange('numberOfParkingSpaces', value)}
                      className="flex-1"
                    />
                  </div>
                </>
              )}
              {transactionType === 'long-term' && selectedPropertyType?.name === 'Office' && (
                <>
                  <div className="flex gap-4">
                    <Input
                      label="Total area (m²)"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="64"
                      required
                      className="flex-1"
                    />{' '}
                    <Input
                      label="Useful Area (m²)"
                      value={formData.livingArea}
                      onChange={(e) => handleInputChange('livingArea', e.target.value)}
                      placeholder="56"
                      className="flex-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumberStepper
                      label="Floor"
                      value={formData.floor}
                      onChange={(value) => handleInputChange('floor', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of floors"
                      value={formData.numberOfFloors}
                      onChange={(value) => handleInputChange('numberOfFloors', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Rooms"
                      value={formData.numberOfRooms}
                      onChange={(value) => handleInputChange('numberOfRooms', value)}
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Bathrooms"
                      value={formData.numberOfBathrooms}
                      onChange={(value) => handleInputChange('numberOfBathrooms', value)}
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Ceiling height"
                      value={formData.ceilingHeight}
                      onChange={(value) => handleInputChange('ceilingHeight', value)}
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of parking spaces"
                      value={formData.numberOfParkingSpaces}
                      onChange={(value) => handleInputChange('numberOfParkingSpaces', value)}
                      className="flex-1"
                    />
                  </div>
                </>
              )}
              {transactionType === 'long-term' && selectedPropertyType?.name === 'Apartment' && (
                <>
                  <div className="flex gap-4">
                    <Input
                      label="Living Area (m²)"
                      value={formData.livingArea}
                      onChange={(e) => handleInputChange('livingArea', e.target.value)}
                      placeholder="56"
                      required
                      className="flex-1"
                    />
                    <Input
                      label="Total area (m²)"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="64"
                      className="flex-1"
                    />
                  </div>

                  {/* Number Steppers Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumberStepper
                      label="Floor"
                      value={formData.floor}
                      onChange={(value) => handleInputChange('floor', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of floors"
                      value={formData.numberOfFloors}
                      onChange={(value) => handleInputChange('numberOfFloors', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Rooms"
                      value={formData.numberOfRooms}
                      onChange={(value) => handleInputChange('numberOfRooms', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Bathrooms"
                      value={formData.numberOfBathrooms}
                      onChange={(value) => handleInputChange('numberOfBathrooms', value)}
                      className="flex-1"
                    />
                  </div>
                </>
              )}
              {selectedPropertyType?.name !== 'Apartment' && transactionType === 'short-term' && (
                <>
                  <div className="flex gap-4">
                    <Input
                      label="Living Area (m²)"
                      value={formData.livingArea}
                      onChange={(e) => handleInputChange('livingArea', e.target.value)}
                      placeholder="56"
                      required
                      className="flex-1"
                    />
                    <Input
                      label="Total area (m²)"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="64"
                      className="flex-1"
                    />
                  </div>

                  {/* Number Steppers Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumberStepper
                      label="Floor"
                      value={formData.floor}
                      onChange={(value) => handleInputChange('floor', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of floors"
                      value={formData.numberOfFloors}
                      onChange={(value) => handleInputChange('numberOfFloors', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Rooms"
                      value={formData.numberOfRooms}
                      onChange={(value) => handleInputChange('numberOfRooms', value)}
                      required
                      className="flex-1"
                    />
                    <NumberStepper
                      label="Number of Bathrooms"
                      value={formData.numberOfBathrooms}
                      onChange={(value) => handleInputChange('numberOfBathrooms', value)}
                      className="flex-1"
                    />
                  </div>
                </>
              )}
              {selectedPropertyType?.name !== 'Apartment' &&
                selectedPropertyType?.name !== 'Office' &&
                transactionType === 'long-term' && (
                  <>
                    <div className="flex gap-4">
                      <Input
                        label="Living Area (m²)"
                        value={formData.livingArea}
                        onChange={(e) => handleInputChange('livingArea', e.target.value)}
                        placeholder="56"
                        required
                        className="flex-1"
                      />
                      <Input
                        label="Total area (m²)"
                        value={formData.totalArea}
                        onChange={(e) => handleInputChange('totalArea', e.target.value)}
                        placeholder="64"
                        className="flex-1"
                      />
                    </div>

                    {/* Number Steppers Row */}
                    <div className="grid grid-cols-4 gap-4">
                      <NumberStepper
                        label="Floor"
                        value={formData.floor}
                        onChange={(value) => handleInputChange('floor', value)}
                        required
                        className="flex-1"
                      />
                      <NumberStepper
                        label="Number of floors"
                        value={formData.numberOfFloors}
                        onChange={(value) => handleInputChange('numberOfFloors', value)}
                        required
                        className="flex-1"
                      />
                      <NumberStepper
                        label="Number of Rooms"
                        value={formData.numberOfRooms}
                        onChange={(value) => handleInputChange('numberOfRooms', value)}
                        required
                        className="flex-1"
                      />
                      <NumberStepper
                        label="Number of Bathrooms"
                        value={formData.numberOfBathrooms}
                        onChange={(value) => handleInputChange('numberOfBathrooms', value)}
                        className="flex-1"
                      />
                    </div>
                  </>
                )}
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="flex flex-col gap-8 md:gap-8">
            {selectedPropertyType?.name === 'Apartment' && (
              <div className="hidden md:flex flex-col gap-1 pb-2">
                <h2 className="title-xl text-[var(--color-black)]">Add more details</h2>
              </div>
            )}
            {selectedPropertyType?.name === 'Apartment' && (
              <div className="flex md:hidden flex-col gap-1 pb-2">
                <h2 className="title-xl text-[var(--color-black)]">Choose Type of property</h2>
              </div>
            )}

            {/* View from the window */}
            {transactionType === 'short-term' && selectedPropertyType?.name === 'Apartment' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                <div className="w-full md:w-[140px]">
                  <span className="title-sm text-[var(--color-black)]">View from the window</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Street View', 'Garden', 'Sea', 'Mountain', 'City View', 'Wall/Lightwell'].map(
                    (option) => (
                      <SelectablePill
                        key={option}
                        selected={formData.windowView === option}
                        onClick={() => handleInputChange('windowView', option)}
                      >
                        {option}
                      </SelectablePill>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Year Built */}
            {transactionType === 'long-term' && selectedPropertyType?.name === 'Apartment' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                <div className="w-full md:w-[140px]">
                  <span className="title-sm text-[var(--color-black)]">Year built</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Less 1 year', '1-5 year', '6-10 year', '11-20 year', '21+ year'].map(
                    (option) => (
                      <SelectablePill
                        key={option}
                        selected={formData.yearBuilt === option}
                        onClick={() => handleInputChange('yearBuilt', option)}
                      >
                        {option}
                      </SelectablePill>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Condition */}
            {transactionType === 'long-term' && selectedPropertyType?.name === 'Apartment' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                <div className="w-full md:w-[140px]">
                  <span className="title-sm text-[var(--color-black)]">Condition</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['New', 'Good', 'Renovated', 'Need renovation'].map((option) => (
                    <SelectablePill
                      key={option}
                      selected={formData.condition === option}
                      onClick={() => handleInputChange('condition', option)}
                    >
                      {option}
                    </SelectablePill>
                  ))}
                </div>
              </div>
            )}

            {/* Property Type */}
            {transactionType === 'long-term' && selectedPropertyType?.name === 'Apartment' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                <div className="w-full md:w-[140px]">
                  <span className="title-sm text-[var(--color-black)]">Property type</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Economic', 'Mid-range', 'Hight-end'].map((option) => (
                    <SelectablePill
                      key={option}
                      selected={formData.propertyType === option}
                      onClick={() => handleInputChange('propertyType', option)}
                    >
                      {option}
                    </SelectablePill>
                  ))}
                </div>
              </div>
            )}

            {/* Renovation Level */}
            {transactionType === 'long-term' && selectedPropertyType?.name === 'Apartment' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2">
                <div className="w-full md:w-[140px]">
                  <span className="title-sm text-[var(--color-black)]">Level renovation</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['No renovation', 'Cosmetic', 'Mid-level renovation', 'Premium'].map(
                    (option) => (
                      <SelectablePill
                        key={option}
                        selected={formData.renovationLevel === option}
                        onClick={() => handleInputChange('renovationLevel', option)}
                      >
                        {option}
                      </SelectablePill>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoStep;
