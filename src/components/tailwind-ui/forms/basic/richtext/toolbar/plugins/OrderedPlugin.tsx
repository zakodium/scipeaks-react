import { NumberedListIcon } from '@heroicons/react/16/solid';

import type { TooltipPluginElement } from '../types';

import ListPlugin from './utils/ListPlugin';

export default function OrderedPlugin(): TooltipPluginElement {
  return (
    <ListPlugin pluginKey="ol" icon={<NumberedListIcon className="size-4" />} />
  );
}
