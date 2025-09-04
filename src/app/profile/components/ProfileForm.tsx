import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import PhoneInput from '@/components/ui/PhoneInput';
import { UploadIcon } from '@/utils/icons';
import { cleanupImagePreview, processImageUpload } from '@/utils/imageUtils';
import classNames from 'classnames';
import React from 'react';

const ProfileForm = () => {
  const [agencyName, setAgencyName] = React.useState('Bonton Real Estate');
  const [contactPerson, setContactPerson] = React.useState('Leila');
  const [phoneNumber, setPhoneNumber] = React.useState('5678967453');
  const [officeAddress, setOfficeAddress] = React.useState('');

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [savedAvatarUrl, setSavedAvatarUrl] = React.useState<string | null>(null);
  const previousAvatarUrlRef = React.useRef<string | null>(null);
  const externalFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (file: File) => {
    const result = processImageUpload(file);
    if (!result) return;

    if (previousAvatarUrlRef.current) {
      cleanupImagePreview(previousAvatarUrlRef.current);
    }
    previousAvatarUrlRef.current = result.previewUrl;
    setAvatarUrl(result.previewUrl);
  };

  const handleDeleteAvatar = () => {
    if (previousAvatarUrlRef.current) {
      cleanupImagePreview(previousAvatarUrlRef.current);
      previousAvatarUrlRef.current = null;
    }
    setAvatarUrl(null);
  };

  const triggerExternalFileDialog = () => {
    externalFileInputRef.current?.click();
  };

  const handleExternalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAvatarUpload(file);
    if (externalFileInputRef.current) {
      externalFileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    return () => {
      if (previousAvatarUrlRef.current) {
        cleanupImagePreview(previousAvatarUrlRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    console.log({ agencyName, contactPerson, phoneNumber, officeAddress });
    // Mark current avatar as saved to remove the button with reverse animation
    setSavedAvatarUrl(avatarUrl);
  };

  return (
    <div
      className={classNames(
        'flex-1 flex flex-col gap-6 rounded-[16px] border border-[var(--border)] bg-white p-4 lg:p-6',
      )}
    >
      <div className="flex lg:hidden justify-between">
        <div className="flex flex-col">
          <h1 className="text-[var(--color-black)] title-lg">Personal Information</h1>
          <p className="body-md mt-1 text-[var(--text-pill)]">
            You can update your personal details
          </p>
        </div>
        <div className={classNames('hidden md:flex justify-end')}>
          <div
            className={classNames(
              'w-full md:max-w-[200px] transition-all duration-300',
              avatarUrl !== savedAvatarUrl
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none',
            )}
          >
            <Button label="Save changes" onClick={handleSave} />
          </div>
        </div>
      </div>
      {/* Upload area */}
      <div className="w-full flex justify-between gap-4">
        <div className="flex gap-4 lg:gap-6 items-center md:items-end">
          <IconButton
            variant={avatarUrl ? 'with-photo' : 'base'}
            label={avatarUrl ? undefined : 'No Avatar'}
            imageUrl={avatarUrl || undefined}
            onImageUpload={handleAvatarUpload}
            isDeleteButtonOverlay={true}
            onDelete={avatarUrl ? handleDeleteAvatar : undefined}
            deleteButtonClassName="w-10 h-10 flex items-center justify-center !bg-white"
            showDeleteButton={false}
            className="w-[6.25rem] h-[6.25rem] object-cover flex justify-center items-center"
          />
          <div className="flex flex-col gap-2.5">
            <div
              className="flex items-center gap-2 px-4 w-fit rounded-[8px]  h-12 bg-[var(--bg-tint)] border border-[var(--border)] cursor-pointer"
              onClick={triggerExternalFileDialog}
              role="button"
              tabIndex={0}
            >
              <UploadIcon className="w-4 h-4 text-[var(--color-black)]" />
              <span className="button-lg-medium text-[var(--color-black)] whitespace-nowrap">
                Upload new photo
              </span>
            </div>
            <input
              ref={externalFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleExternalFileChange}
              className="hidden"
            />
            <div className="label-sm-medium text-[var(--text-body-tint)] lg:whitespace-nowrap">
              JPG, GIF or PNG. Max size of 5MB.
            </div>
          </div>
        </div>
        <div className={classNames('lg:flex hidden justify-end')}>
          <div
            className={classNames(
              'w-full md:max-w-[200px] transition-all duration-300',
              avatarUrl !== savedAvatarUrl
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none',
            )}
          >
            <Button label="Save changes" onClick={handleSave} />
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <Input
            id="agencyName"
            label="Agency name"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            placeholder="Enter agency name"
          />
          <Input
            id="contactPerson"
            label="Contact person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="Enter contact person"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <PhoneInput
            label="Contact phone number"
            required
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          <div
            className={classNames(
              'flex flex-col transition-all duration-300',
              avatarUrl !== savedAvatarUrl ? 'gap-4' : 'gap-0',
            )}
          >
            <Input
              id="officeAddress"
              label="Office address"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              placeholder="Enter office location"
              variant="address"
            />
            <div
              className={classNames(
                'flex lg:hidden min-h-0 transition-all duration-300',
                avatarUrl !== savedAvatarUrl ? 'h-auto' : 'h-0',
              )}
            >
              <div
                className={classNames(
                  'w-full transition-all duration-300',
                  avatarUrl !== savedAvatarUrl
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none',
                )}
              >
                <Button label="Save changes" onClick={handleSave} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
