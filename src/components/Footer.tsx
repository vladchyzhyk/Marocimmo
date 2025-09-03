import { ArrowNextIcon } from '@/utils/icons';
import classNames from 'classnames';
import Button from './ui/Button';

type FooterProps = {
  type?: 'edit' | 'add';
  currentStep?: number;
  allSteps?: number;
  onContinue?: () => void;
  onBack?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const Footer = ({
  type = 'add',
  currentStep,
  allSteps,
  onContinue,
  onBack,
  disabled = false,
  loading = false,
}: FooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-[35] px-4 md:px-4">
      <div
        className={classNames(
          'w-full flex items-center gap-6 py-4 md:py-3 lg:py-4 xl:py-4 max-w-[1200px] mx-auto',
          onBack ? 'justify-between' : 'justify-end',
        )}
      >
        {onBack && (
          <Button className="!w-fit" onClick={onBack} variant="outline">
            <ArrowNextIcon className="w-4 h-4 text-black rotate-180" />
            {type === 'edit' ? 'Cancel' : 'Back'}
          </Button>
        )}
        {type !== 'edit' && currentStep && allSteps && currentStep > 0 && (
          <div className="md:hidden flex items-center justify-center button-lg-bold">
            <span className="text-[var(--accent-green)]">{currentStep}</span>/{allSteps}
          </div>
        )}
        <Button
          onClick={onContinue}
          disabled={disabled || loading}
          className={`
            flex items-center justify-center gap-2 !w-fit
            bg-[var(--accent-green)] text-white rounded-lg
            button-lg-medium transition-colors whitespace-nowrap
            hover:bg-[var(--primarybutton-hover)]
            disabled:opacity-60 disabled:cursor-not-allowed
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {loading ? (
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <>
              <span>{type === 'edit' ? 'Save and Exit' : 'Continue'}</span>
              <ArrowNextIcon className="w-6 h-6" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
