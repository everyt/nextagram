'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import Suggestion from '@/components/FooterBar/Suggestion';
import Miniprofile from '@/components/Miniprofile/Miniprofile';

function FooterBar() {
  const [isLoadingDone, setIsLoadingDone] = useState<boolean>(false);
  const { data: session } = useSession();
  const [width, setWidth] = useState<number>(1100);

  const isClient = typeof window !== undefined;

  const handleWindowResize = () => {
    if (isClient) {
      let timeoutId: NodeJS.Timeout;

      const callbackHandleResize = () => {
        setWidth(window.innerWidth);
      };

      const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callbackHandleResize, 10);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingDone(true);
    }, 300);
    handleWindowResize();
  }, []);

  return (
    <>
      {isLoadingDone ? (
        <div className='flex flex-row'>
          {width >= 972 && (
            <div className='ml-4 flex flex-col lg:mr-[2vw] xl:mr-[7vw]'>
              <div className='pt-[2.5rem]'>
                <Miniprofile
                  email={session?.user.email}
                  name={session?.user.name}
                  img={session?.user.image}
                  type='onSidebarCurrentUser'
                />
                <p className='pt-[1.5rem] text-[0.95rem] text-stone-700'>
                  회원님을 위한 추천　　　　　　모두 보기
                </p>

                <Suggestion />

                <p className='font-NSN200 pt-[2.5rem] text-[0.7rem]/[18px] tracking-wider'>
                  소개.도움말.홍보 센터.API.채용 정보
                  <br />
                  이 사이트는 학습 목적으로 만들어졌습니다.
                  <br />© 2023 INSTAGRAM CLONE WITH NEXT.JS
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default FooterBar;
