import { useField } from 'formik';
import React from 'react';

import { IRadioProps, Radio } from '../Radio';

export interface IRadioFieldProps extends IRadioProps {
  name: string;
  value: string;
}

export function RadioField(props: IRadioFieldProps): JSX.Element {
  const [field] = useField(props);
  return <Radio {...field} {...props} />;
}
