import { H3Icon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import TextPlugin from './utils/TextPlugin';

export default function Header3Plugin(): TooltipPluginElement {
  return <TextPlugin pluginKey="h3" icon={<H3Icon className="size-4" />} />;
}
