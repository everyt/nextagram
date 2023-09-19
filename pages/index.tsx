import { useSession } from 'next-auth/react';

import FeedView from '@/components/Feed/FeedView';
import FooterBar from '@/components/FooterBar/FooterBar';
import Login from '@/components/Login';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div>
        <FeedView />
      </div>
      <div>
        <FooterBar />
      </div>
    </>
  );
}
