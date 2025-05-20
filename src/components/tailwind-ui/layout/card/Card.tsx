import clsx from 'clsx';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

export interface CardProps {
  /**
   * Set whether the Card is edge-to-edge on mobile
   */
  mobileEdgeToEdge?: boolean;
  children: ReactNode;
  className?: string;

  /**
   * will also disable style applied by `mobileEdgeToEdge` flag
   */
  noDefaultStyle?: boolean;
}

interface CardContextValue {
  mobileEdgeToEdge?: boolean;
}

const cardContext = createContext<CardContextValue | null>(null);

function useCardContext() {
  const card = useContext(cardContext);
  if (card === null) {
    throw new Error(
      'Card subcomponents should be children of the Card component',
    );
  }
  return card;
}
export function Card(props: CardProps) {
  const { mobileEdgeToEdge, children, className, noDefaultStyle } = props;

  const contextValue = useMemo(() => {
    return { mobileEdgeToEdge };
  }, [mobileEdgeToEdge]);

  return (
    <cardContext.Provider value={contextValue}>
      <div
        className={clsx(
          {
            'bg-white shadow-sm': !noDefaultStyle,
            'sm:rounded-lg': !noDefaultStyle && mobileEdgeToEdge,
            'rounded-lg': !noDefaultStyle && !mobileEdgeToEdge,
          },
          className,
        )}
      >
        {children}
      </div>
    </cardContext.Provider>
  );
}

interface CardElementProps {
  grayBackground?: boolean;
  className?: string;
  children: ReactNode;

  /**
   * will also disable style applied by `grayBackground` flag from props
   * and `mobileEdgeToEdge` from CardContext
   */
  noDefaultStyle?: boolean;
}

export function CardHeader(props: CardElementProps) {
  const { grayBackground, className, children, noDefaultStyle } = props;
  const { mobileEdgeToEdge } = useCardContext();
  return (
    <div
      className={clsx(
        {
          // spacing
          'px-4 py-5 sm:px-6': !noDefaultStyle,
          // backgrounds / border
          'bg-neutral-50': !noDefaultStyle && grayBackground,
          'border-b border-neutral-200': !noDefaultStyle && !grayBackground,
          // border radius
          'sm:rounded-t-lg': !noDefaultStyle && mobileEdgeToEdge,
          'rounded-t-lg': !noDefaultStyle && !mobileEdgeToEdge,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * @deprecated Use CardHeader instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Card.Header = CardHeader;

export function CardBody(props: CardElementProps) {
  const { className, grayBackground = false, children, noDefaultStyle } = props;

  return (
    <div
      className={clsx(
        {
          'px-4 py-5 sm:p-6': !noDefaultStyle,
          'bg-neutral-50': !noDefaultStyle && grayBackground,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * @deprecated Use CardBody instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Card.Body = CardBody;

export function CardFooter(props: CardElementProps) {
  const { grayBackground = false, className, children, noDefaultStyle } = props;
  const { mobileEdgeToEdge } = useCardContext();

  return (
    <div
      className={clsx(
        {
          'px-4 py-4 sm:px-6': !noDefaultStyle,
          'bg-neutral-50': !noDefaultStyle && grayBackground,
          'border-t border-neutral-200': !noDefaultStyle && !grayBackground,
          'sm:rounded-b-lg': !noDefaultStyle && mobileEdgeToEdge,
          'rounded-b-lg': !noDefaultStyle && !mobileEdgeToEdge,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * @deprecated Use CardFooter instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Card.Footer = CardFooter;
