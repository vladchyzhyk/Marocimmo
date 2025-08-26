import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageDropdown from './LanguageDropdown';
import Button from './ui/Button';
import UserDropdown from './UserDropdown';

type HeaderProps = {
  className?: string;
};

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar'>('en');

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const handleUserButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsLanguageDropdownOpen(false); // Close language dropdown when user dropdown opens
  };

  const handleLanguageButtonClick = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsDropdownOpen(false); // Close user dropdown when language dropdown opens
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleCloseLanguageDropdown = () => {
    setIsLanguageDropdownOpen(false);
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

  return (
    <div className="w-full ">
      <header
        className={[
          'flex justify-center w-full border-b border-[var(--border)] bg-[var(--white)]',
          'px-5 md:px-10 pb-2',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="relative w-full max-w-[1200px] flex justify-between items-center gap-4 md:gap-6 pt-4">
          {/* Logo */}
          <div className="w-full max-w-[1/3]">
            <Link href="/" className="flex items-center gap-2 h-14">
              <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px] bg-[var(--primarybutton-hover)]" />
              <span className="title-xl uppercase text-[var(--color-black)]">Marocimmo</span>
            </Link>
          </div>

          {/* Nav - grows and centers on larger screens */}
          <nav className="w-full">
            <ul className="w-full flex justify-center md:justify-center items-center gap-3 md:gap-6 py-1">
              {[
                { href: '#short-time', label: 'Short-time Rent' },
                { href: '#long-time', label: 'Long-time Rent' },
                { href: '#buy', label: 'Buy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 px-2 py-2 rounded-[8px] text-[var(--color-black)] hover:bg-[var(--bg-tint)] body-lg"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="w-full max-w-[1/3] relative flex items-center justify-end gap-3 md:gap-4">
            {/* Add your property - primary */}
            <Button
              variant={pathname === '/add-property' ? 'outline' : 'primary'}
              className="flex items-center justify-center max-w-[200px]"
            >
              <Link
                className="flex items-center gap-1"
                href={pathname === '/add-property' ? '/' : '/add-property'}
              >
                {pathname === '/add-property' ? (
                  ''
                ) : (
                  <Image src="/icons/ic_plus.svg" alt="add" width={16} height={16} />
                )}
                <span>{pathname === '/add-property' ? 'Cancel' : 'Add your property'}</span>
              </Link>
            </Button>
            {/* Language icon button */}
            <button
              type="button"
              aria-label="Change language"
              onClick={handleLanguageButtonClick}
              className="flex items-center justify-center w-12 h-12 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:bg-[var(--bg-tint)] hover:border-[var(--accent-green)]"
            >
              <Image src="/icons/ic_language.svg" alt="Language" width={24} height={24} />
            </button>
            {user && (
              <button
                type="button"
                aria-label="Account"
                onClick={handleUserButtonClick}
                className="flex items-center justify-center w-12 h-12 rounded-[8px] bg-[var(--bg-tint)] border border-[var(--border)] hover:border-[var(--accent-green)]"
              >
                <Image src="/icons/ic_account.svg" alt="user" width={24} height={24} />
              </button>
            )}
            {/* Log in - secondary */}
            {!user && (
              <Link
                href="/sign-up"
                className="flex items-center gap-2 h-12 px-4 rounded-[8px] border border-[var(--border)] bg-[var(--bg-tint)] text-[var(--color-black)] hover:bg-[var(--border-input)] button-lg-medium"
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
          <div className="absolute top-0 right-0 w-full max-w-[344px] z-[20]">
            <UserDropdown
              isOpen={isDropdownOpen}
              onClose={handleCloseDropdown}
              userEmail={user.email}
              onAddProperty={handleAddProperty}
              onFavorites={handleFavorites}
              onSavedFilters={handleSavedFilters}
              onProfileSettings={handleProfileSettings}
              onExit={handleExit}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
