'use client';

import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import NavBar from '@/components/NavBar/NavBar';

// '/'경로일 때 로그인 안했으면 안보여주기

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className='flex h-screen w-screen justify-between'>
      {pathname === '/' && !session ? null : <NavBar />}
      {children}
    </div>
  );
}
