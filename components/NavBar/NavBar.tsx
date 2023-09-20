'use client';

import { Icon } from '@iconify-icon/react';
import { motion } from 'framer-motion';

import { useEffect, useMemo, useState } from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import DropDown from './DropDown';
import NavBarButton from './NavBarButton';
import WriteFeedModal from './WriteFeedModal';

export default function NavBar() {
  const Icons = useMemo(
    () => [
      ['mingcute:home-4-line', 'mingcute:home-4-fill'],
      ['mdi:compass-outline', 'eos-icons:compass'],
      ['iconamoon:search', 'iconamoon:search-bold'],
      ['solar:video-frame-play-horizontal-outline', 'solar:video-frame-play-horizontal-bold'],
      ['ion:paper-plane-outline', 'ion:paper-plane-sharp'],
      ['ion:heart-outline', 'ion:heart'],
      ['jam:write', 'jam:write-f'],
      ['iconamoon:profile-circle-light', 'iconamoon:profile-circle-fill'],
      ['ph:list', 'ph:list-bold'],
    ],
    [],
  );

  const variants = useMemo(
    () => ({
      hide: { opacity: [1], scale: [0, 1] },
      show: { opacity: [0, 1], scale: [1] },
    }),
    [],
  );
  const windowSize = useWindowSize().width / 6; // 클라이언트가 로딩되기 전까지 로딩을 띄워줘야 하는데
  const [width, setWidth] = useState<number>(182);
  const [dropdownWidth, setDropdownWidth] = useState<number>(140);
  const [navBarMargin, setNavBarMargin] = useState<number>(300);

  const [highlight, setHighlight] = useState<number>(0);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [showOnlyIcon, setShowOnlyIcon] = useState<boolean>(false);
  const [sizeUnderMinWidth, setSizeUnderMinWidth] = useState<boolean>(false);

  useEffect(() => {
    setWidth(windowSize < 182 ? 75 : windowSize);
    setNavBarMargin(windowSize < 182 ? 85 : 300);
    setDropdownWidth(windowSize < 182 ? windowSize - 42 : windowSize - 42);
    setShowOnlyIcon(windowSize < 182);
    setSizeUnderMinWidth(windowSize < 182);
  }, [windowSize]);

  const handleClickButton = () => {
    setWidth(width === 75 ? (!sizeUnderMinWidth ? windowSize : 182) : 75);
    setNavBarMargin(85 ? 300 : 85);
    setDropdownWidth(dropdownWidth === 45 ? (!sizeUnderMinWidth ? windowSize - 42 : 140) : 45);

    setShowOnlyIcon((prev) => !prev);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  return (
    <>
      <div style={{ width: `${navBarMargin}px` }}>
        <motion.nav
          className='fixed z-40 h-screen w-[182px] pr-1'
          animate={{ width }}
          transition={{ ease: 'easeInOut', duration: 0.35 }}
        >
          <div className='border-r-[1px] border-stone-200 bg-white'>
            <section className='flex h-screen flex-col py-2 pl-1 pr-5'>
              <article>
                <motion.img
                  className={`fixed ml-3 mr-3 pt-3 ${
                    showOnlyIcon ? 'mb-4 mt-3 h-12 w-10' : 'mb-3 h-16 w-36'
                  }`}
                  src={`/svg/Instagram-${showOnlyIcon ? 'black-icon' : 'text'}.svg`}
                  alt='Instagram'
                  height={100}
                  width={280}
                  animate={showOnlyIcon ? 'hide' : 'show'}
                  variants={variants}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                />
              </article>

              <article className='mt-20'>
                {[
                  [0, '/', '홈'],
                  [1, handleClickButton, '검색'],
                  [2, '/explore', '탐색 탭'],
                  [3, '/reels', '릴스'],
                  [4, '/messages', '메시지'],
                  [5, handleClickButton, '알림'],
                  [6, handleOpenModal, '만들기'],
                  [7, '/profile', '프로필'],
                ].map(([key, onClick, text]) => (
                  <NavBarButton
                    key={key as number}
                    index={key as number}
                    highlight={highlight}
                    setHighlight={setHighlight}
                    showOnlyIcon={showOnlyIcon}
                    onClick={onClick as string | (() => void)}
                    text={text as string}
                  >
                    <Icon
                      icon={`${Icons[key as number][highlight === key ? 1 : 0]}`}
                      style={{ fontSize: '30px' }}
                    />
                  </NavBarButton>
                ))}
              </article>

              <article>
                {openDropDown && <DropDown showOnlyIcon={showOnlyIcon} />}

                <NavBarButton
                  index={8}
                  highlight={highlight}
                  setHighlight={setHighlight}
                  showOnlyIcon={showOnlyIcon}
                  className='absolute bottom-6'
                  style={{ width: `${dropdownWidth}px` }}
                  onClick={handleOpenDropDown}
                  text='더 보기'
                >
                  <Icon
                    icon={`${Icons[8][highlight === 8 ? 1 : 0]}`}
                    style={{ fontSize: '30px' }}
                  />
                </NavBarButton>
              </article>
            </section>
          </div>
        </motion.nav>
        <WriteFeedModal boolean={openModal} setBoolean={setOpenModal} />
      </div>
    </>
  );
}
