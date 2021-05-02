import { stringify } from "query-string";
import { MouseEvent, MouseEventHandler, useCallback } from "react";
import { useHistory } from "react-router-dom";
import useQueryString from "./useQueryString";

// TODO: debounce to accommodate for aggressive button clicking.
export default function useHandlePagination(
  pageCount: number
): MouseEventHandler<HTMLButtonElement> {
  const { searchValue } = useQueryString();
  const { push } = useHistory();

  const handlePagination = useCallback(
    function ({ target }: MouseEvent<HTMLButtonElement>): void {
      // ts thinks button doesn't have a value attribute.
      // Seems to be some issue with picking up on lib.dom defs.
      // @ts-ignore
      const { value } = target;

      // bail if update would cause navigation out of page bounds.
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

  return handlePagination;
}
