import { OfficeRooms, SquareMeters, BathtubIcon, ParkingIcon } from '@/utils/icons';

interface OfficePropertyIconsProps {
  rooms?: number;
  area: number;
  bathrooms?: number;
  parkings?: number;
}

export const OfficePropertyIcons = ({
  rooms,
  area,
  bathrooms,
  parkings,
}: OfficePropertyIconsProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <SquareMeters className="w-5 h-5" />
        </div>
        <span className="body-md text-[var(--color-black)]">{area}m²</span>
      </div>
      {rooms !== undefined && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <OfficeRooms className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{rooms}</span>
        </div>
      )}
      {bathrooms !== undefined && bathrooms > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <BathtubIcon className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{bathrooms}</span>
        </div>
      )}
      {parkings !== undefined && parkings > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <ParkingIcon className="w-5 h-5" />
          </div>
          <span className="body-md text-[var(--color-black)]">{parkings}</span>
        </div>
      )}
    </div>
  );
};
