import type { ReactElement } from 'react';
import { useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type {
  SearchSelectProps,
  SimpleSearchSelectProps,
} from '../../basic/search_select/SearchSelect';
import { SearchSelect } from '../../basic/search_select/SearchSelect';
import type { SimpleSelectOption } from '../../basic/select/Select';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

interface SearchSelectFieldCustomProps<OptionType> {
  onChange?: SearchSelectProps<OptionType>['onChange'];
}

export type SearchSelectFieldProps<OptionType> = Omit<
  SearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error'
> &
  FieldProps;

export type SimpleSearchSelectFieldProps<OptionType> = Omit<
  SimpleSearchSelectProps<OptionType>,
  'selected' | 'onChange' | 'error' | 'onBlur'
> &
  FieldProps;

export function SearchSelectFieldRHF<OptionType>(
  props: RHFValidationProps &
    (OptionType extends SimpleSelectOption
      ? SimpleSearchSelectFieldProps<OptionType>
      : SearchSelectFieldProps<OptionType>) &
    SearchSelectFieldCustomProps<OptionType>,
): ReactElement {
  const {
    name,
    serializeError = defaultErrorSerializer,
    deps,
    onChange,
    ...searchSelectProps
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

  const onSelectChange = useCallback(
    (option: OptionType | undefined) => {
      field.onChange(option || null);
      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onChangeRef.current?.(option);
    },
    [isSubmitted, trigger, deps, field],
  );
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <SearchSelect<any>
      ref={field.ref}
      name={name}
      onBlur={field.onBlur}
      error={serializeError(error)}
      autoFocus={props.autoFocus}
      {...searchSelectProps}
      // Put these at the end because the spread might add them from the search select hook's result.
      selected={field.value}
      onChange={onSelectChange}
    />
  );
}
