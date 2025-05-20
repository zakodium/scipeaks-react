import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { memo } from 'react';

import type { UsePlaceholderImageOptions } from '../../hooks/usePlaceholderImage';
import { usePlaceholderImage } from '../../hooks/usePlaceholderImage';

export interface PlaceholderImageProps
  extends Omit<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      'src' | 'srcSet' | 'height' | 'width'
    >,
    UsePlaceholderImageOptions {}

function PlaceholderImageRaw(props: PlaceholderImageProps) {
  const { height: _height, width: _width, text, ...imgProps } = props;
  const { height, width, alt, src } = usePlaceholderImage({
    height: _height,
    width: _width,
    text: text || imgProps.alt,
  });

  return (
    <img {...imgProps} src={src} height={height} width={width} alt={alt} />
  );
}

/**
 * Client side component (need `document.createElement('canvas')` api to draw into a canvas and call toDataUrl)
 *
 * This component is memoized by props, and props are serialized so components rely on a shared dedicated cache.
 * To avoid redrawing the same image with the same definition.
 */
export const PlaceholderImage = memo(PlaceholderImageRaw);
