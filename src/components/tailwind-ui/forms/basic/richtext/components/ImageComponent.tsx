import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection.js';
import { mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import type { NodeKey, LexicalNode } from 'lexical';
import {
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  $getNodeByKey,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ImagePayloadWithKey } from '../nodes/ImageNode';
import { $isImageNode } from '../nodes/ImageNode';

import ImageResizer from './ImageResizer';

export function ImageComponent(props: ImagePayloadWithKey) {
  const { alt, imageKey, src, width, height } = props;
  const ref = useRef<HTMLImageElement | null>(null);

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(imageKey);

  const [isResizing, setIsResizing] = useState(false);

  const [editor] = useLexicalComposerContext();

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        const node = $getNodeByKeyOrThrow(imageKey);

        if ($isImageNode(node)) {
          node.remove();
        }

        setSelected(false);
      }
      return false;
    },
    [isSelected, setSelected, imageKey],
  );

  const onResizeEnd = (
    nextWidth: 'inherit' | number,
    nextHeight: 'inherit' | number,
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(imageKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (event.target === ref.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
    );

    return () => {
      unregister();
    };
  }, [clearSelection, editor, isSelected, onDelete, setSelected]);

  const isFocused = isSelected || isResizing;

  return (
    <>
      <img
        src={src}
        alt={alt}
        ref={ref}
        style={{
          height,
          width,
        }}
        className={clsx({
          'border border-primary-500': isSelected,
        })}
      />
      {isFocused && (
        <ImageResizer
          editor={editor}
          imageRef={ref}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
        />
      )}
    </>
  );
}

function $getNodeByKeyOrThrow(key: NodeKey): LexicalNode {
  const node = $getNodeByKey(key);

  if (!node) {
    throw new Error('node key not found');
  }

  return node;
}
