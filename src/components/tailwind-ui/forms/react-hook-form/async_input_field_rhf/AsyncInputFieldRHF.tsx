import type { ReactElement } from 'react';
import { get, useWatch } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { InputAsyncValidationCallback } from '../../../hooks/useInputAsyncValidationHook';
import { useInputAsyncValidation } from '../../../hooks/useInputAsyncValidationHook';
import { Input } from '../../basic/input/Input';
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
import type {
  InputFieldProps,
  InputFieldRHFCustomProps,
} from '../input_field_rhf/InputFieldRHF';

export interface AsyncInputFieldProps extends InputFieldProps {
  asyncValidationCallback: InputAsyncValidationCallback;
  debounceDelay?: number;
}

export type AsyncInputFieldRHFProps = AsyncInputFieldProps &
  FieldProps &
  RHFValidationProps &
  RHFRegisterProps &
  InputFieldRHFCustomProps;

export function AsyncInputFieldRHF(
  props: AsyncInputFieldRHFProps,
): ReactElement {
  const {
    asyncValidationCallback,
    debounceDelay = 500,
    serializeError = defaultErrorSerializer,
    emptyValue,
    onChange,
    onBlur,
    deps,
    rhfOptions,
    ...otherProps
  } = props;
  const finalEmptyValue = getEmptyValueProp(props);
  const {
    register,
    formState: { errors, touchedFields },
  } = useCheckedFormRHFContext();
  const fieldValue = useWatch({
    name: props.name,
  });
  const error = get(errors, props.name);
  const inputValidationProps = useInputAsyncValidation(
    // The condition prevents triggering an async validation if the field is already errored
    error ? '' : fieldValue,
    debounceDelay,
    asyncValidationCallback,
  );

  const shouldDisplayError = touchedFields[props.name]
    ? error?.message || inputValidationProps.error
    : !error && inputValidationProps.error;

  const errorMessage = shouldDisplayError
    ? serializeError(error) || inputValidationProps.error
    : undefined;

  return (
    <Input
      {...otherProps}
      {...register(props.name, {
        onChange,
        onBlur,
        setValueAs: getSetValueAs(finalEmptyValue, props.type),
        deps,
        ...rhfOptions,
      })}
      error={errorMessage}
      valid={error ? undefined : inputValidationProps.valid}
      loading={inputValidationProps.loading || otherProps.loading}
    />
  );
}
