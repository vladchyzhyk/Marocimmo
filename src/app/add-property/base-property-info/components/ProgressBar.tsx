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
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={`flex flex-col gap-2 p-2 mt-5 ${className}`}>
      {/* Steps Display */}
      <div className="flex justify-stretch items-stretch gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex justify-center items-center gap-1 flex-1">
            <span
              className={`label-md-medium text-center transition-colors duration-300 ${
                index < currentStep ? 'text-[var(--color-black)]' : 'text-[var(--text-body-tint)]'
              }`}
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
            className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
              index < currentStep - 1
                ? 'bg-[var(--color-black)] flex-1'
                : index === currentStep - 1
                  ? 'bg-[var(--color-black)] flex-1'
                  : 'bg-[var(--border)] flex-1'
            }`}
            style={{
              flex: index < currentStep ? 1 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
