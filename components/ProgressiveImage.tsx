'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type ProgressiveImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
  imgClassName?: string;
  skeletonClassName?: string;
};

export default function ProgressiveImage({
  className = '',
  imgClassName = '',
  skeletonClassName = '',
  onLoadingComplete,
  alt,
  ...imgProps
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Skeleton */}
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100'
        } ${skeletonClassName}`}
        aria-hidden
      />

      {/* Image */}
      <Image
        alt={alt}
        {...imgProps}
        onLoadingComplete={(img) => {
          setLoaded(true);
          onLoadingComplete?.(img);
        }}
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
