import bytesize from 'byte-size';
import classNames from 'classnames';
import React from 'react';
import DropzoneElement, { DropzoneProps } from 'react-dropzone';

export interface IDropzoneProps extends DropzoneProps {
  files: Array<File>;
}

export function Dropzone(props: IDropzoneProps): JSX.Element {
  const accepted =
    typeof props.accept === 'string'
      ? props.accept.split(',').map((element) => {
          return element.toUpperCase().replace('.', ' ');
        })
      : '';

  return (
    <DropzoneElement {...props}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div>
            <input {...getInputProps()} />
            <div className="mt-2 sm:mt-0 sm:col-span-2">
              <div
                {...getRootProps()}
                className={classNames(
                  'cursor-pointer flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-dashed rounded-md',
                  isDragActive ? 'border-primary-500' : 'border-gray-300',
                  {
                    'border-b-0 rounded-b-none': props.files.length > 0,
                  },
                )}
              >
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
                    >
                      Upload a file
                    </button>{' '}
                    or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {props.accept && <>{accepted}</>}{' '}
                    {props.maxSize && (
                      <>up to {String(bytesize(props.maxSize))}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </DropzoneElement>
  );
}
