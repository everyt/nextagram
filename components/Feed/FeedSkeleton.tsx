import MiniprofileSkeleton from '../Miniprofile/MiniprofileSkeleton';

export default function FeedSkeleton() {
  return (
    <section className='mt-1 h-auto w-[450px] pb-4'>
      <article>
        <MiniprofileSkeleton type='onFeed' />
      </article>

      <article>
        {/* 이미지 로딩 스켈레톤 */}
        <div className='h-[400px] animate-pulse bg-stone-300' />
      </article>
    </section>
  );
}
