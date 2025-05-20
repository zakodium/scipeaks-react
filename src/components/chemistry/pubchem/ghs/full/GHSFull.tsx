import HStatementsTableFull from './HStatementsTableFull';
import PStatementsTableFull from './PStatementsTableFull';
import PictogramsTableFull from './PictogramsTableFull';

export default function GHSFull(props: {
  ghsFull: {
    pStatements: any[];
    hStatements: any[];
    pictograms: any[];
  };
}) {
  const ghsFull = props.ghsFull;
  return (
    <div className="max-w-md">
      <p className="mt-4 text-3xl">Pictograms</p>
      <PictogramsTableFull pictograms={ghsFull.pictograms} />
      <p className="mt-4 text-3xl">Hazard Statements</p>
      <PStatementsTableFull pStatements={ghsFull.hStatements} />
      <p className="mt-4 text-3xl">Precautionary Statements</p>
      <HStatementsTableFull hStatements={ghsFull.pStatements} />
    </div>
  );
}
