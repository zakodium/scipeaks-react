import { Tab, Tabs } from '@blueprintjs/core';

import Computed from './computed/Computed.js';
import Experimental from './experimental/Experimental.js';
import GHSFull from './ghs/full/GHSFull.js';
import GHS from './ghs/summary/GHS.js';
import Identifiers from './identifiers/Identifiers.js';

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
