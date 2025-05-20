import clsx from 'clsx';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { useCallback, useRef } from 'react';

import type { ZoomOverlayRef } from '../zoom_overlay/ZoomOverlay';
import { ZoomOverlay } from '../zoom_overlay/ZoomOverlay';

import { ZoomImageInOverlay } from './ZoomImageInOverlay';

export interface ZoomImageProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'onClick'
  > {
  // make them mandatory
  alt: string;
  src: string;

  /**
   * Will be used as src on img tag if specified.
   * Fullscreen version will use src
   */
  thumbSrc?: string;

  /**
   * this component will add 'cursor-pointer' on img tag
   */
  className?: string;

  /**
   * Will be bound with img tag className in fullscreen dialog.
   * component adds 'm-auto h-full max-w-full object-contain shadow-[0_0_25px_5px_rgba(0,0,0,0.25)]'.
   */
  fullscreenClassName?: string;

  /**
   * Will be bound on img tag in fullscreen dialog if specified,
   * else will use alt props
   */
  fullscreenAlt?: string;

  /**
   * merged with
   * - 'fixed left-0 top-0'
   * - 'size-full max-h-full w-full max-w-full'
   * - 'm-0 p-0'
   * - 'cursor-zoom-out bg-black/20'
   * should be used for setting z-index if needed, or override background styling
   */
  fullscreenContainerClassName?: string;
}

export function ZoomImage(props: ZoomImageProps) {
  const { src, className } = props;
  const {
    alt,
    fullscreenClassName,
    thumbSrc,
    fullscreenAlt,
    fullscreenContainerClassName,
    ...imgProps
  } = props;

  const overlayRef = useRef<ZoomOverlayRef>(null);
  const openDialog = useCallback(() => {
    overlayRef.current?.open();
  }, []);

  return (
    <>
      <img
        alt={alt}
        {...imgProps}
        src={thumbSrc || src}
        onClick={openDialog}
        className={clsx(className, 'cursor-zoom-in')}
      />
      <ZoomOverlay ref={overlayRef}>
        <ZoomImageInOverlay
          alt={fullscreenAlt || alt}
          {...imgProps}
          className={fullscreenClassName}
        />
      </ZoomOverlay>
    </>
  );
}
