import { createContext } from 'react';

export interface ScipeaksPluginContextValue {
  isDirty: boolean;
  saveChanges: () => void;
}

export const ScipeaksPluginContext = createContext<ScipeaksPluginContextValue>({
  isDirty: false,
  saveChanges: () => void 0,
});
