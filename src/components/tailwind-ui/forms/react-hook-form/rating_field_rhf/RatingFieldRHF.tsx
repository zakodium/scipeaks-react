import { useController } from 'react-hook-form';

import type { RatingProps } from '../../basic/rating/Rating';
import { Rating } from '../../basic/rating/Rating';
import type { FieldProps } from '../../util';
import { defaultErrorSerializer } from '../../util';

export type RateFieldRHFProps = Omit<RatingProps, 'value' | 'onChange'> &
  FieldProps & {
    name: string;
  };

export function RatingFieldRHF(props: RateFieldRHFProps) {
  const {
    name,
    serializeError = defaultErrorSerializer,
    label,
    starCount,
    required,
    onBlur,
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Rating
      value={field.value ?? 0}
      onChange={field.onChange}
      onBlur={(event) => {
        field.onBlur();
        onBlur?.(event);
      }}
      name={name}
      label={label}
      error={serializeError(error)}
      starCount={starCount}
      required={required}
    />
  );
}
