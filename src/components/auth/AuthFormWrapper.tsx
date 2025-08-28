'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
  onSubmit?: (e: React.FormEvent) => void;
  submitLabel: string;
  children: React.ReactNode;
  className?: string;
  showSocial?: boolean;
};

const AuthFormWrapper = ({
  title,
  onSubmit,
  submitLabel,
  children,
  className = '',
  showSocial = true,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <form
      onSubmit={onSubmit}
      className={[
        'w-full flex flex-col gap-4 p-6 rounded-[24px] md:border bg-white md:border-[var(--border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col items-center gap-1">
        <h1 className="heading-h3 text-[var(--color-black)]">{title}</h1>
      </div>

      {showSocial ? (
        <div className="flex flex-col gap-2">
          <Button className="bg-[var(--color-black)]" variant="primary" size="lg" fullWidth>
            <Image src="/icons/ic_google.svg" alt="google" width={20} height={20} /> Continue with
            Google
          </Button>
          <Button className="bg-[var(--color-black)]" variant="primary" size="lg" fullWidth>
            <Image src="/icons/ic_apple.svg" alt="apple" width={20} height={20} /> Continue with
            Apple
          </Button>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="body-md text-[var(--color-black)]">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {children}
      <Button className="text-center title-md text-[var(--accent-green)]" type="submit">
        {submitLabel}
      </Button>
      <button
        className="text-center title-md text-[var(--accent-green)] cursor-pointer underline"
        onClick={(e) => {
          e.preventDefault();
          router.push(pathname === '/sign-in' ? '/sign-up' : '/sign-in');
        }}
      >
        {pathname === '/sign-in' ? 'Log in' : 'Create account'}
      </button>
    </form>
  );
};

export default AuthFormWrapper;
