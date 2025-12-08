import {
  WifiIcon,
  HeatingIcon,
  WashingMachineIcon,
  TvIcon,
  AirConditioningIcon,
  KitchenIcon,
  FurnishedIcon,
  ParkingIcon,
  BalconyIcon,
  TerraceIcon,
  SwimmingPoolIcon,
  GymIcon,
  SecurityIcon,
  SatelliteTvIcon,
  FiberOpticIcon,
  TelephoneIcon,
  HotWaterIcon,
  ShowerCabinIcon,
  BathtubIcon,
  FridgeIcon,
  StoveIcon,
  MicrowaveIcon,
  CoffeeIcon,
  MoroccanLoungeIcon,
  EuropeanLoungeIcon,
  DuplexIcon,
  ConciergeIcon,
  SecuritySystemIcon,
  IntercomIcon,
  CodedLockIcon,
  ElevatorIcon,
} from './icons';

export type AmenityIconId =
  | 'wifi'
  | 'heating'
  | 'washing_machine'
  | 'tv'
  | 'air_conditioning'
  | 'equipped_kitchen'
  | 'furnished'
  | 'parking'
  | 'elevator'
  | 'balcony'
  | 'terrace'
  | 'swimming_pool'
  | 'gym'
  | 'security'
  | 'satellite_tv'
  | 'fiber_optic'
  | 'telephone'
  | 'hot_water'
  | 'shower_cabin'
  | 'bathtub'
  | 'fridge'
  | 'stove'
  | 'microwave'
  | 'coffee_machine'
  | 'moroccan_lounge'
  | 'european_lounge'
  | 'duplex'
  | 'concierge'
  | 'security_system'
  | 'intercom'
  | 'coded_lock';

export interface AmenityIconComponent {
  id: AmenityIconId;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const amenityIconMap: Record<AmenityIconId, AmenityIconComponent> = {
  wifi: { id: 'wifi', name: 'Wi-Fi', icon: WifiIcon },
  heating: { id: 'heating', name: 'Heating', icon: HeatingIcon },
  washing_machine: { id: 'washing_machine', name: 'Washing Machine', icon: WashingMachineIcon },
  tv: { id: 'tv', name: 'TV', icon: TvIcon },
  air_conditioning: { id: 'air_conditioning', name: 'Air Conditioning', icon: AirConditioningIcon },
  equipped_kitchen: { id: 'equipped_kitchen', name: 'Equipped Kitchen', icon: KitchenIcon },
  furnished: { id: 'furnished', name: 'Furnished', icon: FurnishedIcon },
  parking: { id: 'parking', name: 'Parking', icon: ParkingIcon },
  elevator: { id: 'elevator', name: 'Elevator', icon: ElevatorIcon },
  balcony: { id: 'balcony', name: 'Balcony', icon: BalconyIcon },
  terrace: { id: 'terrace', name: 'Terrace', icon: TerraceIcon },
  swimming_pool: { id: 'swimming_pool', name: 'Swimming Pool', icon: SwimmingPoolIcon },
  gym: { id: 'gym', name: 'Gym', icon: GymIcon },
  security: { id: 'security', name: 'Security', icon: SecurityIcon },
  satellite_tv: { id: 'satellite_tv', name: 'Satellite TV', icon: SatelliteTvIcon },
  fiber_optic: { id: 'fiber_optic', name: 'Fiber Optic Cable', icon: FiberOpticIcon },
  telephone: { id: 'telephone', name: 'Telephone Wiring', icon: TelephoneIcon },
  hot_water: { id: 'hot_water', name: 'Hot Water', icon: HotWaterIcon },
  shower_cabin: { id: 'shower_cabin', name: 'Shower Cabin', icon: ShowerCabinIcon },
  bathtub: { id: 'bathtub', name: 'Bathtub', icon: BathtubIcon },
  fridge: { id: 'fridge', name: 'Fridge', icon: FridgeIcon },
  stove: { id: 'stove', name: 'Stove', icon: StoveIcon },
  microwave: { id: 'microwave', name: 'Microwave', icon: MicrowaveIcon },
  coffee_machine: { id: 'coffee_machine', name: 'Coffee Machine', icon: CoffeeIcon },
  moroccan_lounge: { id: 'moroccan_lounge', name: 'Moroccan Lounge', icon: MoroccanLoungeIcon },
  european_lounge: { id: 'european_lounge', name: 'European Lounge', icon: EuropeanLoungeIcon },
  duplex: { id: 'duplex', name: 'Duplex', icon: DuplexIcon },
  concierge: { id: 'concierge', name: 'Concierge', icon: ConciergeIcon },
  security_system: { id: 'security_system', name: 'Security System', icon: SecuritySystemIcon },
  intercom: { id: 'intercom', name: 'Intercom', icon: IntercomIcon },
  coded_lock: { id: 'coded_lock', name: 'Coded Lock', icon: CodedLockIcon },
};

export function getAmenityIcon(iconId: AmenityIconId): AmenityIconComponent | undefined {
  return amenityIconMap[iconId];
}

export function getAmenityIconByName(
  name: string,
): React.FC<React.SVGProps<SVGSVGElement>> | undefined {
  const normalizedName = name.toLowerCase().trim();

  const amenity = Object.values(amenityIconMap).find(
    (item) => item.name.toLowerCase() === normalizedName,
  );

  return amenity?.icon;
}

export function getAmenityIconComponent(
  iconId: string,
): React.FC<React.SVGProps<SVGSVGElement>> | undefined {
  const amenity = amenityIconMap[iconId as AmenityIconId];
  return amenity?.icon;
}
