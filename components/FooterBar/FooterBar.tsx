import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import Suggestion from '@/components/Suggestion';

function Sidebar() {
  const { data: session } = useSession();
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWindowResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className='flex flex-row'>
      {width >= 1100 && (
        <div className='flex flex-col sm:mr-[0.5vw] lg:mr-[1vw] xl:mr-[7vw]'>
          <div className='pt-[2.5rem]'>
            <Miniprofile
              email={session?.user.email!}
              name={session?.user.name!}
              img={session?.user.image!}
              type='onSidebarCurrentUser'
            />
            <p className='pt-[1.5rem] text-[0.95rem] text-stone-700'>
              회원님을 위한 추천　　　　　　　모두 보기
            </p>

            <Suggestion />

            <p className='font-NSN200 pt-[2.5rem] text-[0.7rem]/[18px] tracking-wider'>
              소개.도움말.홍보 센터.API.채용 정보
              <br />
              개인정보처리방침.약관.위치.언어.EVERYT COPIED
              <br />© 2023 INSTAGRAM CLONE WITH NEXT.JS
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
