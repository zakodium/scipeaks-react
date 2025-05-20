import clsx from 'clsx';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import { zoomImageInOverlayStyling } from './ZoomImageInOverlayStyling.utils';

export type ZoomImageInOverlayProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function ZoomImageInOverlay(props: ZoomImageInOverlayProps) {
  return (
    <img
      {...props}
      className={clsx(props.className, zoomImageInOverlayStyling())}
    />
  );
}
