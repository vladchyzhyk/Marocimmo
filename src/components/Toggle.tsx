const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 md:w-10 md:h-6 rounded-full transition-colors flex items-center px-1 ${
        checked ? 'bg-[var(--accent-green)]' : 'bg-[var(--text-body-tint)]'
      }`}
      aria-pressed={checked}
    >
      <span
        className={`w-5 h-5 md:w-4 md:h-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5 md:translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Toggle;
