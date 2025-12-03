'use client';

import { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import SignInForm from './auth/SignInForm';
import SignUpForm from './auth/SignUpForm';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
};

export const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const handleSignInSubmit = (data: { email: string; password: string }) => {
    console.log('Sign in:', data);
    onClose();
  };

  const handleSignUpSubmit = (data: { email: string; password: string }) => {
    console.log('Sign up:', data);
    onClose();
  };

  const handleSwitchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      widthClassName="w-full max-w-[22rem] sm:max-w-[25.875rem] !mx-4 md:!mx-0"
      className="p-0"
    >
      {mode === 'signin' ? (
        <SignInForm onSubmit={handleSignInSubmit} hideSwitchButton />
      ) : (
        <SignUpForm onSubmit={handleSignUpSubmit} hideSwitchButton />
      )}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleSwitchMode}
          className="text-center title-md text-[var(--accent-green)] cursor-pointer underline w-full"
        >
          {mode === 'signin' ? 'Create account' : 'Log in'}
        </button>
      </div>
    </Modal>
  );
};
