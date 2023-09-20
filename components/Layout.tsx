'use client';

import { useSession } from 'next-auth/react';

import NavBar from '@/components/NavBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <div className='flex h-screen w-screen items-center justify-center'>{children}</div>
      ) : (
        <div className='flex h-screen w-screen justify-between'>
          <NavBar />
          {children}
        </div>
      )}
    </>
  );
}
