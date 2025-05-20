import type { ReactElement } from 'react';
import { get } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { TextAreaProps } from '../../basic/text_area/TextArea';
import { TextArea } from '../../basic/text_area/TextArea';
import type {
  FieldProps,
  RHFRegisterProps,
  RHFValidationProps,
} from '../../util';
import {
  defaultErrorSerializer,
  getEmptyValueProp,
  getSetValueAs,
} from '../../util';
import { useRHFConfig } from '../context/RHFContext';
import type { InputFieldRHFCustomProps } from '../input_field_rhf/InputFieldRHF';

export type TextAreaFieldProps = TextAreaProps;

export type TextAreaFieldRHFProps = TextAreaFieldProps &
  FieldProps &
  RHFValidationProps &
  InputFieldRHFCustomProps;

export function TextAreaFieldRHF(
  props: TextAreaFieldRHFProps & RHFRegisterProps,
): ReactElement {
  const {
    register,
    formState: { errors },
  } = useCheckedFormRHFContext();
  const error = get(errors, props.name);
  const {
    emptyValue,
    onChange,
    onBlur,
    deps,
    rhfOptions,
    serializeError = defaultErrorSerializer,
    ...otherProps
  } = props;
  const rhfConfig = useRHFConfig();
  const finalEmptyValue = getEmptyValueProp(props, rhfConfig);
  return (
    <TextArea
      {...otherProps}
      {...register(props.name, {
        onChange,
        onBlur,
        setValueAs: getSetValueAs(finalEmptyValue, 'text'),
        deps,
        ...rhfOptions,
      })}
      error={serializeError(error)}
    />
  );
}
