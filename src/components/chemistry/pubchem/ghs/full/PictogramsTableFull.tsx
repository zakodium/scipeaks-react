import Reference from '../../Reference.js';
import PictogramsTable from '../summary/PictogramsTable.js';

export default function PictogramsTableFull(props: { pictograms: any[] }) {
  const { pictograms } = props;
  if (!pictograms || pictograms.length === 0) {
    return 'No GHS pictograms found.';
  } else {
    return (
      <div>
        {pictograms.map((pictograms) => (
          <div
            className="pt-5"
            key={pictograms.reference.sourceName + pictograms.reference.name}
          >
            <Reference reference={pictograms.reference} />
            <PictogramsTable pictograms={pictograms.data} />
          </div>
        ))}
      </div>
    );
  }
}
