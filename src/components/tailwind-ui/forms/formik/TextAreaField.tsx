import { useField } from 'formik';
import React from 'react';

import { TextArea, ITextAreaProps } from '../TextArea';

export interface ITextAreaFieldProps extends ITextAreaProps {
  name: string;
}

export function TextAreaField(props: ITextAreaFieldProps): JSX.Element {
  const [field] = useField(props);
  return <TextArea {...field} {...props} />;
}
