import { LexicalComposer } from '@lexical/react/LexicalComposer.js';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { ContentEditable } from '@lexical/react/LexicalContentEditable.js';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary.js';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js';
import type { Klass, LexicalNode, SerializedEditorState } from 'lexical';
import { useEffect, useMemo } from 'react';

import { TableContext, TablePlugin } from './@lexical/table/TablePlugin';
import Theme from './Theme';
import { RichTextProvider } from './context/RichTextProvider';
import { extendNodes } from './nodes/RichTextNodes';

interface RichTextRendererProps {
  state: string | SerializedEditorState;
  customNodes?: Array<Klass<LexicalNode>>;
}

export function RichTextRenderer(props: RichTextRendererProps) {
  const { state, customNodes } = props;

  const internalState = useMemo(() => {
    if (typeof state === 'string') return state;

    return JSON.stringify(state);
  }, [state]);

  const cellEditorConfig = {
    namespace: 'CellEditor',
    nodes: extendNodes(customNodes || []),
    onError: (error: Error) => {
      throw error;
    },
    theme: Theme,
  };

  return (
    <RichTextProvider>
      <TableContext>
        <LexicalComposer
          initialConfig={{
            namespace: 'RichTextRendered',
            theme: Theme,
            nodes: extendNodes(customNodes || []),
            onError: (error) => {
              reportError(error);
            },
            editorState: internalState,
            editable: false,
          }}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <TablePlugin cellEditorConfig={cellEditorConfig}>
            <TableRichTextPlugin />
          </TablePlugin>

          <RichTextUpdatePlugin state={state} />
        </LexicalComposer>
      </TableContext>
    </RichTextProvider>
  );
}

function RichTextUpdatePlugin(
  props: Omit<RichTextRendererProps, 'customNodes'>,
) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditorState(editor.parseEditorState(props.state));
  }, [editor, props.state]);

  return null;
}

function TableRichTextPlugin() {
  return (
    <RichTextPlugin
      placeholder={null}
      ErrorBoundary={LexicalErrorBoundary}
      contentEditable={
        <ContentEditable
          spellCheck={false}
          className="relative m-0 break-words whitespace-pre-wrap outline-hidden focus:ring-0"
        />
      }
    />
  );
}
