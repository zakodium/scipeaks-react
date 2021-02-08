import Reference from '../../Reference';
import HStatementsTable from '../summary/HStatementsTable';

export default function HStatementsTableFull(props: {
  hStatements: Array<any>;
}) {
  const { hStatements } = props;
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
