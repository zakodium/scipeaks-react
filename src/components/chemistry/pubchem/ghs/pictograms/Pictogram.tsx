import GHS1 from './GHS1.js';
import GHS2 from './GHS2.js';
import GHS3 from './GHS3.js';
import GHS4 from './GHS4.js';
import GHS5 from './GHS5.js';
import GHS6 from './GHS6.js';
import GHS7 from './GHS7.js';
import GHS8 from './GHS8.js';
import GHS9 from './GHS9.js';

const GHS = [GHS1, GHS2, GHS3, GHS4, GHS5, GHS6, GHS7, GHS8, GHS9];

export default function Pictogram(props: { code: string }) {
  const code = props.code.replaceAll(/[^1-9]/g, '');

  const Component = GHS[Number(code) - 1];

  return (
    <div style={{ width: 50, height: 50 }}>
      {Component ? (
        <Component />
      ) : (
        <div>Pictogram not found for code {code}</div>
      )}
    </div>
  );
}
