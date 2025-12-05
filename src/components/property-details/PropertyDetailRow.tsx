import { cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';

interface PropertyDetailRowProps {
  icon: ReactElement;
  label: string;
  value: string;
  className?: string;
}

export default function PropertyDetailRow({
  icon,
  label,
  value,
  className = '',
}: PropertyDetailRowProps) {
  const iconProps = isValidElement(icon) ? (icon.props as Record<string, unknown>) : {};
  const existingClassName = (iconProps.className as string) || '';
  const iconWithSize = isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string }>, {
        className: `w-4 h-4 ${existingClassName}`.trim(),
      })
    : icon;

  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">{iconWithSize}</div>
      <div className="flex flex-col md:flex-row items-center justify-start gap-1">
        <span className="text-sm font-normal leading-[140%] text-[#787878] ">{label}</span>
        <span className="label-md-medium font-medium leading-[110%] text-[#222222] whitespace-nowrap">
          {value}
        </span>
      </div>
    </div>
  );
}
