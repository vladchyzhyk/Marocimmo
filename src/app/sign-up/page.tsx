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
    <div className="bg-white flex md:items-center justify-center">
      <SignUpForm className="w-full max-w-[25.875rem]" />
    </div>
  );
}
