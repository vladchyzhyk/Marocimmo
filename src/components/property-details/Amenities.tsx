'use client';

import { useState } from 'react';
import { amenityIconMap, type AmenityIconId } from '@/utils/amenityIconMap';
import type { Amenity } from '@/types/propery-details';

interface AmenitiesProps {
  amenities: Amenity[];
  visibleCount?: number;
  title?: string;
}

const AmenityRow = ({ amenity }: { amenity: Amenity }) => {
  const normalizedName = amenity.name.toLowerCase().trim();

  const findIconId = (name: string): AmenityIconId | null => {
    const entries = Object.entries(amenityIconMap);
    for (const [id, component] of entries) {
      const componentName = component.name.toLowerCase().trim();
      if (componentName === name) {
        return id as AmenityIconId;
      }
    }
    return null;
  };

  const iconId = findIconId(normalizedName);
  const IconComponent = iconId ? amenityIconMap[iconId].icon : null;

  return (
    <div className="flex flex-row items-center gap-2 h-5">
      {IconComponent && (
        <IconComponent className="w-4 h-4 text-[#787878] fill-transparent transition-colors duration-200 flex-none flex-grow-0" />
      )}
      <span className="text-sm leading-[140%] text-[#787878] flex items-center flex-grow">
        {amenity.name}
      </span>
    </div>
  );
};

export default function Amenities({
  amenities,
  visibleCount = 8,
  title = 'What this place offers',
}: AmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const totalCount = amenities.length;
  const displayedAmenities = showAll ? amenities : amenities.slice(0, visibleCount);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <h2 className="text-xl font-bold leading-[120%] tracking-[-0.02em] text-[#222222] w-full">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-[104px] gap-y-4 w-full">
        {displayedAmenities.map((amenity) => (
          <AmenityRow key={amenity.id} amenity={amenity} />
        ))}
      </div>

      {!showAll && totalCount > visibleCount && (
        <button
          onClick={handleShowAll}
          className="text-sm font-bold leading-[140%] text-[#519C2C] w-full text-left"
          type="button"
        >
          Show all {totalCount} amenities
        </button>
      )}
    </div>
  );
}
