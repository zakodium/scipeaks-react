import { ReactElement, useState } from 'react';

import {
  HorizontalNavigation,
  HorizontalNavigationOption,
} from '@/components/tailwind-ui';

import Computed from './computed/Computed';
import Experimental from './experimental/Experimental';
import GHSFull from './ghs/full/GHSFull';
import GHS from './ghs/summary/GHS';

const tabs: HorizontalNavigationOption[] = [
  { value: 'ghs', label: 'GHS' },
  { value: 'ghsFull', label: 'GHS Detailed' },
  { value: 'computed', label: 'Computed' },
  { value: 'experimental', label: 'Experimental' },
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
    case 'experimental':
      panel = (
        <Experimental
          experimental={props.data.getExperimentalData({
            pressure: {
              targetUnits: 'mmHg',
            },
            temperature: {
              targetUnits: '°C',
            },
          })}
        />
      );
      break;
    default:
      throw Error('Panels.tsx unreachable');
  }

  return (
    <div>
      <HorizontalNavigation
        options={tabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      {panel}
    </div>
  );
}
