import { debounce } from "lodash";
import { stringify } from "query-string";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router";
import useRuntime from "../runtime/useRuntime";

interface SearchInputProps {
  searchValue: string;
  setIsReceivingInput(state: boolean): void;
}

export default function SearchInput({
  searchValue,
  setIsReceivingInput,
}: SearchInputProps) {
  const { push } = useHistory();
  const [inputValue, setInputValue] = useState(searchValue);
  const { getAppConfig } = useRuntime();
  const { textInputDebounce } = getAppConfig();

  // Set input value to query param value on browser back/forward nav.
  // TODO: Sync with PM/UX/Devs/whoever to discuss whether this is actually a good pattern.
  useEffect(() => setInputValue(searchValue), [searchValue]);

  // Prevent fetching list of employees on every key stroke.
  const debouncedPush = useMemo(
    function () {
      return debounce(function (name: string): void {
        const search = stringify({ name });

        setIsReceivingInput(false);
        push({ search });
      }, textInputDebounce);
    },
    [push, setIsReceivingInput, textInputDebounce]
  );

  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      setIsReceivingInput(true);
      setInputValue(event.target.value);
      debouncedPush(event.target.value);
    },
    [debouncedPush, setIsReceivingInput]
  );

  return (
    <>
      <label>
        <span>Search employees by name</span>
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
    </>
  );
}
