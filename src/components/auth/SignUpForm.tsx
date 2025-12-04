'use client';

import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

import React, { useState } from 'react';

type Props = {
  onSubmit?: (data: { email: string; password: string }) => void;
  className?: string;
  hideSwitchButton?: boolean;
};

const SignUpForm = ({ onSubmit, className = '', hideSwitchButton = false }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isEmailValid = isValidEmail(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email.trim())) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
  };

  return (
    <AuthFormWrapper
      title="Welcome"
      submitLabel="Create account"
      onSubmit={handleSubmit}
      className={className}
      submitDisabled={
        !email.trim() ||
        !isEmailValid ||
        !password.trim() ||
        password.length < 8 ||
        !confirmPassword.trim() ||
        password !== confirmPassword
      }
      onSubmitGuard={guardSubmit}
      hideSwitchButton={hideSwitchButton}
    >
      <div className="flex flex-col gap-4 md:gap-3 lg:gap-3 xl:gap-3">
        <div>
          <div className="flex items-center justify-center title-md mb-2 md:mb-1 lg:mb-2 xl:mb-2 text-[var(--color-black)]">
            Create account with Email
          </div>
          <div className="flex flex-col gap-4 md:gap-3 lg:gap-3 xl:gap-3">
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
            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              clearable
              onClear={() => setConfirmPassword('')}
              required
              error={errors.confirmPassword}
              rightIcon={
                showConfirmPassword ? (
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
              onRightIconClick={() => setShowConfirmPassword((v) => !v)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="label-md-medium text-[var(--accent-green)] underline"
            onClick={() => {
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
        widthClassName="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl !mx-4 md:!mx-0"
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
    </AuthFormWrapper>
  );
};

export default SignUpForm;
