import { ListBulletIcon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import ListPlugin from './utils/ListPlugin';

export default function UnorderedPlugin(): TooltipPluginElement {
  return (
    <ListPlugin pluginKey="ul" icon={<ListBulletIcon className="size-4" />} />
  );
}
