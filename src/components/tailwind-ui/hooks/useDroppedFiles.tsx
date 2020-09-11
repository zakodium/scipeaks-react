import { useState } from 'react';
import { FileRejection } from 'react-dropzone';

export interface DroppedFileHookOptions {
  replace?: boolean;
  maxSize?: number;
}

interface FileError {
  reason: string;
  file: File;
}

export const useDroppedFiles = (
  initialState: File[] = [],
  options: DroppedFileHookOptions = {},
) => {
  const [files, setFiles] = useState<File[]>(initialState);
  const [errors, setErrors] = useState<FileError[]>([]);
  const { replace, maxSize } = options;
  const onDrop = (newFiles: File[], rejections: FileRejection[]) => {
    setErrors(
      rejections.map((rejection) => {
        let reason = 'Unknown error';
        if (rejection.errors.length > 0) {
          reason = rejection.errors[0].message;
        } else if (maxSize && maxSize < rejection.file.size) {
          reason = 'File size is too large';
        }
        return {
          reason,
          file: rejection.file,
        };
      }),
    );
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
    setFiles(files.filter((file) => file.name !== fileToRemove.name));
    setErrors(errors.filter((error) => error.file.name !== fileToRemove.name));
  };

  return { files, setFiles, removeFile, onDrop, errors };
};
