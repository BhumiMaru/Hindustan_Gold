import React from "react";

export default function SearchBar({
  placeholder = "",
  value,
  onChange,
  onSubmit,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(e.target.value);
    }
  };
  return (
    <>
      {/* --------------------Start SearchBar------------------------ */}
      <div className="input-group input-group-merge">
        <span className="input-group-text" id="basic-addon-search31">
          <i className="icon-base ti tabler-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon-search31"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* --------------------End SearchBar------------------------ */}
    </>
  );
}
