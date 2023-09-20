import dynamic from 'next/dynamic';

const FeedView = dynamic(() => import('@/components/Feed/FeedView'), { ssr: false });
const FooterBar = dynamic(() => import('@/components/FooterBar/FooterBar'), { ssr: false });

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
