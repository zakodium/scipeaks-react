import type { ReactElement } from 'react';
import { useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type {
  MultiSearchSelectProps,
  SimpleMultiSearchSelectProps,
} from '../../basic/multi_search_select/MultiSearchSelect';
import { MultiSearchSelect } from '../../basic/multi_search_select/MultiSearchSelect';
import type { SimpleSelectOption } from '../../basic/select/Select';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

interface MultiSearchSelectFieldCustomProps<OptionType> {
  onChange?: SimpleMultiSearchSelectProps<OptionType>['onChange'];
}

export type MultiSearchSelectFieldProps<OptionType> = Omit<
  MultiSearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error' | 'onBlur'
> &
  FieldProps &
  MultiSearchSelectFieldCustomProps<OptionType>;

export type SimpleMultiSearchSelectFieldProps<OptionType> = Omit<
  SimpleMultiSearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error' | 'onBlur'
> &
  FieldProps &
  MultiSearchSelectFieldCustomProps<OptionType>;

export function MultiSearchSelectFieldRHF<OptionType>(
  props: RHFValidationProps &
    (OptionType extends SimpleSelectOption
      ? SimpleMultiSearchSelectFieldProps<OptionType>
      : MultiSearchSelectFieldProps<OptionType>),
): ReactElement {
  const {
    name,
    serializeError = defaultErrorSerializer,
    deps,
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

  const onChangeRef = useRef(onChange);

  const handleSelect = useCallback(
    (options: OptionType[]) => {
      field.onChange(options);
      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onChangeRef.current?.(options);
    },
    [field, isSubmitted, trigger, deps],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <MultiSearchSelect<any>
      name={name}
      ref={field.ref}
      onBlur={field.onBlur}
      {...otherProps}
      error={serializeError(error)}
      selected={field.value || []}
      onChange={handleSelect}
    />
  );
}
