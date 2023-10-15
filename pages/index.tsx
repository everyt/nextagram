import FooterBarSkeleton from '@/components/FooterBar/FooterBarSkeleton';

import dynamic from 'next/dynamic';

const FeedView = dynamic(() => import('@/components/Feed/FeedView'), { ssr: false });
const FooterBar = dynamic(() => import('@/components/FooterBar/FooterBar'), { ssr: false, loading: FooterBarSkeleton });

export default function Home() {
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
