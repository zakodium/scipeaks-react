import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { TranslationsText } from '../../internationalization/TranslationsText';
import type { Size } from '../../types';
import {
  ButtonGroup,
  ButtonGroupButton,
} from '../buttons/button_group/ButtonGroup';

import { ELLIPSIS, paginate } from './paginate';

export type PaginationPosition = 'center' | 'start' | 'end';

export interface PaginationProps {
  totalCount: number;
  page: number;
  itemsPerPage: number;
  onPageChange: (newPage: number, previousPage: number) => void;
  centerPagesPerSide?: number;
  boundaryPagesPerSide?: number;
  withText?: boolean;
  position?: PaginationPosition;
  className?: string;
  buttonSize?: Size;

  /**
   * @deprecated Prefer use ``TranslationsProvider``
   */
  renderText?: (
    currentPage: number,
    totalPages: number,
    totalCount: number,
  ) => ReactNode;
}

export function Pagination(props: PaginationProps) {
  const {
    totalCount,
    page,
    itemsPerPage,
    onPageChange,
    centerPagesPerSide = 1,
    boundaryPagesPerSide = 1,
    withText = false,
    position = 'center',
    buttonSize = 'medium',
    className,
    renderText,
  } = props;

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const { goPrevious, goNext, pages, goTo, canNavigate } = useMemo(() => {
    const goPrevious = () => onPageChange(page - 1, page);
    const goNext = () => onPageChange(page + 1, page);
    const goTo = (num: number) => onPageChange(num - 1, page);

    const { pages, canNavigate } = paginate(
      page + 1,
      totalPages,
      centerPagesPerSide,
      boundaryPagesPerSide,
    );

    return {
      goPrevious,
      goNext,
      goTo,
      pages,
      canNavigate,
    };
  }, [
    page,
    totalPages,
    onPageChange,
    centerPagesPerSide,
    boundaryPagesPerSide,
  ]);

  const prevDisabled = page === 0;
  const nextDisabled = page + 1 === totalPages;

  if (!canNavigate && !withText) {
    return null;
  }

  const displayNavigationButtons = pages.length > 1;

  return (
    <div
      className={clsx(
        'flex items-center',
        {
          'justify-between': withText,
          'justify-center': !withText && position === 'center',
          'justify-start': !withText && position === 'start',
          'justify-end': !withText && position === 'end',
        },
        className,
      )}
    >
      {withText && (
        <span className="text-sm text-neutral-700">
          {renderText ? (
            renderText(page + 1, totalPages, totalCount)
          ) : (
            <TranslationsText
              textKey="pagination.text"
              values={{
                actualPage: page + 1,
                totalPages,
                totalCount,
                SemiBold: (chunk) => {
                  return <span className="font-semibold">{chunk}</span>;
                },
              }}
            />
          )}
        </span>
      )}
      {canNavigate && displayNavigationButtons && (
        <nav className="inline-flex shadow-xs">
          <ButtonGroup size={buttonSize} variant="white">
            <ButtonGroupButton disabled={prevDisabled} onClick={goPrevious}>
              <TranslationsText textKey="pagination.previous" />
            </ButtonGroupButton>

            {pages.map((element, index) => {
              const isCurrentElement = element === page + 1;
              return (
                <ButtonGroupButton
                  // Exceptionally, we want the border to be neutral even when the button variant is secondary
                  className={clsx(
                    'min-w-12',
                    isCurrentElement && 'ring-neutral-300!',
                  )}
                  variant={isCurrentElement ? 'secondary' : 'white'}
                  key={element === ELLIPSIS ? `${ELLIPSIS}${index}` : element}
                  disabled={element === ELLIPSIS}
                  onClick={
                    element === ELLIPSIS ? undefined : () => goTo(element)
                  }
                >
                  {element}
                </ButtonGroupButton>
              );
            })}

            <ButtonGroupButton disabled={nextDisabled} onClick={goNext}>
              <TranslationsText textKey="pagination.next" />
            </ButtonGroupButton>
          </ButtonGroup>
        </nav>
      )}
    </div>
  );
}
