import NavBar from '@/components/NavBar/NavBar';

// '/'경로일 때 로그인 안했으면 안보여주기

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen justify-between'>
      <NavBar />
      {children}
    </div>
  );
}
