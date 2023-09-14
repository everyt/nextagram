'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { signOut } from 'next-auth/react';

import NavBarButton from '@/components/NavBar/NavBarButton';
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
  const size = useWindowSize().width / 6; // 클라이언트가 로딩되기 전까지 로딩을 띄워줘야 하는데
  const [width, setWidth] = useState<number>(182);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showOnlyIcon, setShowOnlyIcon] = useState<boolean>(false);

  useEffect(() => {
    if (showOnlyIcon === false) setWidth(size);
    if (size < 182) {
      setWidth(85);
      setShowOnlyIcon(true);
    } else {
      setShowOnlyIcon(false);
    }
  }, [size]);

  const handleClickButton = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    width === size ? setWidth(85) : setWidth(size);
    setShowOnlyIcon((prev) => !prev);
  };

  const handleOpenModal = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setOpenModal(true);
  };

  const handleLogout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    signOut();
  };

  return (
    <>
      <motion.nav
        className='1h-screen fixed z-40 w-[182px] bg-white pr-1'
        animate={{ width }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        <div className='border-r-[1px] border-stone-200'>
          <section className='flex h-screen flex-col justify-start p-3 pr-7'>
            <Image
              className={
                showOnlyIcon
                  ? 'mb-4 ml-2 mr-3 mt-3 h-12 w-24 pt-3'
                  : 'mb-3 ml-2 mr-3 h-16 w-32 pt-3'
              }
              src={
                showOnlyIcon
                  ? '/svg/Instagram-black-icon.svg'
                  : '/svg/Instagram-text.svg'
              }
              alt='Instagram'
              height={100}
              width={200}
            />
            <article>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                홈
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                검색
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                탐색 탭
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                릴스
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                메시지
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                알림
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleOpenModal}
              >
                만들기
              </NavBarButton>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                프로필
              </NavBarButton>
            </article>
            <article>
              <ul>
                <li>
                  <NavBarButton
                    showOnlyIcon={showOnlyIcon}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </NavBarButton>
                </li>
              </ul>
              <NavBarButton
                showOnlyIcon={showOnlyIcon}
                onClick={handleClickButton}
              >
                더 보기
              </NavBarButton>
            </article>
          </section>
        </div>
      </motion.nav>
      <WriteFeedModal boolean={openModal} setBoolean={setOpenModal} />
    </>
  );
}
