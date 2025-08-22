import React from "react";

export default function SearchBar() {
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
          placeholder="Search departments..."
          aria-label="Search departments..."
          aria-describedby="basic-addon-search31"
        />
      </div>
      {/* --------------------End SearchBar------------------------ */}
    </>
  );
}
