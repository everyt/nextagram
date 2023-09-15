import { memo } from 'react';

type Props = {
  email: string;
  name: string;
  img: string;
  type: 'onFeed' | 'onSidebar' | 'onSidebarCurrentUser';
};

function MiniProfile({ email, name, img, type }: Props) {
  return (
    <section className='mt-[1rem] flex content-center'>
      <img
        className={`rounded-full ${
          type === 'onFeed' ? 'h-[36px] w-[36px]' : 'h-[45px] w-[45px]'
        }`}
        src={img}
        alt=''
        width={type === 'onFeed' ? 36 : 45}
      />
      <article
        className={`ml-3 flex flex-col text-[0.8rem] ${type !== 'onFeed' && 'mt-1'}`}
      >
        <span className='font-NSN700'>{name}</span>

        <span>{email}</span>
      </article>
    </section>
  );
}

export default memo(MiniProfile);
