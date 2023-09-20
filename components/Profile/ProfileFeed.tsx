'use client';

import { motion } from 'framer-motion';
import 'moment/locale/ko';

import { memo } from 'react';

import Image from 'next/image';

type Props = {
  feedImg: string;
};

function ProfileFeed({ feedImg }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, opacity: 0.7, zIndex: 1 }}
      className='relative m-[2px] h-[196px] w-[196px]'
    >
      <Image
        className='h-full w-full overflow-hidden object-cover'
        src={feedImg}
        alt='feed'
        width={200}
        height={200}
      />
    </motion.article>
  );
}
export default memo(ProfileFeed);
