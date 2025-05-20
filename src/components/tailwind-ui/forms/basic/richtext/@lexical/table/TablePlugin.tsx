/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import type { InsertTableCommandPayloadHeaders } from '@lexical/table';
import type {
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import {
  $createParagraphNode,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { $createTableNodeWithDimensions, TableNode } from './TableNode';

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: InsertTableCommandPayloadHeaders;
}>;

export interface CellContextShape {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | ReactElement | ReactElement[];
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | ReactElement | ReactElement[],
  ) => void;
}

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

// eslint-disable-next-line react-refresh/only-export-components
export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand('INSERT_NEW_TABLE_COMMAND');

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});

interface TableContextProps {
  children: ReactNode;
}

interface TableContextState {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | ReactElement | ReactElement[];
}

export function TableContext(props: TableContextProps) {
  const { children } = props;

  const [contextValue, setContextValue] = useState<TableContextState>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });

  const value = useMemo<CellContextShape>(() => {
    return {
      cellEditorConfig: contextValue.cellEditorConfig,
      cellEditorPlugins: contextValue.cellEditorPlugins,
      set: (cellEditorConfig, cellEditorPlugins) => {
        setContextValue({ cellEditorConfig, cellEditorPlugins });
      },
    };
  }, [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]);

  return <CellContext.Provider value={value}>{children}</CellContext.Provider>;
}

export function TablePlugin({
  cellEditorConfig,
  children,
}: {
  cellEditorConfig: CellEditorConfig;
  children: ReactElement | ReactElement[];
}): ReactElement | null {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      throw new Error('TablePlugin: TableNode is not registered on editor');
    }

    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders,
        );

        $insertNodes([tableNode, $createParagraphNode()]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
