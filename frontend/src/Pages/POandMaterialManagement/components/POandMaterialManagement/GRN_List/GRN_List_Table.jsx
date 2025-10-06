import React from "react";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import { useUIContext } from "../../../../../Context/UIContext";
import { Link } from "react-router-dom";
import UpdateGRN from "./UpdateGRN";
import { POProvider } from "../../../../../Context/PIAndPoManagement/POCreate";

export default function GRN_List_Table() {
  const { grnList, startEditing } = useGRN();
  const { handleOpen, modal } = useUIContext();
  console.log("grnList", grnList);
  return (
    <>
      {/* -------------START GRN LIST TABLE--------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">GRN&nbsp;ID</th>
            <th scope="col">GRN&nbsp;Date</th>
            <th scope="col">PO&nbsp;ID</th>
            <th scope="col">Type</th>
            <th scope="col">PI Request Person</th>
            <th scope="col">PI Receiving Person</th>
            <th scope="col">Vendor</th>
            <th scope="col">Total Item</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {grnList.map((grn, index) => {
            return (
              <tr>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{grn.grn_no}</td>
                <td>{grn.grn_date}</td>
                <td>{grn.po_id}</td>
                <td>Material</td>
                <td>{grn.pi_request_person}</td>
                <td>Evangelina Carnock</td>
                <td>{grn?.vendor?.vendor_name}</td>
                <td>10</td>
                <td>
                  <span className="badge bg-label-warning">{grn.status}</span>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <Link
                      to="/po-material/grn-details"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-eye icon-20px" />
                    </Link>
                    <div className="d-inline-block">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px" />
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end m-0 "
                        data-popper-placement="bottom-end"
                        style={{
                          position: "absolute",
                          inset: "0px 0px auto auto",
                          margin: 0,
                          transform: "translate(-45px, 195px)",
                        }}
                      >
                        <a
                          className="dropdown-item waves-effect"
                          // data-bs-toggle="modal"
                          // data-bs-target="#grnCreateModel"
                          onClick={async () => {
                            await startEditing(grn.id);
                            handleOpen("editGRN");
                            console.log("hhh");
                          }}
                        >
                          Edit
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item text-danger delete-record waves-effect">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modal.editGRN && (
        <>
          <POProvider>
            <UpdateGRN />
          </POProvider>
        </>
      )}
      {/* -------------END GRN LIST TABLE--------------- */}
    </>
  );
}
