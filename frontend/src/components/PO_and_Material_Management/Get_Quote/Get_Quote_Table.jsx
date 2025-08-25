import React from "react";
import { Link } from "react-router-dom";

export default function Get_Quote_Table() {
  return (
    <>
      {/* ------------------START GET QUOTE TABLE------------------- */}
      <table className="dt-responsive-child table table-bordered">
        <thead>
          <tr>
            <th />
            <th>Sr #</th>
            <th>PI Id</th>
            <th>PI Date</th>
            <th>Type</th>
            <th>Order By</th>
            <th>Department</th>
            <th>Total Item</th>
            <th>Quote Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-22px" />
            </td>
            <td>1</td>
            <td>123</td>
            <td>05-08-2025</td>
            <td>Material</td>
            <td>Ronak Patel</td>
            <td>Electrical</td>
            <td>2</td>
            <td>
              <span className="badge bg-label-warning">In Complate</span>
            </td>
          </tr>
          <tr>
            <td colSpan={9} style={{ padding: 0 }}>
              <table className="table1 table datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>
                      <div className="ms-4">Item</div>
                    </th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Priority</th>
                    <th>TC Date</th>
                    <th>Purpose</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>10</td>
                    <td>Nos</td>
                    <td>
                      <span className="badge badge-outline-danger">High</span>
                    </td>
                    <td>06-08-2025</td>
                    <td>
                      <a
                        href="#"
                        type="button"
                        className=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Purpose"
                        data-bs-original-title="Purpose"
                      >
                        <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        type="button"
                        className=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Remark"
                        data-bs-original-title="Remark"
                      >
                        <i className="icon-base ti tabler-info-circle text-dark  icon-20px" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>10</td>
                    <td>Nos</td>
                    <td>
                      <span className="badge badge-outline-info">Low</span>
                    </td>
                    <td>06-08-2025</td>
                    <td>
                      <a
                        href="#"
                        type="button"
                        className=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Purpose"
                        data-bs-original-title="Purpose"
                      >
                        <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        type="button"
                        className=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Remark"
                        data-bs-original-title="Remark"
                      >
                        <i className="icon-base ti tabler-info-circle text-dark  icon-20px" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center w-100">
                {/* <a href="pi-request-get-quote.html"
                                         class="btn btn-primary mt-2 mb-2 btn-sm">Create PO</a>*/}
                <Link
                  to="/po-material/pi-request-get-quote"
                  className="btn btn-info mt-2 mb-2 btn-sm waves-effect waves-light"
                >
                  View Detail
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-22px" />
            </td>
            <td>1</td>
            <td>123</td>
            <td>05-08-2025</td>
            <td>Services</td>
            <td>Ronak Patel</td>
            <td>Electrical</td>
            <td>2</td>
            <td>
              <span className="badge bg-label-warning">In Complate</span>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ------------------END GET QUOTE TABLE------------------- */}
    </>
  );
}
