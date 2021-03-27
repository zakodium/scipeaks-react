import Reference from '../../Reference';
import HStatementsTable from '../summary/HStatementsTable';

export default function HStatementsTableFull(props: {
  hStatements: Array<any>;
}) {
  const { hStatements } = props;
  if (!hStatements || hStatements.length < 1) {
    return <>No hazard statements found.</>;
  } else {
    return (
      <div>
        {hStatements.map((hStatements) => (
          <div className="pt-5" key={hStatements.reference.sourceName}>
            <Reference reference={hStatements.reference} />
            <HStatementsTable hStatements={hStatements.data} />
          </div>
        ))}
      </div>
    );
  }
}
