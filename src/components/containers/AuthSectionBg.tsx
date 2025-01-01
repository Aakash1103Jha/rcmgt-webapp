import Image, { ImageProps } from 'next/image';
import { memo } from 'react';

export default memo(function AuthSectionBg({ src, alt, ...rest }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      height={1000}
      width={1000}
      className="h-[100dvh] w-full object-cover bg-slate-50"
      {...rest}
    />
  );
});
