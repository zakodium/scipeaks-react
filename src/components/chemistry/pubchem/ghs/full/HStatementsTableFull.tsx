import Reference from '../../Reference.js';
import HStatementsTable from '../summary/HStatementsTable.js';

export default function HStatementsTableFull(props: { hStatements: any[] }) {
  const { hStatements } = props;
  if (!hStatements || hStatements.length === 0) {
    return 'No hazard statements found.';
  } else {
    return (
      <div>
        {hStatements.map((hStatements) => (
          <div className="pt-5" key={hStatements.reference + hStatements.name}>
            <Reference reference={hStatements.reference} />
            <HStatementsTable hStatements={hStatements.data} />
          </div>
        ))}
      </div>
    );
  }
}
