'use client';

import ProfileOptionCard from '@/components/profile/ProfileOptionCard';
import { AccountIcon, SecurityIcon } from '@/utils/icons';

const ProfilePage = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[6rem]">
      {/* Title and filters block */}
      <div className="flex flex-col gap-8 lg:gap-4">
        <div className="flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Profile Settings</h1>
          <p className="body-lg mt-1">Manage your account information and preferences</p>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-2">
            <ProfileOptionCard
              title="Personal Information"
              description="Update your personal details and profile photo"
              Icon={AccountIcon}
            />
            <ProfileOptionCard
              title="Password & Security"
              description="Manage your password and account security"
              Icon={SecurityIcon}
            />
          </div>
          <div>content</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
