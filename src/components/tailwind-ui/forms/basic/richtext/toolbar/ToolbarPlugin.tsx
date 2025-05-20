import { $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import * as Toolbar from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import type { ElementNode } from 'lexical';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import type { ReactNode } from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import type { DropdownActionOption } from '../../../../elements/dropdown/Dropdown';
import { Dropdown } from '../../../../elements/dropdown/Dropdown';
import { Tooltip } from '../../../../elements/floating-ui/tooltip/Tooltip';
import { useRichTextContext } from '../context/RichTextContext';
import type { RichTextBlockType } from '../context/RichTextProvider';

import type {
  ToolbarPluginButtonProps,
  ToolbarPluginDropdownProps,
  ToolbarPluginProps,
} from './types';

const toolbarContext = createContext<{
  readOnly: boolean;
  itemRef: HTMLDivElement | null;
}>({ readOnly: false, itemRef: null });

export function ToolbarPlugin(props: ToolbarPluginProps) {
  const {
    formatPlugins = [],
    actionPlugins = [],
    alignmentPlugins = [],
    insertPlugins = [],
    customPlugins = [],
    className,
    readOnly = false,
    itemRef,
  } = props;

  const lexicalContext = useLexicalComposerContext();
  const richTextContext = useRichTextContext();

  const updateToolbar = useCallback(() => {
    const [, dispatch] = richTextContext;

    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor.getNode();
      const element =
        anchor.getKey() === 'root'
          ? (anchor as ElementNode)
          : anchor.getTopLevelElementOrThrow();

      const blockType = (
        $isHeadingNode(element) || $isListNode(element)
          ? element.getTag()
          : element.getType()
      ) as RichTextBlockType;

      dispatch({
        type: 'CHANGE_MULTIPLE_TOOLBAR',
        payload: {
          activeEditor: lexicalContext[0],
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
          superscript: selection.hasFormat('superscript'),
          subscript: selection.hasFormat('subscript'),
          blockAlignment: element.getFormatType() || 'left',
          textColor: $getSelectionStyleValueForProperty(
            selection,
            'color',
            'black',
          ),
          blockType,
        },
      });
    }
  }, [lexicalContext, richTextContext]);

  useEffect(() => {
    const [, dispatch] = richTextContext;
    const [editor] = lexicalContext;

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, editor) => {
          updateToolbar();
          dispatch({ type: 'CHANGE_ACTIVE_EDITOR', payload: editor });
          return false;
        },
        1,
      ),
    );
  }, [lexicalContext, richTextContext, updateToolbar]);

  const contextValue = useMemo(() => {
    return { itemRef, readOnly };
  }, [itemRef, readOnly]);

  return (
    <toolbarContext.Provider value={contextValue}>
      <Toolbar.Root
        className={clsx(
          'flex w-full flex-wrap rounded-t-md border-t border-r border-l bg-white p-1',
          className,
        )}
      >
        <ToolbarToggleGroup type="multiple">{formatPlugins}</ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="single">
          {alignmentPlugins}
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="single">{actionPlugins}</ToolbarToggleGroup>
        {insertPlugins.length > 0 && (
          <>
            <ToolbarSeparator />
            <ToolbarToggleGroup type="single">
              {insertPlugins}
            </ToolbarToggleGroup>
          </>
        )}
        {customPlugins.length > 0 && (
          <>
            <ToolbarSeparator />
            <ToolbarToggleGroup type="single">
              {customPlugins.map((Plugin, index) => (
                <Plugin
                  // eslint-disable-next-line react/no-array-index-key
                  key={`plugin-${index}`}
                  Button={ToolbarPluginButton}
                  Dropdown={ToolbarPluginDropdown}
                />
              ))}
            </ToolbarToggleGroup>
          </>
        )}
      </Toolbar.Root>
    </toolbarContext.Provider>
  );
}

function ToolbarPluginDropdown(props: ToolbarPluginDropdownProps) {
  const { itemRef, readOnly } = useContext(toolbarContext);
  const { disabled, ...otherProps } = props;

  function onSelect(element: DropdownActionOption<unknown>) {
    if (itemRef) {
      // @ts-expect-error focus does not exist on childNodes
      itemRef.childNodes[0].focus();
    }

    otherProps.onSelect(element);
  }

  return (
    <div
      className={clsx(
        'ml-0.5 inline-flex shrink-0 grow-0 basis-auto items-center justify-center rounded-sm px-[5px] text-[13px] leading-none text-neutral-900 outline-hidden first:ml-0 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-primary-300 data-[state=on]:bg-primary-500 data-[state=on]:text-primary-900',
        {
          'bg-white': !readOnly && !disabled,
          'hover:bg-primary-100 hover:text-neutral-500': !readOnly && !disabled,
        },
      )}
    >
      <Dropdown
        buttonTabIndex={-1}
        disabled={readOnly || disabled}
        buttonClassName="inline-flex h-[25px] items-center"
        noDefaultButtonStyle
        {...otherProps}
        onSelect={onSelect}
      />
    </div>
  );
}

export const ToolbarPluginButton = forwardRef<
  HTMLButtonElement,
  ToolbarPluginButtonProps
>((props, ref) => {
  const {
    children,
    onClick,
    tooltip,
    variant = 'white',
    disabled,
    label,
  } = props;

  const { itemRef, readOnly } = useContext(toolbarContext);

  function onFocusClick() {
    if (itemRef) {
      // @ts-expect-error focus does not exist on childNodes
      itemRef.childNodes[0].focus();
    }

    onClick?.();
  }

  return (
    <div
      className={clsx(
        'ml-0.5 inline-flex shrink-0 grow-0 basis-auto items-center justify-center rounded-sm px-[5px] text-[13px] leading-none text-neutral-900 outline-hidden first:ml-0 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-primary-300 data-[state=on]:bg-primary-500 data-[state=on]:text-primary-900',
        {
          'bg-white': variant === 'white' && !readOnly && !disabled,
          'bg-primary-200': variant === 'secondary' && !readOnly && !disabled,
          'hover:bg-primary-100 hover:text-neutral-500': !readOnly && !disabled,
        },
      )}
    >
      <Tooltip content={!readOnly && !disabled && tooltip}>
        <Toolbar.Button
          aria-label={label}
          disabled={readOnly || disabled}
          ref={ref}
          onClick={onFocusClick}
        >
          <div className="inline-flex h-[25px] items-center">{children}</div>
        </Toolbar.Button>
      </Tooltip>
    </div>
  );
});

interface ToolbarToggleGroupProps {
  children: ReactNode;
  type: 'single' | 'multiple';
}

function ToolbarToggleGroup(props: ToolbarToggleGroupProps) {
  const { children, type } = props;

  return (
    <Toolbar.ToggleGroup className="flex items-center" type={type}>
      {children}
    </Toolbar.ToggleGroup>
  );
}

function ToolbarSeparator() {
  return <Toolbar.Separator className="mx-[10px] w-[1px] bg-neutral-300" />;
}
