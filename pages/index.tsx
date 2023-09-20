import FeedView from '@/components/Feed/FeedView';
import FooterBar from '@/components/FooterBar/FooterBar';

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
