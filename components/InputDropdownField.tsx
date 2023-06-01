"use client";
import React, { useEffect, useState } from "react";

interface Choice {
  name: string;
  label: string;
}

interface InputDropdownFieldProps {
  label: string;
  placeholder: string;
  removeTextBtn: boolean;
  name: string;
  required: boolean;
  errors?: object;
  choices: Choice[];
}

const InputDropdownField: React.FC<InputDropdownFieldProps> = ({
  name,
  label,
  required,
  placeholder,
  choices,
}) => {
  const [showChoices, setShowChoices] = useState(false);
  const [filterChoices, setFilterChoices] = useState(choices);
  const [searchTerm, setSearchTerm] = useState("");

  const onClickChoiceHandler = (e: any) => {
    const value = e.target.dataset.value;
    setSearchTerm(value);
    setShowChoices(false);
  };

  const renderChoices = () => {
    return filterChoices.map((choice, index) => {
      const activeClasses = "bg-[#F2F2F2] text-[#34333A]";
      return (
        <li
          className={
            "rounded-xl cursor-pointer text-lg font-medium px-5 py-3 " +
            (searchTerm === choice.name ? activeClasses : "text-[#828282]")
          }
          key={index}
          onClick={onClickChoiceHandler}
          data-value={choice.name}
        >
          {choice.label}
        </li>
      );
    });
  };

  const onChangeHandler = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowChoices(true);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilterChoices(choices);
    } else {
      const filterChoices = choices.filter((item) =>
        item.name.includes(searchTerm)
      );
      setFilterChoices(filterChoices);
    }
  }, [searchTerm, choices]);

  return (
    <div className="text-sm font-medium flex flex-col">
      <label className="text-[#34333A]" htmlFor={name}>
        {label} {!required ? "(optional)" : ""}
      </label>
      <input
        className="rounded-xl outline-offset-0 focus:outline-primary-theme-color mt-2 py-5 pl-4 placeholder:text-[#BDBDBD] border-2 border-solid border-[#BDBDBD]"
        type="search"
        name={name}
        // onBlur={() => setShowChoices(false)}
        value={searchTerm}
        onFocus={() => setShowChoices(true)}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
      {showChoices && (
        <ul className="p-2 z-10 mt-3 rounded-xl bg-white shadow-sm border-2 border-solid border-[#E0E0E0]">
          {renderChoices()}
        </ul>
      )}
    </div>
  );
};

export default InputDropdownField;
