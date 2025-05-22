import { Tab, Tabs } from '@blueprintjs/core';

import Computed from './computed/Computed';
import Experimental from './experimental/Experimental';
import GHSFull from './ghs/full/GHSFull';
import GHS from './ghs/summary/GHS';
import Identifiers from './identifiers/Identifiers';

export default function Panels(props: any) {
  return (
    <div className="px-2">
      <Tabs size="large" renderActiveTabPanelOnly>
        <Tab
          id="ghs"
          title="GHS"
          panel={<GHS ghs={props.data.compoundData.ghs} />}
        />
        <Tab
          id="ghsFull"
          title="GHS Detailed"
          panel={<GHSFull ghsFull={props.data.compoundData.getGHS()} />}
        />
        <Tab
          id="computed"
          title="Computed"
          panel={<Computed computed={props.data.compoundData.computed} />}
        />
        <Tab
          id="experimental"
          title="Experimental"
          panel={
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
          }
        />
        <Tab
          id="identifiers"
          title="Identifiers"
          panel={
            <Identifiers
              identifiers={props.data.compoundData.getIdentifiers()}
              cid={props.data.compound.getCID()}
            />
          }
        />
      </Tabs>
    </div>
  );
}
