import { useSession } from 'next-auth/react';

import FeedView from '@/components/Feed/FeedView';
import FooterBar from '@/components/FooterBar/FooterBar';
import Login from '@/components/Login';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div className='flex flex-col justify-start'>
        <FeedView />
      </div>
      <div>
        <FooterBar />
      </div>
    </>
  );
}
