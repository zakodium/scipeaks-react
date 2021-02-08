import HStatementsTable from './HStatementsTable';
import PStatementsTable from './PStatementsTable';
import PictogramsTable from './PictogramsTable';

export default function GHS(props: any) {
  const ghs = props.ghs;
  return (
    <div className="max-w-md">
      <p className="text-3xl py-4">Pictograms</p>
      <PictogramsTable pictograms={ghs.pictograms} />
      <p className="text-3xl py-4">Hazard statements</p>
      <HStatementsTable hStatements={ghs.hStatements} />
      <p className="text-3xl py-4">Precautionary statements</p>
      <PStatementsTable pStatements={ghs.pStatements} />
    </div>
  );
}
