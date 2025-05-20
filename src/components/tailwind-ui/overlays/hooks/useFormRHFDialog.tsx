import type { BaseSyntheticEvent } from 'react';
import { useCallback, useRef } from 'react';
import type {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import { Dialog } from '../dialog/Dialog.aliases';

type SubmitCallback<TValues extends FieldValues> = (
  data: TValues,
  event: BaseSyntheticEvent | undefined,
  methods: UseFormReturn<TValues>,
  closeDialog: () => void,
) => ReturnType<SubmitHandler<TValues>>;

type InvalidSubmitCallback<TValues extends FieldValues> = (
  errors: FieldErrors<TValues>,
  closeDialog: () => void,
  event: BaseSyntheticEvent | undefined,
) => ReturnType<SubmitErrorHandler<TValues>>;

export function useFormRHFDialog<TValues extends FieldValues>(
  noAutoCloseOnSubmit: boolean,
  onSubmitCallback: SubmitCallback<TValues>,
  onInvalidSubmitCallback?: InvalidSubmitCallback<TValues>,
) {
  const hiddenCloseRef = useRef<HTMLButtonElement>(null);

  // Tricks to allow async close of dialog without controlled state (invisible button)
  const hiddenCloseButton = (
    <Dialog.Close
      ref={hiddenCloseRef}
      className="fixed -top-1 -left-1 size-0 opacity-0"
    />
  );

  const closeDialog = useCallback(() => {
    hiddenCloseRef.current?.click();
  }, [hiddenCloseRef]);

  const onSubmit = useCallback(
    async (
      data: TValues,
      event: BaseSyntheticEvent | undefined,
      methods: UseFormReturn<TValues>,
    ) => {
      const result = await onSubmitCallback(data, event, methods, closeDialog);

      if (!noAutoCloseOnSubmit) {
        closeDialog();
      }

      return result;
    },
    [closeDialog, noAutoCloseOnSubmit, onSubmitCallback],
  );

  const onInvalidSubmit = useCallback(
    (errors: FieldErrors<TValues>, event?: BaseSyntheticEvent) => {
      return onInvalidSubmitCallback?.(errors, closeDialog, event);
    },
    [closeDialog, onInvalidSubmitCallback],
  );

  return {
    hiddenCloseButton,
    onSubmit,
    onInvalidSubmit,
  };
}
