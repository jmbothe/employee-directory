import { debounce } from "lodash";
import { stringify } from "query-string";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useHistory } from "react-router";

interface SearchInputProps {
  searchValue?: string;
  isLoadingResults: boolean;
}

export default function SearchInput({
  searchValue,
  isLoadingResults,
}: SearchInputProps) {
  const { push } = useHistory();
  const [inputValue, setInputValue] = useState(searchValue);
  const [isSearching, setIsSearching] = useState(false);

  // Set input value to query param value on browser back/forward nav.
  // TODO: Sync with PM/UX/Devs/whoever to discuss whether this is actually a good pattern.
  useEffect(() => setInputValue(searchValue), [searchValue]);

  // Prevent fetching list of employees on every key stroke.
  const debouncedPush = useMemo(
    () => debounce(function (name: string) {
      push({ search: stringify({ name }) });
      setIsSearching(false);
    }, 500),
    [push]
  );

  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>) {
      // Immediately signal to user that search is in progress, even though data fetching is debounced.
      setIsSearching(true);
      setInputValue(event.target.value);
      debouncedPush(event.target.value);
    },
    [debouncedPush]
  );

  return (
    <>
      <label>
        <span>Search employees by name</span>
        <input
          type="text"
          value={inputValue || ""}
          onChange={handleChange}
        />
        {(isSearching || isLoadingResults) && "loading..."}
      </label>
    </>
  );
}
