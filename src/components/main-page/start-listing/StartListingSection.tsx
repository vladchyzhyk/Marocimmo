'use client';
import { StartListingCard } from '@/components/main-page/start-listing/StartListingCard';

export const StartListingSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] pt-[110px] lg:pt-[100px]">
      <div className="w-full mx-auto mb-6">
        <h3 className="heading-h3 text-[var(--color-black)]">Start listing with Marocimmo</h3>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <StartListingCard
          title="If you are Owner"
          subtitle="Sell or rent out your property directly to potential buyers and tenants in Morocco."
          buttonLabel="Publish your property"
          imageUrl="/images/Owner.svg"
          imageAlt="If you are Owner"
          onButtonClick={() => {
            console.log('If you are Owner');
          }}
        />

        <StartListingCard
          title="If you are an Agency"
          subtitle="Publish multiple listings, build your brand visibility, and attract more clients through Marocimmo."
          buttonLabel="Publish your property"
          imageUrl="/images/Agency.svg"
          imageAlt="If you are an Agency"
          onButtonClick={() => {
            console.log('If you are an Agency');
          }}
        />
      </div>
    </section>
  );
};
