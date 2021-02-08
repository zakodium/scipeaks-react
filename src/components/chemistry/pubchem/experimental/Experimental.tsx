import Bp from '../Bp';
import LowHighUnits from '../LowHighUnits';

import OnePropertyTable from './OnePropertyTable';

export default function Experimental(props: { experimental: any }) {
  const { experimental } = props;

  const components = [];
  for (let key in experimental) {
    let parsedRenderer = LowHighUnits;
    switch (key) {
      case 'boilingPoint':
        parsedRenderer = Bp;
        break;
      default:
    }
    components.push(
      <div>
        <div>{key}</div>
        <OnePropertyTable
          parsedRenderer={parsedRenderer}
          data={experimental[key]}
        />
      </div>,
    );
  }

  return <div>{components}</div>;
}
