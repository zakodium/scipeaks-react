import { useField } from 'formik';
import React from 'react';

import { IInputProps, Input } from '../Input';

export interface IInputFieldProps extends IInputProps {
  name: string;
}

export function InputField(props: IInputFieldProps): JSX.Element {
  const [field] = useField(props);
  return <Input {...field} {...props} />;
}
