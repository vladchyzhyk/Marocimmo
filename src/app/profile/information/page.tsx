'use client';

import ProfileForm from '@/app/profile/components/ProfileForm';
import { ArrowNextIcon } from '@/utils/icons';
import { useRouter } from 'next/navigation';
import SideMenu from '../components/SideMenu';

const ProfileInformationPage = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-4 lg:gap-8 px-4 py-6 md:py-8 mt-[6rem]">
      {/* Title and filters block */}
      <div className="flex flex-col gap-8">
        <div className="hidden md:flex flex-col">
          <h1 className="text-[var(--color-black)] title-xl">Profile Settings</h1>
          <p className="body-lg mt-1">Manage your account information and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="flex md:hidden items-center gap-2 cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <ArrowNextIcon className="w-6 h-6 rotate-180" />
            <p className="label-md-medium text-[var(--color-black)]">Back to Settings</p>
          </div>
          <div className="hidden md:flex w-full flex-col gap-2 md:max-w-[14.375rem] lg:max-w-[19.375rem]">
            <SideMenu />
          </div>

          <div className="flex-1">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformationPage;
