'use client';

import { StatusLabel } from '@/components/ListingCard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { AppleIcon, CheckIcon, GoogleIcon, WarningIcon } from '@/utils/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const maskEmailAddress = (address: string): string => {
  const [local, domain] = address.split('@');
  if (!local || !domain) return address;
  const firstChar = local.charAt(0);
  const lastTwo = local.length > 2 ? local.slice(-2) : '';
  return `${firstChar}***${lastTwo}@${domain}`;
};

const SecurityContent = () => {
  const router = useRouter();
  const [email, setEmail] = useState('test@test.com');
  const [draftEmail, setDraftEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [draftCurrentPassword, setDraftCurrentPassword] = useState('');
  const [draftNewPassword, setDraftNewPassword] = useState('');
  const [draftConfirmPassword, setDraftConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [googleConnected] = useState(true);
  const [appleConnected] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [errors] = useState({ password: '' });

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleStartEditEmail = () => {
    setDraftEmail('');
    setIsEditingEmail(true);
  };

  const handleSaveEmail = () => {
    const next = draftEmail.trim();
    setEmail(next);
    setIsEditingEmail(false);
    console.log({ email: next });
  };

  const handleStartEditPassword = () => {
    setDraftCurrentPassword('');
    setDraftNewPassword('');
    setDraftConfirmPassword('');
    setIsEditingPassword(true);
  };

  const isPasswordValid = (() => {
    const hasLength = draftNewPassword.length >= 8;
    const hasLetter = /[A-Za-z]/.test(draftNewPassword);
    const hasNumber = /\d/.test(draftNewPassword);
    const matches = draftNewPassword === draftConfirmPassword;
    const notSameAsCurrent = draftCurrentPassword && draftCurrentPassword !== draftNewPassword;
    return (
      Boolean(draftCurrentPassword) &&
      hasLength &&
      hasLetter &&
      hasNumber &&
      matches &&
      notSameAsCurrent
    );
  })();

  const handleSavePassword = () => {
    if (!isPasswordValid) return;
    console.log({ currentPassword: draftCurrentPassword, newPassword: draftNewPassword });
    setIsEditingPassword(false);
    setDraftCurrentPassword('');
    setDraftNewPassword('');
    setDraftConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
    console.log('account deleted');
  };

  return (
    <div className="flex-1 flex flex-col gap-8">
      {/* Email address */}
      <div className="rounded-[16px] border border-[var(--border)] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="title-lg text-[var(--color-black)]">
                {isEditingEmail ? 'Change Email Address' : 'Email address'}
              </h3>
              <p className="body-md text-[var(--text-pill)]">
                {isEditingEmail
                  ? 'Update the email address associated with your account'
                  : 'You connect with this Email'}
              </p>
            </div>

            {isEditingEmail ? (
              <div className="md:flex hidden">
                <Button
                  label="Save changes"
                  size="lg"
                  fullWidth={false}
                  onClick={handleSaveEmail}
                  disabled={
                    !/^\S+@\S+\.\S+$/.test(draftEmail.trim()) || draftEmail.trim() === email.trim()
                  }
                />
              </div>
            ) : (
              <Button
                label="Change Email"
                variant="outline"
                size="lg"
                className="!w-fit !bg-[var(--bg-tint)] !font-medium"
                fullWidth={false}
                onClick={handleStartEditEmail}
              />
            )}
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex-1">
              <Input
                id="currentEmail"
                label="Current Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
            {isEditingEmail && (
              <div className="flex-1">
                <Input
                  id="newEmail"
                  label="New Email Address"
                  type="email"
                  value={draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            )}
            {isEditingEmail && (
              <div className="md:hidden flex">
                <Button
                  label="Save changes"
                  size="lg"
                  fullWidth={false}
                  onClick={handleSaveEmail}
                  disabled={
                    !/^\S+@\S+\.\S+$/.test(draftEmail.trim()) || draftEmail.trim() === email.trim()
                  }
                />
              </div>
            )}
            {!isEditingEmail && <div className="flex-1 flex flex-col gap-2"></div>}
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="rounded-[16px] border border-[var(--border)] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <div className="flex flex-col gap-2">
              <h3 className="title-lg text-[var(--color-black)]">
                {isEditingPassword ? 'Change Password' : 'Password'}
              </h3>
              <p className="body-md text-[var(--text-pill)]">
                {isEditingPassword
                  ? 'Update the password associated with your account'
                  : 'You protect your account with a password'}
              </p>
            </div>
            {isEditingPassword ? (
              <div className="md:flex hidden gap-4">
                {/* <Button
                  label="Cancel"
                  variant="outline"
                  size="lg"
                  className="!w-fit !bg-[var(--bg-tint)] !font-medium"
                  fullWidth={false}
                  onClick={handleCancelEditPassword}
                /> */}
                <Button
                  label="Save changes"
                  size="lg"
                  fullWidth={false}
                  onClick={handleSavePassword}
                  disabled={!isPasswordValid}
                />
              </div>
            ) : (
              <Button
                label="Change Password"
                variant="outline"
                size="lg"
                className=" md:!w-fit !bg-[var(--bg-tint)] !font-medium"
                fullWidth={false}
                onClick={handleStartEditPassword}
              />
            )}
          </div>

          {isEditingPassword && (
            <div className="flex justify-between gap-4">
              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <Input
                  id="currentPassword"
                  label="Current Password"
                  type={isEditingPassword ? (showCurrent ? 'text' : 'password') : 'password'}
                  value={isEditingPassword ? draftCurrentPassword : '********'}
                  onChange={(e) => setDraftCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  rightIcon={
                    isEditingPassword ? (
                      <Image
                        src={showCurrent ? '/icons/ic_opened_eye.svg' : '/icons/ic_closed_eye.svg'}
                        alt="toggle visibility"
                        width={24}
                        height={24}
                      />
                    ) : undefined
                  }
                  onRightIconClick={isEditingPassword ? () => setShowCurrent((v) => !v) : undefined}
                  required
                  disabled={!isEditingPassword}
                />
                {isEditingPassword && (
                  <div
                    className="flex-1 flex lg:hidden flex-col gap-2 underline body-md !font-semibold text-[var(--accent-green)]"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setIsForgotOpen(true);
                    }}
                  >
                    Forgot password?
                  </div>
                )}
                <Input
                  id="newPassword"
                  label="New Password"
                  type={showNew ? 'text' : 'password'}
                  value={draftNewPassword}
                  onChange={(e) => setDraftNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  rightIcon={
                    <Image
                      src={showNew ? '/icons/ic_opened_eye.svg' : '/icons/ic_closed_eye.svg'}
                      alt="toggle visibility"
                      width={24}
                      height={24}
                    />
                  }
                  onRightIconClick={() => setShowNew((v) => !v)}
                  required
                />
                <Input
                  id="confirmPassword"
                  label="Confirm New Password"
                  type={showConfirm ? 'text' : 'password'}
                  value={draftConfirmPassword}
                  onChange={(e) => setDraftConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  rightIcon={
                    <Image
                      src={showConfirm ? '/icons/ic_opened_eye.svg' : '/icons/ic_closed_eye.svg'}
                      alt="toggle visibility"
                      width={24}
                      height={24}
                    />
                  }
                  onRightIconClick={() => setShowConfirm((v) => !v)}
                  required
                />
                <div className="w-full md:hidden">
                  <Button
                    label="Set new password"
                    size="lg"
                    fullWidth={false}
                    onClick={handleSavePassword}
                    disabled={!isPasswordValid}
                  />
                </div>
              </div>

              {!isEditingPassword && <div className="flex-1 flex flex-col gap-2"></div>}
            </div>
          )}
          {isEditingPassword && (
            <div
              onClick={() => {
                setIsDeleteModalOpen(false);
                setIsForgotOpen(true);
              }}
              className="hidden lg:flex flex-1 flex-col gap-2 underline body-md !font-semibold text-[var(--accent-green)]"
            >
              Forgot password?
            </div>
          )}
        </div>
      </div>

      {/* Log in with */}
      <div className="rounded-[16px] border border-[var(--border)] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col divide-y gap-4 divide-[var(--border)]">
            <div className="relative flex flex-col md:flex-row md:items-center justify-between py-4 gap-4 md:gap-0">
              <div className="flex flex-col gap-2">
                <h3 className="title-lg text-[var(--color-black)]">Log in with</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-1.75 rounded-[10px] bg-white border border-[#E5E7EB]">
                    <GoogleIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="button-lg-medium text-[var(--color-black)]">Google</span>
                    <span className="label-sm-medium text-[var(--text-body-tint)]">
                      {googleConnected ? email : 'Sign in with Google'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-fit flex items-center gap-6 lg:gap-8">
                {googleConnected && (
                  <div className="absolute top-2 right-1 md:top-0 md:right-0 md:static">
                    <StatusLabel status="connected" />
                  </div>
                )}
                <Button
                  variant="outline"
                  className="!hidden md:!flex !font-medium !bg-[var(--bg-tint)] !w-fit hover:!bg-white"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  {googleConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
              <Button
                variant="outline"
                className="!flex md:!hidden !font-medium !bg-[var(--bg-tint)] hover:!bg-white"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                {googleConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4 md:gap-0">
              <div className="flex flex-col gap-2">
                <h3 className="title-lg text-[var(--color-black)]">Log in with</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-1.75 rounded-[10px] bg-[var(--color-black)] border border-[var(--border)]">
                    <AppleIcon className="w-4 h-4 text-[var(--color-white)]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="button-lg-medium text-[var(--color-black)]">Apple</span>
                    <span className="label-sm-medium text-[var(--text-body-tint)]">
                      {appleConnected ? email : 'Sign in with Apple ID'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-fit flex items-center gap-8">
                {appleConnected && (
                  <div className="absolute top-2 right-1 md:top-0 md:right-0 md:static">
                    <StatusLabel status="connected" />
                  </div>
                )}
                <Button
                  variant="outline"
                  className="!hidden md:!flex !font-medium !bg-[var(--bg-tint)] !w-fit hover:!bg-white"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  {appleConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
              <Button
                variant="outline"
                className="!flex md:!hidden !font-medium !bg-[var(--bg-tint)] hover:!bg-white"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                {appleConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete account */}
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 rounded-[16px] border border-[#FFC9C9] bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <WarningIcon className="w-6 h-6 text-[#82181A]" />
            <h3 className="title-md text-[var(--color-black)]">Delete account</h3>
          </div>
          <p className="body-md text-[var(--text-pill)]">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <div className="w-full md:w-fit flex md:items-center justify-center">
          <Button
            label="Deactivate"
            variant="dangerBorderless"
            className="!w-fit !px-0"
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
      </div>

      <Modal
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center gap-6 md:gap-4 lg:gap-4 xl:gap-4">
          <div className="flex flex-col items-center gap-4 md:gap-3 lg:gap-3 xl:gap-3 px-7">
            <h1 className="title-xl text-[var(--color-black)]">Delete account</h1>
            <p className="body-lg text-center text-[var(--color-black)]">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="body-lg text-[var(--color-black)]">
              Email: {maskEmailAddress(email)}
            </div>
            <div className="flex flex-col gap-4">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                clearable
                onClear={() => setPassword('')}
                required
                error={errors.password}
                rightIcon={
                  showPassword ? (
                    <Image
                      src="/icons/ic_opened_eye.svg"
                      alt="Show password"
                      width={24}
                      height={24}
                      className="md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
                    />
                  ) : (
                    <Image
                      src="/icons/ic_closed_eye.svg"
                      alt="Show password"
                      width={24}
                      height={24}
                      className="md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
                    />
                  )
                }
                onRightIconClick={() => setShowPassword((v) => !v)}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="label-md-semibold text-[14px] leading-[1.4] text-[var(--accent-green)] underline"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setIsForgotOpen(true);
                  }}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          {/* Delete account */}
          <div className="flex flex-col gap-2 w-full rounded-[10px] border border-[var(--pill-expired-bg)] bg-[#FAFAFA] p-4">
            <div className="flex items-center gap-2">
              <WarningIcon className="w-4 h-4 text-[#82181A]" />
              <span className="text-[14px] leading-[1.1] font-medium text-[#A82727]">
                This will permanently delete your account
              </span>
            </div>
            <div className="flex flex-col gap-[6px] px-[7px]">
              <ul className="list-disc list-inside">
                <li className="text-[12px] leading-[1.4] text-[#A82727]">
                  All your property listings will be removed
                </li>
                <li className="text-[12px] leading-[1.4] text-[#A82727]">
                  Your profile and personal information will be deleted
                </li>
                <li className="text-[12px] leading-[1.4] text-[#A82727]">
                  You will lose access to all saved searches and favorites
                </li>
                <li className="text-[12px] leading-[1.4] text-[#A82727]">
                  This action cannot be reversed
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Button variant="danger" className="!font-medium" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <Button
              variant="outline"
              className="!font-medium !bg-[var(--bg-tint)] hover:!bg-white"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
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
              <h1 className="title-xl text-[var(--color-black)] text-center">
                Your account has been permanently deleted.
              </h1>
              <p className="body-lg text-center text-[var(--color-black)]">
                We’re sorry to see you go. You can always create a new account if you decide to
                return
              </p>
            </div>
          </div>
          <div className="flex pb-6">
            <Button
              label="Ok"
              onClick={() => {
                setTimeout(() => {
                  router.push('/sign-up');
                }, 200);
                setIsSuccessModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotOpen}
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        onClose={() => setIsForgotOpen(false)}
        title="Password recovery"
        actionChildren={
          <>
            <Button variant="secondary" onClick={() => setIsForgotOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!resetEmail.trim()) return;
                setIsForgotOpen(false);
                setIsConfirmOpen(true);
              }}
            >
              Continue
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3 md:gap-2 lg:gap-3 xl:gap-3">
          <p className="body-md text-[var(--text-body-tint)]">
            Enter the email associated with your account and we will send you a link to reset your
            password.
          </p>
          <Input
            id="reset-email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            clearable
            onClear={() => setResetEmail('')}
            required
          />
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmOpen}
        widthClassName="w-full max-w-[24.5rem] !mx-4 md:!mx-0"
        onClose={() => setIsConfirmOpen(false)}
        title="Check your email"
        actionChildren={
          <Button onClick={() => setIsConfirmOpen(false)} variant="primary">
            Return
          </Button>
        }
      >
        <div className="flex flex-col gap-3 md:gap-2 lg:gap-3 xl:gap-3">
          <p className="body-md text-[var(--color-black)]">
            We&apos;ve sent you an email with instructions to reset your password. Check your inbox
            and follow the steps there
          </p>
          <p className="body-md text-[var(--color-black)]">
            Not your request? Or want to log in to another account? Select Return to login
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SecurityContent;
