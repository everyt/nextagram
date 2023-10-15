import MiniprofileSkeleton from "../Miniprofile/MiniprofileSkeleton";

export default function FooterBarSkeleton() {
  return (
    <div className='flex flex-row'>
      <div className='ml-4 flex flex-col lg:mr-[2vw] xl:mr-[7vw]'>
        <div className='pt-[2.5rem]'>
          <MiniprofileSkeleton type='onSidebarCurrentUser' />
          <div className='pt-[1.5rem] h-4 w-20 animate-pulse bg-stone-300' />

          <MiniprofileSkeleton type='onSidebar' />
          <MiniprofileSkeleton type='onSidebar' />
          <MiniprofileSkeleton type='onSidebar' />
          <MiniprofileSkeleton type='onSidebar' />
          <MiniprofileSkeleton type='onSidebar' />

          <div className='pt-[2.5rem] h-4 w-16 animate-pulse bg-stone-300' />
          <div className='h-4 w-16 animate-pulse bg-stone-300' />
          <div className='h-4 w-20 animate-pulse bg-stone-300' />
        </div>
      </div>
    </div>
  )
}
