import HStatementsTable from './HStatementsTable';
import PStatementsTable from './PStatementsTable';
import PictogramsTable from './PictogramsTable';

export default function GHS(props: any) {
  const ghs = props.ghs;
  return (
    <div className="max-w-md">
      <p className="py-4 text-3xl">Pictograms</p>
      <PictogramsTable pictograms={ghs.pictograms} />
      <p className="py-4 text-3xl">Hazard statements</p>
      <HStatementsTable hStatements={ghs.hStatements} />
      <p className="py-4 text-3xl">Precautionary statements</p>
      <PStatementsTable pStatements={ghs.pStatements} />
    </div>
  );
}
