import BpTable from './BpTable';
import FlashPointTable from './FlashPointTable';
import MpTable from './MpTable';
import SolubilityTable from './SolubilityTable';
import VaporPressureTable from './VaporPressureTable';

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
