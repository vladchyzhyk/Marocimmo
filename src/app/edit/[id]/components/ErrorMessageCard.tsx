'use client';

import { WarningIcon } from '@/utils/icons';
import React from 'react';

type Props = {
  title?: string;
  description?: React.ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
  backLabel?: string;
  onBack?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

const ErrorMessageCard = ({ title = 'Something went wrong', className = '' }: Props) => {
  return (
    <div
      className={[
        'w-full bg-[var(--bg-tint)] border border-[var(--pill-expired-bg)] rounded-xl shadow-sm',
        'p-4 md:p-3 lg:p-4 xl:p-4',
        'flex items-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center text-center gap-2 md:gap-2 w-full">
        <WarningIcon className="w-5 h-5 text-[var(--error)]" />

        <h3 className="label-lg-medium text-[var(--error)]">{title}</h3>
      </div>
    </div>
  );
};

export default ErrorMessageCard;
