import { FC, useRef } from "react";

import s from "../styles/components/searchForm.module.scss";

type SearchFormProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchForm: FC<SearchFormProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onDeleteText = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={s.search}>
      <svg
        className={s.search__icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={searchValue}
        className={s.search__input}
        placeholder="Найти контакт"
        onChange={handleChange}
      />
      {searchValue && (
        <svg
          className={s.search__clearIcon}
          onClick={onDeleteText}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
