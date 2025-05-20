import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical';
import { useEffect } from 'react';

import type { ImagePayloadWithKey } from '../nodes/ImageNode';
import { $createImageNode, ImageNode } from '../nodes/ImageNode';

import { INSERT_IMAGE_COMMAND } from './ImagesPlugin.commands';

export type InsertImagePayload = Readonly<ImagePayloadWithKey>;

export function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const node = $createImageNode(payload);
          $insertNodes([node]);

          if ($isRootOrShadowRoot(node.getParentOrThrow())) {
            $wrapNodeInElement(node, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor]);

  return null;
}
