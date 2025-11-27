import { ReactNode } from 'react';

export type FeatureCardProps = {
  title: string;
  className?: string;
  icon: ReactNode;
};

export const FeatureCard = ({ title, className, icon }: FeatureCardProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-white rounded-[8px] border border-[var(--border)] p-4 h-full ${className || ''}`}
    >
      <div className="w-[40px] h-[40px] flex-shrink-0">{icon}</div>
      <div className="text-center justify-center">
        <span className="title-sm text-[var(--color-black)]">{title}</span>
      </div>
    </div>
  );
};
