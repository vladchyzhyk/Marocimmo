import {
  HousePropertyIcons,
  OfficePropertyIcons,
  LandPropertyIcons,
} from '@/components/property-icons';

type MockProperty = {
  propertyType: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  rooms?: number;
  parkings?: number;
  location: string;
};

export function getPropertyIcons(property: MockProperty) {
  const propertyType = property.propertyType.toLowerCase();

  if (propertyType === 'land') {
    return <LandPropertyIcons area={property.area} location={property.location} />;
  }

  if (propertyType === 'office' || propertyType === 'offices') {
    return (
      <OfficePropertyIcons
        rooms={property.rooms}
        area={property.area}
        bathrooms={property.bathrooms}
        parkings={property.parkings}
      />
    );
  }

  return (
    <HousePropertyIcons
      rooms={property.bedrooms}
      area={property.area}
      bathrooms={property.bathrooms}
    />
  );
}


