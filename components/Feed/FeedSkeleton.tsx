import MiniprofileSkeleton from '../Miniprofile/MiniprofileSkeleton';

export default function FeedSkeleton() {
  return (
    <section className='mt-1 flex h-auto w-[450px] flex-col justify-center pb-4'>
      <article>
        <MiniprofileSkeleton type='onFeed' />
      </article>

      <article>
        {/* 이미지 로딩 스켈레톤 */}
        <div className='mt-4 h-[300px] animate-pulse bg-stone-300' />
      </article>
    </section>
  );
}
