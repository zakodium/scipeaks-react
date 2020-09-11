import React, {
  ComponentType,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

import {
  Pagination,
  IPaginationProps,
} from '../elements/pagination/Pagination';

export interface ITrProps<T> {
  index: number;
  value: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITableProps<T = any> {
  data: Array<T>;
  Tr: ComponentType<ITrProps<T>>;
  Empty?: ComponentType;
  Header?: ComponentType;

  pagination?: IPaginationProps;
  itemsPerPage?: number;
}

export function Table<T extends { id: number | string }>(
  props: ITableProps<T>,
) {
  const { data, Tr, Empty, Header, pagination } = props;

  if (data.length === 0) {
    return Empty ? <Empty /> : null;
  }

  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            {Header && (
              <thead>
                <Header />
              </thead>
            )}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((value, index) => (
                <Tr key={value.id} index={index} value={value} />
              ))}
            </tbody>
          </table>
          {pagination && (
            <div>
              <Pagination {...pagination} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type ITdProps = TdHTMLAttributes<HTMLTableDataCellElement>;
export type IThProps = ThHTMLAttributes<HTMLTableHeaderCellElement>;

export function Td(props: ITdProps) {
  return (
    <td
      className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap"
      {...props}
    />
  );
}

export function Th(props: IThProps) {
  return (
    <th
      className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50"
      {...props}
    />
  );
}
