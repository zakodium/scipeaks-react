import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { ReactElement, ReactNode } from 'react';
import { Children, createContext, useContext } from 'react';

const BreadcrumbContext = createContext<boolean | null>(null);

export interface BreadcrumbProps {
  children: ReactElement[] | ReactElement;
}

interface BreadcrumbContentProps {
  children: ReactNode;
}

export function Breadcrumb(props: BreadcrumbProps) {
  const Child = Children.map(props.children, (child, index) => {
    return (
      <BreadcrumbContext.Provider value={index === 0}>
        <div className="flex items-center space-x-4">{child}</div>
      </BreadcrumbContext.Provider>
    );
  });

  return (
    <nav className="flex">
      <ol className="flex items-center space-x-4">{Child}</ol>
    </nav>
  );
}

export function BreadcrumbGroup(props: BreadcrumbProps) {
  const Child = Children.map(props.children, (child, index) => {
    return (
      <BreadcrumbContext.Provider value={index === 0}>
        <div className="flex items-center space-x-4">{child}</div>
      </BreadcrumbContext.Provider>
    );
  });

  return (
    <BreadcrumbContentWrapper>
      <nav className="flex">
        <ol className="flex items-center space-x-4">{Child}</ol>
      </nav>
    </BreadcrumbContentWrapper>
  );
}

/**
 * @deprecated Use BreadcrumbGroup instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Breadcrumb.Group = BreadcrumbGroup;

export function BreadcrumbItem(props: BreadcrumbContentProps) {
  return (
    <BreadcrumbContentWrapper>
      <div className="text-sm font-semibold text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-700">
        {props.children}
      </div>
    </BreadcrumbContentWrapper>
  );
}

/**
 * @deprecated Use BreadcrumbItem instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Breadcrumb.Item = BreadcrumbItem;

export function BreadcrumbIcon(props: BreadcrumbContentProps) {
  return (
    <BreadcrumbContentWrapper>
      <div className="size-5 text-neutral-400 hover:text-neutral-500">
        {props.children}
      </div>
    </BreadcrumbContentWrapper>
  );
}

/**
 * @deprecated Use BreadcrumbIcon instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
Breadcrumb.Icon = BreadcrumbIcon;

function BreadcrumbContentWrapper(props: BreadcrumbContentProps) {
  const context = useContext(BreadcrumbContext);

  if (context === null) {
    throw new Error('Cannot use this component outside a Breadcrumb');
  }

  return (
    <>
      {!context && (
        <ChevronRightIcon className="size-5 shrink-0 text-neutral-400" />
      )}
      {props.children}
    </>
  );
}
