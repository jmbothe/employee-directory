import React, { Dispatch, SetStateAction } from "react";
import useHandleSearchChange from "../hooks/useHandleSearchChange";

interface SearchInputProps {
  setIsReceivingInput: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput({ setIsReceivingInput }: SearchInputProps) {
  const { inputValue, handleSearchChange } = useHandleSearchChange(
    setIsReceivingInput
  );

  return (
    <section className="search-input">
      <label>
        <div className="search-input__label">Search by name</div>
        <input type="text" value={inputValue} onChange={handleSearchChange} />
      </label>
    </section>
  );
}
