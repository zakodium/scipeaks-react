import { H1Icon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import TextPlugin from './utils/TextPlugin';

export default function Header1Plugin(): TooltipPluginElement {
  return <TextPlugin pluginKey="h1" icon={<H1Icon className="size-4" />} />;
}
