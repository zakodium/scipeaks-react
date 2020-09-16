import { useField } from 'formik';
import React from 'react';

import { Toggle } from '../Toggle';

export interface IToggleFieldProps {
  name: string;
}

export function ToggleField(props: IToggleFieldProps): JSX.Element {
  const [field, , helper] = useField(props);

  return (
    <Toggle
      onToggle={helper.setValue}
      activated={Boolean(field.value)}
      {...field}
    />
  );
}
