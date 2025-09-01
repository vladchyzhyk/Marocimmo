'use client';

import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProgressBar from './components/ProgressBar'
import FeaturesStep from './components/steps/FeaturesStep'
import MainInfoStep, { MainInfoData } from './components/steps/MainInfoStep'
import PhotosStep from './components/steps/PhotosStep'
import PricingStep from './components/steps/PricingStep'
import TypeAndLocationStep from './components/steps/TypeAndLocationStep'

interface TypeAndLocationData {
  transactionType: string;
  propertyType: { id: string; name: string };
  zoningCategory?: string;
  address: {
    region: string;
    city: string;
    streetAddress: string;
  };
}

interface PhotosData {
  photos: Array<{
    id: string;
    file: File;
    previewUrl: string;
  }>;
}

interface PricingData {
  price: string;
  pricePeriod: 'per month' | 'per week';
  syndicFees: string;
  syndicFeesPeriod: 'per month' | 'per week';
  deposit: string;
  availableFrom: string;
  petsAllowed: boolean;
  smokeAllowed: boolean;
  listingTitle: string;
  description: string;
}

interface PropertyFormData {
  typeAndLocation: TypeAndLocationData | null;
  mainInfo: MainInfoData | null;
  features: string[];
  photos: PhotosData | null;
  pricing: PricingData | null;
}

