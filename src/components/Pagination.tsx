import classNames from "classnames";
import React from "react";
import useHandlePagination from "../hooks/useHandlePagination";
import useQueryString from "../hooks/useQueryString";

interface PaginationProps {
  pageCount: number;
  willLoadResults: boolean;
  isLoadingResults: boolean;
  isReceivingInput: boolean;
  isEmptyResults: boolean;
}

export default function Pagination({
  pageCount,
  willLoadResults,
  isLoadingResults,
  isReceivingInput,
  isEmptyResults
}: PaginationProps) {
  const { pageValue } = useQueryString();
  const handlePagination = useHandlePagination(pageCount);

  const buttonClassName = "pagination__button";
  const disabledButtonClassName = "pagination__button--disabled";
  const isDisabledPrev = pageValue < 2 || willLoadResults;
  const isDisabledNext = pageValue >= pageCount || willLoadResults;

  const messageText = (isReceivingInput || willLoadResults)
  ? "Searching..."
  : isEmptyResults
    ? "Sorry, no results. Try expanding your search criteria."
    : `Page ${pageValue} of ${pageCount}`;

  const loadingSpinner = (isReceivingInput || willLoadResults || isLoadingResults) && (
    <div className="loading-spinner" />
  );

  return (
    <section className="pagination">
      <button
        aria-label="show previous page"
        aria-disabled={isDisabledPrev}
        className={classNames({
          [buttonClassName]: true,
          [disabledButtonClassName]: isDisabledPrev,
        })}
        value={pageValue - 1}
        onClick={handlePagination}
      >
        {"< prev"}
      </button>
      <button
        aria-label="show next page"
        aria-disabled={isDisabledNext}
        className={classNames({
          [buttonClassName]: true,
          [disabledButtonClassName]: isDisabledNext,
        })}
        value={pageValue + 1}
        onClick={handlePagination}
      >
        {"next >"}
      </button>
      <p className="employee-table__message">
        {messageText}
      </p>
      {loadingSpinner}
    </section>
  );
}
