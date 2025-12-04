'use client';
import Image from 'next/image';

export type AgencyCardProps = {
  label: string;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
};

export const AgencyCard = ({
  label,
  imageUrl,
  imageAlt = 'Agency',
  className = '',
}: AgencyCardProps) => {
  return (
    <div
      className={`relative flex-shrink-0 w-[200px] h-[200px] overflow-hidden border border-[#DEDEDE] rounded-[8px] ${className}`}
    >
      <div className="absolute inset-0 w-full h-full">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="200px" />
      </div>
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="body-sm text-white">{label}</p>
      </div>
    </div>
  );
};
