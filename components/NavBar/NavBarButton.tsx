'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  showOnlyIcon: boolean;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const variants = {
  hide: { opacity: [1, 0.5, 0.1, 0, 0] },
  show: { opacity: [0, 0, 0.1, 0.5, 1] },
};

export default function NavBarButton({
  children,
  showOnlyIcon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className='mx-2 mb-2 flex w-full content-center whitespace-nowrap rounded-lg p-2 hover:bg-stone-100'
    >
      <motion.p
        animate={showOnlyIcon ? 'hide' : 'show'}
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 0.8 }}
      >
        {children}
      </motion.p>
    </button>
  );
}
