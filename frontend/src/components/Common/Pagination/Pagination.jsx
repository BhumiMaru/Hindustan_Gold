import React from "react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create page numbers (you can limit to e.g. 5 numbers if needed)
  // Generate page numbers dynamically
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      {/* -----------------------Start Common Pagination------------------------------ */}
      <div className="d-flex justify-content-between align-items-center mt-4 mx-2">
        <div className="align-items-center d-flex">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </div>
          <div className="ms-2">
            <select
              className="form-select form-select-sm"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {/* Right side: Pagination */}
          <nav aria-label="Page navigation ">
            <ul className="pagination pagination-rounded ">
              {/* First */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link waves-effect"
                  onClick={() => onPageChange(1)}
                >
                  <i className="icon-base ti tabler-chevrons-left icon-sm"></i>
                </a>
              </li>
              {/* Prev */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link waves-effect"
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <i className="icon-base ti tabler-chevron-left icon-sm"></i>
                </a>
              </li>
              {/* Page Numbers */}
              {pageNumbers.map((num) => (
                <li
                  className={`page-item ${num === currentPage ? "active" : ""}`}
                  key={num}
                >
                  <a
                    className="page-link waves-effect"
                    onClick={() => onPageChange(num)}
                  >
                    {num}
                  </a>
                </li>
              ))}

              <li
                className={`page-item next ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link waves-effect"
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <i className="icon-base ti tabler-chevron-right icon-sm"></i>
                </a>
              </li>
              <li
                className={`page-item last ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link waves-effect"
                  onClick={() => onPageChange(totalPages)}
                >
                  <i className="icon-base ti tabler-chevrons-right icon-sm"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* -----------------------End Common Pagination------------------------------ */}
    </>
  );
}
