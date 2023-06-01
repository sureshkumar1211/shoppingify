"use client";
import React from "react";

interface InputTextAreaFieldProps {
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
}

const InputTextAreaField: React.FC<InputTextAreaFieldProps> = ({
  name,
  label,
  required,
  placeholder,
}) => {
  return (
    <div className="text-sm font-medium flex flex-col">
      <label className="text-[#34333A]" htmlFor={name}>
        {label} {!required ? "(optional)" : ""}
      </label>
      <textarea
        className="rounded-xl focus:outline-primary-theme-color mt-2 py-5 pl-4 placeholder:text-[#BDBDBD] border-2 border-solid border-[#BDBDBD]"
        name={name}
        rows={4}
        cols={50}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputTextAreaField;
