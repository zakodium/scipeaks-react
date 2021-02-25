export default function Bp(props: {
  data: {
    temperature: {
      low: number;
      high: number;
      units: string;
    };
    pressure: {
      low: number;
      high: number;
      units: string;
    };
  };
}) {
  if (!props.data?.temperature?.low) return <></>;
  const { temperature, pressure } = props.data;

  return (
    <span>
      {temperature.low.toPrecision(3)}
      {temperature.high && `-${temperature.high.toPrecision(3)}`}
      {temperature.units && temperature.units}
      {pressure?.low && ` (${pressure.low} ${pressure.units})`}
    </span>
  );
}
