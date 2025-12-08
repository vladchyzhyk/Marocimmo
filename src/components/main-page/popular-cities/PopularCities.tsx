'use client';

import { CityCard } from './CityCard';
import { POPULAR_CITIES } from '@/utils/constants';
import { ScrollableContainer } from '@/components/ui/ScrollableContainer';

export const PopularCities = () => {
  return (
    <section className="w-full pt-[110px] md:pt-[100px] px-4 sm:px-6 md:px-8 lg:px-[80px]">
      <div className="w-full mx-auto">
        <ScrollableContainer
          className="flex flex-col gap-6 lg:gap-8"
          title="Browse properties in the popular cities"
          scrollAmount={307 + 16}
        >
          {POPULAR_CITIES.map((city) => (
            <CityCard
              key={city.id}
              id={city.id}
              name={city.name}
              region={city.region}
              image={city.image}
            />
          ))}
        </ScrollableContainer>
      </div>
    </section>
  );
};
