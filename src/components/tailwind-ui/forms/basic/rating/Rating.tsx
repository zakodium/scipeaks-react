import { StarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Dispatch, FocusEventHandler, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useInputId } from '../../../hooks/useInputId';
import type { Color } from '../../../types';
import type { HelpPublicProps } from '../common';
import { Help, Label } from '../common';

export interface RatingProps {
  id?: string;
  name?: string;
  label: string;
  required?: boolean;
  help?: HelpPublicProps['help'];
  error?: HelpPublicProps['error'];
  value: number;

  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (value: number) => void;

  /**
   * Number of stars to display
   */
  starCount: number;

  /**
   * Color of the stars
   */
  color?: Color;
}

export function Rating(props: RatingProps) {
  const {
    name,
    label,
    required = false,
    help,
    value,
    onChange,
    error,
    starCount,
    color = 'warning',
    id,
    onBlur,
  } = props;

  const finalId = useInputId(id, name);
  const [hover, setHover] = useState<number>(0);

  const onClick = useCallback(
    (value: number) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className="group space-y-1">
      <Label className="w-fit" text={label} required={required} id={finalId} />

      <input
        id={finalId}
        required={required}
        name={name}
        type="range"
        min={1}
        max={starCount}
        step={1}
        value={value}
        onBlur={(event) => {
          onBlur?.(event);
          setHover(0);
        }}
        className="sr-only"
        onChange={(event) => onChange(Number.parseInt(event.target.value, 10))}
      />

      {/* 38px is the height of a classic <Input /> */}
      <label
        htmlFor={finalId}
        className="flex h-[38px] w-fit flex-row items-center gap-3 rounded-sm group-has-focus-visible:outline group-has-focus-visible:-outline-offset-1 group-has-focus-visible:outline-primary-500"
        onMouseLeave={() => setHover(0)}
      >
        {Array.from({ length: starCount }, (_, index) => (
          <RatingStar
            color={color}
            key={index}
            index={index}
            starValue={index + 1}
            ratingValue={value}
            hover={hover}
            setHover={setHover}
            onClick={onClick}
          />
        ))}
      </label>

      <Help help={help} error={error} noMargin />
    </div>
  );
}

interface RatingStarProps {
  index: number;
  starValue: number;
  ratingValue: number | null;
  color: Color;

  hover: number;
  setHover: Dispatch<SetStateAction<number>>;
  onClick: (value: number) => void;
}

function RatingStar(props: RatingStarProps) {
  const { index, starValue, ratingValue, hover, color, setHover, onClick } =
    props;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  const onSelect = useCallback(() => {
    onClick(starValue);
    setHover(0);
    setIsAnimating(true);
  }, [onClick, setHover, starValue]);

  return (
    <div key={index} className="relative">
      {/* Display a pulse when clicking on a star */}
      {starValue === ratingValue && isAnimating && (
        <StarIcon
          className={clsx(
            'absolute size-6 animate-ping',
            ratingStarColors[color],
          )}
        />
      )}

      <StarIcon
        id={`rating-star-${index}`}
        onMouseOver={() => setHover(starValue)}
        onClick={onSelect}
        className={clsx(
          'size-6 cursor-pointer text-neutral-400',
          hover > 0
            ? hover >= starValue && ratingStarColors[color]
            : ratingValue &&
                starValue <= ratingValue &&
                ratingStarColors[color],
        )}
      />
    </div>
  );
}

const ratingStarColors: Record<Color, string> = {
  primary: 'fill-primary-200 text-primary-500',
  warning: 'fill-warning-200 text-warning-500',
  alternative: 'fill-alternative-200 text-alternative-500',
  danger: 'fill-danger-200 text-danger-500',
  neutral: 'fill-neutral-200 text-neutral-500',
  success: 'fill-success-200 text-success-500',
};
