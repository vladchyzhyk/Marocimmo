import Hero from '@/components/main-page/Hero';
import PopularSearch from '@/components/main-page/popular-search/PopularSearch';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <PopularSearch />
    </main>
  );
}
