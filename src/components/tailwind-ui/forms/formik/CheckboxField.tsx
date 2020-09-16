import { useField } from 'formik';
import React from 'react';

import { ICheckboxProps, Checkbox } from '../Checkbox';

export interface ICheckboxFieldProps extends ICheckboxProps {
  name: string;
}

export function CheckboxField(props: ICheckboxFieldProps): JSX.Element {
  const [field] = useField(props);
  return <Checkbox {...field} {...props} />;
}
