import type { ReactElement } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type {
  SelectProps,
  SimpleSelectOption,
  SimpleSelectProps,
} from '../../basic/select/Select';
import { Select } from '../../basic/select/Select';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

interface SelectFieldCustomProps<OptionType> {
  onChange?: (option: OptionType | undefined) => void;
}

export type SelectFieldProps<OptionType> = Omit<
  SelectProps<OptionType>,
  'selected' | 'onChange' | 'error'
> &
  FieldProps &
  SelectFieldCustomProps<OptionType>;

export type SimpleSelectFieldProps<OptionType> = Omit<
  SimpleSelectProps<OptionType>,
  'selected' | 'onChange' | 'error'
> &
  FieldProps &
  SelectFieldCustomProps<OptionType>;

export function SelectFieldRHF<OptionType>(
  props: RHFValidationProps &
    (OptionType extends SimpleSelectOption
      ? SimpleSelectFieldProps<OptionType>
      : SelectFieldProps<OptionType>),
): ReactElement {
  const {
    name,
    serializeError = defaultErrorSerializer,
    deps,
    onChange,
    ...selectProps
  } = props;
  const { trigger } = useCheckedFormRHFContext();
  const {
    field,
    fieldState: { error },
    formState: { isSubmitted },
  } = useController({
    name,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Select<any>
      name={name}
      selected={field.value}
      onChange={(option: OptionType | undefined) => {
        field.onChange(option || null);
        if (deps && isSubmitted) {
          void trigger(deps);
        }
        onChange?.(option);
      }}
      error={serializeError(error)}
      {...selectProps}
    />
  );
}
