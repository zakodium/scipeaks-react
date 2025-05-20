import { useCallback, useRef, useState } from 'react';
import type { Accept, DropzoneProps } from 'react-dropzone';
import type { FieldError, ControllerRenderProps } from 'react-hook-form';
import { useController, useWatch } from 'react-hook-form';

import type { DropzoneListProps, RHFValidationProps } from '..';

import { useCheckedFormRHFContext } from './useCheckedFormRHF';

export interface DropzoneHookOptions
  extends Omit<DropzoneProps, 'onDrop' | 'accept'> {
  replace?: boolean;
  accept?: Accept | string[] | string;
  showPreview?: boolean;
}

export interface UseDropzoneFieldRHFReturn {
  field: ControllerRenderProps;
  error: FieldError | undefined;
  removeFile: DropzoneListProps['onRemove'];
  clearFiles: () => void;
  dropzoneProps: Omit<DropzoneProps, 'accept'>;
  dropzoneListProps: DropzoneListProps;
}

export type UseDropzoneFieldRHFOptions = DropzoneHookOptions &
  RHFValidationProps & {
    onChange?: (files: File[]) => void;
  };

const emptyFiles: File[] = [];

export function useDropzoneFieldRHF(
  dropzoneOptions: UseDropzoneFieldRHFOptions,
  name: string,
): UseDropzoneFieldRHFReturn {
  const { replace, deps, showPreview, onChange, ...dropzoneProps } =
    dropzoneOptions;
  const { trigger } = useCheckedFormRHFContext();
  const {
    field,
    fieldState: { error },
    formState: { isSubmitted },
  } = useController({ name });
  const files: File[] = useWatch({ name }) ?? emptyFiles;

  const onChangeRef = useRef(onChange);

  const onDrop = useCallback(
    (newFiles: File[]) => {
      if (replace) {
        field.onChange(newFiles);
      } else {
        const doesNotAlreadyExist = (newFile: File) => {
          return (
            files.filter((file: File) => newFile.name === file.name).length ===
            0
          );
        };
        field.onChange(files.concat(newFiles.filter(doesNotAlreadyExist)));
      }
      if (deps && isSubmitted) {
        void trigger(deps);
      }
      onChangeRef.current?.(newFiles);
    },
    [field, files, replace, isSubmitted, trigger, deps],
  );

  const removeFile = useCallback(
    (fileToRemove: File) => {
      field.onChange(files.filter((file) => file.name !== fileToRemove.name));
      if (deps && isSubmitted) {
        void trigger(deps);
      }
    },
    [field, files, isSubmitted, deps, trigger],
  );

  const clearFiles = useCallback(() => {
    field.onChange([]);
    if (deps && isSubmitted) {
      void trigger(deps);
    }
  }, [field, isSubmitted, trigger, deps]);

  return {
    removeFile,
    clearFiles,
    dropzoneProps: {
      ...dropzoneProps,
      ...field,
      onDrop,
    },
    dropzoneListProps: {
      files,
      onRemove: removeFile,
      showPreview,
    },
    field,
    error,
  };
}

interface UseDropzoneReturn {
  files: File[];
  removeFile: DropzoneListProps['onRemove'];
  clearFiles: () => void;
  dropzoneProps: Omit<DropzoneProps, 'accept'>;
  dropzoneListProps: DropzoneListProps & { files: File[] };
}

export function useDropzone(options: DropzoneHookOptions): UseDropzoneReturn {
  const { replace, showPreview, ...dropzoneProps } = options;
  const [files, setFiles] = useState<File[]>(emptyFiles);

  const onDrop = (newFiles: File[]) => {
    if (replace) {
      setFiles(newFiles);
    } else {
      const doesNotAlreadyExist = (newFile: File) => {
        return files.filter((file) => newFile.name === file.name).length === 0;
      };
      setFiles(files.concat(newFiles.filter(doesNotAlreadyExist)));
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((files) =>
      files.filter((file) => file.name !== fileToRemove.name),
    );
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    dropzoneProps: {
      ...dropzoneProps,
      onDrop,
    },
    dropzoneListProps: {
      files,
      onRemove: removeFile,
      showPreview,
    },
    files,
    removeFile,
    clearFiles,
  };
}

export type SingleFileDropzoneHookConfig = Omit<
  DropzoneHookOptions,
  'replace' | 'maxFiles' | 'multiple'
>;

export function useSingleFileDropzone(config: SingleFileDropzoneHookConfig) {
  const droppedFiles = useDropzone({
    replace: true,
    maxFiles: 1,
    multiple: false,
    ...config,
  });
  return {
    ...droppedFiles,
    file: droppedFiles.dropzoneListProps.files[0] as File | undefined,
  };
}
