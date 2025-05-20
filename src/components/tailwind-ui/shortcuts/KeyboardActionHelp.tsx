import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useMemo, useState } from 'react';
import type { KbsDefinition, KbsKeyDefinition, KbsShortcut } from 'react-kbs';
import { useKbsGlobal, useKbsGlobalList } from 'react-kbs';

import { Table, Td } from '../lists/table/Table';
import { DialogBody, DialogRoot, DialogTitle } from '../overlays/dialog/Dialog';
import { commandKeyExists } from '../util';

export interface KeyboardActionHelpProps {
  shortcut?: KbsKeyDefinition;
}

const defaultShortcut = { key: '?' };

export function KeyboardActionHelp(props: KeyboardActionHelpProps) {
  const { shortcut = defaultShortcut } = props;
  const [isOpen, setIsOpen] = useState(false);

  const helpActions = useMemo<KbsDefinition[]>(() => {
    return [
      {
        shortcut,
        meta: {
          description: 'Show this documentation',
        },
        handler: () => setIsOpen(true),
      },
    ];
  }, [setIsOpen, shortcut]);

  useKbsGlobal(helpActions);

  const actions = useKbsGlobalList();
  const shortcuts = actions.map((shortcut, index) => ({
    id: index,
    ...shortcut,
  }));

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
      icon={<InformationCircleIcon />}
      iconColor="primary"
      noDescription
    >
      <DialogTitle>Keyboard shortcut documentation</DialogTitle>
      <DialogBody>
        <Table data={shortcuts} renderTr={Tr} />
      </DialogBody>
    </DialogRoot>
  );
}

function Tr(value: KbsShortcut) {
  return (
    <tr>
      <Td className="flex flex-row gap-1">
        <KbdLine kbs={value.shortcut} />
        {value.aliases.length > 0 ? ',' : ''}

        {value.aliases.map((alias, index) => (
          <Fragment key={'key' in alias ? alias.key : alias.code}>
            <KbdLine kbs={alias} />
            {index < value.aliases.length - 1 ? ',' : ''}
          </Fragment>
        ))}
      </Td>
      <Td align="right">{value.meta?.description}</Td>
    </tr>
  );
}

interface KbdLineProps {
  kbs: KbsKeyDefinition;
}

function KbdLine(props: KbdLineProps) {
  const { kbs } = props;
  return (
    <kbd className="text-sm leading-3 font-light text-neutral-700">
      {kbs.ctrl && renderModifierKey('ctrl')}
      {kbs.alt && renderModifierKey('alt')}
      {kbs.shift && renderModifierKey('shift')}
      {keyToLabel('key' in kbs ? kbs.key : kbs.code)}
    </kbd>
  );
}

// Correct alignment for some keys that render too high otherwise and use smaller
// gap than with plain text.
const modifierMap = {
  ctrl: <span className="mr-0.5 align-text-bottom">⌘</span>,
  alt: <span className="mr-0.5 align-text-bottom">⌥</span>,
  shift: <span className="mr-0.5">⇧</span>,
};

function renderModifierKey(key: 'ctrl' | 'alt' | 'shift') {
  if (commandKeyExists) {
    return modifierMap[key];
  } else {
    return `${key} `;
  }
}

function keyToLabel(key: string): string {
  switch (key) {
    case 'arrowleft':
      return '←';
    case 'arrowright':
      return '→';
    case 'arrowup':
      return '↑';
    case 'arrowdown':
      return '↓';
    default:
      return key;
  }
}
