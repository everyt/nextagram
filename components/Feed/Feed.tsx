'use client';

import { Icon } from '@iconify-icon/react';

import { memo, useMemo } from 'react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';

type Props = {
  email: string;
  name: string;
  img: string;
  feedId: string;
  feedImg: string;
  feedCaption: string;
  likes: number;
  comments: number;
};

function Feed({
  email,
  name,
  img,
  feedId,
  feedImg,
  feedCaption,
  likes,
  comments,
}: Props) {
  const memorizedEmail = useMemo(() => email, [email]);
  const memorizedName = useMemo(() => name, [name]);
  const memorizedImg = useMemo(() => img, [img]);

  return (
    <section className='mt-1 h-auto w-[450px] border-b-[1px] border-stone-300 pb-4'>
      <article>
        <Miniprofile
          email={memorizedEmail}
          name={memorizedName}
          img={memorizedImg}
          type='onFeed'
        />
      </article>

      <article>
        <img className='mt-[0.8rem] w-[inherit]' src={feedImg} alt='' />
      </article>

      <article className='flex content-center pt-[0.8rem]'>
        <button className='cursor-pointer'>
          <Icon icon='ion:heart-outline' style={{ fontSize: '26px' }} />
        </button>
        <Icon
          className='ml-4'
          icon='ion:paper-plane-outline'
          style={{ fontSize: '26px' }}
        />
        <Icon className='ml-4' icon='uil:comment' style={{ fontSize: '26px' }} />
      </article>

      <article>
        <p className='pt-[0.8rem] text-[0.92rem]'>{`좋아요 ${likes}개`}</p>
        <p className='my-2 text-[0.88rem]'>
          {name} {feedCaption}
        </p>
        <p className='text-[0.9rem]'>
          {`댓글 ${comments}개`} <p>모두 보기</p>
        </p>
      </article>
    </section>
  );
}
export default memo(Feed);
