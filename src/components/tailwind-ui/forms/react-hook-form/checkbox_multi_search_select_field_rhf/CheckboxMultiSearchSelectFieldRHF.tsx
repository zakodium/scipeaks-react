import type { ReactElement } from 'react';
import { useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type {
  CheckboxMultiSearchSelectProps,
  CheckboxSimpleMultiSearchSelectProps,
} from '../../basic/checkbox_multi_search_select/CheckboxMultiSearchSelect';
import { CheckboxMultiSearchSelect } from '../../basic/checkbox_multi_search_select/CheckboxMultiSearchSelect';
import type { SimpleMultiSearchSelectProps } from '../../basic/multi_search_select/MultiSearchSelect';
import type { SimpleSelectOption } from '../../basic/select/Select';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

interface CheckboxMultiSearchSelectFieldCustomProps<OptionType> {
  onChange?: SimpleMultiSearchSelectProps<OptionType>['onChange'];
}

export type CheckboxMultiSearchSelectFieldProps<OptionType> = Omit<
  CheckboxMultiSearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error' | 'onBlur'
> &
  FieldProps &
  CheckboxMultiSearchSelectFieldCustomProps<OptionType>;

export type CheckboxSimpleMultiSearchSelectFieldProps<OptionType> = Omit<
  CheckboxSimpleMultiSearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error' | 'onBlur'
> &
  FieldProps &
  CheckboxMultiSearchSelectFieldCustomProps<OptionType>;

export function CheckboxMultiSearchSelectFieldRHF<OptionType>(
  props: RHFValidationProps &
    (OptionType extends SimpleSelectOption
      ? CheckboxSimpleMultiSearchSelectFieldProps<OptionType>
      : CheckboxMultiSearchSelectFieldProps<OptionType>),
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
    <CheckboxMultiSearchSelect<any>
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
