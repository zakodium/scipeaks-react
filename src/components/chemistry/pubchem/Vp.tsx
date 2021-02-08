export default function Vp(props: {
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
  if (!props.data?.pressure?.low) return <></>;
  const { temperature, pressure } = props.data;

  let pressureLow =
    String(pressure.low).length > 10
      ? pressure.low.toPrecision(4)
      : pressure.low;

  let pressureHigh =
    String(pressure.high).length > 10
      ? pressure.high.toPrecision(4)
      : pressure.high;

  return (
    <span>
      {pressureLow}
      {pressureHigh && `-${pressureHigh}`}
      {pressure.units && ` ${pressure.units}`}
      {temperature &&
        temperature.low &&
        ` (${temperature.low} ${temperature.units})`}
    </span>
  );
}
