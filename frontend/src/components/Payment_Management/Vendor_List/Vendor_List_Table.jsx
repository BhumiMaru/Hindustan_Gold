import React from "react";

export default function Vendor_List_Table() {
  return (
    <>
      {/* ------------------START VENDOR LIST TABLE----------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Vendor Id</th>
            <th scope="col">Date</th>
            <th scope="col">Vendor</th>
            <th scope="col">Contact Person</th>
            <th scope="col">Email Id</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Total Invoice</th>
            <th scope="col">Status</th>
            <th scope="col" style={{ minWidth: 160 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="ms-4">1</div>
            </td>
            <td>VA_000001</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Vishal Patel</td>
            <td>dummyemail@gmail.com</td>
            <td>9875641230</td>
            <td>50</td>
            <td>
              <span className="badge bg-label-success">Active</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#vendorViewModel"
                >
                  <i className="icon-base ti tabler-eye icon-22px" />
                </a>
                <a
                  href="#"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#vendorAddModel"
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
            <td>VA_000001</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Vishal Patel</td>
            <td>dummyemail@gmail.com</td>
            <td>9875641230</td>
            <td>50</td>
            <td>
              <span className="badge bg-label-danger">Deactive</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#vendorViewModel"
                >
                  <i className="icon-base ti tabler-eye icon-22px" />
                </a>
                <a
                  href="#"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#vendorAddModel"
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
      {/* ------------------END VENDOR LIST TABLE----------------------- */}
    </>
  );
}
