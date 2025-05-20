import type { ReactElement } from 'react';
import { get } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { CheckboxProps } from '../../basic/checkbox/Checkbox';
import { Checkbox } from '../../basic/checkbox/Checkbox';
import type {
  FieldProps,
  RHFRegisterProps,
  RHFValidationProps,
} from '../../util';
import { defaultErrorSerializer } from '../../util';

export type CheckboxFieldProps = CheckboxProps;

export type CheckboxFieldRHFProps = Omit<CheckboxFieldProps, 'checked'> &
  FieldProps &
  RHFValidationProps &
  RHFRegisterProps;

export function CheckboxFieldRHF(props: CheckboxFieldRHFProps): ReactElement {
  const {
    register,
    formState: { errors },
  } = useCheckedFormRHFContext();

  const error = get(errors, props.name);

  const {
    serializeError = defaultErrorSerializer,
    onChange,
    onBlur,
    deps,
    rhfOptions,
    ...otherProps
  } = props;
  return (
    <Checkbox
      {...otherProps}
      {...register(props.name, {
        onChange,
        onBlur,
        deps,
        ...rhfOptions,
      })}
      error={serializeError(error)}
    />
  );
}
