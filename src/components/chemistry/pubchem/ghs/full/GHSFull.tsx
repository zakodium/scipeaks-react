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
      <p className="text-3xl mt-4">Pictograms</p>
      <PictogramsTableFull pictograms={ghsFull.pictograms} />
      <p className="text-3xl mt-4">Hazard Statements</p>
      <PStatementsTableFull pStatements={ghsFull.pStatements} />
      <p className="text-3xl mt-4">Precautionary Statements</p>
      <HStatementsTableFull hStatements={ghsFull.hStatements} />
    </div>
  );
}
