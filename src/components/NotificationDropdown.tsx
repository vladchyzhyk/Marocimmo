import { CloseIcon } from '@/utils/icons';
import classNames from 'classnames';
import React from 'react';

type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  isRead?: boolean;
};

type NotificationsDropdownProps = {
  isOpen?: boolean;
  onClose?: () => void;
  notifications?: NotificationItem[];
  onMarkAllRead?: () => void;
  onItemClick?: (id: string) => void;
  onViewAll?: () => void;
};

const defaultNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Listing expired',
    description:
      'Your listing “Modern Apartment in Casablanca” has expired. Renew it to keep attracting buyers.',
    isRead: false,
  },
  {
    id: '2',
    title: 'Listing rejected',
    description:
      'Your listing “Modern Apartment in Casablanca” has rejected. Photos don’t reflect the real property. Please upload correct ones',
    isRead: false,
  },
  {
    id: '3',
    title: 'Listing approved',
    description: 'Your listing “Modern Apartment in Casablanca” has been approved and is now live',
    isRead: false,
  },
  {
    id: '4',
    title: 'Complete your draft',
    description:
      'Your draft “Modern Apartment in Casablanca” is waiting to be completed. Publish it to go live',
    isRead: true,
  },
];

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen = false,
  onClose,
  notifications,
  onItemClick,
}) => {
  if (!isOpen) return null;

  const items = notifications && notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <div className="relative w-full py-2 bg-white border border-[var(--border)] rounded-[16px] shadow-[0px_0px_0px_1px_rgba(233,233,233,1),0px_8px_24px_2px_rgba(23,23,23,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <span className="label-lg-medium text-[var(--color-black)]">
          Notification <span className="label-lg-medium text-[var(--accent-green)]">(3 new)</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-2.75 bg-white border border-[var(--border)] rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-tint)] transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col max-h-[22rem] overflow-y-auto scrollbar-none py-2">
        {items.map((item, index) => {
          return (
            <>
              <button
                key={item.id + index}
                onClick={() => onItemClick?.(item.id)}
                className={classNames(
                  'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                  'hover:bg-white',
                )}
              >
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                  <div
                    className={classNames(
                      'label-lg-medium text-[var(--color-black)] truncate',

                      item.title === 'Listing expired' && '!text-[var(--error)]',
                      item.title === 'Listing rejected' && '!text-[var(--error)]',
                      item.title === 'Listing approved' && '!text-[var(--accent-green)]',
                      item.isRead && '!text-[var(--text-body-tint)]',
                    )}
                  >
                    {item.title}
                  </div>
                  {item.description && (
                    <div
                      className={classNames(
                        'label-md-medium text-[var(--color-black)]',
                        item.isRead && 'text-[var(--text-pill)]',
                      )}
                    >
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
              {/* Divider */}
              {index !== items.length - 1 && (
                <div className="w-full h-px border-t border-[var(--border)]" />
              )}
            </>
          );
        })}
        {items.length === 0 && (
          <div className="px-4 py-6 text-center body-lg text-[var(--color-black)] opacity-70">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;
