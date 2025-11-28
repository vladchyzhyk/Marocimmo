import { Rooms, SquareMeters, BathtubIcon } from '@/utils/icons';

interface HousePropertyIconsProps {
  rooms?: number;
  area: number;
  bathrooms?: number;
}

export const HousePropertyIcons = ({ rooms, area, bathrooms }: HousePropertyIconsProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
      {rooms !== undefined && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <Rooms className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{rooms}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <SquareMeters className="w-5 h-5" />
        </div>
        <span className="body-md text-[var(--color-black)]">{area}m²</span>
      </div>
      {bathrooms !== undefined && bathrooms > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <BathtubIcon className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{bathrooms}</span>
        </div>
      )}
    </div>
  );
};
