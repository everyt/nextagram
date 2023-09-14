import { Icon } from '@iconify-icon/react';

import { signOut } from 'next-auth/react';

import DropDownButton from './DropDownButton';

function DropDown({ showOnlyIcon }: { showOnlyIcon: boolean }) {
  const handleLogout = () => {
    signOut();
  };
  return (
    <div
      className={`fixed  ml-2 flex w-40 flex-col content-center rounded-lg border-t-[1px] bg-white p-1 shadow-md ${
        showOnlyIcon ? 'bottom-[2.3rem] left-[50px]' : 'bottom-[5.25rem]'
      }`}
    >
      <div className='w-full border-b-2'>
        <DropDownButton onClick={handleLogout}>
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
