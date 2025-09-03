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
        'w-full text-left transition-colors focus-visible:outline-none relative p-4 flex flex-col gap-2 justify-center rounded-r-2xl',
        isSelected ? 'bg-[var(--bg-tint)] border-[var(--accent-green)]' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {Icon && <Icon className="w-6 h-6" />}
        <div className="flex-1 min-w-0">
          <div className="title-lg text-[var(--color-black)] truncate">{title}</div>
          {description ? (
            <p className="body-md text-[var(--text-body-tint)] mt-1 break-words">{description}</p>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ProfileOptionCard;
