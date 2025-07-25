import BpTable from './BpTable.js';
import FlashPointTable from './FlashPointTable.js';
import MpTable from './MpTable.js';
import SolubilityTable from './SolubilityTable.js';
import VaporPressureTable from './VaporPressureTable.js';

export default function Experimental(props: { experimental: any }) {
  const { experimental } = props;
  return (
    <div>
      <BpTable data={experimental.boilingPoint} />
      <MpTable data={experimental.meltingPoint} />
      <FlashPointTable data={experimental.flashPoint} />
      <VaporPressureTable data={experimental.vaporPressure} />
      <SolubilityTable data={experimental.solubility} />
    </div>
  );
}
