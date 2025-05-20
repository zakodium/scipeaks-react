import type {
  ElementType,
  ReactEventHandler,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { useCallback, useRef } from 'react';

import { Button } from '../../elements/buttons/button/Button';
import { TranslationsText } from '../../internationalization/TranslationsText';
import type { Color, PropsOf } from '../../types';
import type {
  DialogBodyProps,
  DialogDescriptionProps,
  DialogRootProps,
  DialogTitleProps,
} from '../dialog/Dialog';
import { Dialog } from '../dialog/Dialog.aliases';
import type { DialogSize } from '../dialog/Dialog.utils';

export interface ConfirmDialogProps<
  Wrapper extends ElementType = 'div',
  ConfirmWrapper extends ElementType = typeof Button,
  CancelWrapper extends ElementType = typeof Button,
> extends Omit<
    DialogRootProps<Wrapper>,
    'iconColor' | 'onOpenChange' | 'noDescription'
  > {
  /**
   * @default small
   */
  size?: DialogSize;

  /**
   * replace `iconColor` from `Dialog.Root`
   * and used for confirm button in dialog footer
   * @default `Color.primary`
   */
  color?: Color;

  /**
   * Bound to `<Dialog.Title>` children, into `<Dialog.Root>` first level
   */
  title?: ReactNode;
  titleProps?: Omit<DialogTitleProps, 'children'>;
  /**
   * Bound to `<Dialog.Body> <Dialog.Description>` children, into `<Dialog.Root>` first level
   */
  description?: ReactNode;
  descriptionProps?: Omit<DialogDescriptionProps, 'children'>;
  /**
   * Bound to `<Dialog.Body>` children after description, into `<Dialog.Root>` first level
   */
  children?: ReactNode;
  bodyProps?: Omit<DialogBodyProps, 'children'>;

  /**
   * Control component. If specified, `onOpen`, `onConfirm`, and `onCancel`
   * are mandatory and must set this `open` state.
   */
  open?: boolean;
  /**
   * Called by `onOpenChange` if `open` argument is true.
   * You must update your open state to true on this event.
   */
  onOpen?: () => void;

  /**
   * Bound into `<Dialog.Close asChild> <Button>`
   * @default `<TranslationsText textKey="global.confirm" />`
   */
  confirmText?: ReactNode;
  /**
   * Bound as `<Dialog.Close asChild> <Button onClick={onConfirm}>`
   *
   * @param event - preventDefault if you need async operation before close
   *  the dialog and use dialog in controlled mode,
   *  or you can use `noCloseConfirm` flag
   * @see https://www.radix-ui.com/primitives/docs/components/dialog#close
   */
  onConfirm?: ReactEventHandler;
  /**
   * Confirm button is not wrap by `Radix.Close asChild`.
   * Usefully when dialog content is wrapped into a form,
   * and you don't want to preventDefault to preventClose,
   * because form onSubmit will be call
   */
  noCloseConfirm?: boolean;
  /**
   * Bound as
   * ```tsx
   * <Dialog.Close asChild>
   *   <asConfirm
   *      variant={Variant.primary}
   *      color={color}
   *      {...confirmProps}
   *      onClick={onConfirm}
   * ```
   * So your component should support variant and color props, and must support onClick.
   * Also, your `asConfirm` component must be compatible with the Radix composition model (`asChild`).
   * In other terms, it must forward ref.
   *
   * @default `Button`
   */
  asConfirm?: ConfirmWrapper;
  confirmProps?: Omit<PropsOf<ConfirmWrapper>, 'onClick' | 'children'>;

  /**
   * Bound into `<Dialog.Close asChild> <Button>`
   * @default <TranslationsText textKey="global.cancel" />
   */
  cancelText?: ReactNode;
  /**
   * @param event - preventDefault if you need async operation before close the dialog and use dialog in controlled mode,
   * or you can use `noCloseCancel` flag.
   *
   * `onCancel` can also be called from default `onOpenChange`
   * if `open` argument is `false` and `noCloseCancel` is `false`; in this case, no `event` is provided.
   */
  onCancel?: (event?: SyntheticEvent) => void;
  /**
   * Cancel button is not wrap by `Radix.Close asChild`
   */
  noCloseCancel?: boolean;
  /**
   * Bound as
   *
   * ```tsx
   * <Dialog.Close asChild>
   *   <asCancel
   *      variant={Variant.primary}
   *      {...cancelProps}
   *      onClick={onConfirm}
   * ```
   *
   * So your component should support variant and color props, and must support onClick.
   * Also, your `asCancel` component must be compatible with the Radix composition model (`asChild`)
   *
   * @default `Button`
   */
  asCancel?: CancelWrapper;
  cancelProps?: Omit<PropsOf<CancelWrapper>, 'onClick' | 'children'>;
}

export function ConfirmDialog<
  Wrapper extends ElementType = 'div',
  ConfirmWrapper extends ElementType = typeof Button,
  CancelWrapper extends ElementType = typeof Button,
>(props: ConfirmDialogProps<Wrapper, ConfirmWrapper, CancelWrapper>) {
  const {
    size = 'small',
    title,
    titleProps,
    description,
    descriptionProps,
    children,
    bodyProps,
    onOpen,
    confirmText = <TranslationsText textKey="global.confirm" />,
    onConfirm: onConfirmProp,
    asConfirm: ConfirmButton = Button,
    confirmProps,
    cancelText = <TranslationsText textKey="global.cancel" />,
    onCancel: onCancelProp,
    asCancel: CancelButton = Button,
    cancelProps,
    color = 'primary',
    noCloseCancel,
    noCloseConfirm,
    ...rootProps
  } = props;

  const onConfirmClick = confirmProps?.onClick;
  const onCancelClick = cancelProps?.onClick;
  const hadBeenClosed = useRef(false);
  const onCancel = useCallback(
    (event?: SyntheticEvent) => {
      onCancelProp?.(event);
      onCancelClick?.(event);
      if (
        !event ||
        !(event.isDefaultPrevented() || event.isPropagationStopped())
      ) {
        hadBeenClosed.current = true;
      }
    },
    [onCancelClick, onCancelProp],
  );
  const onConfirm = useCallback(
    (event: SyntheticEvent) => {
      onConfirmProp?.(event);
      onConfirmClick?.(event);
      if (!(event.isDefaultPrevented() || event.isPropagationStopped())) {
        hadBeenClosed.current = true;
      }
    },
    [onConfirmClick, onConfirmProp],
  );

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) return onOpen?.();

      if (noCloseCancel) return;
      if (hadBeenClosed.current) {
        hadBeenClosed.current = false;
        return;
      }

      onCancelProp?.();
    },
    [noCloseCancel, onCancelProp, onOpen],
  );

  const cancelButton = (
    <CancelButton
      variant="white"
      {...cancelProps}
      onClick={onCancelProp ? onCancel : onCancelClick}
    >
      {cancelText}
    </CancelButton>
  );
  const confirmButton = (
    <ConfirmButton
      variant="primary"
      color={color}
      {...confirmProps}
      onClick={onConfirmProp ? onConfirm : onConfirmClick}
    >
      {confirmText}
    </ConfirmButton>
  );

  return (
    <Dialog.Root
      {...rootProps}
      size={size}
      onOpenChange={onOpenChange}
      iconColor={color}
      noDescription={!description}
    >
      <Dialog.Title {...titleProps}>{title}</Dialog.Title>

      <Dialog.Body {...bodyProps}>
        {description && (
          <Dialog.Description {...descriptionProps}>
            {description}
          </Dialog.Description>
        )}
        {children}
      </Dialog.Body>

      <Dialog.Footer>
        {noCloseCancel ? (
          cancelButton
        ) : (
          <Dialog.Close asChild>{cancelButton}</Dialog.Close>
        )}

        {noCloseConfirm ? (
          confirmButton
        ) : (
          <Dialog.Close asChild>{confirmButton}</Dialog.Close>
        )}
      </Dialog.Footer>
    </Dialog.Root>
  );
}
