import { ArrowRightIcon } from '@/utils/icons';
import classNames from 'classnames';

type ProfileOptionCardProps = {
  title: string;
  description?: string;
  isSelected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const ProfileOptionCard = ({
  title,
  description,
  isSelected = false,
  disabled = false,
  className = '',
  onClick,
  Icon,
}: ProfileOptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      className={classNames(
        'w-full text-left transition-colors focus-visible:outline-none relative px-4 py-3 flex flex-col gap-2 justify-center rounded-r-2xl',
        isSelected ? 'bg-[var(--bg-tint)] border-[var(--accent-green)]' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm',
        className,
      )}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 w-1 min-h-0 h-full bg-[var(--accent-green)]"></div>
      )}
      <div className="flex gap-3">
        {Icon && (
          <Icon
            className={classNames(
              'w-6 h-6',
              isSelected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
            )}
          />
        )}
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <div
            className={classNames(
              'button-lg-medium  truncate',
              isSelected ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
            )}
          >
            {title}
          </div>
          {description ? (
            <p className="body-md text-[var(--text-body-tint)] break-words">{description}</p>
          ) : null}
        </div>
        <ArrowRightIcon className="w-6 h-6 md:hidden" />
      </div>
    </button>
  );
};

export default ProfileOptionCard;
