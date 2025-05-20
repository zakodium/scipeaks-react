import { useMemo } from 'react';

export interface UsePlaceholderImageOptions {
  /**
   * @default 400
   */
  height?: number;

  /**
   * @default 600
   */
  width?: number;

  /**
   * @default Zakodium
   */
  text?: string;
}

export interface UsePlaceholderImageReturn {
  height: number;
  width: number;
  alt: string;
  src: string;
}

export function usePlaceholderImage(
  props: UsePlaceholderImageOptions,
): UsePlaceholderImageReturn {
  const { height = 400, width = 600, text = 'Zakodium' } = props;

  const src = useMemo(
    () => drawPlaceholderImage({ height, width, text }),
    [height, width, text],
  );

  return useMemo(
    () => ({ height, width, alt: text, src }),
    [height, src, text, width],
  );
}

function stableSerialization(props: Required<UsePlaceholderImageOptions>) {
  const { height, width, text } = props;

  const serialization = new URLSearchParams();
  serialization.set('height', String(height));
  serialization.set('width', String(width));
  serialization.set('text', text);

  return serialization.toString();
}

const cache = new Map<string, string>();

/**
 * generate a dataUrl string to use as an image source
 * like `img` `src` attribute or `picture` `source` `srcSet` partial attribute
 *
 * props are serialized with stableSerialization
 * so the result is cached
 *
 * @param props
 * @see stableSerialization
 */
export function drawPlaceholderImage(
  props: Required<UsePlaceholderImageOptions>,
) {
  const { height, width, text } = props;

  const serialization = stableSerialization({ height, width, text });
  const cacheValue = cache.get(serialization);
  if (cacheValue) return cacheValue;

  const canvas = document.createElement('canvas');
  canvas.height = height;
  canvas.width = width;
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Canvas cannot obtain 2d context');

  const x = width / 20;
  const y = height / 20;

  const size = Math.min(x, y);
  const size2 = size * 2;
  const size4 = size * 4;
  const textSize = size * 5;

  context.fillStyle = '#EEEEEE';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#CCCCCC';
  context.fillRect(size, size, width - size2, height - size2);

  context.fillStyle = '#EEEEEE';
  context.fillRect(size2, size2, width - size4, height - size4);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#111111';
  context.font = `${textSize}px serif`;
  const measures = context.measureText(text);
  const maxTextWidth = width - size4 - size2;
  if (measures.width > maxTextWidth) {
    context.font = `${textSize * (maxTextWidth / measures.width)}px serif`;
  }
  context.fillText(text, width / 2, height / 2);

  const dataUrl = canvas.toDataURL('image/png');
  cache.set(serialization, dataUrl);

  return dataUrl;
}
