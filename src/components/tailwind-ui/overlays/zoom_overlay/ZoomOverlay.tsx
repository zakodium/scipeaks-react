import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { ForwardedRef, ReactNode, RefObject } from 'react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useKbsDisableGlobal } from 'react-kbs';
import { RemoveScroll } from 'react-remove-scroll';

import { IconButton } from '../../elements/buttons/icon_button/IconButton';
import { useOnOff } from '../../hooks/useOnOff';

export interface ZoomOverlayProps {
  onClose?: () => void;
  className?: string;

  children?: ReactNode;
}

export interface ZoomOverlayRef {
  /**
   * imperative api to open the dialog
   */
  open: () => void;

  /**
   * imperative api to close the dialog
   */
  close: () => void;

  /**
   * readonly ref to html dialog element
   */
  dialogRef: RefObject<HTMLDialogElement>;
}

/**
 * This component is primary designed to be used by `ZoomImage`.
 * It contains the presentation and logic to display a single dom element in fullscreen.
 * It exposes through its `ref` a `ZoomOverlayRef` imperative api.
 *
 * So it's possible to use this component outside his primary usage,
 * but consider it as a semi-private component.
 *
 * The typical child component to use with this component is `ZoomImageInOverlay`.
 * An `img` dom element with styling adapted to this context.
 * If you need to use something else than an `img` element,
 * ensure to bound `zoomImageInOverlayStyling()` as child's className.
 *
 * @example
 *
 * To create an auto-opened ZoomOverlay with a canvas
 *
 * ```tsx
 * <ZoomOverlay ref={api => api?.open()}>
 *   <canvas className={zoomImageInOverlayStyling()} ref={canvas => canvas && yourDrawCanvasLogic(canvas)} />
 * </ZoomOverlay>
 * ```
 */
export const ZoomOverlay = forwardRef(
  (props: ZoomOverlayProps, ref: ForwardedRef<ZoomOverlayRef>) => {
    const [isOpen, openZoom, closeZoom] = useOnOff();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const api = useMemo((): ZoomOverlayRef => {
      return {
        open: () => {
          dialogRef.current?.showModal();
          openZoom();
        },
        close: () => {
          dialogRef.current?.close();
          closeZoom();
        },
        dialogRef,
      };
    }, [closeZoom, openZoom]);

    const apiClose = api.close;
    const onClose = props.onClose;
    const close = useCallback(() => {
      apiClose();
      onClose?.();
    }, [apiClose, onClose]);

    useImperativeHandle(ref, () => api, [api]);
    useKbsDisableGlobal(isOpen);

    // RemoveScroll will render an empty div (can be removed with forwardProps, but will lose the close on escape)
    return (
      <RemoveScroll enabled={isOpen}>
        <dialog
          onClose={close}
          ref={dialogRef}
          className={clsx(
            props.className,
            // ensure proper positioning even if it should be base styling from dialog:modal browser default styling
            'fixed top-0 left-0',
            // ensure full size can be taken, because browsers set max-width and max-height bellow 100%
            // https://stackoverflow.com/a/75024226
            'size-full max-h-full max-w-full',
            // ensure no margin and no padding
            'm-0 p-5',
            // fancy style for dialog
            'cursor-zoom-out bg-black/20',
            isOpen && 'flex items-center justify-center',
          )}
          onClick={close}
        >
          <IconButton
            size="6"
            icon={<XMarkIcon />}
            className="absolute top-0 right-0 p-6 hover:bg-neutral-800/30"
          />

          {props.children}
        </dialog>
      </RemoveScroll>
    );
  },
);
