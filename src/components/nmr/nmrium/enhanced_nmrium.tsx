import { init } from '@zakodium/nmrium-core-plugins';
import type { NMRiumProps } from 'nmrium';
import { clientOnly } from 'vike-react/clientOnly';

import LoadingFull from '@/components/loading_full.js';

import { ScipeaksPlugin } from './scipeaks_plugin/scipeaks_plugin.js';
import { scipeaksWorkspaces } from './scipeaks_workspaces.js';

const NMRium = clientOnly(() => import('nmrium').then((mod) => mod.NMRium));

const core = init([new ScipeaksPlugin()]);

export default function EnhancedNMRium(
  props: Omit<NMRiumProps, 'getSpinner' | 'customWorkspaces'>,
) {
  return (
    <NMRium
      fallback={<LoadingFull />}
      core={core}
      getSpinner={() => <LoadingFull />}
      customWorkspaces={scipeaksWorkspaces}
      workspace="scipeaks"
      {...props}
    />
  );
}
