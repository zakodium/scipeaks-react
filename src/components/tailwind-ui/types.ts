export type Color =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'alternative';

export type Size = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type Variant = 'primary' | 'secondary' | 'white';
export type Roundness = 'light' | 'full' | 'circular';

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type ActionPayload<
  T extends ActionType<unknown>,
  Action extends T['type'],
> = T extends ActionType<Action, infer P> ? P : never;

export type PropsOf<T = unknown> = T extends React.ElementType
  ? React.ComponentProps<T>
  : never;
