import React from "react";

export default function Item_Master_Table() {
  return (
    <>
      {/* -----------------START ITEM MASTER TABLE----------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr.#</div>
            </th>
            <th scope="col">Type</th>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Subcategory</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col" style={{ width: 180 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="ms-4">1</div>
            </td>
            <td>Item</td>
            <td>IT_STR_000001</td>
            <td>Book</td>
            <td>Stationery</td>
            <td>Stationery</td>
            <td>100</td>
            <td>
              <span className="badge bg-label-success">Active</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="item-create.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-edit icon-22px" />
                </a>
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px" />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">2</div>
            </td>
            <td>Services</td>
            <td>SR_AC_000001</td>
            <td>AC SERVICES</td>
            <td>Services</td>
            <td>AcServices</td>
            <td>-</td>
            <td>
              <span className="badge bg-label-success">Active</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="item-create.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-edit icon-22px" />
                </a>
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px" />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">3</div>
            </td>
            <td>Asset</td>
            <td>AS_CS_000001</td>
            <td>csc machine</td>
            <td>CNC</td>
            <td>machine</td>
            <td>-</td>
            <td>
              <span className="badge bg-label-success">Active</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="item-create.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-edit icon-22px" />
                </a>
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* -----------------END ITEM MASTER TABLE----------------- */}
    </>
  );
}
