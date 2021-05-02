import debounce from "lodash.debounce";
import { stringify } from "query-string";
import {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useHistory } from "react-router-dom";
import useRuntime from "../runtime/useRuntime";
import useQueryString from "./useQueryString";

interface HandleSearchChangeState {
  handleSearchChange: ChangeEventHandler<HTMLInputElement>;
  inputValue: string;
}

export default function useHandleSearchChange(
  setIsReceivingInput: Dispatch<SetStateAction<boolean>>
): HandleSearchChangeState {
  const { push } = useHistory();
  const { getAppConfig } = useRuntime();
  const { textInputDebounce } = getAppConfig();
  const { searchValue } = useQueryString();
  const [inputValue, setInputValue] = useState(searchValue);

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

  const handleSearchChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      setIsReceivingInput(true);
      setInputValue(event.target.value);
      debouncedPush(event.target.value);
    },
    [debouncedPush, setIsReceivingInput]
  );

  return { inputValue, handleSearchChange };
}
