import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { useEffect } from 'react';

export const OnBlurPlugin = (props: { onBlur: () => void }) => {
  const { onBlur } = props;
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        onBlur();
        // Don't stop the propagation of the event
        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [onBlur, editor]);

  return null;
};
