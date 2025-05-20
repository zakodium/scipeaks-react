import type { ReactNode } from 'react';

import type { UseDropzoneFieldRHFOptions } from '../../../hooks/useDropzone';
import { useDropzoneFieldRHF } from '../../../hooks/useDropzone';
import { useInputId } from '../../../hooks/useInputId';
import { Help, Label } from '../../basic/common';
import type { DropzoneProps } from '../../basic/dropzone/dropzone/Dropzone';
import { Dropzone } from '../../basic/dropzone/dropzone/Dropzone';
import { DropzoneList } from '../../basic/dropzone/drozone_list/DropzoneList';
import type { FieldProps, RHFValidationProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

export type DropzoneFieldRHFProps = DropzoneFieldProps &
  FieldProps &
  RHFValidationProps;

interface DropzoneFieldProps
  extends UseDropzoneFieldRHFOptions,
    Pick<DropzoneProps, 'message' | 'header' | 'disabled'> {
  id?: string;
  name: string;
  label: ReactNode;
  hiddenLabel?: boolean;
  required?: boolean;
  showList?: boolean;
}

export function DropzoneFieldRHF(props: DropzoneFieldRHFProps) {
  const {
    message,
    header,
    id,
    name,
    label,
    hiddenLabel,
    required,
    disabled,
    serializeError = defaultErrorSerializer,
    ...otherProps
  } = props;
  const { dropzoneProps, dropzoneListProps, field, error } =
    useDropzoneFieldRHF(otherProps, name);

  const finalId = useInputId(id, name);

  return (
    <div>
      <Label
        className="w-fit"
        id={finalId}
        text={label}
        required={required}
        disabled={disabled}
        hidden={hiddenLabel}
      />
      <Dropzone
        {...field}
        {...dropzoneProps}
        id={finalId}
        disabled={disabled}
        message={message}
        header={header}
      />
      {props.showList && <DropzoneList {...dropzoneListProps} />}
      <Help error={serializeError(error)} />
    </div>
  );
}