const Page = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    typeAndLocation: null,
    mainInfo: null,
    features: [],
    photos: null,
    pricing: null,
  });
  const [isFeatureCreatedModalOpen, setIsFeatureCreatedModalOpen] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedStep]);

  const steps = [
    { id: '1', title: 'Type & Location' },
    { id: '2', title: 'Main info' },
    { id: '3', title: 'Features' },
    { id: '4', title: 'Photos' },
    { id: '5', title: 'Pricing' },
  ];

  const updateTypeAndLocation = (data: TypeAndLocationData) => {
    setFormData((prev) => {
      const prevTransaction = prev.typeAndLocation?.transactionType;
      const prevPropertyName = prev.typeAndLocation?.propertyType?.name;
      const nextTransaction = data?.transactionType;
      const nextPropertyName = data?.propertyType?.name;

      const hasTypeChanged = prevTransaction !== nextTransaction;
      const hasPropertyChanged = prevPropertyName !== nextPropertyName;

      return {
        ...prev,
        typeAndLocation: {
          ...data,
          address:
            hasTypeChanged || hasPropertyChanged
              ? { region: '', city: '', streetAddress: '' }
              : data.address,
          zoningCategory: hasTypeChanged || hasPropertyChanged ? '' : data.zoningCategory,
        },
        // Clear dependent step data when upstream selection changes
        mainInfo: hasTypeChanged || hasPropertyChanged ? null : prev.mainInfo,
      };
    });
  };

  const updateMainInfo = (data: MainInfoData) => {
    setFormData((prev) => ({ ...prev, mainInfo: data }));
  };

  const updateFeatures = (features: string[]) => {
    setFormData((prev) => ({ ...prev, features }));
  };

  const updatePhotos = (data: PhotosData) => {
    setFormData((prev) => ({ ...prev, photos: data }));
  };

  const updatePricing = (data: PricingData) => {
    setFormData((prev) => ({ ...prev, pricing: data }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.typeAndLocation?.transactionType &&
          formData.typeAndLocation?.propertyType &&
          formData.typeAndLocation?.address.region &&
          formData.typeAndLocation?.address.city
        );
      case 2: {
        const transactionType = formData.typeAndLocation?.transactionType;
        const propertyName = formData.typeAndLocation?.propertyType?.name;
        const mi = formData.mainInfo;
        if (!mi) return false;

        // Short-term + Apartment
        if (transactionType === 'short-term' && propertyName === 'Apartment') {
          return !!(
            mi.livingArea &&
            mi.floor !== 0 && // Max number of people
            mi.numberOfRooms !== 0 &&
            mi.windowView
          );
        }

        // Long-term + Office
        if (transactionType === 'long-term' && propertyName === 'Office') {
          return !!(mi.totalArea && mi.floor !== 0 && mi.numberOfFloors !== 0);
        }

        // Long-term + Apartment
        if (transactionType === 'long-term' && propertyName === 'Apartment') {
          return !!(
            mi.livingArea &&
            mi.floor !== 0 &&
            mi.numberOfFloors !== 0 &&
            mi.numberOfRooms !== 0 &&
            mi.yearBuilt &&
            mi.condition &&
            mi.propertyType &&
            mi.renovationLevel
          );
        }

        // Short-term + non-Apartment
        if (transactionType === 'short-term' && propertyName !== 'Apartment') {
          return !!(
            mi.livingArea &&
            mi.floor !== 0 &&
            mi.numberOfFloors !== 0 &&
            mi.numberOfRooms !== 0
          );
        }

        // Long-term + not Apartment/Office
        if (
          transactionType === 'long-term' &&
          propertyName !== 'Apartment' &&
          propertyName !== 'Office'
        ) {
          return !!(
            mi.livingArea &&
            mi.floor !== 0 &&
            mi.numberOfFloors !== 0 &&
            mi.numberOfRooms !== 0
          );
        }

        return false;
      }
      case 3:
        return formData.features.length > 0;
      case 4:
        return !!(formData.photos && formData.photos.photos.length >= 3);
      case 5:
        return !!(
          formData.pricing?.price &&
          formData.pricing?.availableFrom &&
          formData.pricing?.listingTitle &&
          formData.pricing?.description &&
          formData.pricing.listingTitle.trim().length >= 10 &&
          formData.pricing.description.trim().length >= 10
        );
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (selectedStep < 5) {
      setSelectedStep(selectedStep + 1);
    } else {
      setIsFeatureCreatedModalOpen(true);
    }
  };

  const handleBack = () => {
    setSelectedStep(selectedStep - 1);
  };

  const renderCurrentStep = () => {
    switch (selectedStep) {
      case 1:
        return (
          <TypeAndLocationStep
            onDataChange={updateTypeAndLocation}
            initialData={formData.typeAndLocation}
          />
        );
      case 2:
        return (
          <MainInfoStep
            onDataChange={updateMainInfo}
            onBack={handleBack}
            initialData={formData.mainInfo || undefined}
            selectedPropertyType={formData.typeAndLocation?.propertyType}
            transactionType={formData.typeAndLocation?.transactionType}
          />
        );
      case 3:
        return (
          <FeaturesStep
            onDataChange={updateFeatures}
            onBack={handleBack}
            initialFeatures={formData.features}
          />
        );
      case 4:
        return <PhotosStep onDataChange={updatePhotos} initialData={formData.photos} />;
      case 5:
        return (
          <PricingStep
            onDataChange={updatePricing}
            onBack={handleBack}
            initialValues={formData.pricing || undefined}
          />
        );
      default:
        return <div>Step {selectedStep}</div>;
    }
  };

  return (
    <div className="flex justify-center w-full bg-white mt-12">
      <div
        className={classNames(
          `flex flex-col gap-6 w-full mt-[2rem]`,
          selectedStep === 4 ? '' : 'md:max-w-[50rem] lg:max-w-[51rem] xl:max-w-[53rem]',
        )}
      >
        <div
          className={classNames(
            'hidden md:block w-full mx-auto px-4 md:px-6 lg:px-0',
            selectedStep === 4 ? 'md:max-w-[50rem] lg:max-w-[51rem] xl:max-w-[53rem]' : '',
          )}
        >
          <ProgressBar steps={steps} currentStep={selectedStep} />
        </div>

        <div className="flex flex-col gap-3 mt-[2rem]">{renderCurrentStep()}</div>
        {selectedStep && (
          <Footer
            currentStep={selectedStep}
            allSteps={steps.length}
            onContinue={handleContinue}
            onBack={selectedStep > 1 ? handleBack : undefined}
            disabled={!isStepValid(selectedStep)}
          />
        )}
      </div>
      <Modal
        isOpen={isFeatureCreatedModalOpen}
        onClose={() => setIsFeatureCreatedModalOpen(false)}
        title="Your property has been created!"
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        textCenter
        actionChildren={
          <Button
            onClick={() => {
              setIsFeatureCreatedModalOpen(false);
            }}
            variant="primary"
          >
            <Link href="/">Return</Link>
          </Button>
        }
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="body-md text-[var(--color-black)]">
            &ldquo;Property name&rdquo; is now under review.
          </p>
          <p className="text-center body-md text-[var(--color-black)]">
            You&apos;ll get a notification as soon as it&apos;s approved and visible in search.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
