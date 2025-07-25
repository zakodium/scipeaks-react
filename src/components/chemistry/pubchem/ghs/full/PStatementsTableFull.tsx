import Reference from '../../Reference.js';
import PStatementsTable from '../summary/PStatementsTable.js';

export default function PStatementsTableFull(props: { pStatements: any[] }) {
  const { pStatements } = props;
  if (!pStatements || pStatements.length === 0) {
    return 'No precautionary statements found.';
  } else {
    return (
      <div>
        {pStatements.map((pStatements) => (
          <div
            className="pt-5"
            key={pStatements.reference.sourceName + pStatements.reference.name}
          >
            <Reference reference={pStatements.reference} />
            <PStatementsTable pStatements={pStatements.data} />
          </div>
        ))}
      </div>
    );
  }
}
