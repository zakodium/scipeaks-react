import type { PropsWithoutRef, ReactElement, Ref, RefAttributes } from 'react';
import { forwardRef } from 'react';

// https://fettblog.eu/typescript-react-generic-forward-refs/
export function forwardRefWithGeneric<T, P = unknown>(
  render: (props: P, ref: Ref<T>) => ReactElement | null,
): (props: PropsWithoutRef<P> & RefAttributes<T>) => ReactElement | null {
  // @ts-expect-error props are incompatible. refs: https://github.com/DefinitelyTyped/DefinitelyTyped/commit/f3052d979fdf41749d43a1f6abea993763f83e21
  return forwardRef(render) as ReturnType<typeof forwardRefWithGeneric<T, P>>;
}

// https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/utils/render.ts
export function forwardRefWithAs<
  T extends { name: string; displayName?: string },
>(component: T): T & { displayName: string } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.assign(forwardRef(component as any) as any, {
    displayName: component.displayName ?? component.name,
  });
}

const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
export const commandKeyExists =
  userAgent.includes('Macintosh') ||
  userAgent.includes('iPad') ||
  userAgent.includes('iPhone');

export function assertUnreachable(x: never): never {
  throw new Error(`unreachable: ${String(x)}`);
}

export function delve(
  object: object,
  key: string | Array<string | number>,
  defaultValue?: unknown,
): unknown {
  key = typeof key === 'string' ? key.split('.') : key;
  for (const k of key) {
    // Do not expect error for compatibility with noExplicitAny
    // @ts-ignore object[k] is nested
    object = object ? object[k] : undefined;
  }
  return object === undefined ? defaultValue : object;
}

/**
 * Noop function.
 * Does nothing when called.
 */
export function noop() {
  // Noop
}
