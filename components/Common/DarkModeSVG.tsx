import { useState } from 'react';

import Image from 'next/image';

type Props = {
  className?: string;
  src: string;
  alt: string;
  height: number;
  width?: number;
};

export default function DarkModeSVG({ className, src, alt, height, width = height }: Props) {
  return (
    <Image
      className={className}
      src={`${src}-${document.documentElement.classList.contains('dark') ? 'dark' : 'light'}.svg`}
      alt={alt}
      height={height}
      width={width}
    />
  );
}
