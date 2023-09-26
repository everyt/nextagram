'use client';

import { motion } from 'framer-motion';

import { memo } from 'react';

import { useRouter, usePathname } from 'next/navigation';

type Props = {
  type: 'normal' | 'dropdown';
  index?: number;
  children: React.ReactNode;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  highlight?: number;
  setHighlight?: React.Dispatch<React.SetStateAction<number>>;
  showOnlyIcon: boolean;
  onClick: string | (() => void);
};

const variants = {
  hide: { opacity: [1, 0.5, 0.1, 0, 0] },
  show: { opacity: [0, 0, 0.1, 0.5, 1] },
};

function NavBarButton({
  type,
  index,
  children,
  text,
  className,
  style,
  highlight,
  setHighlight,
  showOnlyIcon,
  onClick,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    typeof onClick === 'string' ? router.push(onClick!) : onClick!();
    if (type === 'normal')
      setHighlight!(!(typeof onClick === 'string') && index === highlight ? pathname === '/' ? 0 : 7 : index!);
  };

  return (
    <button
      onClick={handleClick}
      className={`mx-2 mb-2 flex w-full content-center whitespace-nowrap rounded-lg p-2 hover:bg-stone-100 ${className} dark:hover:bg-stone-600`}
      style={style}
    >
      {children}
      <motion.p
        className='ml-3 mt-1'
        animate={showOnlyIcon ? 'hide' : 'show'}
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {text}
      </motion.p>
    </button>
  );
}

export default memo(NavBarButton);
