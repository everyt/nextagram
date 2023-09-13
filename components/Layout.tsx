import Navbar from 'Bar/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen justify-between'>
      <Navbar />
      {children}
    </div>
  );
}
