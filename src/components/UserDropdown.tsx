import { LanguageIcon, ListIcon, PlusIcon, SavedIcon } from '@/utils/icons';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button, { ButtonVariant } from './ui/Button';
import Modal from './ui/Modal';

type Language = 'en' | 'ar';

type UserDropdownProps = {
  isOpen?: boolean;
  onClose?: () => void;
  userEmail?: string;
  selectedLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
  buttonInfo?: {
    text: string;
    variant: ButtonVariant;
    href: string;
  };
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
  selectedLanguage = 'en',
  onLanguageChange,
  buttonInfo,
  onAddProperty,
  onFavorites,
  onSavedFilters,
  onProfileSettings,
  onExit,
}) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = React.useState(false);
  const [isSaveExitModalOpen, setIsSaveExitModalOpen] = React.useState(false);
  const router = useRouter();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'عربي' },
  ];

  const handleLanguageSelect = (languageCode: Language) => {
    onLanguageChange?.(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleSaveExit = () => {
    setIsSaveExitModalOpen(true);
  };

  const handleSaveExitConfirm = () => {
    setIsSaveExitModalOpen(false);
    onClose?.();
    router.push('/');
  };

  return (
    <>
      <div
        className={classNames(
          'bg-white border border-[var(--border)] rounded-[16px]',
          'transition-all duration-300',
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'opacity-0 scale-0 pointer-events-none',
        )}
      >
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
            <Image
              src="/icons/ic_close.svg"
              alt="Close"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>
        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />
        <div className="w-full px-4 py-4">
          {buttonInfo?.text === 'Save & Exit' ? (
            <Button
              variant={buttonInfo?.variant as ButtonVariant}
              className="flex items-center justify-center"
              onClick={handleSaveExit}
            >
              <span>Save & Exit</span>
            </Button>
          ) : (
            <Button
              variant={buttonInfo?.variant as ButtonVariant}
              className="flex items-center justify-center"
              onClick={onAddProperty}
            >
              <Link
                className="w-full h-full flex justify-center items-center gap-1"
                href={buttonInfo?.href || ''}
              >
                {buttonInfo?.href === '/add-property' && (
                  <PlusIcon className="w-4 h-4 text-[var(--color-black)] fill-white" />
                )}
                <span>{buttonInfo?.text}</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />

        <div className="flex flex-col overflow-y-auto scrollbar-none max-h-[calc(100vh-25rem)] sm:max-h-[calc(100vh-20rem)] md:max-h-none">
          {/* Menu Items */}
          <div className="px-4 py-4 space-y-2">
            {/* My Listings */}
            {userEmail && (
              <button
                onClick={onProfileSettings}
                className="w-full flex items-center gap-2 p-2 rounded-[8px] hover:bg-white transition-colors duration-300 cursor-pointer"
              >
                <ListIcon className="w-6 h-6 text-[var(--color-black)]" />
                <span className="flex-1 body-lg text-[var(--color-black)] text-left">
                  My Listings
                </span>
                <Image
                  src="/icons/ic_arrow_right.svg"
                  alt="Arrow right"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            )}

            {/* Favorites */}
            <button
              onClick={onFavorites}
              className="w-full flex items-center gap-2 p-2 rounded-[8px] hover:bg-white transition-colors duration-300 cursor-pointer"
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
              className="w-full flex items-center gap-2 p-2 rounded-[8px] hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              <Image
                src="/icons/ic_notification.svg"
                alt="Saved filters"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="flex-1 body-lg text-[var(--color-black)] text-left">
                Saved filters
              </span>
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
              className="w-full flex items-center gap-2 p-2 rounded-[8px] hover:bg-white transition-colors duration-300 cursor-pointer"
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
          <div className="flex lg:hidden w-full border-t border-[var(--border)]" />

          <div className="flex lg:hidden flex-col gap-2 p-4">
            {[
              { href: '#short-time', label: 'Short-time Rent' },
              { href: '#long-time', label: 'Long-time Rent' },
              { href: '#buy', label: 'Buy' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full items-center gap-2 px-2 py-3 rounded-[8px] text-[var(--color-black)] hover:text-[var(--accent-green)] hover:bg-white body-lg transition-colors duration-300 cursor-pointer"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="block w-full border-t border-[var(--border)] lg:hidden" />

          {/* Language Selector */}
          <div className="px-4 py-4 lg:hidden">
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className={classNames(
                  'w-full flex items-center gap-2 p-2 border-x border-t rounded-t-[8px]  bg-white  transition-all duration-300',
                  isLanguageDropdownOpen
                    ? 'rounded-x-[8px] rounded-b-[0px] border-[var(--border)]'
                    : 'rounded-b-[8px] border-transparent',
                )}
              >
                <LanguageIcon className="w-6 h-6 text-[var(--color-black)] fill-white" />
                <div className="flex-1 text-left">
                  <span className="body-lg text-[var(--color-black)]">
                    {languages.find((lang) => lang.code === selectedLanguage)?.nativeName}
                  </span>
                </div>
                <Image
                  src="/icons/ic_arrow_down.svg"
                  alt="Dropdown"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <div className="hidden md:block absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] rounded-[16px] shadow-[0px_0px_0px_1px_rgba(233,233,233,1),0px_8px_24px_2px_rgba(23,23,23,0.12)] z-[20]">
                  <div className="flex flex-col py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.code as Language)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-tint)] transition-colors"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {selectedLanguage === language.code && (
                            <Image
                              src="/icons/ic_check.svg"
                              alt="Selected"
                              width={24}
                              height={24}
                              className="w-6 h-6"
                            />
                          )}
                          {selectedLanguage !== language.code && <div className="w-6 h-6" />}
                          <span
                            className={`body-lg ${
                              selectedLanguage === language.code
                                ? 'text-[var(--accent-green)]'
                                : 'text-[var(--color-black)]'
                            }`}
                          >
                            {language.nativeName}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={classNames(
                  'md:hidden bg-white border-x border-b border-[var(--border)] rounded-x-[0.5rem] rounded-b-[0.5rem] overflow-hidden transition-[max-height,opacity] duration-300',
                  isLanguageDropdownOpen
                    ? 'opacity-100 max-h-[20rem] pointer-events-auto'
                    : 'opacity-0 max-h-0 pointer-events-none',
                )}
              >
                <div className="flex flex-col py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language.code as Language)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-tint)] transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {selectedLanguage === language.code && (
                          <Image
                            src="/icons/ic_check.svg"
                            alt="Selected"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        )}
                        {selectedLanguage !== language.code && <div className="w-6 h-6" />}
                        <span
                          className={`body-lg ${
                            selectedLanguage === language.code
                              ? 'text-[var(--accent-green)]'
                              : 'text-[var(--color-black)]'
                          }`}
                        >
                          {language.nativeName}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="block w-full border-t border-[var(--border)]" />

          {/* Exit Button */}
          {userEmail && (
            <div className="px-4 py-4">
              <button
                onClick={onExit}
                className="w-full flex items-center gap-2 p-2 rounded hover:bg-white transition-colors"
              >
                <Image
                  src="/icons/ic_exit.svg"
                  alt="Exit"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="flex-1 body-lg text-[var(--color-black)] text-left">Exit</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        className="fixed top-0 left-0 w-full max-w-[24.5rem]"
        widthClassName="!mx-4 md:!mx-0"
        isOpen={isSaveExitModalOpen}
        onClose={() => setIsSaveExitModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <SavedIcon className="w-14 h-14 text-[var(--color-black)] fill-white mt-6" />
          <div className="flex flex-col items-center gap-4 px-7">
            <h1 className="title-xl text-[var(--color-black)]">Draft saved</h1>
            <p className="body-lg text-center text-[var(--color-black)]">
              Your property draft has been saved to your account. Return and complete it at any
              time.
            </p>
          </div>

          <Button variant="primary" className="w-full !font-medium" onClick={handleSaveExitConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserDropdown;
