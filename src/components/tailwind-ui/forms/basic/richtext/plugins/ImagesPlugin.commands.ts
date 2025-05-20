import type { LexicalCommand } from 'lexical';
import { createCommand } from 'lexical';

import type { NewImagePayload } from '../nodes/ImageNode';

export const INSERT_IMAGE_COMMAND: LexicalCommand<NewImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND');
