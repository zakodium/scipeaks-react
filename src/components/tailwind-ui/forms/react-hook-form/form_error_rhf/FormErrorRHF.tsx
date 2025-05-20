import clsx from 'clsx';
import type { ReactElement } from 'react';

import { Alert } from '../../../feedback/Alert';
import { useRootFormError } from '../hooks/useRootFormError';

export function FormErrorRHF(props: {
  className?: string;
}): ReactElement | null {
  const root = useRootFormError();

  if (!root) {
    return null;
  }

  return (
    <Alert
      className={clsx(props.className, 'whitespace-pre-wrap')}
      title={root.message}
      type="error"
    />
  );
}
