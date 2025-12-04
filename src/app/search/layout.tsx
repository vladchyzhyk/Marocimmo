import type { Metadata } from 'next';
import { Suspense } from 'react';
import MainFooter from '@/components/MainFooter';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for properties',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <MainFooter />
      </Suspense>
    </>
  );
}
