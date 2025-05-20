import type { ElementType } from 'react';

import type { ButtonProps } from '../../elements/buttons/button/Button';
import { Button } from '../../elements/buttons/button/Button';
import { useCheckedFormRHFContext } from '../../hooks/useCheckedFormRHF';

export type ResetButtonRHFProps<T extends ElementType = 'button'> = Omit<
  ButtonProps<T>,
  'type' | 'onClick'
>;

export function ResetButtonRHF<T extends ElementType = 'button'>(
  props: ResetButtonRHFProps<T>,
) {
  const { as, ...otherProps } = props;
  const { reset } = useCheckedFormRHFContext();

  return (
    <Button onClick={() => reset()} as={as as ElementType} {...otherProps} />
  );
}
