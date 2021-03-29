import Reference from '../../Reference';
import PictogramsTable from '../summary/PictogramsTable';

export default function PictogramsTableFull(props: { pictograms: Array<any> }) {
  const { pictograms } = props;
  if (!pictograms || pictograms.length === 0) {
    return <>No GHS pictograms found.</>;
  } else {
    console.log(pictograms);
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
