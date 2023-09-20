import NavBar from '@/components/NavBar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen justify-between'>
      <NavBar />
      {children}
    </div>
  );
}
