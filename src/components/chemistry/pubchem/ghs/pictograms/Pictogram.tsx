import GHS1 from './GHS1';
import GHS2 from './GHS2';
import GHS3 from './GHS3';
import GHS4 from './GHS4';
import GHS5 from './GHS5';
import GHS6 from './GHS6';
import GHS7 from './GHS7';
import GHS8 from './GHS8';
import GHS9 from './GHS9';

const GHS = [GHS1, GHS2, GHS3, GHS4, GHS5, GHS6, GHS7, GHS8, GHS9];

export default function Pictogram(props: { code: string }) {
  const code = props.code.replace(/[^1-9]/g, '');

  const Component = GHS[Number(code) - 1];

  return (
    <div style={{ width: 50, height: 50 }}>
      <Component />
    </div>
  );
}
