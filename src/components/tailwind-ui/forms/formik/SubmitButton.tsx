import React from 'react';

import { Button, IButtonProps } from '../../elements/buttons/Button';

export type ISubmitProps = IButtonProps;

export function SubmitButton(props: ISubmitProps): JSX.Element {
  return <Button type="submit" {...props} />;
}
