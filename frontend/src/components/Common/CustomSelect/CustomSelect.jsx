import React from "react";
import Select from "react-select";

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "38px",
      height: "38px",
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#ffab1d" : "#ced4da",
      borderWidth: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ffab1d",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "38px",
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "38px",
    }),
    // ✅ Customize dropdown options
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#ffab1d63" // Selected bg
        : state.isFocused
        ? "#f3f2f3" // Hover bg
        : "#fff", // Default
      // borderRadius: "0.375rem",
      color: state.isSelected ? "#FFAB1D" : "#000", // Text color
      "&:active": {
        backgroundColor: "#ffab1d63", // On click
      },
    }),
    // ✅ Customize the selected value in control box
    singleValue: (provided) => ({
      ...provided,
      color: "#212529", // text color inside the input
      fontWeight: 500,
    }),
  };

  return (
    <div>
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <Select
        styles={customStyles}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Select option"}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
}
