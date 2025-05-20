import { match } from 'ts-pattern';

import type { DropdownActionOption } from '../../../../../elements/dropdown/Dropdown';
import { Dropdown } from '../../../../../elements/dropdown/Dropdown';
import { TranslationsText } from '../../../../../internationalization/TranslationsText';
import type { TableNode } from '../../@lexical/table/TableNode';

type TableAction =
  | 'DELETE_ROW'
  | 'DELETE_COLUMN'
  | 'INSERT_ROW_ABOVE'
  | 'INSERT_ROW_BELOW'
  | 'INSERT_COLUMN_LEFT'
  | 'INSERT_COLUMN_RIGHT'
  | 'DELETE_TABLE'
  | 'MAKE_ROW_HEADER'
  | 'REMOVE_ROW_HEADER'
  | 'MAKE_COL_HEADER'
  | 'REMOVE_COL_HEADER';

interface CustomDropdownCellNodeProps {
  coords: [number, number];
  updateTableNode: (fn: (tableNode: TableNode) => void) => void;
}

export function CustomDropdownCellNode(props: CustomDropdownCellNodeProps) {
  const {
    coords: [column, row],
    updateTableNode,
  } = props;

  const onSelect = (selection: DropdownActionOption<TableAction>) => {
    return match(selection.data)
      .with('MAKE_COL_HEADER', () =>
        updateTableNode((tableNode) => {
          tableNode.updateColType(column, 'header');
        }),
      )
      .with('REMOVE_COL_HEADER', () =>
        updateTableNode((tableNode) => {
          tableNode.updateColType(column, 'normal');
        }),
      )
      .with('MAKE_ROW_HEADER', () =>
        updateTableNode((tableNode) => {
          tableNode.updateRowType(row, 'header');
        }),
      )
      .with('REMOVE_ROW_HEADER', () =>
        updateTableNode((tableNode) => {
          tableNode.updateRowType(row, 'normal');
        }),
      )
      .with('DELETE_COLUMN', () =>
        updateTableNode((tableNode) => {
          tableNode.deleteColumnAt(column);
        }),
      )
      .with('DELETE_ROW', () =>
        updateTableNode((tableNode) => {
          tableNode.deleteRowAt(row);
        }),
      )
      .with('INSERT_COLUMN_LEFT', () =>
        updateTableNode((tableNode) => {
          tableNode.insertColumnAt(column);
        }),
      )
      .with('INSERT_COLUMN_RIGHT', () =>
        updateTableNode((tableNode) => {
          tableNode.insertColumnAt(column + 1);
        }),
      )
      .with('INSERT_ROW_ABOVE', () =>
        updateTableNode((tableNode) => {
          tableNode.insertRowAt(row);
        }),
      )
      .with('INSERT_ROW_BELOW', () =>
        updateTableNode((tableNode) => {
          tableNode.insertRowAt(row + 1);
        }),
      )
      .with('DELETE_TABLE', () =>
        updateTableNode((tableNode) => {
          tableNode.remove();
        }),
      )
      .with(undefined, () => {
        throw new Error('Unexpected option without data');
      })
      .exhaustive();
  };

  return (
    <Dropdown<TableAction>
      className="absolute top-0 right-0 mr-2"
      noDefaultButtonStyle
      pointerDownForAction
      onSelect={onSelect}
      options={[
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.makeColHeader" />
            ),
            data: 'MAKE_COL_HEADER',
          },
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.removeColHeader" />
            ),
            data: 'REMOVE_COL_HEADER',
          },
        ],
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.makeRowHeader" />
            ),
            data: 'MAKE_ROW_HEADER',
          },
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.removeRowHeader" />
            ),
            data: 'REMOVE_ROW_HEADER',
          },
        ],
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.insertRowAbv" />
            ),
            data: 'INSERT_ROW_ABOVE',
          },
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.insertRowBlv" />
            ),
            data: 'INSERT_ROW_BELOW',
          },
        ],
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.insertColLeft" />
            ),
            data: 'INSERT_COLUMN_LEFT',
          },
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.insertColRight" />
            ),
            data: 'INSERT_COLUMN_RIGHT',
          },
        ],
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.deleteCol" />
            ),
            data: 'DELETE_COLUMN',
          },
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.deleteRow" />
            ),
            data: 'DELETE_ROW',
          },
        ],
        [
          {
            type: 'action',
            label: (
              <TranslationsText textKey="richtext.toolbar.table.menu.deleteTable" />
            ),
            data: 'DELETE_TABLE',
          },
        ],
      ]}
      side="right"
    />
  );
}
