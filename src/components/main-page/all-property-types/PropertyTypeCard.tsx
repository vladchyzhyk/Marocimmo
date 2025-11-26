'use client';

import { ReactNode } from 'react';

export type PropertyTypeCardProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function PropertyTypeCard({
  icon,
  label,
  active = false,
  onClick,
}: PropertyTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-4 p-4 rounded-[8px] transition-all border-[2px] h-[218px] ${
        active
          ? 'border-[var(--accent-green)] bg-white'
          : 'border-[var(--border)] bg-white hover:bg-[var(--bg-tint)] hover:border-[var(--accent-green)]'
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center text-[var(--color-black)]">
          {icon}
        </div>
        <span className="title-lg text-[var(--color-black)]">{label}</span>
      </div>
      <span className="px-4 h-8 flex items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--bg-tint)] text-[var(--color-black)] body-sm transition-colors group-hover:text-[var(--accent-green)] pointer-events-none">
        Browse
      </span>
    </button>
  );
}
