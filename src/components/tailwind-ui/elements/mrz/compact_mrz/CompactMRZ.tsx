import clsx from 'clsx';
import { parse } from 'mrz';
import type { ReactElement } from 'react';

import { Tooltip } from '../../floating-ui/tooltip/Tooltip';
import type { MRZProps } from '../mrz/MRZ';

export function CompactMRZ(props: MRZProps) {
  const { mrz } = props;
  const lines = typeof mrz === 'string' ? mrz.split(/[\n\r]+/) : mrz;
  const parsedMrz = parse(mrz, { autocorrect: true });

  function lineFields(i: number) {
    const line = lines[i];
    const result: ReactElement[] = [];
    const chars = line.split('');

    for (let j = 0; j < chars.length; j++) {
      const detail = parsedMrz.details.find(
        (detail) => detail.line === i && detail.start <= j && detail.end > j,
      );
      if (!detail) {
        result.push(<span key={`${i}-${j}`}>{chars[j]}</span>);
      } else {
        const target = (
          <span
            className={clsx('cursor-pointer hover:bg-primary-300', {
              'bg-success-300': detail.valid,
              'bg-danger-300': !detail.valid,
            })}
          >
            {chars.slice(j, detail.end).join('')}
          </span>
        );
        const content = (
          <div className="mr-3 flex justify-end py-1">
            <div className="">{detail.label} :</div>
            <div className="pl-3">
              {detail.valid && detail.value}
              {detail.error && (
                <span className="font-bold text-danger-500">
                  {detail.error}
                </span>
              )}
            </div>
          </div>
        );
        result.push(
          <Tooltip key={`${i}-${j}`} content={content}>
            <div className="inline">{target}</div>
          </Tooltip>,
        );
        j = detail.end - 1;
      }
    }
    return result;
  }

  return (
    <div className="inline-block rounded-md border px-7 py-2 font-ocrb">
      {lines.map((_, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            {lineFields(i)}
            <br />
          </div>
        );
      })}
    </div>
  );
}
