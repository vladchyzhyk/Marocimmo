import { CloseIcon } from '@/utils/icons';

interface FilterTipProps {
  text: string;
  onClear?: () => void;
  className?: string;
}

export const FilterTip = ({ text, onClear, className = '' }: FilterTipProps) => {
  return (
    <div
      className={`flex flex-row items-center py-1 pl-2 pr-1 gap-2 bg-[#F3F4F6] rounded-2xl ${className}`}
    >
      <span className="body-md text-[#222222] whitespace-nowrap">{text}</span>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center justify-center w-4 h-4 flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Remove filter"
        >
          <CloseIcon className="w-6 h-6 text-[#222222]" />
        </button>
      )}
    </div>
  );
};
