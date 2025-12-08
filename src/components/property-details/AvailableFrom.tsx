import { formatDate } from '@/utils/propertyFormatters';
import { CalendarIcon } from '@/utils/icons';

interface AvailableFromProps {
  date: string;
  className?: string;
}

export default function AvailableFrom({ date, className = '' }: AvailableFromProps) {
  const formattedDate = formatDate(date);

  return (
    <div
      className={`flex flex-col items-start p-6 gap-4 w-full h-auto bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg ${className}`}
    >
      <div className="flex flex-row items-start gap-4">
        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center font-medium text-base leading-[100%] text-[#222222]">
            Available from
          </div>
          <div className="flex items-center font-normal text-sm leading-[140%] text-[#787878]">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
