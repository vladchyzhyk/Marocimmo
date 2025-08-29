'use client';
import SignInForm from '@/components/auth/SignInForm';
import { user } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    if (user.isLoggedIn) router.push('/');
  }, [router]);
  return (
    <div className="bg-white flex md:items-center justify-center">
      <SignInForm className="w-full max-w-[25.875rem] mt-[7.25rem] md:mt-0" />
    </div>
  );
}
