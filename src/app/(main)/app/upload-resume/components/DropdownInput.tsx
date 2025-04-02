"use client";

import React from "react";

interface DropdownInputProps {
  label?: string;
  placeholder?: string;
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  placeholder = "Select an option",
  options,
  selectedValue,
  onSelect,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-black text-lg font-semibold">{label}</label>}
      <select
        value={selectedValue || ""}
        onChange={handleChange}
        className="bg-gray-100 text-sm rounded-lg p-3"
      >
        <option value="" className="text-sm" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
