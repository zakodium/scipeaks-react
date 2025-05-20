import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import type { LexicalEditor } from 'lexical';
import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

export function EditorRefPlugin(props: {
  editorRef: MutableRefObject<LexicalEditor | undefined>;
}) {
  const { editorRef } = props;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editorRef.current = editor;
  }, [editor, editorRef]);
  return null;
}
