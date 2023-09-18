import { Icon } from '@iconify-icon/react';

import { signOut } from 'next-auth/react';

import DropDownButton from './DropDownButton';

function DropDown({
  showOnlyIcon,
  setDarkmodeSVG,
}: {
  showOnlyIcon: boolean;
  setDarkmodeSVG: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleColorTheme = () => {
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.contains('dark')
      ? setDarkmodeSVG(true)
      : setDarkmodeSVG(false);
  };
  const handleLogout = () => {
    signOut();
  };
  return (
    <div
      className={`fixed  ml-2 flex w-40 flex-col content-center rounded-lg border-t-[1px] border-stone-300 bg-white p-1 shadow-md dark:border-stone-500 dark:bg-[#333] ${
        showOnlyIcon ? 'bottom-[2.3rem] left-[50px]' : 'bottom-[5.25rem]'
      }`}
    >
      <div className='w-full border-b-2 border-stone-300 dark:border-stone-500'>
        <DropDownButton onClick={handleColorTheme}>
          <Icon icon='mingcute:sun-line' style={{ fontSize: '28px' }} />
          {/** mingcute:sun-fill */}
          <p className='ml-2 mt-1'>모드 전환</p>
        </DropDownButton>
      </div>
      <div>
        <DropDownButton onClick={handleLogout}>
          <Icon icon='material-symbols:logout' style={{ fontSize: '28px' }} />
          <p className='ml-2 mt-1'>로그아웃</p>
        </DropDownButton>
      </div>
    </div>
  );
}

export default DropDown;
