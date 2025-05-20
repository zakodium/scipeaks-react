import type { TooltipProviderProps } from '@radix-ui/react-tooltip';
import { TooltipProvider as RadixTooltipProvider } from '@radix-ui/react-tooltip';

export function TooltipProvider(props: TooltipProviderProps) {
  const { delayDuration = 700, skipDelayDuration = 300, ...rest } = props;
  return (
    <RadixTooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...rest}
    />
  );
}

export { type TooltipProviderProps } from '@radix-ui/react-tooltip';
