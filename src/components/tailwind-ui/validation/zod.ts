import type { ZodRawShape } from 'zod';
import { z } from 'zod';

import { requiredFieldMessage, requiredNumberFieldMessage } from './messages';

export function requiredStringZod(message?: string) {
  return z
    .string({ message: message || requiredFieldMessage })
    .min(1, message || requiredFieldMessage);
}

export function requiredNumberZod(message?: string) {
  return z.number({
    message: message || requiredNumberFieldMessage,
  });
}

export function requiredObjectZod<T extends ZodRawShape>(
  spec: T,
  message?: string,
) {
  return z.object(spec, { message: message || requiredFieldMessage });
}

export function requiredDateZod(message?: string) {
  return z.date({
    message: message || requiredFieldMessage,
  });
}

export function optionalStringZod() {
  return z.string().optional().nullable();
}

export function optionalNumberZod() {
  return z.number().optional().nullable();
}

export function optionalObjectZod<T extends ZodRawShape>(spec: T) {
  return z.object(spec).nullable().optional();
}

export function optionalDateZod() {
  return z.date().optional().nullable();
}
