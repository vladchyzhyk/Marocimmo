import Toggle from './Toggle';

type Props = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleCard = ({ label, checked, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between gap-3 border border-[var(--border-input)] rounded-lg bg-white pl-4 pr-2.5 py-2.25 w-full">
      <span className="body-lg text-[var(--color-black)] whitespace-nowrap">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleCard;
