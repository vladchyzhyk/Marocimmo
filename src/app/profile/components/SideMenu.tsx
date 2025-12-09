'use client';
import ProfileOptionCard from '@/components/profile/ProfileOptionCard';
import { AccountIcon, Favorite, NotificationIcon, SecurityIcon } from '@/utils/icons';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

export default function SideMenu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <ProfileOptionCard
        title="Saved Properties"
        description="View and manage all properties you’ve added to favorites"
        Icon={() => (
          <Favorite
            className={classNames(
              'w-6 h-6',
              pathname === '/profile/favorites'
                ? 'stroke-[var(--accent-green)]'
                : 'stroke-[var(--color-black)]',
            )}
          />
        )}
        isSelected={pathname === '/profile/favorites'}
        onClick={() => router.push('/profile/favorites')}
      />
      <ProfileOptionCard
        title="Saved Filters"
        description="Manage your saved filters and get notified about new properties profile photo"
        Icon={NotificationIcon}
        isSelected={pathname === '/profile/saved-filters'}
        onClick={() => router.push('/profile/saved-filters')}
      />
      <ProfileOptionCard
        title="Personal Information"
        description="Update your personal details and profile photo"
        Icon={AccountIcon}
        isSelected={pathname === '/profile/information'}
        onClick={() => router.push('/profile/information')}
      />
      <ProfileOptionCard
        title="Password & Security"
        description="Manage your password and account security"
        Icon={SecurityIcon}
        isSelected={pathname === '/profile/security'}
        onClick={() => router.push('/profile/security')}
      />
    </>
  );
}
