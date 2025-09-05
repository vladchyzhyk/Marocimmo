import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  KeyIcon,
  RenewIcon,
  SoldIcon,
} from '@/utils/icons'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from './ui/Button'
import Modal from './ui/Modal'

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
        'w-full flex items-center gap-2 p-4 md:p-3 rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer',
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
  className = '',
}: ListingActionDropdownProps) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isRentedModalOpen, setIsRentedModalOpen] = useState(false);
  const [isSoldModalOpen, setIsSoldModalOpen] = useState(false);
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

  const handleDeleteListing = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

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
            if (item.label === 'Delete') {
              setIsDeleteModalOpen(true);
            }
            if (item.label === 'Renew on next 60 days') {
              setIsRenewModalOpen(true);
            }
            if (item.label === 'Mark as Rented') {
              setIsRentedModalOpen(true);
            }
            if (item.label === 'Mark as Sold') {
              setIsSoldModalOpen(true);
            }
          }}
        />
      ))}
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isRentedModalOpen}
        onClose={() => setIsRentedModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6 mt-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">
                Congratulations on finding a tenant!
              </h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Your property “[Property name]” now be marked as rented and moved to your archive
              </p>
            </div>
          </div>
          <div className="flex pb-6 gap-4">
            <Button
              label="Cancel"
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => {
                setIsRentedModalOpen(false);
              }}
            />
            <Button
              label="Confirm"
              onClick={() => {
                setIsRentedModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isSoldModalOpen}
        onClose={() => setIsSoldModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6 mt-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">
                Congratulations on your sale!
              </h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Your property “[Property name]” will now be marked as sold and moved to your archive
              </p>
            </div>
          </div>
          <div className="flex pb-6 gap-4">
            <Button
              label="Cancel"
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => {
                setIsSoldModalOpen(false);
              }}
            />
            <Button
              label="Confirm"
              onClick={() => {
                setIsSoldModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6 mt-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">
                Extend your listing
              </h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Your property “[Property name]” will stay active for another 60 days
              </p>
            </div>
          </div>
          <div className="flex pb-6 gap-4">
            <Button
              label="Cancel"
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => {
                setIsRenewModalOpen(false);
              }}
            />
            <Button
              label="Confirm"
              onClick={() => {
                setIsRenewModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <CheckIcon className="w-14 h-14 text-[var(--accent-green)] mt-6" />
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">Listing deleted</h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                “[Property name]” has been removed
              </p>
            </div>
          </div>
          <div className="flex pb-6">
            <Button
              label="Ok"
              onClick={() => {
                setIsSuccessModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <DeleteIcon className="w-14 h-14 text-[var(--error)] mt-6" />
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">Delete Listing</h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Are you sure you want to permanently delete “[Property name]”? This action cannot be
                undone.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" className="!font-medium" onClick={handleDeleteListing}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6">
            <DeleteIcon className="w-14 h-14 text-[var(--error)] mt-6" />
            <div className="flex flex-col items-center gap-4">
              <h1 className="title-xl text-[var(--color-black)] text-center">Delete Listing</h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                Are you sure you want to permanently delete “[Property name]”? This action cannot be
                undone.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" className="!font-medium" onClick={handleDeleteListing}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListingActionDropdown;
