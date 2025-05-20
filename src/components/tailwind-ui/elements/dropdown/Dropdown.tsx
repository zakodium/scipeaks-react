import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import type { ComponentType, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { Portal } from '../../overlays/Portal';
import type { Size } from '../../types';

import { DropdownTriggerAsChild } from './DropdownTriggerAsChild';
import { DropdownTriggerButton } from './DropdownTriggerButton';

export interface DropdownActionOption<T> {
  type: 'action';
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  data?: T;
}

export interface DropdownStaticOption {
  type: 'static';
  content: ReactNode;
}

export type DropdownOption<T> = DropdownActionOption<T> | DropdownStaticOption;
export type DropdownOptions<T> = Array<Array<DropdownOption<T>>>;

interface RenderOptionItemProps {
  children?: ReactNode;
}

export interface DropdownBaseProps<T> {
  disabled?: boolean;
  className?: string;
  options: DropdownOptions<T>;
  onSelect: (selected: DropdownActionOption<T>) => void;

  side?: RadixDropdown.DropdownMenuContentProps['side'];
  align?: RadixDropdown.DropdownMenuContentProps['align'];

  renderAction?: (
    Component: ComponentType<RenderOptionItemProps>,
    option: DropdownActionOption<T>,
  ) => ReactNode;

  /**
   * @deprecated Only used internally by `zakodium/components`. Please do not use this prop on your own.
   */
  pointerDownForAction?: boolean;
}

export interface DropdownAsChildProps<T> extends DropdownBaseProps<T> {
  asChild: true;
  children: ReactNode;
}

export interface DropdownAsButtonProps<T> extends DropdownBaseProps<T> {
  asChild?: false;
  children?: ReactNode;

  title?: ReactNode;
  size?: Size;
  buttonTabIndex?: number;
  buttonClassName?: string;
  /**
   * If set to true only the custom style passed in buttonClassName will be used to
   * style the dropdown button
   */
  noDefaultButtonStyle?: boolean;
}

export type DropdownProps<T> =
  | DropdownAsChildProps<T>
  | DropdownAsButtonProps<T>;

interface DropdownActionContextType {
  option: DropdownActionOption<unknown>;
  onSelect: (selected: DropdownActionOption<unknown>) => void;
  pointerDownForAction?: boolean;
}

const dropdownActionContext = createContext<DropdownActionContextType | null>(
  null,
);

export function Dropdown<T>(props: DropdownProps<T>) {
  const {
    asChild,
    children,
    className,
    options,
    // Will be automatically overridden to prevent collisions with viewport boundaries.
    side = 'bottom',
    align = 'end',
    onSelect,
    renderAction,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    pointerDownForAction,
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const nonEmptyGroups = options.filter((option) => option.length > 0);

  return (
    <RadixDropdown.Root
      modal={false}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
    >
      <div className={clsx('text-left', className || 'inline-block')}>
        {asChild ? (
          <DropdownTriggerAsChild {...props}>{children}</DropdownTriggerAsChild>
        ) : (
          <DropdownTriggerButton {...props} />
        )}
      </div>

      <Portal>
        <RadixDropdown.Content
          side={side}
          avoidCollisions
          align={align}
          className="rounded-md bg-white shadow-lg ring-1 ring-black/5 will-change-[opacity,transform] focus:outline-hidden data-side:animate-(--animate-private_dropdownShowFromButton_100) data-[side=bottom]:mt-2 data-[side=left]:mr-2 data-[side=right]:ml-2 data-[side=top]:mb-2"
        >
          <div className="divide-y divide-neutral-100 py-1">
            {nonEmptyGroups.map((options, index1) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="py-1" key={index1}>
                  {options.map((option, index2) => {
                    if (option.type === 'static') {
                      return (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index1}-${index2}`}
                          className="px-4 py-2 text-sm outline-hidden"
                        >
                          {option.content}
                        </div>
                      );
                    }

                    return (
                      <ActionOption
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${index1}-${index2}`}
                        onSelect={onSelect}
                        option={option}
                        renderAction={renderAction}
                        // eslint-disable-next-line @typescript-eslint/no-deprecated
                        pointerDownForAction={pointerDownForAction}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </RadixDropdown.Content>
      </Portal>
    </RadixDropdown.Root>
  );
}

interface ActionOptionProps<T>
  extends Pick<
    DropdownProps<T>,
    'renderAction' | 'onSelect' | 'pointerDownForAction'
  > {
  option: DropdownActionOption<T>;
}

function ActionOption<T>(props: ActionOptionProps<T>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    pointerDownForAction,
    option,
    onSelect,
    renderAction,
  } = props;

  const context = useMemo(() => {
    return {
      option,
      onSelect,
      pointerDownForAction,
    } as DropdownActionContextType;
  }, [option, onSelect, pointerDownForAction]);

  return (
    <dropdownActionContext.Provider value={context}>
      {renderAction ? renderAction(Option, option) : <Option />}
    </dropdownActionContext.Provider>
  );
}

function Option(props: RenderOptionItemProps): ReactNode | null {
  const { children } = props;
  const context = useContext(dropdownActionContext);
  if (context === null) return null;

  const { onSelect, option, pointerDownForAction = false } = context;

  if (option.type !== 'action') return null;

  // onPointerDown is used in RichText context (onClick & onSelect are never called)
  const handleSelectFunction = {
    [pointerDownForAction ? 'onPointerDown' : 'onSelect']: (event: Event) => {
      event.stopPropagation();
      if (option.disabled) return;
      onSelect(option);
    },
  };

  return (
    <RadixDropdown.Item
      {...handleSelectFunction}
      disabled={option.disabled}
      className="group text-neutral-700 focus:outline-hidden data-disabled:text-neutral-400 data-highlighted:bg-neutral-100 data-highlighted:text-neutral-900"
    >
      <span
        className={clsx(
          'block w-full px-4 py-2 text-left text-sm focus:outline-hidden',
          option.disabled ? 'cursor-default' : 'cursor-pointer',
          {
            'group flex items-center': option.icon,
            'block justify-between': !option.icon,
          },
        )}
      >
        {option.icon !== undefined && (
          <span className="mr-3 size-5 text-neutral-400 group-data-highlighted:text-neutral-500">
            {option.icon}
          </span>
        )}
        {children || option.label}
      </span>
    </RadixDropdown.Item>
  );
}
