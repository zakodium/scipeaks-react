import clsx from 'clsx';
import type { ComponentType, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { FormRHFProps } from '../../forms/react-hook-form/form_rhf/FormRHF';
import { FormRHF } from '../../forms/react-hook-form/form_rhf/FormRHF';
import type { SlideOverProps } from '../slide_over/SlideOver';
import {
  SlideOver,
  SlideOverContent,
  SlideOverFooter,
  SlideOverHeader,
} from '../slide_over/SlideOver';

export type FormRHFSlideOverProps<TValues extends FieldValues> = Omit<
  SlideOverProps<ComponentType<FormRHFProps<TValues>>>,
  'wrapperProps' | 'wrapperComponent'
> &
  Omit<FormRHFProps<TValues>, 'className' | 'children'>;

export function FormRHFSlideOver<TValues extends FieldValues>(
  props: FormRHFSlideOverProps<TValues>,
) {
  const { children, requestCloseOnClickOutside = false, ...otherProps } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    <SlideOver<ComponentType<FormRHFProps<TValues>>>
      {...otherProps}
      requestCloseOnClickOutside={requestCloseOnClickOutside}
      wrapperComponent={FormRHF}
      wrapperProps={otherProps}
    >
      {children}
    </SlideOver>
  );
}

export const FormRHFSlideOverHeader = SlideOverHeader;

/**
 * @deprecated Use FormRHFSlideOverHeader instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
FormRHFSlideOver.Header = FormRHFSlideOverHeader;

export function FormRHFSlideOverContent(props: {
  children: ReactNode;
  className?: string;
  noDefaultStyle?: boolean;
}) {
  const { noDefaultStyle = false, className, children } = props;
  return (
    <SlideOverContent
      className={clsx({ 'space-y-4': !noDefaultStyle }, className)}
    >
      {children}
    </SlideOverContent>
  );
}

/**
 * @deprecated Use FormRHFSlideOverContent instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
FormRHFSlideOver.Content = FormRHFSlideOverContent;

export const FormRHFSlideOverFooter = SlideOverFooter;

/**
 * @deprecated Use FormRHFSlideOverFooter instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
FormRHFSlideOver.Footer = FormRHFSlideOverFooter;
