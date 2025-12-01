import { CheckIcon } from '@/utils/icons';

export const CheckBox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className="relative flex-shrink-0 w-5 h-5 cursor-pointer" onClick={handleClick}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        readOnly
      />
      <div
        className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-all duration-200 ${
          checked
            ? 'bg-[var(--accent-green)] border-[var(--accent-green)]'
            : 'bg-white border border-[#E5E5E5]'
        }`}
      >
        {checked && <CheckIcon className="w-3 h-3 text-white" />}
      </div>
    </div>
  );
};
