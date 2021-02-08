import { ReactElement, useState } from 'react';

import { HorizontalNavigation } from '@/components/tailwind-ui';

import Computed from './computed/Computed';
import GHSFull from './ghs/full/GHSFull';
import GHS from './ghs/summary/GHS';

const tabs = [
  { value: 'ghs', label: 'GHS' },
  { value: 'ghsFull', label: 'GHS Detailed' },
  { value: 'computed', label: 'Computed' },
];

export default function Panels(props: any) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  let panel: ReactElement;
  switch (selectedTab.value) {
    case 'ghs':
      panel = <GHS ghs={props.data.ghs} />;
      break;
    case 'ghsFull':
      panel = <GHSFull ghsFull={props.data.getGHS()} />;
      break;
    case 'computed':
      panel = <Computed computed={props.data.computed} />;
      break;
    default:
      throw Error('Panels.tsx unreachable');
  }

  return (
    <div>
      <HorizontalNavigation
        options={tabs}
        selected={selectedTab}
        //@ts-ignore
        onSelect={setSelectedTab}
      />
      {panel}
    </div>
  );
}
