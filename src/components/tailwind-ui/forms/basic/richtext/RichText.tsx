import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin.js';
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer.js';
import { LexicalComposer } from '@lexical/react/LexicalComposer.js';
import { ContentEditable } from '@lexical/react/LexicalContentEditable.js';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary.js';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin.js';
import { ListPlugin } from '@lexical/react/LexicalListPlugin.js';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin.js';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js';
import clsx from 'clsx';
import type {
  EditorState,
  EditorThemeClasses,
  Klass,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import type {
  ComponentType,
  MutableRefObject,
  ReactElement,
  ReactNode,
} from 'react';
import { useState } from 'react';

import type { HelpPublicProps } from '../common';
import { Help, Label } from '../common';

import DraggableBlockPlugin from './@lexical/plugins/DraggableBlockPlugin';
import { TableContext, TablePlugin } from './@lexical/table/TablePlugin';
import Theme from './Theme';
import { RichTextProvider } from './context/RichTextProvider';
import { extendNodes } from './nodes/RichTextNodes';
import { AutoSelectRichTextPlugin } from './plugins/AutoSelectRichTextPlugin';
import { ImagesPlugin } from './plugins/ImagesPlugin';
import { EditorRefPlugin } from './plugins/editor_ref_plugin';
import { OnBlurPlugin } from './plugins/on_blur_plugin';
import { ToolbarPlugin } from './toolbar/ToolbarPlugin';
import BoldPlugin from './toolbar/plugins/BoldPlugin';
import CenterAlignmentPlugin from './toolbar/plugins/CenterAlignmentPlugin';
import ColorPickerPlugin from './toolbar/plugins/ColorPickerPlugin';
import Header1Plugin from './toolbar/plugins/Header1Plugin';
import Header2Plugin from './toolbar/plugins/Header2Plugin';
import Header3Plugin from './toolbar/plugins/Header3Plugin';
import InternalImagePlugin from './toolbar/plugins/ImagePlugin';
import ItalicPlugin from './toolbar/plugins/ItalicPlugin';
import JustifyAlignmentPlugin from './toolbar/plugins/JustifyAlignmentPlugin';
import LeftAlignmentPlugin from './toolbar/plugins/LeftAlignmentPlugin';
import OrderedPlugin from './toolbar/plugins/OrderedPlugin';
import ParagraphPlugin from './toolbar/plugins/ParagraphPlugin';
import RightAlignmentPlugin from './toolbar/plugins/RightAlignmentPlugin';
import SubscriptPlugin from './toolbar/plugins/SubscriptPlugin';
import SuperscriptPlugin from './toolbar/plugins/SuperscriptPlugin';
import InternalTablePlugin from './toolbar/plugins/TablePlugin';
import UnderlinePlugin from './toolbar/plugins/UnderlinePlugin';
import UnorderedPlugin from './toolbar/plugins/UnorderedPlugin';
import type { ToolbarCustomPluginProps } from './toolbar/types';
import { RICHTEXT_DEFAULT_VALUES } from './utils';

export interface RichTextToolbarOptions {
  insertImage?: boolean;
  insertTable?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RichTextCustomPlugin<DropdownType = any> {
  ToolbarComponent: ComponentType<ToolbarCustomPluginProps<DropdownType>>;
  nodes?: Array<Klass<LexicalNode>>;
  theme?: Record<string, string>;
}

export interface RichTextProps {
  onChange?: (state: EditorState) => void;
  onBlur?: () => void;
  editorRef?: MutableRefObject<LexicalEditor | undefined>;
  help?: HelpPublicProps['help'];
  error?: HelpPublicProps['error'];
  onError?: (error: Error, editor: LexicalEditor) => void;
  initialValue?: InitialEditorStateType;
  toolbarOptions?: RichTextToolbarOptions;
  label: ReactNode;
  hiddenLabel?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  customPlugins?: RichTextCustomPlugin[];
}

function mergeThemes(themes: Array<Record<string, string> | undefined>) {
  const obj = {};

  for (const value of themes.values()) {
    Object.assign(obj, value);
  }

  return obj as EditorThemeClasses;
}

export function RichText(props: RichTextProps) {
  const {
    onChange,
    onBlur,
    help,
    error,
    initialValue,
    onError,
    toolbarOptions = {},
    readOnly = false,
    label,
    hiddenLabel,
    autoFocus = false,
    customPlugins,
    editorRef,
  } = props;

  const nodes = Array.from(
    new Set(
      customPlugins
        ?.filter((p) => p.nodes !== undefined)
        .flatMap((p) => p.nodes || []),
    ),
  );

  const plugins = customPlugins?.map((p) => p.ToolbarComponent);

  const theme = customPlugins
    ?.filter((p) => p.theme !== undefined)
    .map((p) => p.theme);

  const newTheme = mergeThemes(theme || []);

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const { insertImage = true, insertTable = true } = toolbarOptions;

  const insertPlugins: ReactElement[] = [];

  if (insertImage) {
    insertPlugins.push(<InternalImagePlugin key="image" />);
  }

  if (insertTable) {
    insertPlugins.push(<InternalTablePlugin key="table" />);
  }

  const cellEditorConfig = {
    namespace: 'CellEditor',
    nodes: extendNodes(nodes || []),
    onError: (error: Error) => {
      throw error;
    },
    theme: {
      ...Theme,
      ...newTheme,
    },
  };

  return (
    <TableContext>
      <RichTextProvider>
        <LexicalComposer
          initialConfig={{
            namespace: 'RichText',
            theme: {
              ...Theme,
              ...newTheme,
            },
            nodes: extendNodes(nodes || []),
            onError: (error, editor) => {
              onError?.(error, editor);
            },
            editorState: initialValue || RICHTEXT_DEFAULT_VALUES,
            editable: !readOnly,
          }}
        >
          <AutoSelectRichTextPlugin
            autoFocus={autoFocus}
            editorRef={floatingAnchorElem}
          />

          <div className="flex flex-1 flex-col">
            <Label
              className="w-fit"
              text={label}
              hidden={hiddenLabel}
              onClick={() => {
                if (floatingAnchorElem) {
                  // @ts-ignore focus does not exists on ChildNode
                  floatingAnchorElem.childNodes[0].focus();
                }
              }}
            />

            <ToolbarPlugin
              itemRef={floatingAnchorElem}
              readOnly={readOnly}
              className={clsx(
                { 'mt-1': !hiddenLabel },
                error ? 'border-danger-300' : 'border-neutral-300',
              )}
              alignmentPlugins={[
                <LeftAlignmentPlugin key="left" />,
                <CenterAlignmentPlugin key="center" />,
                <RightAlignmentPlugin key="right" />,
                <JustifyAlignmentPlugin key="justify" />,
              ]}
              formatPlugins={[
                <BoldPlugin key="bold" />,
                <ItalicPlugin key="italic" />,
                <UnderlinePlugin key="underline" />,
                <SubscriptPlugin key="subscript" />,
                <SuperscriptPlugin key="superscript" />,
                <ColorPickerPlugin key="textColor" />,
              ]}
              actionPlugins={[
                <ParagraphPlugin key="paragraph" />,
                <Header1Plugin key="h1" />,
                <Header2Plugin key="h2" />,
                <Header3Plugin key="h3" />,
                <UnorderedPlugin key="ul" />,
                <OrderedPlugin key="ol" />,
              ]}
              insertPlugins={insertPlugins}
              customPlugins={plugins}
            />
            <ImagesPlugin />

            <RichTextPlugin
              contentEditable={
                <div
                  className="relative"
                  ref={onRef}
                  style={{ scrollMarginTop: '4em' }}
                >
                  <ContentEditable
                    spellCheck={false}
                    className={clsx(
                      'block min-h-[200px] w-full rounded-b-md bg-white py-2 pr-3 pl-5 text-base shadow-xs outline-1 -outline-offset-1 sm:text-sm',
                      error ? 'outline-danger-300' : 'outline-neutral-300',
                      readOnly
                        ? 'cursor-default text-neutral-500 select-none'
                        : 'text-neutral-900',
                    )}
                  />
                  <Help help={help} error={error} noMargin />
                </div>
              }
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />

            {editorRef && <EditorRefPlugin editorRef={editorRef} />}
            {autoFocus && <AutoFocusPlugin />}

            <TablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <TableRichTextPlugin />
            </TablePlugin>

            {floatingAnchorElem && (
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            )}

            {onBlur && <OnBlurPlugin onBlur={onBlur} />}
            {onChange && (
              <OnChangePlugin onChange={onChange} ignoreSelectionChange />
            )}
            <HistoryPlugin />
            <ListPlugin />
          </div>
        </LexicalComposer>
      </RichTextProvider>
    </TableContext>
  );
}

function TableRichTextPlugin() {
  return (
    <RichTextPlugin
      placeholder={null}
      ErrorBoundary={LexicalErrorBoundary}
      contentEditable={
        <ContentEditable
          spellCheck={false}
          className="relative m-0 break-words whitespace-pre-wrap outline-hidden focus:ring-0 sm:text-sm"
        />
      }
    />
  );
}
