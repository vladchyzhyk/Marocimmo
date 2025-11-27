import Image from 'next/image';
import { CheckIcon2, FilterIcon2, NotificationIcon, UsersIcon2 } from '@/utils/icons';
import { FeatureCard } from './FeatureCard';

const FEATURES = [
  {
    id: 1,
    title: 'All property types in one place',
    icon: <CheckIcon2 />,
  },
  {
    id: 2,
    title: 'Filters that match real needs',
    icon: <FilterIcon2 className="text-[var(--accent-green)]" />,
  },
  {
    id: 3,
    title: 'Direct contact with owners & agencies',
    icon: <UsersIcon2 className="text-[var(--accent-green)]" />,
  },
  {
    id: 4,
    title: 'Alerts for saved searches',
    icon: <NotificationIcon className="text-[var(--accent-green)]" />,
  },
];

export const Marocimmo = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] pt-[110px] lg:pt-[100px]">
      <div className="w-full mx-auto flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
          <h3 className="heading-h3 text-[var(--color-black)] lg:w-1/2">
            Marocimmo is a real estate search platform in Morocco.
          </h3>
          <p className="body-lg text-[var(--color-black)] lg:w-[40%] hidden lg:block">
            We gather property listings for sale and rent from owners and agencies, and provide our
            users with an easy-to-use interface to explore all offers in one place.
          </p>
        </div>

        <div className="flex flex-col  lg:flex-row gap-6 lg:gap-8 xl:gap-12 lg:items-stretch">
          <div className="w-full lg:w-1/2 flex h-[170px] sm:h-[370px]">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
              <Image
                src="/images/Apartments.svg"
                alt="Apartments"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex">
            <div className="grid grid-cols-2 gap-4 w-full auto-rows-fr">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.id} title={feature.title} icon={feature.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
