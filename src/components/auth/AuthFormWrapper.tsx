'use client';

import Button from '@/components/ui/Button'
import { AppleIcon, GoogleIcon } from '@/utils/icons'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  title: string;
  onSubmit?: (e: React.FormEvent) => void;
  submitLabel: string;
  children: React.ReactNode;
  className?: string;
  showSocial?: boolean;
  submitDisabled?: boolean;
  onSubmitGuard?: () => void;
};

const AuthFormWrapper = ({
  title,
  onSubmit,
  submitLabel,
  children,
  className = '',
  showSocial = true,
  submitDisabled = false,
  onSubmitGuard,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <form
      onSubmit={onSubmit}
      className={[
        'w-full flex flex-col gap-4 p-4 md:gap-3 md:p-3 lg:gap-4 lg:p-4 xl:gap-4 xl:p-4 rounded-[24px] md:rounded-[24px] lg:rounded-[24px] xl:rounded-[24px] md:border bg-white md:border-[var(--border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col items-center gap-1 md:gap-0.5 lg:gap-1 xl:gap-1">
        <h1 className="heading-h3 text-[var(--color-black)]">{title}</h1>
      </div>

      {showSocial ? (
        <div className="flex flex-col gap-2 md:gap-1 lg:gap-2 xl:gap-2">
          <Button className="bg-[var(--color-black)]" variant="primary" size="lg" fullWidth>
            <GoogleIcon className="w-4 h-4"/> Continue with
            Google
          </Button>
          <Button className="bg-[var(--color-black)]" variant="primary" size="lg" fullWidth>
            <AppleIcon className="w-4 h-4"/> Continue with
            Apple
          </Button>
        </div>
      ) : null}

      <div className="flex items-center gap-2 md:gap-1 lg:gap-2 xl:gap-2">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="body-md text-[var(--color-black)]">or</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {children}
      {submitDisabled ? (
        <Button
          className="text-center title-md text-[var(--accent-green)]"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onSubmitGuard?.();
          }}
        >
          {submitLabel}
        </Button>
      ) : (
        <Button className="text-center title-md text-[var(--accent-green)]" type="submit">
          {submitLabel}
        </Button>
      )}
      <button
        className="text-center title-md text-[var(--accent-green)] cursor-pointer underline"
        onClick={(e) => {
          e.preventDefault();
          router.push(pathname === '/sign-in' ? '/sign-up' : '/sign-in');
        }}
      >
        {pathname === '/sign-up' ? 'Log in' : 'Create account'}
      </button>
    </form>
  );
};

export default AuthFormWrapper;
