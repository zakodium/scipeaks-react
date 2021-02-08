import Reference from '../../Reference';
import PictogramsTable from '../summary/PictogramsTable';

export default function PictogramsTableFull(props: { pictograms: Array<any> }) {
  const { pictograms } = props;
  return (
    <div>
      {pictograms.map((pictograms) => (
        <div className="pt-5" key={pictograms.reference.sourceName}>
          <Reference reference={pictograms.reference} />
          <PictogramsTable pictograms={pictograms.data} />
        </div>
      ))}
    </div>
  );
}
