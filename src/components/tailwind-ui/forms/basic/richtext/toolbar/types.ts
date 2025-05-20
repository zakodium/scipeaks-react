import type { ComponentType, ReactElement, ReactNode } from 'react';

import type { DropdownAsButtonProps } from '../../../../elements/dropdown/Dropdown';

export interface ToolbarPluginButtonProps {
  children: ReactNode;
  onClick?: () => void;
  tooltip?: ReactNode;
  variant?: 'secondary' | 'white';
  disabled?: boolean;
  label?: string;
}

export type ToolbarPluginDropdownProps<DropdownType = unknown> = Omit<
  DropdownAsButtonProps<DropdownType>,
  'buttonClassName' | 'noDefaultButtonStyle' | 'className' | 'size'
>;

type ToolbarPluginDropdownComponent<DropdownType> = ComponentType<
  ToolbarPluginDropdownProps<DropdownType>
>;

export interface ToolbarCustomPluginProps<DropdownType = unknown> {
  Button: ComponentType<ToolbarPluginButtonProps>;
  Dropdown: ToolbarPluginDropdownComponent<DropdownType>;
}

export interface ToolbarPluginProps {
  formatPlugins?: Plugin[];
  actionPlugins?: Plugin[];
  alignmentPlugins?: Plugin[];
  insertPlugins?: Plugin[];
  customPlugins?: Array<ComponentType<ToolbarCustomPluginProps>>;
  className?: string;
  readOnly?: boolean;
  itemRef: HTMLDivElement | null;
}

export type Plugin = ReactElement<{ pluginKey: string }>;
export type TooltipPluginElement = Plugin;
