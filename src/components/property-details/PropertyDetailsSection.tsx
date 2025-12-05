import PropertyDetailRow from './PropertyDetailRow';
import PropertyDetailSection from './PropertyDetailSection';
import {
  CloseIcon,
  SquareMeters,
  ConditionIcon,
  ClassIcon,
  RenovationIcon,
  AreaLivingIcon,
  PetsAllowedIcon,
  SmokeNotAllowedIcon,
  HouseIcon2,
} from '@/utils/icons';
import type { PropertyDetails, BuildingInfo, SpecialConditions } from '@/utils/mockPropertyDetail';

interface PropertyDetailsSectionProps {
  details: PropertyDetails;
  building: BuildingInfo;
  specialConditions: SpecialConditions;
}

export default function PropertyDetailsSection({
  details,
  building,
  specialConditions,
}: PropertyDetailsSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
      <PropertyDetailSection title="Details">
        <PropertyDetailRow icon={<CloseIcon />} label="Floor:" value={details.floor.toString()} />
        <PropertyDetailRow
          icon={<SquareMeters />}
          label="Total Area:"
          value={`${details.totalArea} m²`}
        />
        <PropertyDetailRow
          icon={<AreaLivingIcon />}
          label="Living Area:"
          value={`${details.livingArea} m²`}
        />
      </PropertyDetailSection>

      <PropertyDetailSection title="Building">
        <PropertyDetailRow
          icon={<HouseIcon2 className="w-4 h-4 fill-[var(--text-pill)]" />}
          label="Year:"
          value={building.yearBuilt}
        />
        <PropertyDetailRow icon={<ConditionIcon />} label="Condition:" value={building.condition} />
        <PropertyDetailRow icon={<ClassIcon />} label="Class:" value={building.propertyClass} />
        <PropertyDetailRow
          icon={<RenovationIcon />}
          label="Renovation:"
          value={building.renovation}
        />
      </PropertyDetailSection>

      <PropertyDetailSection title="Special Condition">
        <PropertyDetailRow
          icon={<PetsAllowedIcon />}
          label="Pets:"
          value={specialConditions.petsAllowed ? 'Allowed' : 'Not allowed'}
        />
        <PropertyDetailRow
          icon={<SmokeNotAllowedIcon />}
          label="Smoking:"
          value={specialConditions.smokingAllowed ? 'Allowed' : 'Not allowed'}
        />
      </PropertyDetailSection>
    </div>
  );
}
