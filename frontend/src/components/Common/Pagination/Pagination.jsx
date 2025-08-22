import React from "react";

export default function Pagination() {
  return (
    <>
      {/* -----------------------Start Common Pagination------------------------------ */}
      <div className="d-flex justify-content-between align-items-center mt-4 mx-2">
        <div className="align-items-center d-flex">
          <div>Showing 1 to 10 of 100 entries</div>
          <div className="ms-2">
            <select className="form-select form-select-sm" id="dt-length-0">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
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
