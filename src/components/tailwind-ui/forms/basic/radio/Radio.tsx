import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import { Help } from '../common';
import { labelColor, labelDisabledColor } from '../utils.common';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label: ReactNode;
  value: string;
  help?: HelpPublicProps['help'];
}

export const Radio = forwardRef(function RadioForwardRef(
  props: RadioProps,
  ref: Ref<HTMLInputElement>,
) {
  const { name, value, id, label, help, className, ...otherProps } = props;

  const finalId = useInputId(id, `${name}-${value}`);

  return (
    <div className={clsx('flex items-start', className)}>
      <div className="flex h-5 items-center">
        <input
          {...otherProps}
          ref={ref}
          id={finalId}
          name={name}
          value={value}
          type="radio"
          className="relative size-4 appearance-none rounded-full border border-neutral-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-primary-600 checked:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:before:bg-neutral-400 forced-colors:appearance-auto forced-colors:before:hidden"
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={finalId}
          className={clsx(
            'block font-semibold',
            props.disabled ? labelDisabledColor : labelColor,
          )}
        >
          {label}
        </label>
        <Help help={help} noMargin />
      </div>
    </div>
  );
});
