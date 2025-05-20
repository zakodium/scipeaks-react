import type { ObjectShape } from 'yup';
import { addMethod, date, number, object, string } from 'yup';

import { requiredFieldMessage, requiredNumberFieldMessage } from './messages';

addMethod(object, 'notEmpty', function notEmpty(message: string) {
  // eslint-disable-next-line no-invalid-this
  return this.test('notEmpty', message, function test(value) {
    return value && Object.keys(value).length > 0;
  });
});

export function requiredString(message?: string) {
  return string()
    .typeError(message || requiredFieldMessage)
    .required(message || requiredFieldMessage);
}

export function requiredNumber(message?: string) {
  return number()
    .typeError(message || requiredNumberFieldMessage)
    .required(message || requiredNumberFieldMessage);
}

export function requiredObject<T extends ObjectShape>(
  spec?: T,
  message?: string,
) {
  return (
    object(spec)
      .required(message || requiredFieldMessage)
      // Objects in yup default to an empty object
      // We don't change the default value as this would change the schema's type
      .notEmpty(message || requiredFieldMessage)
  );
}

export function requiredDate(message?: string) {
  return date().required(message || requiredFieldMessage);
}

export function optionalString() {
  return string().nullable();
}

export function optionalNumber() {
  return number().nullable();
}

export function optionalObject<T extends ObjectShape>(spec: T) {
  return object(spec).nullable().optional().default(undefined);
}

export function optionalDate() {
  return date().nullable();
}
