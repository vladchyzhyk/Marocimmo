import classNames from 'classnames';

interface Step {
  id: string;
  title: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressBar = ({ steps, currentStep, className = '' }: ProgressBarProps) => {
  return (
    <div className={`flex flex-col gap-2 py-2 mt-5 ${className}`}>
      {/* Steps Display */}
      <div className="flex justify-stretch items-stretch gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex justify-center items-center gap-1 flex-1">
            <span
              className={classNames(
                'label-md-medium text-center transition-colors duration-300',
                index < currentStep - 1 && 'text-[var(--accent-green)]',
                index === currentStep - 1 && 'text-[var(--color-black)]',
                index > currentStep - 1 && 'text-[var(--text-body-tint)]',
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-1">
        {/* Filled progress sections */}
        {steps.map((_, index) => (
          <div
            key={index}
            className={classNames(
              'h-1.5 rounded-full transition-all duration-500 ease-in-out flex-1',
              index < currentStep - 1 && 'bg-[var(--accent-green)]',
              index === currentStep - 1 && 'bg-[var(--color-black)]',
              index > currentStep - 1 && 'bg-[var(--border)]',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
