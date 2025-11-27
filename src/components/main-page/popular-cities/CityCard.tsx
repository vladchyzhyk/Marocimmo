import Image from 'next/image';

export type CityCardProps = {
  id: string;
  name: string;
  region: string;
  image: string;
};

export const CityCard = ({ id, name, region, image }: CityCardProps) => {
  return (
    <div
      className="group relative flex-shrink-0 w-[307px] h-[256px] rounded-[8px] overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      tabIndex={0}
      role="button"
      aria-label={`${name}, ${region}`}
      id={id}
    >
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={name} fill className="object-cover" sizes="307px" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.75) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-start justify-end pb-4 pl-4 pr-4 gap-[2px]">
        <span className="title-xl text-[var(--white)]">{name}</span>
        <span className="body-md opacity-90 text-[var(--white)]">{region}</span>
      </div>
    </div>
  );
};
