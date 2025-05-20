import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import clsx from 'clsx';
import type {
  CSSProperties,
  DetailedHTMLProps,
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { useCallback, useContext, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useKbsDisableGlobal } from 'react-kbs';

import { Button } from '../../elements/buttons/button/Button';
import type { SubmitProps } from '../../forms/react-hook-form/submit_button/SubmitButtonRHF';
import { SubmitButtonRHF } from '../../forms/react-hook-form/submit_button/SubmitButtonRHF';
import type { Color, PropsOf } from '../../types';
import { forwardRefWithAs } from '../../util';
import { portalContext } from '../PortalContext';

import {
  bgColors,
  DialogSize,
  preventDefault,
  textColors,
} from './Dialog.utils';

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DialogRootProps<Wrapper extends ElementType = 'div'>
  extends DialogProps,
    DialogContentProps {
  /**
   * Bound into `<RadixDialog.Trigger asChild={triggerAsChild} {...triggerProps}>` children
   * @see https://www.radix-ui.com/primitives/docs/guides/composition
   *
   * @example
   * ```tsx
   * // classic usage with the Button component from our components
   * <Dialog trigger={<Button><T keyName="global.open"></Button>} />
   *
   * // radix not-styled trigger button
   * <Dialog trigger={<T keyName="global.open">} triggerAsChild={false} />
   *
   * // radix custom styled trigger button
   * <Dialog
   *  trigger={<T keyName="global.open">}
   *  triggerAsChild={false}
   *  triggerProps={{className: 'rounded-sm bg-primary-900 text-white'}}
   * />
   * ```
   */
  trigger?: ReactNode;
  /**
   * set to false if you prefer default radix-ui trigger
   * @default true
   */
  triggerAsChild?: boolean;
  /**
   * setup custom attributes on trigger
   */
  triggerProps?: Omit<PropsOf<typeof RadixDialog.Trigger>, 'asChild'>;

  /**
   * Custom wrapper, it's usefully for `form`, around header / body / footer of dialog
   * typical usage is to use a submit button in dialog footer.
   *
   * It's important your wrapper support and bound properly `children` and `className`,
   * or dialog styling might be broken, especially for scroll.
   *
   * @default div
   */
  as?: Wrapper;
  /**
   * bound to `as` Component props
   */
  asProps?: Omit<PropsOf<Wrapper>, 'children'> extends { className?: string }
    ? Omit<PropsOf<Wrapper>, 'children'>
    : never;

  noCloseButton?: boolean;
  preventCloseOnEscape?: boolean;
  preventCloseOnInteractOutside?: boolean;

  /**
   * @default full
   */
  size?: DialogSize;

  /**
   * Must be some of these components (or their aliases) on the first level:
   * - `DialogTitle`
   * - `DialogDescription`
   * - `DialogBody`
   * - `DialogFooter`
   * - `DialogLayout`
   *
   * Body is scrollable if needed, so keep other components as small as possible,
   * description should be a small paragraph.
   *
   * For accessibility reasons, a `DialogDescription` should be added to children.
   * If you have no description to add, pass `noDescription` flag to DialogRoot.
   */
  children?: ReactNode;

  /**
   * @default false
   * Bind `aria-describedby={undefined}` if true.
   * To avoid Radix warning when Dialog don't have description.
   */
  noDescription?: boolean;

  /**
   * Bound to `RadixDialog.Content` className
   */
  dialogContentClassName?: string;
  /**
   * Bound to `RadixDialog.Content` style
   */
  dialogContentStyle?: CSSProperties;
}

/**
 * Rely on radix-ui, can be controlled or uncontrolled, uncontrolled by default.
 * Dialog is displayed in portalContext element
 * and provides a child portalContext in the overlay (for dialog in a dialog scenario)
 *
 * @param props
 * @see https://www.radix-ui.com/primitives/docs/components/dialog#root
 * @see `DialogRootProps`
 */
function DialogRoot<Wrapper extends ElementType = 'div'>(
  props: DialogRootProps<Wrapper>,
) {
  const element = useContext(portalContext);
  const [portal, setPortal] = useState<HTMLElement | null>(element);

  const {
    // dialog trigger props
    trigger,
    triggerAsChild = true,
    triggerProps,
    // dialog state props
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    // dialog wrapper props
    as: Component = 'div',
    asProps,
    // dialog close behavior props
    noCloseButton,
    preventCloseOnEscape,
    preventCloseOnInteractOutside,
    // tweak radix
    noDescription,
    // dialog style props
    size = 'full',
    dialogContentClassName,
    dialogContentStyle,
    // dialog layout props
    icon,
    iconColor,
    children,
  } = props;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  useKbsDisableGlobal(open);

  const onEscapeKeyDown = preventCloseOnEscape ? preventDefault : undefined;
  const onInteractOutside = preventCloseOnInteractOutside
    ? preventDefault
    : undefined;

  const restContentProps: Partial<RadixDialog.DialogContentProps> =
    noDescription ? { 'aria-describedby': undefined } : {};

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      {trigger && (
        <RadixDialog.Trigger asChild={triggerAsChild} {...triggerProps}>
          {trigger}
        </RadixDialog.Trigger>
      )}
      <RadixDialog.Portal container={element}>
        <RadixDialog.Overlay
          ref={setPortal}
          className="fixed inset-0 z-10 m-0 flex flex-col items-center justify-center bg-[#71717abf] p-0 text-left focus:outline-hidden"
        >
          <portalContext.Provider value={portal}>
            <RadixDialog.Content
              onEscapeKeyDown={onEscapeKeyDown}
              onPointerDownOutside={onInteractOutside}
              onInteractOutside={onInteractOutside}
              className={clsx(
                'relative bg-white shadow-xl sm:rounded-xl',
                'max-h-[100vh] min-h-[10ch] lg:max-h-[calc(100vh-4rem)]',
                'max-w-[100vw] min-w-full sm:min-w-[33%]',
                DialogSize[size],
                'p-4',
                dialogContentClassName,
              )}
              style={dialogContentStyle}
              {...restContentProps}
            >
              <Component
                {...asProps}
                className={clsx(
                  'flex size-full flex-col sm:flex-row sm:items-start',
                  asProps?.className,
                )}
              >
                <DialogContent icon={icon} iconColor={iconColor}>
                  {children}
                </DialogContent>
              </Component>

              {!noCloseButton && (
                <div className="absolute top-0 right-0 sm:block">
                  <RadixDialog.Close className="m-2 rounded-full p-2 text-neutral-400 hover:text-neutral-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500">
                    <XMarkIcon className="size-6" />
                  </RadixDialog.Close>
                </div>
              )}
            </RadixDialog.Content>
          </portalContext.Provider>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

// local private components
interface DialogContentProps extends PropsWithChildren {
  icon?: ReactNode;
  iconColor?: Color;
}

function DialogContent(props: DialogContentProps) {
  const { icon, iconColor = 'primary', children } = props;

  return (
    <>
      {icon && (
        <aside
          className={clsx(
            'flex shrink-0 items-center justify-center',
            'size-12 sm:h-10 sm:w-10',
            'mx-auto sm:mx-0',
            'rounded-full',
            bgColors[iconColor],
            textColors[iconColor],
          )}
        >
          <span className="size-6">{icon}</span>
        </aside>
      )}
      <article
        className={clsx(
          'flex flex-col gap-2 sm:gap-3',
          'min-h-0 grow sm:max-h-full',
          'sm:mt-0 sm:ml-2',
          'text-center sm:text-left',
        )}
      >
        {children}
      </article>
    </>
  );
}

// primitives children
interface OverrideClassName {
  /**
   * pass the flag to override className instead merge
   */
  noDefaultClassName?: boolean;
}

export interface DialogTitleProps
  extends PropsOf<typeof RadixDialog.Title>,
    OverrideClassName {}

function DialogTitle(props: DialogTitleProps) {
  const { className, noDefaultClassName, ...titleProps } = props;

  return (
    <RadixDialog.Title
      {...titleProps}
      className={clsx(
        className,
        !noDefaultClassName &&
          'px-2 text-lg font-semibold text-neutral-900 sm:mr-8',
      )}
    >
      {titleProps.children}
    </RadixDialog.Title>
  );
}

export interface DialogDescriptionProps
  extends PropsOf<typeof RadixDialog.Description>,
    OverrideClassName {
  /**
   * Rendered into a `<p>` tag.
   * Take care to avoid invalid dom nesting.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p#technical_summary
   * @see https://www.radix-ui.com/primitives/docs/components/dialog#description
   */
  children?: ReactNode;
}

function DialogDescription(props: DialogDescriptionProps) {
  const { className, noDefaultClassName, ...descriptionProps } = props;

  return (
    <RadixDialog.Description
      {...descriptionProps}
      className={clsx(
        className,
        !noDefaultClassName && 'px-2 text-sm text-neutral-500',
      )}
    >
      {descriptionProps.children}
    </RadixDialog.Description>
  );
}

export interface DialogBodyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    OverrideClassName {
  /**
   * pass the flag to override className instead merge.
   * Be really vigilant on this overriding.
   * This is likely to break the scroll
   */
  noDefaultClassName?: boolean;
}
function DialogBody(props: DialogBodyProps) {
  const { className, noDefaultClassName, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={clsx(
        className,
        !noDefaultClassName && 'flex-1 overflow-y-auto px-2 pt-1 pb-2',
      )}
    >
      {divProps.children}
    </div>
  );
}

export interface DialogFooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    OverrideClassName {
  align?: 'right' | 'left' | 'center';
}
function DialogFooter(props: DialogFooterProps) {
  const {
    className,
    noDefaultClassName,
    align = 'right',
    ...footerProps
  } = props;

  return (
    <footer
      {...footerProps}
      className={clsx(
        className,
        !noDefaultClassName &&
          'flex flex-col-reverse gap-1 sm:flex-row sm:gap-2',
        {
          'sm:justify-end': align === 'right' && !noDefaultClassName,
          'sm:justify-center': align === 'center' && !noDefaultClassName,
        },
      )}
    >
      {footerProps.children}
    </footer>
  );
}

interface BaseDialogLayoutProps {
  /**
   * Bound into `DialogTitle` children
   */
  title?: ReactNode;
  titleProps?: Omit<DialogTitleProps, 'children'>;

  /**
   * Bound into `DialogDescription` children
   */
  description?: ReactNode;
  descriptionProps?: Omit<DialogDescriptionProps, 'children'>;

  bodyProps?: Omit<DialogBodyProps, 'children'>;

  /**
   * Bound into `DialogFooter` children
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

export type DialogLayoutProps =
  | BodyDialogLayoutProps
  | ChildrenDialogLayoutProps;

/**
 * Basic layout for dialog content.
 * A fragment with in order if corresponding props defined:
 * - <Title {...titleProps}>{title}</Title>
 * - <Description {...descriptionProps}>{description}</Description>
 * - <Body {...bodyProps}>{children}</Body>
 *   - children props and body props alias each others, typing allows body xor children
 * - <Footer {...footerProps}>{footer}</Footer>
 * @param props
 */
function DialogLayout(props: DialogLayoutProps) {
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
      {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
      {description && (
        <DialogDescription {...descriptionProps}>
          {description}
        </DialogDescription>
      )}
      {children && <DialogBody {...bodyProps}>{children}</DialogBody>}
      {footer && <DialogFooter {...footerProps}>{footer}</DialogFooter>}
    </>
  );
}

// primitive exports
const DialogClose = RadixDialog.Close;

/**
 * Should be child of `<DialogClose asChild>`
 * For some reason, `<DialogClose asChild><button type="submit" /></DialogClose>` do not work as expected
 * So this component, onClick, submits the linked form.
 */
const DialogClosableSubmitButtonRHF = forwardRefWithAs(
  function DialogClosableSubmitButtonRHF<T extends ElementType = 'button'>(
    props: SubmitProps<T>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const onClick = props.onClick;

    const handleClick = useCallback(
      (event: SyntheticEvent) => {
        onClick(event);

        if (event.isPropagationStopped() || event.isDefaultPrevented()) {
          return;
        }

        const $button = event.currentTarget;

        let $form: HTMLFormElement | null = null;

        if ($button.hasAttribute('form')) {
          const formAttribute = $button.getAttribute('form');
          if (formAttribute) {
            $form = document.querySelector(
              `#${formAttribute}`,
            ) as HTMLFormElement;
          }
        } else {
          $form = $button.closest('form');
        }

        if (!$form) return;
        if (!($form instanceof HTMLFormElement)) return;

        $form.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true }),
        );
      },
      [onClick],
    );

    return (
      <SubmitButtonRHF {...props} onClick={handleClick} ref={ref}>
        {props.children}
      </SubmitButtonRHF>
    );
  },
);

/**
 * Like a `SubmitButtonRHF`:
 * - set `disabled` depending on `isSubmitting` from form state
 * - same styling
 * - but `type` is not set to `"submit"`
 *
 * It forwards refs to be used into a `RadixDialog.Trigger`:
 * `<RadixDialog.Trigger asChild><DialogOpenerButtonRHF />`
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *  trigger={
 *    <Dialog.OpenerButtonRHF>
 *      Submit with ConfirmDialog
 *    </Dialog.OpenerButtonRHF>
 *  }
 * ```
 */
const DialogOpenerButtonRHF = forwardRefWithAs(function DialogOpenerButtonRHF<
  T extends ElementType = 'button',
>(props: SubmitProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const { disabled, className, as, ...otherProps } = props;
  const { isSubmitting } = useFormState();

  return (
    <Button
      disabled={isSubmitting || disabled}
      className={clsx('sm:self-start', className)}
      {...otherProps}
      as={as as ElementType}
      ref={ref}
    />
  );
});

export {
  DialogRoot,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogLayout,
  DialogClose,
  DialogClosableSubmitButtonRHF,
  DialogOpenerButtonRHF,
};
