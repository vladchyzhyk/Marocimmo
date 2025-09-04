'use client';

import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { ArrowNextIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditSidebar from './components/EditSidebar';
import ErrorMessageCard from './components/ErrorMessageCard';
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
    setIsModalOpen(true);
  };
  const goBack = () => {
    if (currentStepIndex === 0) {
      router.push('/my-listings');
    } else {
      setCurrentStepIndex((i) => Math.max(i - 1, 0));
    }
  };

  const isStepValid = (stepIndex: number): boolean => {
    const stepNumber = steps[stepIndex]?.number;
    switch (stepNumber) {
      case 1:
        return !!(
          formState.typeAndLocation?.transactionType &&
          formState.typeAndLocation?.propertyType &&
          formState.typeAndLocation?.address.region &&
          formState.typeAndLocation?.address.city
        );
      case 2: {
        const transactionType = formState.typeAndLocation?.transactionType;
        const propertyName = formState.typeAndLocation?.propertyType?.name;
        const mi = formState.mainInfo;
        if (!mi) return false;

        // Short-term + Apartment
        if (transactionType === 'short-term' && propertyName === 'Apartment') {
          return !!(mi.livingArea && mi.floor !== 0 && mi.numberOfRooms !== 0 && mi.windowView);
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
        return formState.features.length > 0;
      case 4:
        return !!(formState.photos && formState.photos.photos.length >= 3);
      case 5:
        return !!(
          formState.pricing?.price &&
          formState.pricing?.listingTitle &&
          formState.pricing?.description &&
          formState.pricing.listingTitle.trim().length >= 10 &&
          formState.pricing.description.trim().length >= 10
        );
      default:
        return false;
    }
  };

  const getErrorTitleForStepIndex = (stepIndex: number): string | null => {
    const stepNumber = steps[stepIndex]?.number;
    switch (stepNumber) {
      case 1:
        return 'Please complete Type & Location details';
      case 2:
        return 'Please complete the Main Info for your property';
      case 3:
        return 'Please select at least one feature';
      case 4:
        return 'Photos don’t reflect the real property. Please upload correct ones';
      case 5:
        return 'Please complete Pricing and Availability details';
      default:
        return null;
    }
  };

  const getFirstErrorTitle = (): string | null => {
    for (let i = 0; i < steps.length; i += 1) {
      if (!isStepValid(i)) {
        return getErrorTitleForStepIndex(i);
      }
    }
    return null;
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
      <div className="hidden md:flex justify-between md:px-4 lg:px-6 xl:px-0">
        <div className="flex flex-col gap-2">
          <h1 className="title-xl">Edit Property</h1>
          <p className="body-md">Update your property details</p>
        </div>
        <div className="w-full md:max-w-[70%] lg:max-w-[70%] xl:max-w-[53rem]">
          {getFirstErrorTitle() && <ErrorMessageCard title={getFirstErrorTitle() as string} />}
        </div>
      </div>
      <div className="flex md:hidden justify-between px-4">
        <Button
          variant="outline"
          className="!text-[var(--color-black)] max-w-fit rounded-lg !px-2.75"
          size="md"
          fullWidth={false}
          onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
          disabled={currentStepIndex === 0}
        >
          <ArrowNextIcon className="w-4 h-4 rotate-180" />
        </Button>
        <div className="flex flex-col items-center gap-2">
          <h1 className="label-md-medium text-[var(--accent-green)]">
            Step {currentStepIndex + 1}/{steps.length}
          </h1>
          <p className="label-lg-medium">{steps[currentStepIndex].title}</p>
        </div>
        <Button
          variant="outline"
          className="!text-[var(--color-black)] max-w-fit rounded-lg !px-2.75"
          size="md"
          fullWidth={false}
          onClick={() => setCurrentStepIndex((p) => Math.min(steps.length - 1, p + 1))}
          disabled={currentStepIndex === steps.length - 1}
        >
          <ArrowNextIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-10 xl:gap-[3.375rem]">
        <div className="hidden md:block w-full md:max-w-[14.375rem] lg:max-w-[17.375rem] xl:max-w-[19.375rem] md:pl-4 lg:pl-6 xl:pl-0">
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
            disabled={!isStepValid(currentStepIndex)}
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
