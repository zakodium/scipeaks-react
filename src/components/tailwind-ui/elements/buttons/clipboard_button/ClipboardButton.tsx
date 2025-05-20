import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { WithTooltipProps } from '../../floating-ui/tooltip/Tooltip';
import { Tooltip } from '../../floating-ui/tooltip/Tooltip';
import { Spinner } from '../../spinner/Spinner';
import { Button } from '../button/Button';

const clipboardContext = createContext<null | IconState>(null);

interface ClipboardButtonProps extends WithTooltipProps {
  onCopy: () => Promise<string | ClipboardItem>;
  children?: ReactNode;

  onError?: (error: Error) => void;
  onSuccess?: () => void;

  bare?: boolean;
}

export type IconState = 'IDLE' | 'SPINNER' | 'SUCCESS' | 'ERROR';

function getClipboardIcon(state: IconState) {
  switch (state) {
    case 'IDLE':
      return <ClipboardDocumentIcon className="size-5" />;
    case 'SPINNER':
      return <Spinner className="size-5" />;
    case 'SUCCESS':
      return <ClipboardDocumentCheckIcon className="size-5 text-success-500" />;
    case 'ERROR':
      return <XMarkIcon className="size-5 text-danger-500" />;
    default:
      return <ClipboardDocumentIcon className="size-5" />;
  }
}

export function ClipboardButton(props: ClipboardButtonProps) {
  const {
    onCopy,
    children,
    onSuccess,
    onError,
    bare = false,
    ...tooltipProps
  } = props;

  const [iconState, setIconState] = useState<IconState>('IDLE');
  const isDisabled = iconState === 'SPINNER';

  useEffect(() => {
    let timeId: NodeJS.Timeout | null = null;

    if (iconState === 'SUCCESS' || iconState === 'ERROR') {
      timeId = setTimeout(() => {
        setIconState('IDLE');
      }, 3000);
    }

    return () => {
      if (timeId !== null) {
        clearTimeout(timeId);
      }
    };
  }, [iconState, isDisabled]);

  function onClick() {
    setIconState('SPINNER');
    onCopy()
      .then((result) => {
        if (typeof result === 'string') {
          return navigator.clipboard.writeText(result).then(() => {
            onSuccess?.();
            setIconState('SUCCESS');
          });
        } else {
          return navigator.clipboard.write([result]).then(() => {
            onSuccess?.();
            setIconState('SUCCESS');
          });
        }
      })
      .catch((error: unknown) => {
        onError?.(error as Error);
        setIconState('ERROR');
      });
  }

  const buttonProps = {
    disabled: isDisabled,
    onClick,
    children: (
      <>
        {children === undefined ? (
          <>{getClipboardIcon(iconState)}</>
        ) : (
          <div className="flex flex-row items-center gap-1">{children}</div>
        )}
      </>
    ),
  };

  return (
    <clipboardContext.Provider value={iconState}>
      <Tooltip
        content={tooltipProps.tooltip}
        delay={tooltipProps.tooltipDelay}
        placement={tooltipProps.tooltipPlacement}
      >
        {!bare ? (
          <Button {...buttonProps} variant="white" />
        ) : (
          <button
            type="button"
            className={clsx({
              'hover:underline': !isDisabled,
              'text-neutral-500': isDisabled,
            })}
            {...buttonProps}
          />
        )}
      </Tooltip>
    </clipboardContext.Provider>
  );
}

export function ClipboardButtonIcon() {
  const ctx = useContext(clipboardContext);

  if (!ctx) {
    throw new Error(
      'ClipboardButton.Icon must have access to the context provided by ClipboardButton',
    );
  }

  return <>{getClipboardIcon(ctx)}</>;
}

/**
 * @deprecated Use ClipboardButtonIcon instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
ClipboardButton.Icon = ClipboardButtonIcon;
