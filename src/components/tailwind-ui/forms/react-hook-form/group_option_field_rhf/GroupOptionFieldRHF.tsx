import type { ReactElement } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { get } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import { Help } from '../../basic/common';
import type {
  GroupOptionProps,
  OptionProps,
} from '../../basic/group_option/GroupOption';
import { GroupOptionInternal, Option } from '../../basic/internal/GroupOption';
import type {
  FieldProps,
  RHFRegisterProps,
  RHFValidationProps,
} from '../../util';
import { defaultErrorSerializer } from '../../util';

const groupOptionContext = createContext<
  | ({
      name: string;
    } & RHFRegisterProps &
      RHFValidationProps)
  | null
>(null);

export type GroupOptionFieldRHFProps = GroupOptionProps &
  FieldProps & {
    name: string;
  } & RHFRegisterProps &
  RHFValidationProps;

export function GroupOptionFieldRHF(props: GroupOptionFieldRHFProps) {
  const {
    formState: { errors },
  } = useCheckedFormRHFContext();
  const { name, deps, children, rhfOptions } = props;
  const contextValue = useMemo(() => {
    return {
      name,
      deps,
      rhfOptions,
    };
  }, [name, deps, rhfOptions]);
  const error = get(errors, name);

  const { serializeError = defaultErrorSerializer, ...otherProps } = props;

  return (
    <groupOptionContext.Provider value={contextValue}>
      <GroupOptionInternal {...otherProps}>{children}</GroupOptionInternal>
      {error && <Help error={serializeError(error)} />}
    </groupOptionContext.Provider>
  );
}

type OptionFieldRHFProps = OptionProps & RHFRegisterProps;

function OptionFieldRHF(props: OptionFieldRHFProps): ReactElement {
  const { register } = useCheckedFormRHFContext();
  const contextValue = useContext(groupOptionContext);
  if (!contextValue) {
    throw new Error(
      'OptionFieldRHF is missing the context provided by GroupOptionField',
    );
  }
  const { name, deps, rhfOptions } = contextValue;
  return <Option {...props} {...register(name, { ...rhfOptions, deps })} />;
}

GroupOptionFieldRHF.Option = OptionFieldRHF as (
  // We can't support value as number on radio
  // https://github.com/react-hook-form/react-hook-form/issues/10533
  props: Omit<OptionProps, 'name' | 'rhfOptions'> & { value: string },
) => ReactElement;
