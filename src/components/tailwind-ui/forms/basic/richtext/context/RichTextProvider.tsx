import type { LexicalEditor, ElementFormatType } from 'lexical';
import type { Dispatch, ReactNode } from 'react';
import { useMemo, useReducer } from 'react';

import type { ActionType } from '../../../../types';

import { richTextContext } from './RichTextContext';

export type RichTextFormatType =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'superscript'
  | 'subscript';

export type RichTextBlockType = 'paragraph' | 'h1' | 'h2' | 'ul' | 'ol';

export type RichTextBlockAlignmentType = ElementFormatType;

export type RichTextState = Record<RichTextFormatType, boolean> & {
  blockType: RichTextBlockType;
  blockAlignment: RichTextBlockAlignmentType;
  textColor: string;
  activeEditor: LexicalEditor | null;
};

interface RichTextProviderProps {
  children: ReactNode;
}

export type RichTextActions =
  | ActionType<'CHANGE_ACTIVE_EDITOR', LexicalEditor>
  | ActionType<'CHANGE_TOOLBAR', { type: RichTextFormatType; value: boolean }>
  | ActionType<'CHANGE_MULTIPLE_TOOLBAR', RichTextState>
  | ActionType<'CHANGE_TEXT_COLOR', string>
  | ActionType<'CHANGE_ALIGNMENT', RichTextBlockAlignmentType>;

function richTextReducer(
  state: RichTextState,
  action: RichTextActions,
): RichTextState {
  switch (action.type) {
    case 'CHANGE_ACTIVE_EDITOR': {
      return {
        ...state,
        activeEditor: action.payload,
      };
    }
    case 'CHANGE_TOOLBAR': {
      const { type, value } = action.payload;

      return {
        ...state,
        [type]: value,
      };
    }
    case 'CHANGE_MULTIPLE_TOOLBAR': {
      return action.payload;
    }
    case 'CHANGE_TEXT_COLOR': {
      return {
        ...state,
        textColor: action.payload,
      };
    }
    case 'CHANGE_ALIGNMENT': {
      return {
        ...state,
        blockAlignment: action.payload,
      };
    }
    default:
      throw new Error('unreachable');
  }
}

export function RichTextProvider(props: RichTextProviderProps) {
  const { children } = props;

  const defaultState = useMemo<RichTextState>(() => {
    return {
      activeEditor: null,
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      superscript: false,
      subscript: false,
      ul: false,
      ol: false,
      blockType: 'paragraph',
      textColor: 'black',
      blockAlignment: 'left',
    };
  }, []);

  const reducer = useReducer(richTextReducer, defaultState);

  return (
    <richTextContext.Provider value={reducer}>
      {children}
    </richTextContext.Provider>
  );
}

export type RichStateContextWithDispatch = [
  RichTextState,
  Dispatch<RichTextActions>,
];
