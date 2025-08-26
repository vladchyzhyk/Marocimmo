'use client';

import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ClientLayout;
