import type { ReactElement } from 'react';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { RadioProps } from '../../basic/radio/Radio';
import { Radio } from '../../basic/radio/Radio';
import type { RHFRegisterProps } from '../../util';

export type RadioFieldProps = RadioProps;

export function RadioFieldRHF(
  props: RadioFieldProps & RHFRegisterProps,
): ReactElement {
  const { onChange, onBlur, rhfOptions, ...otherProps } = props;
  const { register } = useCheckedFormRHFContext();

  return (
    <Radio
      {...otherProps}
      {...register(props.name, {
        onChange,
        onBlur,
        ...rhfOptions,
      })}
    />
  );
}
