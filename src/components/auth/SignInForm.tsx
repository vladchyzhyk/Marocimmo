'use client';

import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  onSubmit?: (data: { email: string; password: string }) => void;
  className?: string;
};

const SignInForm = ({ onSubmit, className = '' }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit?.({ email: email.trim(), password });
  };

  return (
    <AuthFormWrapper
      title="Welcome"
      submitLabel={'Create account'}
      onSubmit={handleSubmit}
      className={className}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-center title-md mb-2 text-[var(--color-black)]">
            Create account with Email
          </div>
          <div className="flex flex-col gap-3">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              clearable
              onClear={() => setEmail('')}
              required
              error={errors.email}
            />
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
                  />
                ) : (
                  <Image
                    src="/icons/ic_closed_eye.svg"
                    alt="Show password"
                    width={24}
                    height={24}
                  />
                )
              }
              onRightIconClick={() => setShowPassword((v) => !v)}
            />
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
                  />
                ) : (
                  <Image
                    src="/icons/ic_closed_eye.svg"
                    alt="Show password"
                    width={24}
                    height={24}
                  />
                )
              }
              onRightIconClick={() => setShowPassword((v) => !v)}
            />
          </div>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default SignInForm;
