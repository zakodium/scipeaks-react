import {
  Bars3Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type {
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { createContext, Fragment, useContext, useMemo } from 'react';

import type { PaginationProps } from '../../elements/pagination/Pagination';
import { Pagination } from '../../elements/pagination/Pagination';
import type { TableSortConfig } from '../../hooks/useTableSort';

export interface TableProps<T> {
  data: T[];
  renderTr: (value: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
  renderHeader?: () => ReactNode;
  pagination?: PaginationProps;
  itemsPerPage?: number;
  tableStyle?: React.CSSProperties;
  tableClassName?: string;
  sort?: TableSortConfig;
  getId?: IdGetter<T>;
}

export type TablePropsWithoutIdGetter<T extends DataWithId> = Omit<
  TableProps<T>,
  'getId'
>;

export interface TablePropsWithIdGetter<T> extends TableProps<T> {
  getId: IdGetter<T>;
}

type IdGetter<T> = (value: T) => string | number;

interface DataWithId {
  id: string | number;
}

function defaultGetId(value: DataWithId) {
  return value.id;
}

interface TableContext {
  sort?: TableSortConfig;
}

const defaultTableContext: TableContext = {};

const tableContext = createContext<TableContext>(defaultTableContext);

export function Table<T extends DataWithId>(
  props: TablePropsWithoutIdGetter<T>,
): ReactElement;
export function Table<T>(props: TablePropsWithIdGetter<T>): ReactElement;
export function Table<T>(props: TableProps<T>) {
  const {
    data,
    renderTr,
    renderEmpty,
    renderHeader,
    pagination,
    tableStyle,
    tableClassName,
    sort,
    getId = defaultGetId as IdGetter<T>,
  } = props;

  const contextValue = useMemo(() => ({ sort }), [sort]);

  if (data.length === 0) {
    return renderEmpty ? <>{renderEmpty()}</> : null;
  }

  return (
    <tableContext.Provider value={contextValue}>
      <div className="flex flex-col">
        <div>
          <div className="inline-block min-w-full border-b border-neutral-200 align-middle shadow-sm sm:rounded-lg">
            <table
              style={tableStyle}
              className={clsx(
                'min-w-full divide-y divide-neutral-200 overflow-hidden bg-white sm:rounded-lg',
                tableClassName,
              )}
            >
              {renderHeader && (
                <thead className="bg-neutral-50">{renderHeader()}</thead>
              )}
              <tbody className="divide-y divide-neutral-200">
                {data.map((value, index) => (
                  <Fragment key={getId(value)}>
                    {renderTr(value, index)}
                  </Fragment>
                ))}
              </tbody>
            </table>

            {pagination && <TablePagination {...pagination} />}
          </div>
        </div>
      </div>
    </tableContext.Provider>
  );
}

function TablePagination(props: PaginationProps) {
  const { withText, itemsPerPage, totalCount } = props;

  if (!withText && itemsPerPage >= totalCount) {
    return null;
  }

  return (
    <div className="border-t border-neutral-200 px-4 py-3 sm:px-6">
      <Pagination {...props} />
    </div>
  );
}

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  compact?: boolean;
}

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  compact?: boolean;
  sortField?: string;
}

export function Td(props: TdProps) {
  const { className, compact, ...otherProps } = props;
  return (
    <td
      className={clsx(
        'text-sm font-semibold whitespace-nowrap text-neutral-900',
        compact ? 'p-px' : 'px-6 py-4',
        className,
      )}
      {...otherProps}
    />
  );
}

export function Th(props: ThProps) {
  const { compact, sortField, className, children, ...otherProps } = props;
  const { sort } = useContext(tableContext);

  let handleClick, sortedClass, sortElement;
  if (sortField && sort) {
    handleClick = () => sort.onChange(sortField);
    sortedClass = 'cursor-pointer';
    if (sortField === sort.field) {
      sortElement =
        sort.direction === 'ASCENDING' ? (
          <BarsArrowUpIcon className="size-4" />
        ) : (
          <BarsArrowDownIcon className="size-4" />
        );
    } else {
      sortElement = <Bars3Icon className="size-4" />;
    }
  }

  return (
    <th
      className={clsx(
        'text-left text-xs font-semibold tracking-wider text-neutral-500 uppercase',
        compact ? 'p-px' : 'px-6 py-3',
        className,
        sortedClass,
      )}
      onClick={handleClick}
      {...otherProps}
    >
      <div className="flex gap-x-1">
        {children}
        {sortElement}
      </div>
    </th>
  );
}
