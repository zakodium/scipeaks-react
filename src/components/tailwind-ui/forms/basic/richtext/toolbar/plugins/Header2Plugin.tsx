import { H2Icon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import TextPlugin from './utils/TextPlugin';

export default function Header2Plugin(): TooltipPluginElement {
  return <TextPlugin pluginKey="h2" icon={<H2Icon className="size-4" />} />;
}
