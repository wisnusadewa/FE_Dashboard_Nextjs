'use client';

import { useMediaQuery } from '@react-hook/media-query';
import Image from 'next/image';

interface SrcProps {
  srcExt?: string;
}

const ResponsiveImage = ({ srcExt }: SrcProps) => {
  const isMd = useMediaQuery('(min-width : 768px)');
  const src = isMd ? (srcExt ? srcExt : '/mainLogo.svg') : '/mainLogo.svg';
  const width = isMd ? 134 : 122;
  const height = isMd ? 24 : 22;

  return <Image src={src} alt="Responsive Image" width={width} height={height} loading="lazy" className="object-cover w-[122px] h-[22px]" />;
};

export default ResponsiveImage;
