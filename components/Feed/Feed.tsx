'use client';

import { Icon } from '@iconify-icon/react';

import { memo, useMemo } from 'react';

import Image from 'next/image';

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

function Feed({ email, name, img, feedId, feedImg, feedCaption, likes, comments }: Props) {
  const memorizedEmail = useMemo(() => email, [email]);
  const memorizedName = useMemo(() => name, [name]);
  const memorizedImg = useMemo(() => img, [img]);

  return (
    <section className='mt-1 h-auto w-[450px] border-b-[1px] border-stone-300 pb-4 dark:border-stone-500'>
      <article>
        <Miniprofile email={memorizedEmail} name={memorizedName} img={memorizedImg} type='onFeed' />
      </article>

      <article>
        <Image
          className='mt-[0.8rem] w-[inherit]'
          src={feedImg}
          alt={feedImg}
          blurDataURL={feedImg}
          placeholder='blur'
          width={450}
          height={450}
        />
      </article>

      <article className='flex content-center pt-[0.8rem]'>
        <button className='cursor-pointer'>
          <Icon icon='ion:heart-outline' style={{ fontSize: '26px' }} />
        </button>
        <button className='cursor-pointer'>
          <Icon className='ml-4' icon='ion:paper-plane-outline' style={{ fontSize: '26px' }} />
        </button>
        <button className='cursor-pointer'>
          <Icon className='ml-5' icon='iconoir:message' style={{ fontSize: '26px' }} />
        </button>
      </article>

      <article>
        <p className='text-[0.88rem]'>{`좋아요 ${likes}개`}</p>
        <div className='my-2 flex content-center text-[0.88rem]'>
          <b className='mr-2 text-[0.9rem]'>{name}</b>
          <p>{feedCaption}</p>
        </div>
        <p className='text-[0.88rem]'>{`댓글 ${comments}개`} 모두 보기</p>
      </article>
    </section>
  );
}
export default memo(Feed);
