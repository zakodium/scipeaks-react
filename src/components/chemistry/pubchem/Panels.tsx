import type { ReactElement } from 'react';
import { useState } from 'react';

import type { HorizontalNavigationOption } from '@/components/tailwind-ui';
import { HorizontalNavigation } from '@/components/tailwind-ui';

import Computed from './computed/Computed';
import Experimental from './experimental/Experimental';
import GHSFull from './ghs/full/GHSFull';
import GHS from './ghs/summary/GHS';
import Identifiers from './identifiers/Identifiers';

const tabs: Array<HorizontalNavigationOption<string>> = [
  { value: 'ghs', label: 'GHS' },
  { value: 'ghsFull', label: 'GHS Detailed' },
  { value: 'computed', label: 'Computed' },
  { value: 'experimental', label: 'Experimental' },
  { value: 'identifiers', label: 'Identifiers' },
];

export default function Panels(props: any) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  let panel: ReactElement;
  switch (selectedTab.value) {
    case 'ghs':
      panel = <GHS ghs={props.data.compoundData.ghs} />;
      break;
    case 'ghsFull':
      panel = <GHSFull ghsFull={props.data.compoundData.getGHS()} />;
      break;
    case 'computed':
      panel = <Computed computed={props.data.compoundData.computed} />;
      break;
    case 'experimental':
      panel = (
        <Experimental
          experimental={props.data.compoundData.getExperimentalData({
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
    case 'identifiers':
      panel = (
        <Identifiers
          identifiers={props.data.compoundData.getIdentifiers()}
          cid={props.data.compound.getCID()}
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
