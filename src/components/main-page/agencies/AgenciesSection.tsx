import { MOCK_AGENCIES } from '@/utils/constants';
import { AgencyCard } from './AgencyCard';

export const AgenciesSection = () => {
  return (
    <section className="w-full pt-[110px] md:pt-[100px] px-4 sm:px-6 md:px-8 lg:px-[80px] pb-[200px] lg:pb-[350px]">
      <div className="w-full mx-auto">
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h3 className="heading-h3 text-[var(--color-black)]">Agencies</h3>
        </div>

        <div
          className="flex gap-4 overflow-x-auto scrollbar-none -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-[80px] px-4 sm:px-6 md:px-8 lg:px-[80px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_AGENCIES.map((agency) => (
            <AgencyCard key={agency.id} label={agency.label} imageUrl={agency.image} />
          ))}
        </div>
      </div>
    </section>
  );
};
