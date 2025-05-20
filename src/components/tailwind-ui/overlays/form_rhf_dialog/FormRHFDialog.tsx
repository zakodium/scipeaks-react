import clsx from 'clsx';
import type { BaseSyntheticEvent, ElementType, ReactNode } from 'react';
import type {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import type { ButtonProps } from '../../elements/buttons/button/Button';
import { Button } from '../../elements/buttons/button/Button';
import type { ResetButtonRHFProps } from '../../forms/react-hook-form/ResetButtonRHF';
import { ResetButtonRHF } from '../../forms/react-hook-form/ResetButtonRHF';
import type { FormRHFProps } from '../../forms/react-hook-form/form_rhf/FormRHF';
import { FormRHF } from '../../forms/react-hook-form/form_rhf/FormRHF';
import type { SubmitProps } from '../../forms/react-hook-form/submit_button/SubmitButtonRHF';
import { SubmitButtonRHF } from '../../forms/react-hook-form/submit_button/SubmitButtonRHF';
import type {
  DialogBodyProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogRootProps,
  DialogTitleProps,
} from '../dialog/Dialog';
import { DialogDescription, DialogFooter, DialogTitle } from '../dialog/Dialog';
import { Dialog } from '../dialog/Dialog.aliases';
import { useFormRHFDialog } from '../hooks/useFormRHFDialog';

export interface FormRHFDialogProps<TValues extends FieldValues>
  extends Omit<
      DialogRootProps<typeof FormRHF<TValues>>,
      'as' | 'asProps' | 'children'
    >,
    Omit<FormRHFProps<TValues>, 'children' | 'onSubmit' | 'onInvalidSubmit'> {
  children: ReactNode;
  onSubmit: (
    data: TValues,
    event: BaseSyntheticEvent | undefined,
    methods: UseFormReturn<TValues>,
    closeDialog: () => void,
  ) => ReturnType<SubmitHandler<TValues>>;
  onInvalidSubmit?: (
    errors: FieldErrors<TValues>,
    closeDialog: () => void,
    event?: BaseSyntheticEvent,
  ) => ReturnType<SubmitErrorHandler<TValues>>;
  /**
   * Dialog will close after successful `onSubmit` (no error thrown)
   * @default true
   * */
  autoCloseOnSubmit?: boolean;
}

export function FormRHFDialogRoot<TValues extends FieldValues>(
  props: FormRHFDialogProps<TValues>,
) {
  const {
    // dialog props
    open,
    defaultOpen,
    onOpenChange,
    noDescription,
    size,
    icon,
    iconColor,
    trigger,
    triggerAsChild,
    triggerProps,
    noCloseButton,
    preventCloseOnEscape,
    preventCloseOnInteractOutside,

    // override form props
    autoCloseOnSubmit = true,
    onSubmit: onFormSubmit,
    onInvalidSubmit: onFormInvalidSubmit,

    ...formProps
  } = props;

  const { hiddenCloseButton, onSubmit, onInvalidSubmit } = useFormRHFDialog(
    !autoCloseOnSubmit,
    onFormSubmit,
    onFormInvalidSubmit,
  );

  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      noDescription={noDescription}
      size={size}
      icon={icon}
      iconColor={iconColor}
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      triggerProps={triggerProps}
      noCloseButton={noCloseButton}
      preventCloseOnEscape={preventCloseOnEscape}
      preventCloseOnInteractOutside={preventCloseOnInteractOutside}
      as={FormRHF<TValues>}
      asProps={{
        ...formProps,
        onSubmit,
        noDefaultStyle: true,
        onInvalidSubmit,
      }}
    >
      {hiddenCloseButton}

      {props.children}
    </Dialog.Root>
  );
}

export interface FormRHFDialogBodyProps extends DialogBodyProps {
  noDefaultFormClassName?: boolean;
}

export function FormRHFDialogBody(props: FormRHFDialogBodyProps) {
  return (
    <Dialog.Body
      {...props}
      className={clsx(props.className, {
        'flex flex-col gap-4': !props.noDefaultFormClassName,
      })}
    >
      {props.children}
    </Dialog.Body>
  );
}

