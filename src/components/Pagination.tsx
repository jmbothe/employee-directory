import { stringify } from "query-string";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./Pagination.css";

interface PaginationProps {
  pageValue: number;
  pageCount: number;
  searchValue: string;
}

export default function Pagination({
  pageValue,
  pageCount,
  searchValue,
}: PaginationProps) {
  const { push } = useHistory();

  const handleButtonClick = useCallback(
    function ({ target }): void {
      const { value } = target;

      // bail if update would cause navigate out of page bounds.
      // Need this because button is accessibly disabled.
      if (value > pageCount || value < 1) {
        return;
      }

      const search = stringify({
        page: value,
        name: searchValue,
      });

      push({ search });
    },
    [push, searchValue, pageCount]
  );

  const disabledClassName = "pagination-button--disabled";
  const isDisabledPrev = pageValue < 2;
  const isDisabledNext = pageValue >= pageCount;

  return (
    <section>
      <button
        aria-label="show previous page"
        aria-disabled={isDisabledPrev}
        className={isDisabledPrev ? disabledClassName : ""}
        value={pageValue - 1}
        onClick={handleButtonClick}
      >
        {"< prev"}
      </button>
      <button
        aria-label="show next page"
        aria-disabled={isDisabledNext}
        className={isDisabledNext ? disabledClassName : ""}
        value={pageValue + 1}
        onClick={handleButtonClick}
      >
        {"next >"}
      </button>
    </section>
  );
}
