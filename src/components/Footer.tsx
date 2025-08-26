import classNames from 'classnames';
import Button from './ui/Button';

type FooterProps = {
  onContinue?: () => void;
  onBack?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const Footer = ({ onContinue, onBack, disabled = false, loading = false }: FooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-50">
      <div
        className={classNames(
          'w-full flex items-center gap-6 py-4 max-w-[1200px] mx-auto',
          onBack ? 'justify-between' : 'justify-end',
        )}
      >
        {onBack && (
          <Button className="max-w-24" onClick={onBack} variant="outline">
            Back
          </Button>
        )}

        <button
          onClick={onContinue}
          disabled={disabled || loading}
          className={`
            flex items-center justify-center gap-2 px-6 py-4 h-12
            bg-[var(--accent-green)] text-white rounded-lg
            button-lg-medium transition-colors
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
              <span>Continue</span>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Footer;
