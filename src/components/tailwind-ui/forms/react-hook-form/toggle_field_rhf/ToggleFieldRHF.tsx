import type { ReactElement } from 'react';
import { useCallback, useRef } from 'react';
import { useController, useWatch } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { ToggleProps } from '../../basic/toggle/Toggle';
import { Toggle } from '../../basic/toggle/Toggle';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

export interface ToggleFieldProps
  extends Omit<ToggleProps, 'activated' | 'onChange'> {
  name: string;
  label: string;
  onChange?: (activated: boolean) => void;
}

export type ToggleFieldRHFProps = ToggleFieldProps &
  FieldProps &
  RHFValidationProps;

export function ToggleFieldRHF(props: ToggleFieldRHFProps): ReactElement {
  const {
    name,
    serializeError = defaultErrorSerializer,
    deps,
    onChange,
    ...otherProps
  } = props;
  const { trigger } = useCheckedFormRHFContext();
  const activated = useWatch({
    name,
  });

  const {
    field,
    fieldState: { error },
    formState: { isSubmitted },
  } = useController({ name });

  const onToggleRef = useRef(onChange);

  const onToggleChange = useCallback(
    (value: boolean) => {
      field.onChange(value);
      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onToggleRef.current?.(value);
    },
    [field, isSubmitted, deps, trigger],
  );

  return (
    <Toggle
      name={name}
      onChange={onToggleChange}
      activated={activated}
      error={serializeError(error)}
      {...otherProps}
    />
  );
}
