import { Rooms, SquareMeters, BathtubIcon, LocationIcon } from '@/utils/icons';

interface HousePropertyIconsProps {
  rooms?: number;
  area: number;
  bathrooms?: number;
  location?: string;
  compact?: boolean;
}

export const HousePropertyIcons = ({
  rooms,
  area,
  bathrooms,
  location,
  compact = false,
}: HousePropertyIconsProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
      {rooms !== undefined && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <Rooms className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">
            {compact ? rooms : `${rooms} rooms`}
          </span>
        </div>
      )}
      {bathrooms !== undefined && bathrooms > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <BathtubIcon className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">
            {compact ? bathrooms : `${bathrooms} bathrooms`}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <SquareMeters className="w-5 h-5" />
        </div>
        <span className="body-md text-[var(--color-black)]">{area}m²</span>
      </div>
      {!compact && location && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <LocationIcon className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{location}</span>
        </div>
      )}
    </div>
  );
};
