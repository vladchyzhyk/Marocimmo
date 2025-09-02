import { ArrowRightIcon } from '@/utils/icons';
import classNames from 'classnames';

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: { title: string; number: number }[];
};

type SidebarItemProps = {
  id: number;
  isCurrentStep: boolean;
  step: { title: string; number: number };
  onClick: () => void;
};

const SidebarItem = ({ isCurrentStep, step, onClick }: SidebarItemProps) => {
  return (
    <div
      className={classNames(
        'w-full relative flex items-center gap-2 p-4 rounded-r-2xl transition-colors duration-300',
        isCurrentStep ? 'bg-[var(--bg-tint)]' : 'bg-white hover:bg-[var(--bg-tint)]',
      )}
      onClick={onClick}
    >
      {isCurrentStep && (
        <div className="absolute top-0 left-0 w-1 min-h-0 h-full bg-[var(--accent-green)]"></div>
      )}
      <div className="flex items-center justify-between w-full">
        <div
          className={classNames(
            'transition-colors duration-300',
            isCurrentStep ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
          )}
        >
          {step.title}
        </div>
        <div>
          <ArrowRightIcon
            className={classNames(
              'w-6 h-6 transition-colors duration-300',
              isCurrentStep ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]',
            )}
          />
        </div>
      </div>
    </div>
  );
};

const EditSidebar = ({ steps, currentStep, setCurrentStep }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {steps.map((step) => (
        <SidebarItem
          id={step.number}
          isCurrentStep={currentStep === step.number - 1}
          step={step}
          key={step.number}
          onClick={() => setCurrentStep(step.number - 1)}
        />
      ))}
    </div>
  );
};

export default EditSidebar;
