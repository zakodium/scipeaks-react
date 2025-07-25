import HStatementsTableFull from './HStatementsTableFull.js';
import PStatementsTableFull from './PStatementsTableFull.js';
import PictogramsTableFull from './PictogramsTableFull.js';

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
      <HStatementsTableFull hStatements={ghsFull.hStatements} />
      <p className="mt-4 text-3xl">Precautionary Statements</p>
      <PStatementsTableFull pStatements={ghsFull.pStatements} />
    </div>
  );
}
