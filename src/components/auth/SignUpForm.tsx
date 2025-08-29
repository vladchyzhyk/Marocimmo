'use client';

import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

import React, { useState } from 'react';

type Props = {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  className?: string;
};

const SignUpForm = ({ onSubmit, className = '' }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isEmailValid = isValidEmail(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email.trim())) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit?.({ name: name.trim(), email: email.trim(), password });
  };

  const guardSubmit = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email.trim())) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
  };

  return (
    <div className="h-full min-h-screen w-full flex justify-center items-center">
      <AuthFormWrapper
        title="Welcome"
        submitLabel="Continue"
        onSubmit={handleSubmit}
        className={className}
        submitDisabled={
          !name.trim() || !email.trim() || !isEmailValid || !password.trim() || password.length < 8
        }
        onSubmitGuard={guardSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-center title-md mb-2 text-[var(--color-black)]">
              Log in with Email
            </div>
            <div className="flex flex-col gap-3">
              <Input
                id="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                clearable
                onClear={() => setName('')}
                required
                error={errors.name}
              />
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

          <div className="flex justify-end">
            <button
              type="button"
              className="label-md-medium text-[var(--accent-green)] underline"
              onClick={() => {
                setResetEmail(email);
                setIsForgotOpen(true);
              }}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <Modal
          isOpen={isForgotOpen}
          widthClassName="w-full max-w-[24.5rem] !mx-4 md:!px-10 lg:!px-0"
          onClose={() => setIsForgotOpen(false)}
          title="Forgot password"
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
          <div className="flex flex-col gap-3">
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
          widthClassName="w-full max-w-[24.5rem]"
          onClose={() => setIsConfirmOpen(false)}
          title="Check your email"
          actionChildren={
            <Button onClick={() => setIsConfirmOpen(false)} variant="primary">
              Return
            </Button>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="body-md text-[var(--color-black)]">
              We’ve sent you an email with instructions to reset your password. Check your inbox and
              follow the steps there
            </p>
            <p className="body-md text-[var(--color-black)]">
              Not your request? Or want to log in to another account? Select Return to login
            </p>
          </div>
        </Modal>
      </AuthFormWrapper>
    </div>
  );
};

export default SignUpForm;
