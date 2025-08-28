import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

type SelectCardVariant = 'large' | 'small' | 'pill' | 'type';

interface SelectCardProps {
  title: string;
  description?: string;
  variant?: SelectCardVariant;
  selected?: boolean;
  disabled?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  onClick?: () => void;
}

const SelectCard = ({
  title,
  description,
  variant = 'large',
  selected = false,
  disabled = false,
  Icon,
  className = '',
  onClick,
}: SelectCardProps) => {
  const visualStateClasses = [
    disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    selected
      ? 'border-primary bg-primary/5 '
      : 'border-[var(--border-input)] hover:border-[var(--border-input)]',
  ].join(' ');

  const commonBaseClasses =
    'w-full text-left transition-colors focus-visible:outline-none hover:shadow-sm';

  const variantClasses = (() => {
    switch (variant) {
      case 'large':
        return 'rounded-[0.5rem] lg:rounded-2xl';
      case 'small':
        return 'rounded-xl';
      case 'pill':
        return 'rounded-[0.5rem]';
      case 'type':
        return 'rounded-2xl';
      default:
        return 'rounded-2xl';
    }
  })();

  // Base variants rendering
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        className={classNames(
          commonBaseClasses,
          variantClasses,
          visualStateClasses,
          'px-5 py-[1.125rem] inline-flex items-center gap-2 justify-start lg:justify-center border-2',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
          className,
        )}
      >
        <span
          className={classNames(
            'w-full flex justify-start lg:justify-center items-center body-lg transition-colors',
            selected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
          )}
        >
          {title}
        </span>
        <div
          className={classNames(
            'min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center rounded-full border-[2px]',
            selected ? 'border-[var(--accent-green)]' : 'border-[var(--color-black)]',
          )}
        >
          <div
            className={classNames(
              'w-3 h-3 rounded-full transition-colors',
              selected ? 'bg-[var(--accent-green)]' : 'bg-transparent',
            )}
          ></div>
        </div>
      </button>
    );
  }

  if (variant === 'small') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        className={classNames(
          commonBaseClasses,
          variantClasses,
          visualStateClasses,
          'relative pt-2 pb-3 md:pt-1.5 md:pb-2.5 xl:p-4 flex flex-col items-center gap-4 justify-center border-2 max-w-[10.25rem]',
          selected
            ? 'bg-[var(--bg-tint)] border-[var(--accent-green)]'
            : 'border-[var(--border-input)]',
          className,
        )}
      >
        <Image src={'/icons/ic_agency.svg'} alt="ic_agency" width={64} height={64} />
        <span
          className={classNames(
            'w-full flex justify-center items-center title-lg !text-[1.5rem] transition-colors text-[var(--color-black)]',
          )}
        >
          {title}
        </span>

        <div
          className={classNames(
            'absolute top-4 right-3 min-w-[1.125rem] min-h-[1.125rem] flex items-center justify-center rounded-full border-[1px]',
            selected ? 'border-[var(--accent-green)]' : 'border-[var(--color-black)]',
          )}
        >
          <div
            className={classNames(
              'w-3 h-3 rounded-full transition-colors',
              selected ? 'bg-[var(--accent-green)]' : 'bg-transparent',
            )}
          ></div>
        </div>
      </button>
    );
  }

  if (variant === 'type') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        className={classNames(
          commonBaseClasses,
          variantClasses,
          visualStateClasses,
          'relative p-3 flex flex-col items-center gap-2 justify-center border-2',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
          className,
        )}
      >
        {Icon && (
          <Icon
            className={classNames(
              'w-6 h-6',
              selected
                ? 'text-[var(--accent-green)] fill-white'
                : 'text-[var(--color-black)] fill-white',
            )}
          />
        )}
        <span
          className={classNames(
            'w-full flex justify-center items-center body-lg transition-colors',
            selected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
          )}
        >
          {title}
        </span>
      </button>
    );
  }

  // default to large layout
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={classNames(
        commonBaseClasses,
        variantClasses,
        visualStateClasses,
        'relative pt-2 pb-3 md:pt-1.5 md:pb-2.5 xl:p-4 flex flex-col items-center gap-4 justify-center border-2',
        selected
          ? 'bg-[var(--bg-tint)] border-[var(--accent-green)]'
          : 'border-[var(--border-input)]',
        className,
      )}
    >
      {Icon && <Icon className="w-16 h-16" />}
      <span
        className={classNames(
          'w-full flex justify-center items-center truncate title-lg !text-[1.25rem] transition-colors text-[var(--color-black)]',
          selected ? '' : '',
        )}
      >
        {title}
      </span>

      <div
        className={classNames(
          'absolute top-4 right-3 min-w-[1.125rem] min-h-[1.125rem] flex items-center justify-center rounded-full border-[1px]',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--color-black)]',
        )}
      >
        <div
          className={classNames(
            'w-3 h-3 rounded-full transition-colors',
            selected ? 'bg-[var(--accent-green)]' : 'bg-transparent',
          )}
        ></div>
      </div>
    </button>
  );
};

export default SelectCard;
