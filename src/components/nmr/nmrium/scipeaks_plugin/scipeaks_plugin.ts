import type {
  NMRiumPlugin,
  NMRiumPluginMigration,
  PluginUIComponentRegistry,
} from '@zakodium/nmrium-core';

import TopbarRight from './topbar_right.js';

export class ScipeaksPlugin implements NMRiumPlugin {
  id = '@zakodium/scipeaks-react#ScipeaksPlugin';
  version = 1;

  migrations: NMRiumPluginMigration[] = [];

  ui: PluginUIComponentRegistry = {
    'topbar.right': TopbarRight,
  };
}
