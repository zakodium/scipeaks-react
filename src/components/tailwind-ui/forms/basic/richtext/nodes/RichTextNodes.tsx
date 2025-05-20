import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode } from '@lexical/rich-text';
import type { Klass, LexicalNode } from 'lexical';

import { TableNode } from '../@lexical/table/TableNode';

import { ImageNode } from './ImageNode';

export function extendNodes(
  extendNodes: Array<Klass<LexicalNode>>,
): Array<Klass<LexicalNode>> {
  return [
    HeadingNode,
    ListNode,
    ListItemNode,
    TableNode,
    ImageNode,
    ...extendNodes,
  ];
}
