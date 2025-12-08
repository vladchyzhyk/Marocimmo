'use client';

import { ScrollableContainer } from '@/components/ui/ScrollableContainer';
import { SimilarProperty } from '@/types/propery-details';
import { PropertyCardCompact } from '../property-card/PropertyCardCompact';
import { getPropertyIcons } from '@/utils/getPropertyIcons';

const PropertyIcons = ({ property }: { property: SimilarProperty }) =>
  getPropertyIcons({
    propertyType: property.propertyType,
    area: property.area,
    location: property.location.fullAddress,
    bedrooms: property.rooms,
    bathrooms: property.bathrooms,
  });

export const SimilarProperties = ({ properties }: { properties: SimilarProperty[] }) => {
  return (
    <section className="">
      <ScrollableContainer
        title="Similar properties"
        scrollAmount={450 + 16}
        className="flex flex-col gap-4"
        titleClassName="title-lg text-[var(--color-black)]"
      >
        {properties.map((property) => (
          <PropertyCardCompact
            key={property.id}
            title={property.title}
            price={property.price}
            propertyType={property.propertyType}
            location={property.location.fullAddress}
            images={[property.mainImage]}
            pricePerPeriod={property.pricePeriod}
            isFavorite={property.isFavorite}
            onFavoriteClick={() => {}}
            onShareClick={() => {}}
            url={property.url}
            currency={property.currency}
            propertyIcons={<PropertyIcons property={property} />}
            className="flex-shrink-0 w-full min-w-[280px] md:min-w-[450px]"
          />
        ))}
      </ScrollableContainer>
    </section>
  );
};
