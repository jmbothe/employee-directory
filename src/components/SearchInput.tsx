import React, {useCallback, ChangeEvent} from "react";

interface SearchInputProps {
    searchValue: string;
    setSearchValue(value: string): void;
}

export default function SearchInput({
    searchValue,
    setSearchValue
}: SearchInputProps) {
    const handleChange = useCallback(
        function (event: ChangeEvent<HTMLInputElement>) {
            setSearchValue(event.target.value);
        },
        [setSearchValue]
    );

    return (
        <label>
            <span>Search employees by name</span>
            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
            />
        </label>
    )
}