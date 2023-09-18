'use client';

import { motion } from 'framer-motion';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  showOnlyIcon: boolean;
  onClick: string | (() => void);
};

const variants = {
  hide: { opacity: [1, 0.5, 0.1, 0, 0] },
  show: { opacity: [0, 0, 0.1, 0.5, 1] },
};

function DropDownTopButton({ children, text, className, style, showOnlyIcon, onClick }: Props) {
  const router = useRouter();

  const handleClick = () => {
    typeof onClick === 'string' ? router.push(onClick!) : onClick!();
  };

  return (
    <button
      onClick={handleClick}
      className={`mx-2 mb-2 flex w-full content-center whitespace-nowrap rounded-lg p-2 hover:bg-stone-100 ${className}`}
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

export default memo(DropDownTopButton);
