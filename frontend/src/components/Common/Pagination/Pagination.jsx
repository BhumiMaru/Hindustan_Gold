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
            Showing {(currentPage - 1) * itemsPerPage + 1} to
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
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
          <nav aria-label="Page navigation ">
            <ul className="pagination pagination-rounded ">
              <li className="page-item first">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  <i className="icon-base ti tabler-chevrons-left icon-sm"></i>
                </a>
              </li>
              <li className="page-item prev">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  <i className="icon-base ti tabler-chevron-left icon-sm"></i>
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  2
                </a>
              </li>
              <li className="page-item active">
                <a
                  className="page-link waves-effect waves-light"
                  href="javascript:void(0);"
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  4
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  5
                </a>
              </li>
              <li className="page-item next">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
                >
                  <i className="icon-base ti tabler-chevron-right icon-sm"></i>
                </a>
              </li>
              <li className="page-item last">
                <a
                  className="page-link waves-effect"
                  href="javascript:void(0);"
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

// import React from "react";

// export default function Pagination({
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
//   onItemsPerPageChange,
// }) {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Function to generate visible page numbers (with ellipsis)
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5; // Max visible pages in UI

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages
//         );
//       }
//     }

//     return pages;
//   };

//   const pageNumbers = getPageNumbers();

//   return (
//     <div className="d-flex justify-content-between align-items-center mt-4 mx-2">
//       {/* Left Side: Showing entries + select */}
//       <div className="align-items-center d-flex">
//         <div>
//           Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//           {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//         </div>
//         <div className="ms-2">
//           <select
//             className="form-select form-select-sm"
//             value={itemsPerPage}
//             onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
//           >
//             {[10, 25, 50, 100].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Right Side: Pagination */}
//       <nav aria-label="Page navigation">
//         <ul className="pagination pagination-rounded">
//           {/* First */}
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button className="page-link" onClick={() => onPageChange(1)}>
//               <i className="icon-base ti tabler-chevrons-left icon-sm"></i>
//             </button>
//           </li>

//           {/* Prev */}
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => onPageChange(currentPage - 1)}
//             >
//               <i className="icon-base ti tabler-chevron-left icon-sm"></i>
//             </button>
//           </li>

//           {/* Page Numbers (with ellipsis) */}
//           {pageNumbers.map((num, idx) =>
//             num === "..." ? (
//               <li key={idx} className="page-item disabled">
//                 <span className="page-link">...</span>
//               </li>
//             ) : (
//               <li
//                 key={num}
//                 className={`page-item ${num === currentPage ? "active" : ""}`}
//               >
//                 <button className="page-link" onClick={() => onPageChange(num)}>
//                   {num}
//                 </button>
//               </li>
//             )
//           )}

//           {/* Next */}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "disabled" : ""
//             }`}
//           >
//             <button
//               className="page-link"
//               onClick={() => onPageChange(currentPage + 1)}
//             >
//               <i className="icon-base ti tabler-chevron-right icon-sm"></i>
//             </button>
//           </li>

//           {/* Last */}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "disabled" : ""
//             }`}
//           >
//             <button className="page-link" onClick={() => onPageChange(totalPages)}>
//               <i className="icon-base ti tabler-chevrons-right icon-sm"></i>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
