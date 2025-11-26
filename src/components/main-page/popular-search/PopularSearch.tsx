'use client';
import { POPULAR_SEARCH_CARDS, GRID_AREA_CLASSES } from '@/utils/constants';
import { RentCard } from './RentCard';

export default function PopularSearch() {
  return (
    <section className="w-full pt-[110px] md:pt-[100px]  px-4 sm:px-6 md:px-8 lg:px-[80px]">
      <div className="w-full mx-auto">
        <h3 className="heading-h3 text-[var(--color-black)]  mb-6 md:mb-8 lg:mb-10">
          Popular search
        </h3>

        <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full h-[500px] sm:h-[600px] md:h-[600px] lg:h-[350px] lg:grid-cols-4 lg:grid-rows-2 ">
          {POPULAR_SEARCH_CARDS.map((card, index) => {
            return (
              <RentCard
                key={card.id}
                id={card.id}
                label={card.label}
                image={card.image}
                className={GRID_AREA_CLASSES[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
