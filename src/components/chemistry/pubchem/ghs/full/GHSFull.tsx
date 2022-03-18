import HStatementsTableFull from './HStatementsTableFull';
import PStatementsTableFull from './PStatementsTableFull';
import PictogramsTableFull from './PictogramsTableFull';

export default function GHSFull(props: {
  ghsFull: {
    pStatements: Array<any>;
    hStatements: Array<any>;
    pictograms: Array<any>;
  };
}) {
  const ghsFull = props.ghsFull;
  return (
    <div className="max-w-md">
      <p className="mt-4 text-3xl">Pictograms</p>
      <PictogramsTableFull pictograms={ghsFull.pictograms} />
      <p className="mt-4 text-3xl">Hazard Statements</p>
      <PStatementsTableFull pStatements={ghsFull.pStatements} />
      <p className="mt-4 text-3xl">Precautionary Statements</p>
      <HStatementsTableFull hStatements={ghsFull.hStatements} />
    </div>
  );
}
