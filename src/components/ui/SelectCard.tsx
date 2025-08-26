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
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SelectCard = ({
  title,
  description,
  variant = 'large',
  selected = false,
  disabled = false,
  icon,
  className = '',
  onClick,
}: SelectCardProps) => {
  const visualStateClasses = [
    disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    selected
      ? 'border-primary bg-primary/5 ring-primary/20'
      : 'border-gray-200 hover:border-gray-300',
  ].join(' ');

  const commonBaseClasses =
    'w-full text-left bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 hover:shadow-sm';

  const variantClasses = (() => {
    switch (variant) {
      case 'large':
        return 'rounded-2xl';
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
          'px-5 py-5 inline-flex items-center gap-2 justify-center border-2',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
          className,
        )}
      >
        <span
          className={classNames(
            'w-full flex justify-center items-center truncate title-lg  !font-normal transition-colors',
            selected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
          )}
        >
          {title}
        </span>
        <div
          className={classNames(
            'min-w-[1.125rem] min-h-[1.125rem] flex items-center justify-center rounded-full border-[1px]',
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
          'relative p-4 flex flex-col items-center gap-4 justify-center border-2 max-w-[10.25rem]',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
          className,
        )}
      >
        <Image src={'/icons/ic_agency.svg'} alt="ic_agency" width={64} height={64} />
        <span
          className={classNames(
            'w-full flex justify-center items-center truncate title-lg !text-[1.5rem] transition-colors text-[var(--color-black)]',
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
          'relative p-4 flex flex-col items-center gap-4 justify-center border-2 max-w-[10.25rem]',
          selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
          className,
        )}
      >
        <Image
          src={'/icons/ic_house.svg'}
          alt="ic_house"
          width={24}
          height={24}
          className={classNames(
            selected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
          )}
        />
        <span
          className={classNames(
            'w-full flex justify-center items-center truncate title-lg !text-[1.375rem] !font-normal transition-colors',
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
        'relative p-4 flex flex-col items-center gap-4 justify-center border-2',
        selected ? 'border-[var(--accent-green)]' : 'border-[var(--border-input)]',
        className,
      )}
    >
      <Image src={'/icons/ic_agency.svg'} alt="ic_agency" width={64} height={64} />
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
