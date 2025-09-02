import { ButtonIcon } from '@/utils/icons';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import ListingActionDropdown from './ListingActionDropdown';

export type DealType = 'rent' | 'sale';
export type PropertyType =
  | 'apartment'
  | 'house'
  | 'villa'
  | 'office'
  | 'land'
  | 'commercial'
  | string;
export type ListingStatus = 'active' | 'pending' | 'inactive' | 'sold' | 'rented' | string;

export type ListingCardProps = {
  propertyId: string;
  property: string;
  dealType: DealType;
  propertyType: PropertyType;
  location: string;
  price: number;
  status: ListingStatus;
  imageUrl?: string;
  currency?: string;
  className?: string;
  onClick?: () => void;
};

const StatusLabel = ({ status }: { status: ListingStatus }) => {
  const statusLabel = {
    active: 'active',
    pending: 'pending',
    inactive: 'inactive',
    sold: 'sold',
    rented: 'rented',
  };
  return (
    <span
      className={classNames(
        'label-sm-medium px-2 py-1 rounded-full capitalize',
        statusLabel.active === status ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active)]' : '',
        statusLabel.pending === status
          ? 'bg-[var(--pill-archived-bg)] text-[var(--color-black)]'
          : '',
        statusLabel.inactive === status
          ? 'bg-[var(--pill-archived-bg)] text-[var(--color-black)]'
          : '',
        statusLabel.sold === status ? 'bg-[var(--pill-archived-bg)] text-[var(--color-black)]' : '',
        statusLabel.rented === status
          ? 'bg-[var(--pill-archived-bg)] text-[var(--color-black)]'
          : '',
      )}
    >
      {status}
    </span>
  );
};

const ListingCard: React.FC<ListingCardProps> = ({
  propertyId,
  property,
  dealType,
  propertyType,
  location,
  price,
  status,
  imageUrl,
  currency = 'MAD',
  className = '',
  onClick,
}) => {
  const [actionsOpen, setActionsOpen] = React.useState<boolean>(false);
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  const isRent = dealType === 'rent';

  return (
    <div
      className={`relative w-full p-4 pl-2 border border-[var(--border)] bg-white hover:bg-[var(--bg-tint)] hover:shadow-lg transition-shadow flex items-center gap-8 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Image (left column) */}
      <div className="flex items-center gap-4 w-full max-w-[19.75rem]">
        <div className="relative shrink-0 w-[4rem] h-[3rem] rounded-lg overflow-hidden bg-[var(--bg-tint)]">
          <Image
            src={imageUrl || '/images/light-styled-interior.jpg'}
            alt={property}
            fill
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="title-md text-[var(--color-black)] truncate" title={property}>
            {property}
          </h3>
          <p className="body-md text-[var(--text-pill)] truncate" title={property}>
            {propertyId}
          </p>
        </div>
      </div>
      {/* Meta row */}
      <div className="w-full max-w-[10rem] flex items-center gap-2">
        <span className="label-sm-medium px-2 py-1 rounded-full bg-[var(--pill-archived-bg)] capitalize">
          {propertyType}
        </span>
      </div>

      {/* Meta row */}
      <div className="w-full max-w-[7.5rem] flex items-center gap-2">
        <span className="label-sm-medium px-2 py-1 rounded-full bg-[var(--pill-archived-bg)] capitalize">
          {propertyType}
        </span>
      </div>

      {/* Location */}
      <div className="w-full max-w-[7.5rem] flex items-center gap-2 body-md">
        <span className="truncate" title={location}>
          {location}
        </span>
      </div>

      {/* Price row */}
      <div className="w-full max-w-[10rem] flex items-end justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="heading-h4 text-[var(--accent-green)]">{formattedPrice}</span>
          <span className="body-lg text-[var(--accent-green)]">{currency}</span>
          {isRent ? (
            <span className="label-sm-medium text-[var(--text-body-tint)]">/month</span>
          ) : null}
        </div>
      </div>
      <div className="w-full max-w-[5rem]">
        <StatusLabel status={status} />
      </div>
      <div className="w-full max-w-[6.75rem] flex justify-end text-end relative">
        <div
          className="w-9 h-9 flex items-center justify-center cursor-pointer bg-transparent hover:bg-[var(--bg-tint)] rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setActionsOpen((v) => !v);
          }}
        >
          <ButtonIcon className="w-full h-full" />
        </div>
      </div>
      <div className="w-full absolute top-3.5 right-2 z-50 max-w-[17rem]">
        <ListingActionDropdown
          propertyId={propertyId}
          open={actionsOpen}
          onRequestClose={() => setActionsOpen(false)}
        />
      </div>
    </div>
  );
};

export default ListingCard;
