import Image from 'next/image';
export type RentCardProps = {
  id: string;
  label: string;
  image: string;
  className?: string;
};

export const RentCard = ({ id, label, image, className }: RentCardProps) => {
  return (
    <div
      key={id}
      className={`${className} group relative w-full h-full rounded-[8px] overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]`}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.7) 100%)',
          }}
        />
      </div>

      <div className="relative h-full flex items-start pt-4 pl-6">
        <span className="text-[24px] sm:text-[16px] md:text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--white)]">
          {label}
        </span>
      </div>
    </div>
  );
};
