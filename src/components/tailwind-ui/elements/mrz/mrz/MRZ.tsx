import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Details, ParseResult } from 'mrz';
import { parse } from 'mrz';
import { useMemo, useState } from 'react';

import { TranslationsText } from '../../../internationalization/TranslationsText';
import { Tooltip } from '../../floating-ui/tooltip/Tooltip';

export interface MRZProps {
  /**
   * MRZ code
   */
  mrz: string | string[];
  /**
   * option to activate the autocorrection of the characters when is possible
   * @default false
   */
  autocorrect?: boolean;
  /**
   * Only show the details table about the errors or autocorrected values.
   * If the MRZ has no errors or autocorrected values, the table is not shown.
   */
  describeErrorsOnly?: boolean;
}

export function MRZ(props: MRZProps) {
  const { mrz, autocorrect = false, describeErrorsOnly = false } = props;

  const [hovered, setHovered] = useState<Details[]>([]);

  const { lines, parsedMrz, details } = useMemo(() => {
    const lines = typeof mrz === 'string' ? mrz.split(/[\n\r]+/) : mrz;
    const parsedMrz = parse(lines, { autocorrect });
    const details = describeErrorsOnly
      ? parsedMrz.details.filter(
          (detail) => Boolean(detail.error) || detail.autocorrect.length > 0,
        )
      : parsedMrz.details;
    return { lines, parsedMrz, details };
  }, [mrz, autocorrect, describeErrorsOnly]);

  return (
    <div>
      <div className="inline-block rounded-md border px-7 py-2 font-ocrb">
        {lines.map((line, i) => (
          <MRZLine
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={i}
            line={line}
            parsedMrz={parsedMrz}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      {details.length > 0 && (
        <table className="mt-4">
          <thead>
            <tr>
              <th className="border px-5 py-2">
                <TranslationsText textKey="mrz.table.name" />
              </th>
              <th className="border px-5 py-2">
                <TranslationsText textKey="mrz.table.value" />
              </th>
            </tr>
          </thead>
          <tbody className="cursor-default">
            {details.map((detailsItem) => {
              const { label, field, value, valid, error, autocorrect } =
                detailsItem;
              const hoveredIndex = hovered.findIndex(
                (detail) => detail.label === label,
              );
              return (
                <tr
                  key={label}
                  className={clsx({
                    'bg-primary-300': hoveredIndex === 0,
                    'bg-neutral-300': hoveredIndex > 0,
                  })}
                  onMouseEnter={() => setHovered([detailsItem])}
                  onMouseLeave={() => setHovered([])}
                >
                  <td className="border px-3 py-1">
                    <div className="flex flex-row items-center justify-between">
                      <TranslationsText
                        textKey={`mrz.${field || 'separator'}`}
                      />
                      {autocorrect.length === 0 ? null : (
                        <Tooltip
                          content={
                            <TranslationsText
                              textKey="mrz.tooltip.correction"
                              values={{ corrections: autocorrect.length }}
                            />
                          }
                        >
                          <ExclamationCircleIcon className="ml-5 size-5 text-danger-600" />
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="border px-3 py-1">
                    {valid && value}
                    {error && (
                      <span className="text-sm font-bold text-danger-500">
                        {error}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

interface MRZLineProps {
  index: number;
  line: string;
  parsedMrz: ParseResult;
  hovered: Details[];
  setHovered: (newHover: Details[]) => void;
}

function MRZLine(props: MRZLineProps) {
  const { index, line, parsedMrz, hovered, setHovered } = props;
  const chars = line.split('');
  return (
    <div>
      {chars.map((char, j) => {
        const details = parsedMrz.details.filter(
          (detail) =>
            detail.line === index && detail.start <= j && detail.end > j,
        );
        return details.length > 0 ? (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={j}
            className={clsx(
              'cursor-pointer',
              getCharacterColor(index, j, details, hovered),
            )}
            onMouseEnter={() => {
              setHovered(details.slice().sort(sortBySpecificity));
            }}
            onMouseLeave={() => setHovered([])}
          >
            {char}
          </span>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={j}>{char}</span>
        );
      })}
    </div>
  );
}

function getCharacterColor(
  /**
   * Row index of the character in the MRZ.
   */
  lineIndex: number,
  /**
   * Column index of the character in the MRZ.
   */
  charIndex: number,
  /**
   * List of details to which the character belongs.
   */
  details: Details[],
  /**
   * Details that are currently hovered.
   */
  hoveredDetails: Details[],
): string | undefined {
  const isCorrected = details.some((detail) =>
    detail.autocorrect.some(
      (correction) =>
        correction.line === lineIndex && correction.column === charIndex,
    ),
  );

  const isValid = details.every((detail) => detail.valid);
  const ownHoveredDetails = hoveredDetails.filter((detail) =>
    details.includes(detail),
  );

  if (ownHoveredDetails.length > 0) {
    if (ownHoveredDetails[0] === hoveredDetails[0]) {
      return 'bg-primary-300';
    } else {
      return 'bg-neutral-300';
    }
  } else if (isCorrected) {
    return 'bg-warning-300';
  } else if (isValid) {
    return 'bg-success-300';
  } else {
    return 'bg-danger-300';
  }
}

function sortBySpecificity(a: Details, b: Details): -1 | 0 | 1 {
  if (a.line === b.line) {
    if (a.start >= b.start && a.end <= b.end) {
      // A char range included within another should be before it
      return -1;
    } else if (a.start <= b.start && a.end >= b.end) {
      // A char range including another should be after it
      return 1;
    } else if (a.start < b.start) {
      // Elements that start first should be first
      return -1;
    } else if (a.end > b.end) {
      // Elements that end last should be last
      return 1;
    }
    // Unreachable
    return 0;
  } else if (a.line < b.line) {
    return -1;
  }
  return 1;
}
