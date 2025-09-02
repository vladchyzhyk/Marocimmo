import { CloseIcon, DeleteIcon, EditIcon, KeyIcon, RenewIcon, SoldIcon } from '@/utils/icons';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React from 'react';

const MenuItems = [
  {
    icon: KeyIcon,
    label: 'Mark as Rented',
  },
  {
    icon: SoldIcon,
    label: 'Mark as Sold',
  },
  {
    icon: RenewIcon,
    label: 'Renew on next 60 days',
  },
  {
    icon: EditIcon,
    label: 'Edit',
  },
  {
    icon: DeleteIcon,
    label: 'Delete',
  },
];

type ListingActionDropdownProps = {
  open: boolean;
  onRequestClose: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  className?: string;
  propertyId: string;
};

const MenuItem = ({
  Icon,
  label,
  onClick,
}: {
  Icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      role="menuitem"
      className={classNames(
        'w-full flex items-center gap-2 p-4 rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer',
        Icon === DeleteIcon ? 'text-[var(--error)]' : '',
      )}
      onClick={onClick}
    >
      {
        <Icon
          className={classNames(
            'w-4 h-4',
            Icon === DeleteIcon ? 'text-[var(--error)]' : 'text-[var(--color-black)]',
          )}
        />
      }
      {label}
    </div>
  );
};

const ListingActionDropdown = ({
  propertyId,
  open,
  onRequestClose,
  onEdit,
  onPublish,
  onDuplicate,
  onDelete,
  className = '',
}: ListingActionDropdownProps) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        onRequestClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onRequestClose]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      role="menu"
      className={`relative w-full border border-[var(--border)] bg-[var(--bg-tint)] rounded-xl shadow-lg ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-md absolute top-2 right-2 p-2 cursor-pointer"
        onClick={onRequestClose}
      >
        <CloseIcon className="w-5 h-5" />
      </div>
      {MenuItems.map((item) => (
        <MenuItem
          key={item.label}
          Icon={item.icon}
          label={item.label}
          onClick={() => {
            if (item.label === 'Edit') {
              router.push(`/edit/${propertyId}`);
            }
          }}
        />
      ))}
    </div>
  );
};

export default ListingActionDropdown;
