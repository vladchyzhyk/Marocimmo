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
    <div className="bg-white flex items-center justify-center sm:min-h-[100vh-20rem] md:min-h-[100vh-7rem] mt-[7rem] mb-[2rem]">
      <SignInForm className="w-full max-w-[22rem] sm:max-w-[25.875rem]" />
    </div>
  );
}
