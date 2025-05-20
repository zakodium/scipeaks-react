import type { EditorState, LexicalEditor } from 'lexical';
import { useCallback, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';

import { useCheckedFormRHFContext } from '../../../hooks/useCheckedFormRHF';
import type { RichTextProps } from '../../basic/richtext/RichText';
import { RichText } from '../../basic/richtext/RichText';
import type { ErrorSerializer } from '../../util';
import { defaultErrorSerializer } from '../../util';

export interface RichTextFieldRHFProps
  extends Omit<RichTextProps, 'onChange' | 'initialValue' | 'error'> {
  name: string;
  serializeError?: ErrorSerializer;
  deps?: string[];
}

export function RichTextFieldRHF(props: RichTextFieldRHFProps) {
  const {
    name,
    serializeError = defaultErrorSerializer,
    deps,
    ...otherProps
  } = props;

  const ref = useRef<LexicalEditor>();
  const { trigger } = useCheckedFormRHFContext();
  const {
    field,
    fieldState: { error, isDirty },
    formState: { isSubmitted },
  } = useController({ name });

  const { value } = field;

  // This effect re-syncs the editor state with the field value
  useEffect(() => {
    if (!isDirty) {
      // Condition is an optimization: we do not expect the field to be out of sync if it is dirty.
      // We arrive here if the form was reset or if the field is back to its original value.
      const editor = ref.current;
      if (editor) {
        const currentValue = JSON.stringify(editor.getEditorState());
        if (value && currentValue !== value) {
          // The field value and the editor state are out of sync,
          // therefore the change did not originate from the editor but from outside,
          // and we need to sync the editor state with RHF's field value.
          // This can happen when the form is reset.
          editor.setEditorState(editor.parseEditorState(value));
        }
      }
    }
  }, [isDirty, value]);

  const setFieldValue = useCallback(
    (state: EditorState) => {
      const newValue = JSON.stringify(state);

      if (field.value !== newValue) {
        field.onChange(newValue);
      }

      if (deps && isSubmitted) {
        void trigger(deps);
      }
    },
    [field, deps, isSubmitted, trigger],
  );

  return (
    <RichText
      {...otherProps}
      initialValue={value}
      onChange={setFieldValue}
      onBlur={field.onBlur}
      error={serializeError(error)}
      editorRef={ref}
    />
  );
}
