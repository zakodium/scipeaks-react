import { BoldIcon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import FormatPlugin from './utils/FormatPlugin';

export default function BoldPlugin(): TooltipPluginElement {
  return (
    <FormatPlugin pluginKey="bold" icon={<BoldIcon className="size-4" />} />
  );
}
