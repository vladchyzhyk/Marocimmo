'use client';

import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditSidebar from './components/EditSidebar';
import EditFeaturesStep from './components/steps/EditFeaturesStep';
import EditMainInfoStep from './components/steps/EditMainInfoStep';
import EditPhotosStep from './components/steps/EditPhotosStep';
import EditPricingStep from './components/steps/EditPricingStep';
import EditTypeAndLocationStep from './components/steps/EditTypeAndLocationStep';

const steps = [
  {
    title: 'Type & Location',
    number: 1,
  },
  {
    title: 'Main Info',
    number: 2,
  },
  {
    title: 'Features',
    number: 3,
  },
  {
    title: 'Photos',
    number: 4,
  },
  {
    title: 'Pricing',
    number: 5,
  },
];

const Page = () => {
  // Local types to keep this file well-typed without exporting from step files
  const router = useRouter();
  type PricingPeriod = 'per month' | 'per week';
  type SelectedPhoto = { id: string; file: File; previewUrl: string };
  type TypeAndLocation = {
    transactionType: string;
    propertyType: { id: string; name: string };
    zoningCategory?: string;
    address: { region: string; city: string; streetAddress: string };
  };
  type MainInfo = {
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
  };
  type FormState = {
    typeAndLocation: TypeAndLocation;
    mainInfo: MainInfo;
    features: string[];
    photos: { photos: SelectedPhoto[] };
    pricing: {
      price: string;
      pricePeriod: PricingPeriod;
      syndicFees: string;
      syndicFeesPeriod: PricingPeriod;
      deposit: string;
      availableFrom: string;
      petsAllowed: boolean;
      smokeAllowed: boolean;
      listingTitle: string;
      description: string;
    };
  };

  // Centralized mock state for the whole edit flow
  const [formState, setFormState] = useState<FormState>({
    typeAndLocation: {
      transactionType: 'long-term',
      propertyType: { id: '1', name: 'Apartment' },
      zoningCategory: '',
      address: { region: 'Casablanca', city: 'Casablanca', streetAddress: '123 Ocean Ave' },
    },
    mainInfo: {
      livingArea: '56',
      totalArea: '64',
      floor: 3,
      numberOfFloors: 10,
      numberOfRooms: 3,
      numberOfBathrooms: 1,
      ceilingHeight: 3,
      numberOfParkingSpaces: 1,
      windowView: 'City View',
      yearBuilt: '1-5 year',
      condition: 'Good',
      propertyType: 'Mid-range',
      renovationLevel: 'Cosmetic',
    },
    features: ['wifi', 'tv', 'equipped_kitchen'],
    photos: {
      photos: [],
    },
    pricing: {
      price: '12000',
      pricePeriod: 'per month',
      syndicFees: '0',
      syndicFeesPeriod: 'per month',
      deposit: '1_month',
      availableFrom: '',
      petsAllowed: false,
      smokeAllowed: false,
      listingTitle: 'Bright apartment near the sea',
      description: 'Cozy and bright apartment close to the sea and amenities.',
    },
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const goNext = () => {
    setCurrentStepIndex((i) => {
      if (i === steps.length - 1) {
        setIsModalOpen(true);
        return i;
      }
      return Math.min(i + 1, steps.length - 1);
    });
  };
  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push('/my-listings');
    } else {
      setCurrentStepIndex((i) => Math.max(i - 1, 0));
    }
  };

  const renderCurrentStep = () => {
    const current = steps[currentStepIndex];
    switch (current.number) {
      case steps[0].number:
        return (
          <EditTypeAndLocationStep
            initialData={formState.typeAndLocation}
            onDataChange={(data) =>
              setFormState((s) => ({
                ...s,
                typeAndLocation: data,
              }))
            }
          />
        );
      case steps[1].number:
        return (
          <EditMainInfoStep
            initialData={formState.mainInfo}
            selectedPropertyType={formState.typeAndLocation.propertyType}
            transactionType={formState.typeAndLocation.transactionType}
            onDataChange={(data) =>
              setFormState((s) => ({
                ...s,
                mainInfo: data,
              }))
            }
          />
        );
      case steps[2].number:
        return (
          <EditFeaturesStep
            initialFeatures={formState.features}
            onDataChange={(selected) =>
              setFormState((s) => ({
                ...s,
                features: selected,
              }))
            }
          />
        );
      case steps[3].number:
        return (
          <EditPhotosStep
            initialData={formState.photos}
            onDataChange={(data) =>
              setFormState((s) => ({
                ...s,
                photos: data,
              }))
            }
          />
        );
      case steps[4].number:
        return (
          <EditPricingStep
            initialValues={formState.pricing}
            onDataChange={(values) =>
              setFormState((s) => ({
                ...s,
                pricing: { ...s.pricing, ...values },
              }))
            }
          />
        );
    }
  };

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-8 mx-auto mt-[7rem]">
      <div>
        <h1 className="title-xl">Edit Property</h1>
        <p className="body-md">Update your property details</p>
      </div>
      <div className="flex gap-[3.375rem]">
        <div className="w-full max-w-[19.375rem]">
          <EditSidebar
            currentStep={currentStepIndex}
            steps={steps}
            setCurrentStep={setCurrentStepIndex}
          />
        </div>
        <div className="w-full">
          {renderCurrentStep()}
          <Footer
            type="edit"
            currentStep={currentStepIndex}
            allSteps={steps.length}
            onContinue={goNext}
            onBack={goBack}
            // disabled={!isStepValid(currentStepIndex)}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Changes saved successfully!"
        textCenter
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        actionChildren={
          <Button variant="primary" onClick={() => router.push('/my-listings')}>
            Continue
          </Button>
        }
      >
        <div className="flex flex-col items-center justify-center text-center gap-4 pb-6">
          <p>“[Property name]” has been updated and is now under review again</p>
          <p>You’ll get a notification once it’s approved and visible in search</p>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
