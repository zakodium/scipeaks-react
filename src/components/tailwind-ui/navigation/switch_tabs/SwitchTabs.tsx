import type { TabsProps } from '@radix-ui/react-tabs';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface SwitchTabsItems {
  title: ReactNode;
  content: ReactNode;

  id?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SwitchTabsProps
  extends Pick<TabsProps, 'value' | 'defaultValue' | 'onValueChange'> {
  tabs: SwitchTabsItems[];
  align?: 'left' | 'center' | 'right';
}

export function SwitchTabs(props: SwitchTabsProps) {
  const {
    tabs,
    align = 'left',
    value,
    defaultValue = tabs[0].id || '0',
    onValueChange,
  } = props;

  return (
    <Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <div
        className={clsx('flex', {
          'justify-start': align === 'left',
          'justify-end': align === 'right',
          'justify-center': align === 'center',
        })}
      >
        <List className="flex flex-row items-center gap-2 rounded-lg bg-neutral-100 p-1">
          {tabs.map(({ title, disabled, icon, id }, key) => {
            const itemId = id || String(key);

            return (
              <Trigger
                key={itemId}
                value={itemId}
                disabled={disabled}
                className="group rounded-md px-2 py-1 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-primary-500 data-disabled:text-neutral-500 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <div
                  className={clsx('flex flex-row items-center gap-1', {
                    'lg:pr-3': icon,
                  })}
                >
                  {icon && (
                    <span className="size-5 group-data-[state=active]:text-primary-500">
                      {icon}
                    </span>
                  )}
                  <span>{title}</span>
                </div>
              </Trigger>
            );
          })}
        </List>
      </div>
      {tabs.map(({ content, id }, key) => {
        const itemId = id || String(key);

        return (
          <Content key={itemId} value={itemId} className="focus:outline-hidden">
            {content}
          </Content>
        );
      })}
    </Root>
  );
}
