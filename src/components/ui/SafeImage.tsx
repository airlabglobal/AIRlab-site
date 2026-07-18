'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { DEFAULT_IMAGE } from '@/data/socials';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

const resolveValidSrc = (source?: string | null, fallback: string = DEFAULT_IMAGE): string => {
  if (!source || typeof source !== 'string' || source.trim() === '') {
    if (!fallback || fallback.trim() === '') {
      return DEFAULT_IMAGE;
    }
    return fallback;
  }
  return source;
};

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_IMAGE,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => resolveValidSrc(src, fallbackSrc));

  useEffect(() => {
    setImgSrc(resolveValidSrc(src, fallbackSrc));
  }, [src, fallbackSrc]);

  const finalSrc = !imgSrc || imgSrc.trim() === '' ? DEFAULT_IMAGE : imgSrc;

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt || ''}
      onError={(e) => {
        const targetFallback = fallbackSrc && fallbackSrc.trim() !== '' ? fallbackSrc : DEFAULT_IMAGE;
        if (finalSrc !== targetFallback) {
          setImgSrc(targetFallback);
        } else if (finalSrc !== DEFAULT_IMAGE) {
          setImgSrc(DEFAULT_IMAGE);
        }
        if (onError) {
          onError(e);
        }
      }}
    />
  );
}
