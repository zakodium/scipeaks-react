import { XMarkIcon } from '@heroicons/react/24/outline';
import bytesize from 'byte-size';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';

import { useByteSizeOptions } from '../byte_size_options/byteSizeFormatContext';

interface DropzoneListFile {
  id: string;
  file: File;
  delete: () => void;
}

export interface DropzoneListProps {
  files?: File[] | undefined;
  showPreview?: boolean;
  onRemove: (file: File) => void;
}

export function DropzoneList({
  files,
  showPreview,
  onRemove,
}: DropzoneListProps) {
  if (files === undefined || files.length === 0) {
    return null;
  }

  const data: DropzoneListFile[] = files.map((value) => {
    return {
      id: value.name,
      file: value,
      delete: () => onRemove(value),
    };
  });

  return (
    <div
      className="mt-1 grid rounded-md border-b border-neutral-300 shadow-sm"
      style={{ gridTemplateColumns: 'minmax(0, 1fr) auto auto' }}
    >
      {data.map((row, index) => (
        <DropzoneListRow
          key={row.id}
          value={row}
          showPreview={showPreview}
          isLast={index === data.length - 1}
        />
      ))}
    </div>
  );
}

interface DropzoneListRowProps {
  value: DropzoneListFile;
  showPreview?: boolean;
  isLast: boolean;
}

function DropzoneListRow({ value, isLast, showPreview }: DropzoneListRowProps) {
  const { file } = value;
  const byteSizeOptions = useByteSizeOptions();

  const preview = useMemo(() => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const isMedia = isImage || isVideo;

    const url = isMedia ? URL.createObjectURL(file) : undefined;

    return { isImage, isVideo, isMedia, url };
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview.url]);

  return (
    <>
      <DropzoneListCell
        className={clsx('px-2', {
          'flex flex-col items-start! justify-center py-2':
            showPreview && preview.isMedia,
        })}
        isLast={isLast}
      >
        {showPreview && preview.isImage && (
          <img src={preview.url} alt={file.name} className="h-[12ex]" />
        )}
        {showPreview && preview.isVideo && (
          <video
            src={preview.url}
            className="h-[12ex]"
            controls={false}
            autoPlay
            loop
            muted
          />
        )}
        <span className="truncate">{file.name}</span>
      </DropzoneListCell>

      <DropzoneListCell
        className="truncate px-6 text-sm font-semibold text-neutral-900"
        isLast={isLast}
      >
        {String(bytesize(file.size, byteSizeOptions))}
      </DropzoneListCell>

      <DropzoneListCell
        className="px-2 text-right text-sm font-semibold text-neutral-900"
        isLast={isLast}
      >
        <button
          type="button"
          onClick={value.delete}
          className="inline-flex rounded-md p-1.5 text-primary-500 hover:bg-primary-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-inset active:bg-primary-200"
        >
          <XMarkIcon className="size-5" />
        </button>
      </DropzoneListCell>
    </>
  );
}

function DropzoneListCell({
  className,
  children,
  isLast,
}: {
  className: string;
  children: ReactNode;
  isLast: boolean;
}) {
  return (
    <div
      className={clsx(
        !isLast && 'border-b border-dashed border-neutral-300',
        'flex items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
