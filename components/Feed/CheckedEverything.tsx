import Image from 'next/image';

export default function CheckedEverything() {
  return (
    <section className='mt-1 h-auto w-[450px] border-b-[1px] border-stone-300 pb-4'>
      <Image src='/img/illo-confirm-refresh-light.png' alt='checked' />
      <p className='text-2xl'>모두 확인했습니다</p>
      <p>해당 클론 코딩 사이트에 올라온 게시물을 모두 확인했습니다.</p>
    </section>
  );
}
