import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';
import bytesize from 'byte-size';
import clsx from 'clsx';
import mime from 'mime';
import type { ReactNode } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import * as ReactDropzone from 'react-dropzone';

import { useByteSizeOptions } from '../byte_size_options/byteSizeFormatContext';

export interface DropzoneProps
  extends Omit<ReactDropzone.DropzoneProps, 'accept'> {
  header?: ReactNode;
  message?: ReactNode;
  accept?: ReactDropzone.Accept | string[] | string;
  name?: string;
  id?: string;
}

const listFormatter = new Intl.ListFormat('en', {
  style: 'short',
  type: 'disjunction',
});

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  function DropzoneForwardRef(props, ref) {
    const { message, header, accept, ...otherProps } = props;
    const { finalAccept, list } = getAcceptedFiles(accept || {});

    const { getRootProps, getInputProps, isDragActive } =
      ReactDropzone.useDropzone({
        ...otherProps,
        accept: finalAccept,
      });

    // @ts-ignore
    const { ref: dropzoneRef, style, ...inputProps } = getInputProps();
    useImperativeHandle(ref, () => dropzoneRef.current);

    const byteSizeOptions = useByteSizeOptions();

    return (
      <div
        {...getRootProps()}
        className={clsx(
          'rounded-md outline-2 -outline-offset-2 outline-dashed focus-within:outline-primary-500 focus-within:outline-solid',
          {
            'outline-primary-500': isDragActive,
            'outline-neutral-300': !isDragActive,
          },
        )}
      >
        <input
          {...inputProps}
          id={otherProps.id}
          name={otherProps.name}
          className="sr-only"
          ref={dropzoneRef}
        />
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <div
            className={clsx(
              'flex justify-center px-6 pt-5 pb-6',
              props.disabled ? 'cursor-default' : 'cursor-pointer',
            )}
          >
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              {header !== undefined ? (
                header
              ) : (
                <ArrowUpOnSquareIcon className="mx-auto size-12 text-neutral-300" />
              )}
              <div className="mt-1 flex w-full flex-1 justify-center text-sm text-neutral-600">
                {message ?? (
                  <p>
                    <span className="font-semibold text-primary-600 hover:text-primary-500">
                      Upload a file
                    </span>
                    {' or drag and drop'}
                  </p>
                )}
              </div>
              <div className="mt-1 text-xs">
                <div className="text-neutral-500">
                  {accept ? list : null}
                  {accept && props.maxSize ? ' ' : null}
                  {props.maxSize
                    ? `(up to ${String(
                        bytesize(props.maxSize, byteSizeOptions),
                      )})`
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

function getAcceptedFiles(accept: ReactDropzone.Accept | string | string[]): {
  finalAccept: ReactDropzone.Accept;
  list: string;
} {
  const finalAccept =
    typeof accept === 'string'
      ? convertAccept(accept.split(','))
      : Array.isArray(accept)
        ? convertAccept(accept)
        : accept;

  const listArray: string[] = [];
  for (const key of Object.keys(finalAccept)) {
    if (finalAccept[key].length === 0) {
      listArray.push(key);
    } else {
      listArray.push(...finalAccept[key]);
    }
  }

  return {
    finalAccept,
    list: listFormatter.format(listArray),
  };
}

function convertAccept(array: string[]): ReactDropzone.Accept {
  array = array.map((value) => value.trim());
  const result: Record<string, string[]> = {};

  for (const element of array) {
    if (!element.startsWith('.')) {
      throw new Error(
        `Invalid extension passed to the \`accept\` prop (${element}). It must start with a dot.`,
      );
    }

    if (element.includes('/')) {
      throw new Error(
        'It is no longer supported to pass an array of mime types to the `accept` prop of the `Dropzone` component. Please use the object form or an array of extensions instead.',
      );
    } else {
      // If it's not a mime type, then it has to be an extension.
      const extension = element.toLowerCase();

      let type = mime.getType(extension);
      if (type === null) {
        if (shouldWarn(extension)) {
          // eslint-disable-next-line no-console
          console.warn(
            `An unknown extension (${extension}) was passed to the accept prop of the Dropzone component. The type "application/octet-stream" will be used as a fallback. You can add it the mime database using "mime.define({'mime/type': ['${element}']})".`,
          );
        }
        type = 'application/octet-stream';
      }

      if (result[type]) {
        result[type].push(extension);
      } else {
        result[type] = [extension];
      }
    }
  }

  return result;
}

const warned = new Set<string>();
function shouldWarn(value: string) {
  if (warned.has(value)) {
    return false;
  }
  warned.add(value);
  return true;
}
