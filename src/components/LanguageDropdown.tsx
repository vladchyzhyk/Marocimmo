import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

type Language = 'en' | 'ar';

type LanguageDropdownProps = {
  isOpen?: boolean;
  onClose?: () => void;
  selectedLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
};

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen = false,
  onClose,
  selectedLanguage = 'en',
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'عربي' },
  ];

  const handleLanguageSelect = (languageCode: Language) => {
    onLanguageChange?.(languageCode);
    onClose?.();
  };

  return (
    <div className="relative w-full bg-[var(--bg-tint)] border border-[var(--border)] rounded-[16px] shadow-[0px_0px_0px_1px_rgba(233,233,233,1),0px_8px_24px_2px_rgba(23,23,23,0.12)]">
      <div className="flex flex-col py-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelect(language.code as Language)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white transition-colors"
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
                className={classNames(
                  'body-lg',
                  selectedLanguage === language.code
                    ? 'text-[var(--accent-green)]'
                    : 'text-[var(--color-black)]',
                )}
              >
                {language.nativeName}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
