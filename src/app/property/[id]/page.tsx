import ImageCarousel from '@/components/property-details/ImageCarousel';
import PropertyDescription from '@/components/property-details/PropertyDescription';
import PropertyHeader from '@/components/property-details/PropertyHeader';
import PropertyDetailsSection from '@/components/property-details/PropertyDetailsSection';
import { Contacts } from '@/components/property-details/Contacts';
import { mockPropertyDetail } from '@/utils/mockPropertyDetail';
import AvailableFrom from '@/components/property-details/AvailableFrom';
import Amenities from '@/components/property-details/Amenities';

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="pt-8 border-b border-[var(--border)] pb-8">{children}</div>;
};

export default function PropertyPage() {
  return (
    <div className="pt-[80px] px-0 md:px-4 lg:px-[80px]">
      <ImageCarousel images={mockPropertyDetail.photos} />
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6">
        <div className="">
          <ContentContainer>
            <PropertyHeader property={mockPropertyDetail} />
          </ContentContainer>
          <ContentContainer>
            <PropertyDescription description={mockPropertyDetail.description} previewLength={400} />
          </ContentContainer>

          <ContentContainer>
            <PropertyDetailsSection
              details={mockPropertyDetail.details}
              building={mockPropertyDetail.building}
              specialConditions={mockPropertyDetail.specialConditions}
            />
          </ContentContainer>

          <ContentContainer>
            <Amenities amenities={mockPropertyDetail.amenities} visibleCount={8} />
          </ContentContainer>
        </div>

        <div className="w-full pt-8 flex flex-col gap-8">
          <AvailableFrom date={mockPropertyDetail.pricing.availableFrom} />
          <Contacts
            agent={mockPropertyDetail.agent}
            similarProperties={mockPropertyDetail.similarProperties}
          />
        </div>
      </div>
    </div>
  );
}
