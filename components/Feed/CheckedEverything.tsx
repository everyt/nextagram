import Image from 'next/image';

export default function CheckedEverything() {
  return (
    <section className='mt-16 flex h-auto w-[450px] flex-col items-center border-b-[1px] border-stone-300 pb-10'>
      <Image src='/img/illo-confirm-refresh-light.png' alt='checked' width={120} height={120} />
      <p className='mt-4 text-xl'>모두 확인했습니다</p>
      <p className='text-sm'>해당 클론 코딩 사이트에 올라온 게시물을 모두 확인했습니다.</p>
      <b className='mt-4 text-sm text-blue-600'>알았어요!</b>
    </section>
  );
}
