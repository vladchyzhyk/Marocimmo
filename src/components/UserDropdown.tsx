import Image from 'next/image';
import React from 'react';
import Button from './ui/Button';

type UserDropdownProps = {
  isOpen?: boolean;
  onClose?: () => void;
  userEmail?: string;
  onAddProperty?: () => void;
  onFavorites?: () => void;
  onSavedFilters?: () => void;
  onProfileSettings?: () => void;
  onExit?: () => void;
};

const UserDropdown: React.FC<UserDropdownProps> = ({
  isOpen = false,
  onClose,
  userEmail = 'test@test.com',
  onAddProperty,
  onFavorites,
  onSavedFilters,
  onProfileSettings,
  onExit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-full bg-[var(--bg-tint)] border border-[var(--border)] rounded-b-[24px] shadow-[0px_0px_0px_1px_rgba(233,233,233,1),0px_8px_24px_2px_rgba(23,23,23,0.12)]">
      {/* Header with User Profile */}
      <div className="flex justify-center items-center gap-2 px-4 py-5">
        <div className="flex items-center gap-2 p-2 flex-1">
          <div className="w-[42px] h-[42px] bg-white border border-[var(--border)] rounded-lg flex items-center justify-center">
            <Image
              src="/icons/ic_account.svg"
              alt="User account"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <div className="body-lg text-[var(--color-black)]">Welcome</div>
            <div className="label-md-medium text-[var(--color-black)]">{userEmail}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 bg-white border border-[var(--border)] rounded-lg flex items-center justify-center hover:bg-[var(--bg-tint)] transition-colors"
        >
          <Image src="/icons/ic_close.svg" alt="Close" width={24} height={24} className="w-6 h-6" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Add Property Button */}
      <div className="px-4 py-4">
        <Button
          variant="primary"
          size="lg"
          leftIcon={
            <Image src="/icons/ic_plus.svg" alt="Add" width={16} height={16} className="w-4 h-4" />
          }
          label="Add your property"
          onClick={onAddProperty}
          fullWidth
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Menu Items */}
      <div className="px-4 py-4 space-y-2">
        {/* Favorites */}
        <button
          onClick={onFavorites}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
        >
          <Image
            src="/icons/ic_favorites.svg"
            alt="Favorites"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="flex-1 body-lg text-[var(--color-black)] text-left">Favorites</span>
          <Image
            src="/icons/ic_arrow_right.svg"
            alt="Arrow right"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>

        {/* Saved Filters */}
        <button
          onClick={onSavedFilters}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
        >
          <Image
            src="/icons/ic_notification.svg"
            alt="Saved filters"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="flex-1 body-lg text-[var(--color-black)] text-left">Saved filters</span>
          <Image
            src="/icons/ic_arrow_right.svg"
            alt="Arrow right"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>

        {/* Profile Settings */}
        <button
          onClick={onProfileSettings}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
        >
          <Image
            src="/icons/ic_settings.svg"
            alt="Settings"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="flex-1 body-lg text-[var(--color-black)] text-left">
            Profile Settings
          </span>
          <Image
            src="/icons/ic_arrow_right.svg"
            alt="Arrow right"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Exit Button */}
      <div className="px-4 py-4">
        <button
          onClick={onExit}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
        >
          <Image src="/icons/ic_exit.svg" alt="Exit" width={24} height={24} className="w-6 h-6" />
          <span className="flex-1 body-lg text-[var(--color-black)] text-left">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
