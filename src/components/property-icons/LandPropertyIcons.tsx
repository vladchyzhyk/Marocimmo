import { SquareMeters } from '@/utils/icons';

interface LandPropertyIconsProps {
  area: number;
  location: string;
}

export const LandPropertyIcons = ({ area, location }: LandPropertyIconsProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <SquareMeters className="w-5 h-5" />
        </div>
        <span className="body-md text-[var(--color-black)]">{area}m²</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="body-md text-[var(--color-black)]">{location}</span>
      </div>
    </div>
  );
};
