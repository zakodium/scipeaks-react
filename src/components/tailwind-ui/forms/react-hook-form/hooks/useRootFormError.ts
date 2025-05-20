import { useFormState } from 'react-hook-form';

import type { RootFormError } from '../form_rhf/FormRHF';

export function useRootFormError(): RootFormError | null {
  const {
    errors: { root },
  } = useFormState();

  if (!root) {
    return null;
  }

  // TODO: check if we can contribute an improvement on this to react-hook-form.
  // @ts-expect-error react-hook-form's types are too restrictive
  return root as RootFormError;
}
