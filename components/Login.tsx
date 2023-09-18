'use client';

import Image from 'next/image';

import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  return (
    <div className='mb-36 flex flex-col items-center border-2'>
      <div className='flex w-[300px] flex-col items-center'>
        <Image
          className='mt-8 h-[53px] w-[150px]'
          src='/svg/Instagram-text-light.svg'
          alt='Instagram'
          width={150}
          height={53}
        />
      </div>
      <div className='flex flex-col items-center'>
        <p className='z-20 bg-white p-3'>SNS 아이디로 로그인</p>
        <div className='absolute z-10 mt-6 w-[250px] border-t-2' />
      </div>
      <div className='flex h-[70px] flex-row justify-center'>
        {[
          [0, 'naver', () => signIn('naver')],
          [1, 'kakao', () => signIn('kakao')],
          [2, 'google', () => signIn('google')],
          [3, 'github', () => signIn('github')],
        ].map(([key, brand, func]) => (
          <button
            key={key as number}
            className='mx-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-stone-100 hover:opacity-80 hover:shadow-lg'
            onClick={func as React.MouseEventHandler}
          >
            <Image //
              className='h-7 w-7'
              src={key === 0 ? '/svg/naver.svg' : `https://authjs.dev/img/providers/${brand}.svg`}
              alt={brand as string}
              height={26}
              width={26}
            />
            {session && session.user?.name}
          </button>
        ))}
      </div>
    </div>
  );
}
