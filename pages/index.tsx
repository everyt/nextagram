import FeedView from '@/components/Feed/FeedView';
import FooterBar from '@/components/FooterBar/FooterBar';

export default function Home() {
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
