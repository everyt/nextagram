import { Icon } from '@iconify-icon/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/ko';

import { memo } from 'react';

import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

`use client`;

type Props = {
  email: string;
  name: string;
  img: string;
  type: 'onFeed' | 'onSidebar' | 'onSidebarCurrentUser';
  userId?: string;
  feedId?: string;
  timestamp?: any;
  handleDeleteFeed?: (feedId: string) => void;
};

function Miniprofile({
  email,
  name,
  img,
  type,
  userId,
  feedId,
  timestamp,
  handleDeleteFeed,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const isCanDelete = () => {
    if (type === 'onFeed' && session?.user?.id === userId) {
      return true;
    }
    return false;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='mt-[1rem] flex content-center'
    >
      <button onClick={() => router.push(`/profile/${userId}`)}>
        <img
          className={`rounded-full ${
            type === 'onFeed' ? 'h-[36px] w-[36px]' : 'h-[45px] w-[45px]'
          }`}
          src={img}
          alt={name}
          width={type === 'onFeed' ? 36 : 45}
        />
      </button>
      {isCanDelete() && (
        <button
          className='absolute ml-[26.5rem] mt-2 cursor-pointer'
          onClick={() => handleDeleteFeed!(feedId!)}
        >
          <Icon icon='cil:delete' style={{ fontSize: '24px' }} />
        </button>
      )}
      <article className={`ml-3 flex flex-col text-[0.8rem] ${type !== 'onFeed' && 'mt-1'}`}>
        <span>
          <b>{name}</b>
          {timestamp && ` • ${moment(new Date(timestamp?.seconds * 1000)).fromNow()}`}
        </span>

        <span>{email}</span>
      </article>
    </motion.section>
  );
}

export default memo(Miniprofile);
