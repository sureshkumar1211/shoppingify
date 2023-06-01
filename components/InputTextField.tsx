"use client";
import React from "react";

interface InputTextFieldProps {
  label: string;
  placeholder: string;
  removeTextBtn: boolean;
  name: string;
  inputType?: string;
  required: boolean;
  errors?: object;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  name,
  label,
  required,
  placeholder,
  inputType = "text",
}) => {
  return (
    <div className="text-sm font-medium flex flex-col">
      <label className="text-[#34333A]" htmlFor={name}>
        {label} {!required ? "(optional)" : ""}
      </label>
      <input
        className="rounded-xl focus:outline-primary-theme-color mt-2 py-5 pl-4 placeholder:text-[#BDBDBD] border-2 border-solid border-[#BDBDBD]"
        type={inputType}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputTextField;
