export default function LowHighUnits(props: {
  data: {
    low: number;
    high: number;
    units: string;
  };
}) {
  if (!props.data?.low) return <></>;

  const { low, high, units } = props.data;

  return (
    <span>
      {low.toPrecision(3)}
      {high && `-${high.toPrecision(3)}`}
      {units && units}
    </span>
  );
}
