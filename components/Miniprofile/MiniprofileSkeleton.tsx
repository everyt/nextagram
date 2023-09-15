export default function MiniprofileSkeleton({
  type,
}: {
  type: 'onFeed' | 'onSidebar' | 'onSidebarCurrentUser';
}) {
  return (
    <section className='mt-[1rem] flex content-center'>
      <div
        className={`rounded-full ${
          type === 'onFeed' ? 'h-[36px] w-[36px]' : 'h-[45px] w-[45px]'
        } animate-pulse bg-stone-300`}
      />
      <article
        className={`ml-3 flex flex-col text-[0.8rem] ${type !== 'onFeed' && 'mt-1'}`}
      >
        <div className='h-4 w-16 animate-pulse bg-stone-300' />

        <div className='h-4 w-24 animate-pulse bg-stone-300' />
      </article>
    </section>
  );
}
