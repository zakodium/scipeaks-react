import { useContext } from 'react';
import { Button } from 'react-science/ui';

import { ScipeaksPluginContext } from './scipeaks_plugin_context.js';

export default function TopbarRight() {
  const { isDirty, saveChanges } = useContext(ScipeaksPluginContext);
  return (
    <Button
      onClick={saveChanges}
      disabled={!isDirty}
      intent={isDirty ? 'success' : 'none'}
    >
      Save data
    </Button>
  );
}
