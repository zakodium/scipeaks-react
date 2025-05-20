import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { Portal } from '../../../overlays/Portal';

export interface WithTooltipProps {
  tooltip?: ReactNode;
  tooltipDelay?: TooltipProps['delay'];
  tooltipPlacement?: TooltipProps['placement'];
}

export interface TooltipProps {
  content?: ReactNode;
  children: ReactElement;
  delay?: number;
  disableHoverableContent?: RadixTooltip.TooltipProps['disableHoverableContent'];
  placement?: RadixTooltip.TooltipContentProps['side'];

  // False => Black background with white text
  // True => Gray background with black text
  invertColor?: boolean;
}

type TooltipContext = Required<Pick<TooltipProps, 'invertColor' | 'placement'>>;

const context = createContext<TooltipContext | null>(null);

function useTooltipContext() {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('TooltipContext not found');
  }

  return ctx;
}

export function Tooltip(props: TooltipProps) {
  const {
    children,
    invertColor = false,
    delay,
    disableHoverableContent,
    placement = 'top',
    content,
  } = props;

  const contextValue = useMemo<TooltipContext>(() => {
    return { invertColor, placement };
  }, [invertColor, placement]);

  if (!content) {
    return <>{children}</>;
  }

  return (
    <context.Provider value={contextValue}>
      <RadixTooltip.Root
        delayDuration={delay}
        disableHoverableContent={disableHoverableContent}
      >
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <TooltipContent>{content}</TooltipContent>
      </RadixTooltip.Root>
    </context.Provider>
  );
}

interface TooltipContentProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

function TooltipContent(props: TooltipContentProps) {
  const { children, className, style } = props;
  const { invertColor, placement } = useTooltipContext();

  return (
    <Portal>
      <RadixTooltip.Content
        sideOffset={2}
        side={placement}
        className={clsx(
          'z-100',
          className === '' || !className
            ? 'rounded-md px-2 py-1 text-xs'
            : `rounded-md px-2 py-1 ${className}`,
          invertColor
            ? 'bg-neutral-100 text-black'
            : 'bg-neutral-900 text-white',
        )}
        style={style}
      >
        <RadixTooltip.Arrow
          className={clsx(invertColor ? 'fill-neutral-100' : 'fill-black')}
        />
        {children}
      </RadixTooltip.Content>
    </Portal>
  );
}
