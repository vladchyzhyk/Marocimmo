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

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isEmailValid = isValidEmail(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email.trim())) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit?.({ email: email.trim(), password });
  };

  const guardSubmit = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email.trim())) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
  };

  return (
    <AuthFormWrapper
      title="Welcome"
      submitLabel={'Continue'}
      onSubmit={handleSubmit}
      className={className}
      submitDisabled={!email.trim() || !isEmailValid || !password.trim() || password.length < 8}
      onSubmitGuard={guardSubmit}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-center title-md mb-2 text-[var(--color-black)]">
            Log in with Email
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
          </div>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default SignInForm;
