'use client';
import Image from 'next/image';
import Button from '../../ui/Button';

export type StartListingCardProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  imageUrl: string;
  imageAlt?: string;
  onButtonClick?: () => void;
  className?: string;
};

export const StartListingCard = ({
  title,
  subtitle,
  buttonLabel,
  imageUrl,
  imageAlt = 'Owner',
  onButtonClick,
  className = '',
}: StartListingCardProps) => {
  return (
    <div
      className={`flex flex-col md:flex-col lg:flex-row gap-6 p-6 rounded-[8px] bg-[#F3F4F6] ${className}`}
    >
      <div className="relative shrink-0 w-full md:w-full h-[311px]  lg:w-[156px] lg:h-[156px] rounded-[8px] overflow-hidden bg-[var(--bg-tint)]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-fill"
          sizes="(max-width: 1024px) 100vw, 156px"
        />
      </div>

      <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">
        <div className="flex flex-col gap-2">
          <h3 className="title-lg text-[var(--color-black)]">{title}</h3>
          <p className="body-lg text-[var(--color-black)]">{subtitle}</p>
        </div>

        <div className="w-full md:w-full lg:w-[207px]">
          <Button label={buttonLabel} onClick={onButtonClick} variant="primary" fullWidth={true} />
        </div>
      </div>
    </div>
  );
};
