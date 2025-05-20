import type { Placement, Strategy } from '@floating-ui/react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingOverlay,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { cloneElement, useMemo, useRef } from 'react';

import { Portal } from '../../../overlays/Portal';

type TypeReference =
  | ReactElement
  | ((props: { ref: Ref<unknown> }) => ReactElement);

export interface BubbleProps {
  visible: boolean;
  strategy?: Strategy;
  placement?: Placement;
  reference: TypeReference;
  children: ReactNode;
  onClickOutside: (event: Event) => void;
}

const ARROW_HEIGHT = 10;
const ARROW_GAP = 5;

export function Bubble(props: BubbleProps) {
  const { strategy, placement, visible, onClickOutside, reference, children } =
    props;

  const arrowRef = useRef(null);
  const { context, refs, floatingStyles } = useFloating({
    strategy,
    placement,
    open: visible,
    whileElementsMounted: autoUpdate,
    onOpenChange: (open: boolean, event?: Event) => {
      if (!open && event) {
        // Call onClickOutside when the bubble is closed by clicking outside
        return onClickOutside(event);
      }
    },
    middleware: [
      flip(),
      shift(),
      arrow({ element: arrowRef }),
      offset(ARROW_HEIGHT + ARROW_GAP),
    ],
  });

  const focus = useFocus(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePress: true });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    focus,
    role,
    dismiss,
  ]);

  const referenceRender = useMemo(() => {
    const referenceProps = getReferenceProps();

    if (typeof reference === 'function') {
      return reference({ ref: refs.setReference, ...referenceProps });
    }

    return cloneElement(reference, {
      ref: refs.setReference,
      ...referenceProps,
    });
  }, [getReferenceProps, reference, refs.setReference]);

  return (
    <>
      {referenceRender}
      {visible && (
        <Portal>
          <FloatingOverlay>
            <FloatingFocusManager context={context}>
              <div
                style={floatingStyles}
                ref={refs.setFloating}
                {...getFloatingProps()}
                className="z-50 rounded-lg border-2 border-neutral-200 bg-white outline-hidden"
              >
                <FloatingArrow
                  height={ARROW_HEIGHT}
                  width={ARROW_HEIGHT * 2}
                  className="z-10 fill-white stroke-neutral-200 [&>path:first-of-type]:stroke-neutral-200 [&>path:last-of-type]:stroke-white"
                  strokeWidth={2}
                  ref={arrowRef}
                  context={context}
                />

                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </Portal>
      )}
    </>
  );
}
