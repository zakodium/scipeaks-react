import HStatementsTable from './HStatementsTable';
import PStatementsTable from './PStatementsTable';
import PictogramsTable from './PictogramsTable';

export default function GHS(props: any) {
  const ghs = props.ghs;
  console.log(ghs);
  return (
    <div className="max-w-md">
      <PictogramsTable pictograms={ghs.pictograms} />
      <HStatementsTable hStatements={ghs.hStatements} />
      <PStatementsTable pStatements={ghs.pStatements} />
    </div>
  );
}
