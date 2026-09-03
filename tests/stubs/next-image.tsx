import type { ImgHTMLAttributes } from 'react';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  alt: string;
  src: string | { src: string };
  priority?: boolean;
};

export default function Image({
  alt,
  src,
  priority: _priority,
  ...props
}: ImageProps) {
  const imageSource = typeof src === 'string' ? src : src.src;

  // oxlint-disable-next-line next/no-img-element -- Test stub mirrors the DOM output of next/image.
  return <img src={imageSource} alt={alt} {...props} />;
}
