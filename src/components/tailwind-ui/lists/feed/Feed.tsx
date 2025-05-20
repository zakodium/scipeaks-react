import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';

import type { Color } from '../../types';

export interface FeedItemProps {
  title: ReactNode;
  description?: ReactNode;
  icon: ReactNode;
  iconBackgroundColor?: Color;
}

const colors = {
  neutral: 'bg-neutral-400',
  alternative: 'bg-alternative-500',
  danger: 'bg-danger-500',
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
};

export interface FeedProps {
  children: Array<ReactElement<FeedItemProps>>;
  className?: string;
}

export function Feed(props: FeedProps) {
  const length = Children.count(props.children);
  if (length === 0) return null;

  return (
    <div className={clsx('flow-root', props.className)}>
      <ul className="-mb-8">
        {Children.map(props.children, (child, index) => {
          return (
            <li>
              <div className="relative pb-8">
                {index !== props.children.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200"
                    aria-hidden="true"
                  />
                )}

                {child}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FeedItem(props: FeedItemProps) {
  const { description, icon, title, iconBackgroundColor = 'neutral' } = props;

  return (
    <div className="relative flex space-x-3">
      <div>
        <span
          className={clsx(
            'flex size-8 items-center justify-center rounded-full text-white ring-8 ring-white',
            colors[iconBackgroundColor],
          )}
        >
          <span className="size-5">{icon}</span>
        </span>
      </div>
      <div className="flex min-w-0 flex-1 justify-between space-x-4">
        <div className="min-w-0 flex-1 py-1">
          <div>{title}</div>

          <div className="mt-2 text-sm text-neutral-700">{description}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * @deprecated Use FeedItem instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Feed.Item = FeedItem;
