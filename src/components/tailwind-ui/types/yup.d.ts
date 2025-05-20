// eslint-disable-next-line import/no-unassigned-import
import 'yup';

declare module 'yup' {
  interface ObjectSchema {
    notEmpty(message: string): this;
  }
}
