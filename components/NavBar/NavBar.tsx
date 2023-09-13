'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import { signOut } from 'next-auth/react';

import WriteFeedModal from '@/components/NavBar/WriteFeedModal';
import useWindowSize from '@/hooks/useWindowSize';

// TODO: 반응형 웹으로 구성할 때,
// 폰 화면은 ~768px, 태블릿은 ~1024px, 데스크탑은 1024~px라고 하네

// ~1024px, 네비바가 작아지고 푸터바가 사라져

// 즉 ~768px일때 네비바와 푸터바가 상하단에 위치해야 해
// 이건 tailwind css를 어떻게 다르게 써야 할 텐데
// w-18 sm:w-50 lg:w-56' 이런 느낌으로

// 기본 폰트 사이즈를 10pt로 주고 rem을 계산하면 쉬울 것 같네

// 필요한 버튼은 10개, 다크모드는 색깔만 전환하면 되니까 11개?
// 설정까지 12개?

// 그럼 음. 링크 버튼이 아닌 경우엔 굳이 컴포넌트로 뺄 필요가 있나?
// 인풋은 밸류를 주기 위해서 필요해.
// 코드를 깔끔하게 유지하기 위해서 버튼 12개를 컴포넌트로 관리할 수 있을까?

export default function NavBar() {
  const size = useWindowSize().width / 9;
  const [width, setWidth] = useState<number>(200);
  const [onlyIcon, setOnlyIcon] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    onlyIcon === false && setWidth(size);
  }, [size]);

  const handleClickButton = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    width === size ? setWidth(70) : setWidth(size);
    setOnlyIcon((prev) => !prev);
  };

  const handleOpenModal = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    setOpen(true);
  };

  const handleLogout = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    signOut();
  };

  return (
    <>
      <motion.nav
        className='fixed z-0 h-screen w-18 bg-white pr-1 sm:w-50 lg:w-56'
        animate={{ width }}
        transition={{ ease: 'easeInOut', duration: 0.6 }}
      >
        <section className='h-screen border-r-[1px]'>
          <article>
            <button onClick={handleClickButton} className='navbar-button'>
              홈
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              검색
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              탐색 탭
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              릴스
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              메시지
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              알림
            </button>
            <button onClick={handleOpenModal} className='navbar-button'>
              만들기
            </button>
            <button onClick={handleClickButton} className='navbar-button'>
              프로필
            </button>
          </article>
          <article>
            <ul>
              <li>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </ul>
            <button onClick={handleClickButton}>더 보기</button>
          </article>
        </section>
      </motion.nav>
      <WriteFeedModal boolean={open} setBoolean={setOpen} />
    </>
  );
}
