import clsx from 'clsx';
import type {
  ElementType,
  ForwardedRef,
  ReactNode,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import { useFormState } from 'react-hook-form';

import type { ButtonProps } from '../../../elements/buttons/button/Button';
import { Button } from '../../../elements/buttons/button/Button';

export type SubmitProps<T extends ElementType = 'button'> = Omit<
  ButtonProps<T>,
  'type'
>;

export const SubmitButtonRHF: SubmitButtonRHF = forwardRef(
  // @ts-expect-error props are incompatible. Refs: https://github.com/DefinitelyTyped/DefinitelyTyped/commit/f3052d979fdf41749d43a1f6abea993763f83e21
  function SubmitButtonRHF<T extends ElementType = 'button'>(
    props: SubmitProps<T>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const { disabled, className, as, ...otherProps } = props;
    const { isSubmitting } = useFormState();

    return (
      <Button
        disabled={isSubmitting || disabled}
        className={clsx('sm:self-start', className)}
        {...otherProps}
        as={as as ElementType}
        // after otherProps spread because when into a `<Dialog.Close asChild>`
        // props `type: 'button'` is set by Radix.
        type="submit"
        ref={ref}
      />
    );
  },
);
Object.assign(SubmitButtonRHF, { displayName: 'SubmitButtonRHF' });

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SubmitButtonRHF = <T extends ElementType = 'button'>(
  props: SubmitProps<T> & RefAttributes<HTMLButtonElement>,
) => ReactNode;
