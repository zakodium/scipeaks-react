import { ReactElement, useState } from 'react';

import { HorizontalNavigation } from '@/components/tailwind-ui';

import GHS from './ghs/GHS';

const tabs = [
  { value: 'ghs', label: 'GHS' },
  { value: 'computed', label: 'Computed' },
];

export default function Full(props: any) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  let panel: ReactElement;
  switch (selectedTab.value) {
    case 'ghs':
      panel = <GHS ghs={props.data.ghs} />;
      break;
    case 'computed':
      panel = <div>Computed</div>;
      break;
    default:
      throw Error('Full.tsx unreachable');
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
