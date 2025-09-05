import React from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'dangerBorderless'
  | 'ghost'
  | 'outline'
  | 'transparent';

type ButtonSize = 'lg' | 'md' | 'sm';

export type ButtonProps = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

const baseStyles =
  'inline-flex w-full items-center justify-center gap-2 rounded-[12px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-[var(--white)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'h-12 px-4 button-lg-bold md:h-10 md:px-3 lg:h-10 lg:px-3 xl:h-10 xl:px-3',
  md: 'h-10 px-4 button-lg-medium md:h-8 md:px-3 lg:h-8 lg:px-3 xl:h-8 xl:px-3',
  sm: 'h-9 px-3 label-sm-medium md:h-7 md:px-2 lg:h-7 lg:px-2 xl:h-7 xl:px-2',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent-green)] text-[var(--white)] border border-transparent hover:bg-[var(--primarybutton-hover)]',
  secondary: 'bg-[var(--pill-active-bg)] text-[var(--color-black)] hover:bg-[var(--border-input)]',
  danger: 'bg-[var(--error)] text-[var(--white)] hover:bg-[var(--errorbutton-hover)]',
  dangerBorderless: 'text-[var(--error)] border-none underline',
  ghost: 'bg-transparent text-[var(--color-black)] hover:bg-[var(--bg-tint)]',
  outline:
    'bg-transparent text-[var(--color-black)] border border-[var(--border)] hover:bg-[var(--bg-tint)]',
  transparent: 'bg-transparent text-[var(--accent-green)] hover:bg-[var(--bg-tint)]',
};

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const Button = ({
  label,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  disabled,
  loading,
  className = '',
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  children,
}: ButtonProps) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[baseStyles, sizeStyles[size], variantStyles[variant], widthClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <Spinner className="h-5 w-5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-3 xl:w-3 animate-spin" />
      ) : (
        <>
          {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
          {label ? <span className="truncate">{label}</span> : children}
          {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
        </>
      )}
    </button>
  );
};

export default Button;
