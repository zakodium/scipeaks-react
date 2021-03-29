import Reference from '../../Reference';
import PStatementsTable from '../summary/HStatementsTable';

export default function PStatementsTableFull(props: {
  pStatements: Array<any>;
}) {
  const { pStatements } = props;
  if (!pStatements || pStatements.length === 0) {
    return <>No precautionary statements found.</>;
  } else {
    return (
      <div>
        {pStatements.map((pStatements) => (
          <div
            className="pt-5"
            key={pStatements.reference.sourceName + pStatements.reference.name}
          >
            <Reference reference={pStatements.reference} />
            <PStatementsTable hStatements={pStatements.data} />
          </div>
        ))}
      </div>
    );
  }
}
