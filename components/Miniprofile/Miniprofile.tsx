import { Icon } from '@iconify-icon/react';

import { memo } from 'react';

import { useSession } from 'next-auth/react';

`use client`;

type Props = {
  email: string;
  name: string;
  img: string;
  type: 'onFeed' | 'onSidebar' | 'onSidebarCurrentUser';
  userId?: string;
  feedId?: string;
  handleDeleteFeed?: (feedId: string) => void;
};

function Miniprofile({ email, name, img, type, userId, feedId, handleDeleteFeed }: Props) {
  const { data: session } = useSession();

  const isCanDelete = () => {
    if (type === 'onFeed' && session?.user?.id === userId) {
      return true;
    }
    return false;
  };

  return (
    <section className='mt-[1rem] flex content-center'>
      <img
        className={`rounded-full ${type === 'onFeed' ? 'h-[36px] w-[36px]' : 'h-[45px] w-[45px]'}`}
        src={img}
        alt={name}
        width={type === 'onFeed' ? 36 : 45}
      />
      {isCanDelete() && (
        <button
          className='absolute ml-[26.5rem] mt-2 cursor-pointer'
          onClick={() => handleDeleteFeed!(feedId!)}
        >
          <Icon icon='cil:delete' style={{ fontSize: '24px' }} />
        </button>
      )}
      <article className={`ml-3 flex flex-col text-[0.8rem] ${type !== 'onFeed' && 'mt-1'}`}>
        <span className='font-NSN700'>{name}</span>

        <span>{email}</span>
      </article>
    </section>
  );
}

export default memo(Miniprofile);
