import { ItalicIcon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import FormatPlugin from './utils/FormatPlugin';

export default function ItalicPlugin(): TooltipPluginElement {
  return (
    <FormatPlugin pluginKey="italic" icon={<ItalicIcon className="size-4" />} />
  );
}
