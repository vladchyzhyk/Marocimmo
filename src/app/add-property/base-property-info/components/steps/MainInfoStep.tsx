'use client';

import Footer from '@/components/Footer';
import Input from '@/components/ui/Input';
import NumberStepper from '@/components/ui/NumberStepper';
import SelectablePill from '@/components/ui/SelectablePill';
import { useState } from 'react';

type Props = {
  onNext?: (data: MainInfoData) => void;
  onBack?: () => void;
  initialData?: Partial<MainInfoData>;
};

export interface MainInfoData {
  livingArea: string;
  totalArea: string;
  floor: number;
  numberOfFloors: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  yearBuilt: string;
  condition: string;
  propertyType: string;
  renovationLevel: string;
}

const MainInfoStep = ({ onNext, onBack, initialData }: Props) => {
  const [formData, setFormData] = useState<MainInfoData>({
    livingArea: initialData?.livingArea || '',
    totalArea: initialData?.totalArea || '',
    floor: initialData?.floor || 0,
    numberOfFloors: initialData?.numberOfFloors || 0,
    numberOfRooms: initialData?.numberOfRooms || 2,
    numberOfBathrooms: initialData?.numberOfBathrooms || 0,
    yearBuilt: initialData?.yearBuilt || '',
    condition: initialData?.condition || '',
    propertyType: initialData?.propertyType || '',
    renovationLevel: initialData?.renovationLevel || '',
  });
  const [footerLoading, setFooterLoading] = useState(false);

  const handleInputChange = (field: keyof MainInfoData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setFooterLoading(true);
    // Simulate loading
    setTimeout(() => {
      setFooterLoading(false);
      onNext?.(formData);
    }, 1000);
  };

  return (
    <div className="flex justify-center min-h-screen w-full bg-gray-50 pb-10">
      <div className="flex flex-col gap-6 w-full max-w-[53rem] mt-[2rem]">
        <div className="flex flex-col gap-14 w-full max-w-[847px]">
          {/* Main Property Info Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 pb-2">
              <h2 className="title-xl text-[var(--color-black)]">
                Add the main info about property
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Area Row */}
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
              <div className="flex gap-4">
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
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 pb-2">
              <h2 className="title-xl text-[var(--color-black)]">Add more details</h2>
            </div>

            {/* Year Built */}
            <div className="flex items-center gap-2">
              <div className="w-[140px]">
                <span className="title-sm text-[var(--color-black)]">Year built</span>
              </div>
              <div className="flex gap-2">
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

            {/* Condition */}
            <div className="flex items-center gap-2">
              <div className="w-[140px]">
                <span className="title-sm text-[var(--color-black)]">Condition</span>
              </div>
              <div className="flex gap-2">
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

            {/* Property Type */}
            <div className="flex items-center gap-2">
              <div className="w-[140px]">
                <span className="title-sm text-[var(--color-black)]">Property type</span>
              </div>
              <div className="flex gap-2">
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

            {/* Renovation Level */}
            <div className="flex items-center gap-2">
              <div className="w-[140px]">
                <span className="title-sm text-[var(--color-black)]">Level renovation</span>
              </div>
              <div className="flex gap-2">
                {['No renovation', 'Cosmetic', 'Mid-level renovation', 'Premium'].map((option) => (
                  <SelectablePill
                    key={option}
                    selected={formData.renovationLevel === option}
                    onClick={() => handleInputChange('renovationLevel', option)}
                  >
                    {option}
                  </SelectablePill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onContinue={handleNext} loading={footerLoading} />
    </div>
  );
};

export default MainInfoStep;
