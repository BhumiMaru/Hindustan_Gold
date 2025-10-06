import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../../utils/decryptData";
import { useUIContext } from "../../../../../Context/UIContext";
import PO_Reject_Modal from "./PO_Reject_Modal";

export default function PO_List_Table() {
  const { PoList, poDetails, setPoId, getPoDetails, PoApprove } = usePOCreate();
  const { handleOpen, modal } = useUIContext();
  const [expandedRow, setExpandedRow] = useState(false);
  console.log("PoList", PoList);

  useEffect(() => {
    getPoDetails(poDetails.id);
  }, [poDetails.id]);

  const { userPermission, fetchUserPermission } = useUserCreation();

  useEffect(() => {
    fetchUserPermission(userPermission?.user?.id);
  }, [userPermission?.user?.id]);

  const toggleRow = (rowIndex) => {
    setExpandedRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  // const getAuthData = sessionStorage.getItem("authData");
  // const decryptAuthData = decryptData(getAuthData);

  // ✅ Get saved auth data
  const savedAuth = sessionStorage.getItem("authData");
  let user = null;

  if (savedAuth) {
    try {
      const decrypted = decryptData(savedAuth);
      user = decrypted?.user || null;
      // console.log("user", user);
    } catch (error) {
      console.error("Error decrypting auth data", error);
    }
  }

  useEffect(() => {
    fetchUserPermission(user.id);
  }, [user.id]);
  console.log("userPermission", userPermission);

  return (
    <>
      {/* ------------------START PO LIST TABLE------------------ */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </th>
            <th scope="col" style={{ width: 80 }}>
              Sr.No.
            </th>
            <th scope="col">PO ID</th>
            <th scope="col">Date</th>
            <th scope="col">PI ID</th>
            <th scope="col">Type</th>
            <th scope="col">Total Item</th>
            <th scope="col">Vendor</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {PoList.map((po, index) => (
            <React.Fragment key={po._id || index}>
              <tr key={index}>
                <td>
                  <i
                    className={`icon-base ti icon-20px cursor-pointer ${
                      expandedRow === index
                        ? "tabler-chevron-down"
                        : "tabler-chevron-right"
                    }`}
                    onClick={() => toggleRow(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{po.po_number}</td>
                <td>{po.po_date}</td>
                <td>PI_000001</td>
                <td>{po.po_type}</td>
                <td>{po.total_item}</td>
                <td>
                  <div className="d-flex justify-content-start align-items-center user-name">
                    <div className="avatar-wrapper">
                      <div className="avatar me-2">
                        <img
                          src="assets/img/avatars/10.png"
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="emp_name text-truncate text-heading fw-medium">
                        Evangelina Carnock
                      </span>
                      <small className="emp_post text-truncate">
                        Cost Accountant
                      </small>
                    </div>
                  </div>
                </td>
                <td>₹{po.final_total}/-</td>
                <td>
                  <span className="badge bg-label-warning">{po.status}</span>
                </td>

                <td>
                  <div className="d-flex align-items-center">
                    {userPermission.some(
                      (prem) =>
                        prem.type === "PO Generation" &&
                        prem.permission === "Approve"
                    ) && (
                      <div className="d-inline-flex gap-2">
                        <button
                          className={`btn btn-success btn-sm waves-effect waves-light ${
                            (po.status === "Approve" ||
                              po.status === "Reject") &&
                            "d-none"
                          }`}
                          onClick={() => {
                            PoApprove(po?.id);
                            console.log(" poDetails.id", po.id);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className={`btn btn-danger btn-sm waves-effect waves-light ${
                            (po.status === "Approve" ||
                              po.status === "Reject") &&
                            "d-none"
                          }`}
                          onClick={() => {
                            handleOpen("viewRejectPo");
                            setPoId(po?.id);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {console.log("po", po)}
                    <div className="d-inline-flex gap-2">
                      <Link
                        to={`/po-material/po-detail-download/${po.id}`}
                        type="button"
                        className="btn btn-text-success rounded-pill btn-icon waves-effect"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        aria-label="Download PO"
                        data-bs-original-title="Download PO"
                      >
                        <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
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
                          <Link
                            to={`/po-material/po-detail/${po.id}`}
                            className="dropdown-item waves-effect"
                            onClick={() => getPoDetails(po.id)}
                          >
                            View
                          </Link>
                          <a className="dropdown-item waves-effect">Edit</a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item text-danger delete-record waves-effect">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {expandedRow === index && (
                <tr key={`expand-row-${index}`}>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem!important;\n                                            padding-inline-end: 1rem;\n                                        }\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9!important;\n                                        }\n                                    ",
                    }}
                  />
                  <td colSpan={12} style={{ padding: 0 }}>
                    <table className="table table1 datatables-basic align-middle w-100">
                      <thead>
                        <tr className="bg-label-secondary">
                          <th>
                            <div className="ms-4">Item</div>{" "}
                          </th>
                          <th>Qty.</th>
                          <th>UOM</th>
                          <th>Received Qty.</th>
                          <th>Pending Qty.</th>
                          <th>Unit Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {po.items.map((poItem, index) => (
                          <tr key={index}>
                            <td>
                              {" "}
                              <div className="ms-4">
                                {poItem.pirequestitem.item_name}
                              </div>
                            </td>
                            <td>{poItem.pirequestitem.qty}</td>
                            <td>{poItem.pirequestitem.uom}</td>
                            <td>{poItem.pirequestitem.received_qty}</td>
                            <td>{poItem.pirequestitem.pending_qty}</td>
                            <td>{poItem.pirequestitem.unit_price}/-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {modal.viewRejectPo && <PO_Reject_Modal />}
      {/* ------------------END PO LIST TABLE------------------ */}
    </>
  );
}
