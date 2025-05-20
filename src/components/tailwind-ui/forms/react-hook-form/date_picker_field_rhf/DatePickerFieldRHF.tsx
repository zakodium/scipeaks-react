import { useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { DatePickerProps } from '../../basic/date_picker/DatePicker';
import { DatePicker } from '../../basic/date_picker/DatePicker';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

export type DatePickerFieldProps = Omit<DatePickerProps, 'onChange' | 'value'>;

type OnChangeCallback = DatePickerProps['onChange'];
type OnChangeCallbackEvent = Parameters<OnChangeCallback>[1];

interface DatePickerFieldRHFProps
  extends Omit<DatePickerProps, 'value' | 'onChange'>,
    FieldProps,
    RHFValidationProps {
  valueType?: 'string' | 'date';
  onChange?: OnChangeCallback;
}

export function DatePickerFieldRHF(props: DatePickerFieldRHFProps) {
  const {
    name,
    inputProps,
    serializeError = defaultErrorSerializer,
    deps,
    valueType = 'date',
    onChange,
    ...otherProps
  } = props;

  const { trigger } = useCheckedFormRHFContext();
  const {
    field,
    fieldState: { error },
    formState: { isSubmitted },
  } = useController({
    name,
  });

  const { value, onBlur, ref } = field;

  const onChangeRef = useRef(onChange);

  const setFieldValue = useCallback(
    (value: Date | null, event: OnChangeCallbackEvent) => {
      if (valueType === 'string' && value !== null) {
        field.onChange(value.toISOString());
      } else {
        field.onChange(value);
      }

      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onChangeRef.current?.(value, event);
    },
    [field, valueType, deps, isSubmitted, trigger],
  );

  return (
    <DatePicker
      value={valueType === 'string' && value !== null ? new Date(value) : value}
      name={name}
      inputProps={{
        ...inputProps,
      }}
      inputRef={ref}
      error={serializeError(error)}
      onChange={(date: Date | null, event: OnChangeCallbackEvent) => {
        setFieldValue(date, event);
      }}
      onBlur={onBlur}
      {...otherProps}
    />
  );
}
