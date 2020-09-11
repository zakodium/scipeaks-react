import bytesize from 'byte-size';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../elements/buttons/Button';
import { Table, ITdProps } from '../lists/Table';
import { Variant } from '../types';

export interface IDroppedFile {
  files: Array<File>;
  remove: (file: File) => void;
}

export interface IFile {
  id: string;
  file: File;
  delete: () => void;
}

interface IRow {
  value: IFile;
}

export function DroppedList(props: IDroppedFile): JSX.Element | null {
  if (props.files.length === 0) {
    return null;
  }

  const data: Array<IFile> = props.files.map((value) => {
    return {
      id: value.name,
      file: value,
      delete: () => props.remove(value),
    };
  });

  return (
    <div className="w-full max-w-lg">
      <Table data={data} Tr={Row} />
    </div>
  );
}

function Row({ value: props }: IRow) {
  return (
    <tr
      className={classNames(
        'w-full min-w-full bg-transparent shadow-none border-gray-300 border-dashed rounded-md',
      )}
    >
      <DropzoneTd style={{ maxWidth: 300 }} className="px-2 truncate">
        {props.file.name}
      </DropzoneTd>

      <DropzoneTd>{String(bytesize(props.file.size))}</DropzoneTd>

      <DropzoneTd className="px-2 my-2 text-sm font-medium leading-5 text-right text-gray-900 whitespace-no-wrap">
        <Button onClick={props.delete} variant={Variant.hover}>
          <DeleteSvg />
        </Button>
      </DropzoneTd>
    </tr>
  );
}

export function DropzoneTd(props: ITdProps) {
  return (
    <td
      className="px-6 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
      {...props}
    />
  );
}

function DeleteSvg(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
