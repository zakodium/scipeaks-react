import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface DividerProps {
  justify?: 'start' | 'center' | 'end';
  children?: ReactNode[] | ReactNode;
}

export function Divider(props: DividerProps) {
  const { children, justify = 'center' } = props;

  if (!children) {
    return (
      <div className="relative min-h-px">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-neutral-300" />
        </div>
      </div>
    );
  }

  const isBoth = Array.isArray(children) && children.length === 2;
  if (justify === 'center' && !isBoth) {
    return <DividerCenter>{children}</DividerCenter>;
  }

  if (justify !== 'center' && !isBoth) {
    return <DividerSide side={justify}>{children}</DividerSide>;
  }

  return isBoth ? (
    <DividerSide side="both">{children}</DividerSide>
  ) : (
    <DividerCenter>{children}</DividerCenter>
  );
}

export interface DividerContentProps {
  title?: boolean;
  attached?: boolean;

  children?: ReactNode;
}

export function DividerContent(props: DividerContentProps) {
  const { children, title, attached } = props;

  return (
    <span
      className={clsx(
        title
          ? 'text-lg font-semibold text-neutral-900'
          : 'text-sm text-neutral-500',
        {
          'px-3': !attached && title,
          'px-2': !attached && !title,
        },
      )}
    >
      {children}
    </span>
  );
}

/**
 * @deprecated Use DividerContent instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Divider.Content = DividerContent;

export interface DividerCenterProps {
  children: ReactNode;
}

export function DividerCenter(props: DividerCenterProps) {
  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <div className="w-full border-t border-neutral-300" />
      </div>
      <div className="flex">{props.children}</div>
      <div className="flex flex-1 items-center">
        <div className="w-full border-t border-neutral-300" />
      </div>
    </div>
  );
}

export interface DividerSideProps {
  children: ReactNode[] | ReactNode;
  side?: 'start' | 'end' | 'both';
}

export function DividerSide(props: DividerSideProps) {
  const { side = 'start', children } = props;

  if (side === 'both' && Array.isArray(children)) {
    return (
      <div className="flex items-center">
        <div className="flex">{children[0]}</div>
        <div className="flex flex-1 items-center">
          <div className="w-full border-t border-neutral-300" />
        </div>
        <div className="flex">{children[1]}</div>
      </div>
    );
  }

  return (
    <div className={clsx('flex', side === 'end' ? 'flex-row-reverse' : '')}>
      <div className="flex">{children}</div>
      <div className="flex flex-1 items-center">
        <div className="w-full border-t border-neutral-300" />
      </div>
    </div>
  );
}
