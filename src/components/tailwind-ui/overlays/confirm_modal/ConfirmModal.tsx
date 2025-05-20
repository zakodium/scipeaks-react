/* eslint-disable @typescript-eslint/no-deprecated */

import type { ElementType, MouseEvent, ReactNode } from 'react';

import { Button } from '../../elements/buttons/button/Button';
import type { Color } from '../../types';
import type { ModalProps } from '../modal/Modal';
import { Modal } from '../modal/Modal';

export type ConfirmModalProps = Omit<
  ModalProps<ElementType>,
  | 'children'
  | 'wrapperComponent'
  | 'wrapperProps'
  | 'iconColor'
  | 'onRequestClose'
> & {
  color?: Color;
  title: ReactNode;
  body?: ReactNode;
  confirmText: ReactNode;
  onConfirm: () => void;
  renderConfirm?: (options: ConfirmModalConfirmOptions) => ReactNode;
  cancelText?: ReactNode;
  onCancel: () => void;
  renderCancel?: (options: ConfirmModalCancelOptions) => ReactNode;
  onRequestClose?: ModalProps<ElementType>['onRequestClose'];
};

export interface ConfirmModalConfirmOptions {
  confirmText: ReactNode;
  onConfirm: () => void;
  color: Color;
}

export interface ConfirmModalCancelOptions {
  cancelText: ReactNode;
  onCancel: () => void;
}

function defaultRenderConfirm(options: ConfirmModalConfirmOptions) {
  return (
    <Button
      variant="primary"
      color={options.color}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        options.onConfirm();
      }}
    >
      {options.confirmText}
    </Button>
  );
}

function defaultRenderCancel(options: ConfirmModalCancelOptions) {
  return (
    <Button
      variant="white"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        options.onCancel();
      }}
    >
      {options.cancelText}
    </Button>
  );
}

/**
 * @param props
 * @deprecated use `ConfirmDialog`
 */
export function ConfirmModal(props: ConfirmModalProps) {
  const {
    color = 'primary',
    title,
    body,
    confirmText,
    onConfirm,
    renderConfirm = defaultRenderConfirm,
    cancelText = 'Cancel',
    onCancel,
    renderCancel = defaultRenderCancel,
    onRequestClose = onCancel,
    fluid = false,
    ...modalProps
  } = props;

  return (
    <Modal
      fluid={fluid}
      iconColor={color}
      onRequestClose={onRequestClose}
      {...modalProps}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <Modal.Description>{body}</Modal.Description>
      </Modal.Body>
      <Modal.Footer>
        {renderCancel({ cancelText, onCancel })}
        {renderConfirm({ confirmText, onConfirm, color })}
      </Modal.Footer>
    </Modal>
  );
}
