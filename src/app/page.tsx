import { AllPropertyTypes } from '@/components/main-page/all-property-types/AllPropertyTypes';
import Hero from '@/components/main-page/hero/Hero';
import PopularSearch from '@/components/main-page/popular-search/PopularSearch';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <PopularSearch />
      <AllPropertyTypes />
    </main>
  );
}
