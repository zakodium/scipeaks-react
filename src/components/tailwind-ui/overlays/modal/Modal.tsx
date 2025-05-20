/* eslint-disable @typescript-eslint/no-deprecated */

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import {
  createElement,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { IconButton } from '../../elements/buttons/icon_button/IconButton';
import type { Color, PropsOf } from '../../types';
import { Portal } from '../Portal';
import { portalContext } from '../PortalContext';
import { useDialog } from '../useDialog';

const bgColors = {
  primary: 'bg-primary-100',
  alternative: 'bg-alternative-100',
  danger: 'bg-danger-100',
  neutral: 'bg-neutral-100',
  success: 'bg-success-100',
  warning: 'bg-warning-100',
};

const textColors = {
  primary: 'text-primary-800',
  alternative: 'text-alternative-800',
  danger: 'text-danger-800',
  neutral: 'text-neutral-800',
  success: 'text-success-800',
  warning: 'text-warning-800',
};

export interface ModalProps<T extends ElementType> {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  icon?: ReactNode;
  iconColor?: Color;
  hasCloseButton?: boolean;
  requestCloseOnBackdrop?: boolean;
  requestCloseOnEsc?: boolean;
  wrapperComponent?: T;
  // This prop isn't used anymore but kept for backwards-compatibility in case
  // we re-add the functionality in the future.
  animated?: boolean;
  fluid?: boolean;
  wrapperProps?: Omit<PropsOf<T>, 'children'>;
  dialogStyle?: CSSProperties;
}

type MaybeHTMLDialogElement = HTMLDialogElement | null;

/**
 * @param props
 * @deprecated prefer `Dialog`
 */
export function Modal<T extends ElementType>(props: ModalProps<T>) {
  const {
    isOpen,
    onRequestClose,
    icon,
    iconColor = 'primary',
    hasCloseButton = true,
    requestCloseOnBackdrop = true,
    requestCloseOnEsc = true,
    fluid = true,
    dialogStyle,
    wrapperComponent,
    wrapperProps,
    children,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { dialogProps, isModalShown } = useDialog({
    dialogRef,
    isOpen,
    requestCloseOnEsc,
    requestCloseOnBackdrop,
    onRequestClose,
  });
  const [portalDomNode, setPortalDomNode] =
    useState<MaybeHTMLDialogElement>(null);
  const dialogCallbackRef = useCallback((node: MaybeHTMLDialogElement) => {
    setPortalDomNode(node);
  }, []);

  useImperativeHandle<MaybeHTMLDialogElement, MaybeHTMLDialogElement>(
    dialogCallbackRef,
    () => dialogRef.current,
  );

  if (!isOpen) {
    return null;
  }

  let modalContents = (
    <div className="flex max-h-full flex-1 flex-col">
      <div className="flex max-h-full max-w-full flex-col sm:flex-row sm:items-start">
        {icon && (
          <div
            className={clsx(
              'mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
              bgColors[iconColor],
            )}
          >
            <span className={clsx(textColors[iconColor], 'size-6')}>
              {icon}
            </span>
          </div>
        )}
        <div className="flex min-h-0 min-w-0 grow flex-col gap-2 text-center sm:mt-0 sm:ml-4 sm:max-h-full sm:gap-3 sm:text-left">
          {children}
        </div>
      </div>
      {hasCloseButton ? (
        <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
          <IconButton
            className="rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
            onClick={(event) => {
              event.stopPropagation();
              onRequestClose();
            }}
            aria-label="Close"
            color="none"
            icon={<XMarkIcon />}
            size="6"
          />
        </div>
      ) : null}
    </div>
  );

  if (wrapperComponent) {
    modalContents = createElement(
      wrapperComponent,
      wrapperProps,
      modalContents,
    );
  }

  return (
    <Portal>
      <RemoveScroll>
        <dialog
          {...dialogProps}
          ref={dialogRef}
          style={{
            maxWidth: fluid ? 'calc(100% - 2rem)' : undefined,
            ...dialogStyle,
          }}
          className={clsx(
            'fixed m-auto flex rounded-lg bg-white p-0 text-left align-bottom shadow-xl backdrop:bg-[#71717abf] focus:outline-hidden',
            {
              'sm:w-full sm:max-w-lg': !fluid,
            },
          )}
        >
          {isModalShown && (
            <portalContext.Provider value={portalDomNode}>
              <div className="flex flex-1 px-2 pt-5 pb-4 sm:py-6 sm:pr-4 sm:pl-6">
                {modalContents}
              </div>
            </portalContext.Provider>
          )}
        </dialog>
      </RemoveScroll>
    </Portal>
  );
}

Modal.Header = function ModalHeader(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={clsx(
        'pl-2 text-lg font-semibold text-neutral-900 sm:mr-8',
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
};

Modal.Body = function ModalBody(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'flex min-h-0 max-w-full flex-col overflow-auto px-2 pt-1 pb-2',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Modal.Description = function ModalDescription(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('text-sm text-neutral-500', props.className)}>
      {props.children}
    </div>
  );
};

Modal.Footer = function ModalFooter(props: {
  children: ReactNode;
  className?: string;
  align?: 'right' | 'left' | 'center';
}) {
  const { children, className, align = 'right' } = props;
  return (
    <div
      className={clsx(
        'flex flex-col-reverse gap-1 px-2 sm:flex-row sm:gap-2',
        {
          'sm:justify-end': align === 'right',
          'sm:justify-center': align === 'center',
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
