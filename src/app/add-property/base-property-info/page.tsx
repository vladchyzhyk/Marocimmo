'use client';

import Footer from '@/components/Footer';
import { LocationSuggestion } from '@/components/ui/LocationDropdown';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import FeaturesStep from './components/steps/FeaturesStep';
import MainInfoStep, { MainInfoData } from './components/steps/MainInfoStep';
import TypeAndLocationStep from './components/steps/TypeAndLocationStep';

const Page = () => {
  const router = useRouter();
  const [selectedPostedBy, setSelectedPostedBy] = useState('');
  const [logoLoading, setLogoLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [mainInfoData, setMainInfoData] = useState<MainInfoData | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const steps = [
    { id: '1', title: 'Type & Location' },
    { id: '2', title: 'Main info' },
    { id: '3', title: 'Features' },
    { id: '4', title: 'Photos' },
    { id: '5', title: 'Pricing' },
  ];

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
    setSelectedStep(selectedStep + 1);
  };

  const handleMainInfoNext = (data: MainInfoData) => {
    setMainInfoData(data);
    setSelectedStep(3);
  };

  const handleFeaturesNext = (features: string[]) => {
    setSelectedFeatures(features);
    setSelectedStep(4);
  };

  const handleBack = () => {
    setSelectedStep(selectedStep - 1);
  };

  const renderCurrentStep = () => {
    switch (selectedStep) {
      case 1:
        return <TypeAndLocationStep />;
      case 2:
        return (
          <MainInfoStep
            onNext={handleMainInfoNext}
            onBack={handleBack}
            initialData={mainInfoData || undefined}
          />
        );
      case 3:
        return (
          <FeaturesStep
            onNext={handleFeaturesNext}
            onBack={handleBack}
            initialFeatures={selectedFeatures}
          />
        );
      default:
        return <div>Step {selectedStep}</div>;
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-full bg-gray-50 pb-10">
      <div className="flex flex-col gap-6 w-full max-w-[53rem] mt-[2rem]">
        <ProgressBar steps={steps} currentStep={selectedStep} />

        <div className="flex flex-col gap-3">{renderCurrentStep()}</div>
        {selectedStep && (
          <Footer
            onContinue={handleContinue}
            loading={footerLoading}
            onBack={selectedStep > 1 ? handleBack : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