export const FormRHFDialogTitle = DialogTitle;
export const FormRHFDialogDescription = DialogDescription;
export const FormRHFDialogFooter = DialogFooter;

interface BaseDialogLayoutProps {
  /**
   * Bound into `FormRHFDialogTitle` children
   */
  title?: ReactNode;
  titleProps?: Omit<DialogTitleProps, 'children'>;

  /**
   * Bound into `FormRHFDialogDescription` children
   */
  description?: ReactNode;
  descriptionProps?: Omit<DialogDescriptionProps, 'children'>;

  bodyProps?: Omit<FormRHFDialogBodyProps, 'children'>;

  /**
   * Bound into `FormRHFDialogFooter` children
   */
  footer?: ReactNode;
  footerProps?: Omit<DialogFooterProps, 'children'>;
}

interface BodyDialogLayoutProps extends BaseDialogLayoutProps {
  /**
   * Bound into `DialogBody` children, alias for children props
   */
  body?: ReactNode;
}

interface ChildrenDialogLayoutProps extends BaseDialogLayoutProps {
  /**
   * Bound into `DialogBody` children, alias for body props
   */
  children?: ReactNode;
}

export type FormRHFDialogLayoutProps =
  | BodyDialogLayoutProps
  | ChildrenDialogLayoutProps;

/**
 * Basic layout for dialog content.
 * A fragment with in order if corresponding props defined:
 * - <FormRHFDialogTitle {...titleProps}>{title}</FormRHFDialogTitle>
 * - <FormRHFDialogDescription {...descriptionProps}>{description}</FormRHFDialogDescription>
 * - <FormRHFDialogBody {...bodyProps}>{children}</FormRHFDialogBody>
 *   - children props and body props alias each others, typing allows body xor children
 * - <FormRHFDialogFooter {...footerProps}>{footer}</FormRHFDialogFooter>
 * @param props
 */
export function FormRHFDialogLayout(props: FormRHFDialogLayoutProps) {
  const {
    title,
    titleProps,
    description,
    descriptionProps,
    bodyProps,
    footer,
    footerProps,
  } = props;

  const children =
    'children' in props
      ? props.children
      : 'body' in props
        ? props.body
        : undefined;

  return (
    <>
      {title && (
        <FormRHFDialogTitle {...titleProps}>{title}</FormRHFDialogTitle>
      )}
      {description && (
        <FormRHFDialogDescription {...descriptionProps}>
          {description}
        </FormRHFDialogDescription>
      )}
      {children && (
        <FormRHFDialogBody {...bodyProps}>{children}</FormRHFDialogBody>
      )}
      {footer && (
        <FormRHFDialogFooter {...footerProps}>{footer}</FormRHFDialogFooter>
      )}
    </>
  );
}
export const FormRHFDialogClose = Dialog.Close;

export function FormRHFDialogSubmit<T extends ElementType = 'button'>(
  props: SubmitProps<T>,
) {
  return (
    <SubmitButtonRHF variant="primary" color="primary" {...props}>
      {props.children}
    </SubmitButtonRHF>
  );
}

export type FormRHFDialogCancelProps<T extends ElementType = 'button'> =
  ButtonProps<T>;

export function FormRHFDialogCancel<T extends ElementType = 'button'>(
  props: FormRHFDialogCancelProps<T>,
) {
  return (
    <FormRHFDialogClose asChild>
      <Button<T> variant="secondary" color="neutral" {...props}>
        {props.children}
      </Button>
    </FormRHFDialogClose>
  );
}

export type FormRHFDialogResetProps<T extends ElementType = 'button'> =
  ResetButtonRHFProps<T>;

export function FormRHFDialogReset<T extends ElementType = 'button'>(
  props: FormRHFDialogResetProps<T>,
) {
  return <ResetButtonRHF variant="secondary" color="warning" {...props} />;
}
