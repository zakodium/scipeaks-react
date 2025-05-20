import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController, useWatch } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import { noop } from '../../../util';
import type { CheckboxProps } from '../../basic/checkbox/Checkbox';
import { Checkbox } from '../../basic/checkbox/Checkbox';
import { Help, Label } from '../../basic/common';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

interface CheckboxGroupProps {
  children: ReactNode;
  label: string;
  hiddenLabel?: boolean;
  required?: boolean;
  onChange?: (options: string[]) => void;
}
export type CheckboxGroupFieldRHFProps = FieldProps &
  CheckboxGroupProps &
  RHFValidationProps;

const checkboxGroupFieldContext = createContext<{
  name: string;
  handleToggle: (option: string, checked: boolean) => void;
  value: string[];
} | null>(null);

export function CheckboxGroupFieldRHF(props: CheckboxGroupFieldRHFProps) {
  const {
    name,
    children,
    serializeError = defaultErrorSerializer,
    label,
    hiddenLabel = false,
    required,
    deps,
    onChange,
  } = props;
  const { trigger } = useCheckedFormRHFContext();

  const {
    field,
    fieldState,
    formState: { isSubmitted },
  } = useController({ name });

  const error = Array.isArray(fieldState.error)
    ? fieldState.error.find(Boolean)
    : fieldState.error;
  const value = field.value as string[];

  const onChangeRef = useRef(onChange);

  const handleToggle = useCallback(
    (option: string, checked: boolean) => {
      let newValue: string[] = value;
      if (checked) {
        newValue = [...value, option];
      } else {
        const idx = value.indexOf(option);
        if (idx !== -1) {
          newValue = value.slice();
          newValue.splice(idx, 1);
        }
      }
      field.onChange(newValue);

      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onChangeRef.current?.(newValue);
    },
    [field, isSubmitted, trigger, deps, value],
  );
  const contextValue = useMemo(() => {
    return {
      name,
      handleToggle,
      value,
    };
  }, [name, handleToggle, value]);

  return (
    <checkboxGroupFieldContext.Provider value={contextValue}>
      <div>
        <Label text={label} hidden={hiddenLabel} required={required} />
        <div className="mt-1">
          {children}
          <Help error={serializeError(error)} />
        </div>
      </div>
    </checkboxGroupFieldContext.Provider>
  );
}

function useCheckboxGroupContext() {
  const context = useContext(checkboxGroupFieldContext);
  if (context === null) {
    throw new Error(
      'CheckboxGroupFieldRHF.Checkbox must be rendered inside of a CheckboxGroupFieldRHF',
    );
  }
  return context;
}

export type CheckboxGroupFieldRHFCheckboxProps = Omit<
  CheckboxProps,
  'name' | 'value' | 'checked'
> & {
  value: string;
};

export function CheckboxGroupFieldRHFCheckbox(
  props: CheckboxGroupFieldRHFCheckboxProps,
) {
  const { name, handleToggle, value } = useCheckboxGroupContext();

  const isChecked = value.includes(props.value);

  const { register, unregister } = useContext(checkboxGroupContext);

  useEffect(() => {
    register(props.value);
    return () => {
      unregister(props.value);
    };
  }, [register, unregister, props.value]);

  return (
    <Checkbox
      name={name}
      {...props}
      checked={isChecked}
      onChange={(event) => {
        handleToggle(props.value, event.target.checked);
        props.onChange?.(event);
      }}
    />
  );
}

/**
 * @deprecated Use CheckboxGroupFieldRHFCheckbox instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
CheckboxGroupFieldRHF.Checkbox = CheckboxGroupFieldRHFCheckbox;

const checkboxGroupContext = createContext<{
  values: Set<string>;
  register: (value: string) => void;
  unregister: (value: string) => void;
}>({
  values: new Set<string>(),
  register: noop,
  unregister: noop,
});

type CheckboxGroupRenderProps = Required<
  Pick<CheckboxProps, 'checked' | 'onChange'>
> & {
  indeterminate: boolean;
};

export interface CheckboxGroupFieldRHFCheckboxGroupProps {
  children: (checkboxProps: CheckboxGroupRenderProps) => ReactNode;
}

export function CheckboxGroupFieldRHFCheckboxGroup(
  props: CheckboxGroupFieldRHFCheckboxGroupProps,
) {
  const { setValue } = useCheckedFormRHFContext();
  const checkboxGroup = useCheckboxGroup();
  const { name } = useCheckboxGroupContext();
  const formValues = useWatch({ name }) as string[];

  let totalCount = 0;
  for (const count of checkboxGroup.values) {
    if (formValues.includes(count)) {
      totalCount += 1;
    }
  }

  const checkboxProps: CheckboxGroupRenderProps = {
    checked: totalCount === checkboxGroup.values.size,
    indeterminate: totalCount !== 0 && totalCount !== checkboxGroup.values.size,
    onChange: (event) => {
      if (event.target.checked) {
        const newValues = new Set([...formValues, ...checkboxGroup.values]);
        setValue(name, Array.from(newValues));
      } else {
        const newValues = new Set(formValues);
        for (const value of checkboxGroup.values) {
          newValues.delete(value);
        }
        setValue(name, Array.from(newValues));
      }
    },
  };

  return (
    <checkboxGroupContext.Provider value={checkboxGroup}>
      {props.children(checkboxProps)}
    </checkboxGroupContext.Provider>
  );
}

/**
 * @deprecated Use CheckboxGroupFieldRHFCheckboxGroup instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
CheckboxGroupFieldRHF.Group = CheckboxGroupFieldRHFCheckboxGroup;

function useCheckboxGroup() {
  const [values, setValues] = useState<Set<string>>(new Set());
  const { register: parentRegister, unregister: parentUnregister } =
    useContext(checkboxGroupContext);

  const register = useCallback(
    (value: string) => {
      parentRegister(value);
      setValues((values) => new Set([...values, value]));
    },
    [setValues, parentRegister],
  );

  const unregister = useCallback(
    (value: string) => {
      parentUnregister(value);
      setValues((values) => {
        values.delete(value);
        return new Set(values);
      });
    },
    [setValues, parentUnregister],
  );

  return useMemo(
    () => ({ values, register, unregister }),
    [values, register, unregister],
  );
}
