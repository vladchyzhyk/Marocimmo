import { Suspense } from 'react';
import { AgenciesSection } from '@/components/main-page/agencies/AgenciesSection';
import { AllPropertyTypes } from '@/components/main-page/all-property-types/AllPropertyTypes';
import Hero from '@/components/main-page/hero/Hero';
import { Marocimmo } from '@/components/main-page/marocimmo-section/Marocimmo';
import { PopularCities } from '@/components/main-page/popular-cities/PopularCities';
import PopularSearch from '@/components/main-page/popular-search/PopularSearch';
import { StartListingSection } from '@/components/main-page/start-listing/StartListingSection';
import MainFooter from '@/components/MainFooter';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <PopularSearch />
      <AllPropertyTypes />
      <PopularCities />
      <Marocimmo />
      <StartListingSection />
      <AgenciesSection />
      <Suspense fallback={null}>
        <MainFooter />
      </Suspense>
    </main>
  );
}
