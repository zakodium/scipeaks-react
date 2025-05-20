import { UnderlineIcon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import FormatPlugin from './utils/FormatPlugin';

export default function UnderlinePlugin(): TooltipPluginElement {
  return (
    <FormatPlugin
      pluginKey="underline"
      icon={<UnderlineIcon className="size-4" />}
    />
  );
}
