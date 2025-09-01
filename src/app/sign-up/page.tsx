'use client';
import SignUpForm from '@/components/auth/SignUpForm';
import { user } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    if (user.isLoggedIn) router.push('/');
  }, [router]);
  return (
    <div className="bg-white flex items-center justify-center sm:min-h-[100vh-20rem] md:min-h-[100vh-7rem] mt-[7rem] mb-[2rem]">
      <SignUpForm className="w-full max-w-[22rem] sm:max-w-[25.875rem]" />
    </div>
  );
}
