import { Icon } from '@iconify-icon/react';

export default function LoadingScreen() {
  return (
    <div className='absolute z-50 flex h-screen w-screen items-center justify-center bg-white'>
      <div className='h-[120px] w-[120px]'>
        <Icon icon='skill-icons:instagram' style={{ fontSize: '120px' }} />
      </div>
    </div>
  );
}
