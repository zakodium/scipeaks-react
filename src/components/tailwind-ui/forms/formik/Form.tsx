import { Formik, Form as FormikForm, FormikConfig } from 'formik';
import React, { ReactNode } from 'react';

export interface IFormProps<T> extends FormikConfig<T> {
  children: ReactNode;
}

export function Form<T>(props: IFormProps<T>): JSX.Element {
  const { children, ...otherProps } = props;
  return (
    <Formik {...otherProps}>
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
}
