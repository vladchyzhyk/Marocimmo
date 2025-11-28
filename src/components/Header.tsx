import { LanguageIcon, MenuIcon, NotificationIcon, PlusIcon, SavedIcon } from '@/utils/icons';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSearchParams } from '@/hooks/useSearchParams';
import LanguageDropdown from './LanguageDropdown';
import NotificationsDropdown from './NotificationDropdown';
import Button, { ButtonVariant } from './ui/Button';
import Modal from './ui/Modal';
import UserDropdown from './UserDropdown';

export const user = {
  // name: 'John Doe',
  // email: 'john.doe@example.com',
  // isLoggedIn: true,
  name: '',
  email: '',
  isLoggedIn: false,
};

type HeaderProps = {
  className?: string;
};

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { searchParams, setSearchParams } = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar'>('en');
  const [isSaveExitOpen, setIsSaveExitOpen] = useState(false);

  const currentDealType = searchParams.dealType || 'sale';

  const handleNavClick = async (dealType: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await setSearchParams({ dealType });
    // router.push('/?dealType=' + dealType);
  };

  const handleUserButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsLanguageDropdownOpen(false); // Close language dropdown when user dropdown opens
    setIsNotificationsDropdownOpen(false);
  };

  const handleLanguageButtonClick = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsDropdownOpen(false); // Close user dropdown when language dropdown opens
    setIsNotificationsDropdownOpen(false);
  };

  const handleNotificationsButtonClick = () => {
    setIsDropdownOpen(false);
    setIsLanguageDropdownOpen(false);
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleCloseLanguageDropdown = () => {
    setIsLanguageDropdownOpen(false);
  };

  const handleCloseNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen(false);
  };

  const handleLanguageChange = (language: 'en' | 'ar') => {
    setSelectedLanguage(language);
    console.log('Language changed to:', language);
  };

  const handleAddProperty = () => {
    // Handle add property action
    console.log('Add property clicked');
    setIsDropdownOpen(false);
  };

  const handleFavorites = () => {
    // Handle favorites action
    console.log('Favorites clicked');
    setIsDropdownOpen(false);
  };

  const handleSavedFilters = () => {
    // Handle saved filters action
    console.log('Saved filters clicked');
    setIsDropdownOpen(false);
  };

  const handleProfileSettings = () => {
    // Handle profile settings action
    console.log('Profile settings clicked');
    setIsDropdownOpen(false);
  };

  const handleExit = () => {
    // Handle exit/logout action
    console.log('Exit clicked');
    setIsDropdownOpen(false);
  };

  const getButtonInfo = () => {
    if (pathname === '/add-property') {
      return { text: 'Cancel', variant: 'outline', href: '/' };
    }
    if (pathname === '/add-property/base-property-info') {
      return { text: 'Save & Exit', variant: 'outline', href: '/' };
    }
    return { text: 'Add your property', variant: 'primary', href: '/add-property' };
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <header
        className={[
          'flex justify-center w-full border-b border-[var(--border)] bg-[var(--white)]',
          'px-5 md:px-4 lg:px-4 xl:px-3 pb-2',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="relative w-full max-w-[1200px] flex justify-between items-center gap-4 md:gap-3 lg:gap-3 xl:gap-2 pt-4">
          {/* Logo */}
          <div className="w-full max-w-[1/3]">
            <Link href="/" className="flex items-center gap-2 h-14 lg:h-12 xl:h-11">
              <span className="inline-flex items-center justify-center w-[34px] h-[34px] lg:w-[30px] lg:h-[30px] xl:w-[28px] xl:h-[28px] rounded-[8px] bg-[var(--primarybutton-hover)]" />
              <span className="hidden sm:block title-xl uppercase text-[var(--color-black)]">
                Marocimmo
              </span>
            </Link>
          </div>

          {/* Nav - grows and centers on larger screens */}
          <nav className="w-full hidden lg:block">
            <ul className="w-full flex justify-center md:justify-center items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 py-1">
              {[
                { href: '/', label: 'Short-time Rent', dealType: 'short-term' },
                { href: '/', label: 'Long-time Rent', dealType: 'long-term' },
                { href: '/', label: 'Buy', dealType: 'sale' },
              ].map((item) => {
                const isActive = currentDealType === item.dealType;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(item.dealType, e)}
                      className={classNames(
                        'whitespace-nowrap inline-flex items-center gap-2 px-2 py-2 lg:px-1.5 lg:py-1.5 xl:px-1 xl:py-1 rounded-[8px] text-[var(--color-black)] hover:bg-[var(--bg-tint)] body-lg md:body-md',
                        {
                          'font-medium underline decoration-solid decoration-[var(--color-black)] text-base leading-[100%]':
                            isActive,
                        },
                      )}
                      style={
                        isActive
                          ? {
                              fontFamily: 'Helvetica Neue, sans-serif',
                              textDecorationThickness: '9%',
                              textUnderlineOffset: '50%',
                            }
                          : undefined
                      }
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="w-full max-w-[1/3] relative flex items-center justify-end gap-3 md:gap-2 lg:gap-2 xl:gap-2">
            {/* Add your property - primary */}
            {user && (
              <div className="">
                {getButtonInfo().text === 'Save & Exit' ? (
                  <Button
                    variant={getButtonInfo().variant as ButtonVariant}
                    className="!hidden md:!flex items-center justify-center max-w-[134px]"
                    onClick={() => setIsSaveExitOpen(true)}
                  >
                    <span>Save & Exit</span>
                  </Button>
                ) : (
                  <Button
                    variant={getButtonInfo().variant as ButtonVariant}
                    className={classNames(
                      '!hidden md:!flex items-center justify-center ',
                      getButtonInfo().text === 'Cancel'
                        ? '!w-fit'
                        : 'md:max-w-[200px] lg:max-w-[200px]',
                    )}
                  >
                    <Link
                      className="w-full h-full flex justify-center items-center gap-1"
                      href={getButtonInfo().href}
                    >
                      {getButtonInfo().href === '/add-property' && (
                        <PlusIcon className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-3.5 xl:h-3.5 text-[var(--color-black)] fill-white" />
                      )}
                      <span className="whitespace-nowrap">{getButtonInfo().text}</span>
                    </Link>
                  </Button>
                )}
                {getButtonInfo().text !== 'Add your property' &&
                  (getButtonInfo().text === 'Save & Exit' ? (
                    <Button
                      variant={getButtonInfo().variant as ButtonVariant}
                      className="!w-fit !flex md:!hidden items-center justify-center max-w-[134px] whitespace-nowrap"
                      onClick={() => setIsSaveExitOpen(true)}
                    >
                      <span>Save & Exit</span>
                    </Button>
                  ) : (
                    <Button
                      variant={getButtonInfo().variant as ButtonVariant}
                      className={classNames(
                        '!flex md:!hidden items-center justify-center whitespace-nowrap',
                        getButtonInfo().text === 'Cancel'
                          ? '!w-fit md:w-full lg:max-w-[134px] !bg-[var(--bg-tint)]'
                          : 'md:max-w-[200px] lg:max-w-[200px]',
                      )}
                    >
                      <Link
                        className="w-full h-full flex justify-center items-center gap-1"
                        href={getButtonInfo().href}
                      >
                        {getButtonInfo().href === '/add-property' && (
                          <PlusIcon className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-3.5 xl:h-3.5 text-[var(--color-black)] fill-white" />
                        )}
                        <span className="whitespace-nowrap">{getButtonInfo().text}</span>
                      </Link>
                    </Button>
                  ))}
              </div>
            )}
            {/* Notifications icon button */}
            {user.isLoggedIn && (
              <button
                type="button"
                aria-label="Notifications"
                onClick={handleNotificationsButtonClick}
                className="hidden lg:flex items-center justify-center w-12 h-12 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:bg-[var(--bg-tint)] hover:border-[var(--accent-green)]"
              >
                <NotificationIcon className="w-6 h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 text-[var(--color-black)] fill-white" />
              </button>
            )}
            {/* Language icon button */}
            <button
              type="button"
              aria-label="Change language"
              onClick={handleLanguageButtonClick}
              className="hidden lg:flex items-center justify-center w-12 h-12 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:bg-[var(--bg-tint)] hover:border-[var(--accent-green)]"
            >
              <LanguageIcon className="w-6 h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 text-[var(--color-black)] fill-white" />
            </button>
            {user.isLoggedIn && (
              <button
                type="button"
                aria-label="Account"
                onClick={handleUserButtonClick}
                className="flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10 xl:w-10 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:border-[var(--accent-green)]"
              >
                <Image
                  src="/icons/ic_account.svg"
                  alt="user"
                  width={24}
                  height={24}
                  className="w-6 h-6 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
                />
              </button>
            )}
            {!user.isLoggedIn && (
              <Link
                href="/sign-in"
                className="flex md:hidden items-center justify-center px-4 h-12 lg:px-3 lg:h-9 xl:px-3 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:border-[var(--accent-green)]"
              >
                <span>Log in</span>
              </Link>
            )}
            {!user.isLoggedIn && (
              <button
                type="button"
                aria-label="Account"
                onClick={handleUserButtonClick}
                className="flex md:hidden items-center justify-center w-12 h-12 lg:w-10 lg:h-10 xl:w-10 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:border-[var(--accent-green)]"
              >
                <MenuIcon className="w-6 h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 text-[var(--color-black)] fill-white" />
              </button>
            )}
            {!user.isLoggedIn && (
              <Link
                href="/sign-in"
                className="hidden md:flex items-center justify-center px-4 h-12 md:px-3 md:h-10 lg:h-10 lg:px-3 xl:px-3 xl:h-10 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:border-[var(--accent-green)] whitespace-nowrap"
              >
                <span>Log in</span>
              </Link>
            )}

            <div className="absolute top-15 right-[10%] w-full min-w-[138px] max-w-[138px]">
              <LanguageDropdown
                isOpen={isLanguageDropdownOpen}
                onClose={handleCloseLanguageDropdown}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
          <div
            className={classNames(
              'absolute top-3 right-20 w-full min-w-[22.875rem] max-w-[22.875rem] transition-all duration-300',
              isNotificationsDropdownOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none',
            )}
          >
            <NotificationsDropdown
              isOpen={isNotificationsDropdownOpen}
              onClose={handleCloseNotificationsDropdown}
            />
          </div>
          <div
            className={classNames(
              'absolute top-0 right-0 w-full max-w-[344px] z-[20] transition-all duration-300',
              isDropdownOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
            )}
          >
            <UserDropdown
              isOpen={isDropdownOpen}
              onClose={handleCloseDropdown}
              selectedLanguage={selectedLanguage}
              buttonInfo={
                getButtonInfo() as {
                  text: string;
                  variant: ButtonVariant;
                  href: string;
                }
              }
              onLanguageChange={handleLanguageChange}
              onAddProperty={handleAddProperty}
              onFavorites={handleFavorites}
              onSavedFilters={handleSavedFilters}
              onProfileSettings={handleProfileSettings}
              onExit={handleExit}
            />
          </div>
        </div>
      </header>
      {/* Save & Exit confirmation modal */}
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isSaveExitOpen}
        onClose={() => setIsSaveExitOpen(false)}
      >
        <div className="flex flex-col items-center justify-center gap-6 md:gap-4 lg:gap-4 xl:gap-4">
          <SavedIcon className="w-14 h-14 text-[var(--color-black)] fill-white mt-6" />
          <div className="flex flex-col items-center gap-4 md:gap-3 lg:gap-3 xl:gap-3 px-7">
            <h1 className="title-xl text-[var(--color-black)]">Draft saved</h1>
            <p className="body-lg text-center text-[var(--color-black)]">
              Your property draft has been saved to your account. Return and complete it at any
              time.
            </p>
          </div>

          <Button
            variant="primary"
            className="w-full !font-medium"
            onClick={() => {
              setIsSaveExitOpen(false);
              router.push('/');
            }}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
