import Image, { StaticImageData } from "next/image";
import clsx from 'clsx';

type Props = {
  src: string | StaticImageData
  alt: string,
  className?: string
};
export default function ImgWrap ({src, alt, className}: Props){
  return (
    <div className={clsx('img-wrap', className)}>
      <Image src={src} alt={alt} width={0} height={0} sizes="100vw" priority />
    </div>
  )
}