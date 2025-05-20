import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useEffect } from 'react';

import { useRichTextContext } from '../context/RichTextContext';

interface AutoSelectRichTextPluginProps {
  autoFocus?: boolean;
  editorRef: HTMLDivElement | null;
}

export function AutoSelectRichTextPlugin(props: AutoSelectRichTextPluginProps) {
  const { editorRef, autoFocus } = props;
  const [editor] = useLexicalComposerContext();
  const [, dispatch] = useRichTextContext();

  useEffect(() => {
    dispatch({ type: 'CHANGE_ACTIVE_EDITOR', payload: editor });

    if (autoFocus) {
      editorRef?.scrollIntoView({ behavior: 'auto' });
    }
  }, [autoFocus, dispatch, editor, editorRef]);

  return null;
}
