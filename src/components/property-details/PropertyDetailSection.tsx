import type { ReactNode } from 'react';

interface PropertyDetailSectionProps {
  title: string;
  children: ReactNode;
}

export default function PropertyDetailSection({ title, children }: PropertyDetailSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="title-lg">{title}</h3>
      <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4">{children}</div>
    </div>
  );
}
