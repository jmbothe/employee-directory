import { stringify } from "query-string";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

interface PaginationProps {
  pageValue: number;
  pageCount: number;
  searchValue: string;
  isVisible: boolean;
}

export default function Pagination({
  pageValue,
  pageCount,
  searchValue,
  isVisible,
}: PaginationProps) {
  const { push } = useHistory();

  const handleButtonClick = useCallback(
    function (event): void {
      const search = stringify({
        page: event.target.value,
        name: searchValue,
      });

      push({ search });
    },
    [push, searchValue]
  );

  if (pageCount <= 0 || !isVisible) {
    return null;
  }

  return (
    <section>
      <h3>
        Page {pageValue} of {pageCount}
      </h3>
      <button
        aria-label="show previous page"
        // TODO: accessible button disabling
        disabled={pageValue < 2}
        value={pageValue - 1}
        onClick={handleButtonClick}
      >
        {"< prev"}
      </button>
      <button
        aria-label="show next page"
        // TODO: accessible button disabling
        disabled={pageValue >= pageCount}
        value={pageValue + 1}
        onClick={handleButtonClick}
      >
        {"next >"}
      </button>
    </section>
  );
}
