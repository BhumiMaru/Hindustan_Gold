import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reject_Pi_request from "./Reject_Pi_request";
import { useUIContext } from "../../../../../Context/UIContext";
import { toast } from "react-toastify";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";
import Loader from "../../../../../components/Common/Loader/Loader";
import ServiceReceived_Confirmation_Modal from "./ServiceReceived_Confirmation_Modal";

export default function PI_Request_Table({ userPermission }) {
  const { type, id } = useParams();
  const {
    piRequest,
    StartEditing,
    DeletePiRequest,
    pagination,
    singleApprove,
    bulkApprove,
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    activeTab,
    singleReject,
    bulkReject,
    setSelectedItems,
    selectedItemsMap,
    setSelectedItemsMap,
    loading,
    serviceReceived,
  } = usePIRequest();
  const { getQuoteCreate } = useGetQuote();
  const { modal, handleOpen } = useUIContext();
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();
  const [piRequestId, setPiRequestId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Clear selection when tab changes or component unmounts
  useEffect(() => {
    return () => {
      setSelectedItems([]);
    };
  }, [activeTab]);

  useEffect(() => {
    // Initialize all tooltips after render
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [piRequest, expandedRows]);

  // console.log("aa", activeTab);

  // let checkboxClass = "form-check-input";

  // if (
  //   activeTab === "approval_request" &&
  //   userPermission.some(
  //     (prem) => prem.type === "PI Request" && prem.permission === "approve"
  //   ) &&
  //   (piItem?.status === "pending" || piItem?.status === "Pending")
  // ) {
  //   checkboxClass += "d-block";
  // }

  // if (activeTab === "my_request") {
  //   checkboxClass += "d-none";
  // }

  // if (
  //   activeTab === "all_request" &&
  //   userPermission.some(
  //     (prem) => prem.type === "Get Quotation" && prem.permission === "add"
  //   ) &&
  //   piItem?.quote_status !== 1 &&
  //   piItem?.status === "Approve"
  // ) {
  //   checkboxClass += "d-block";
  // } else {
  //   checkboxClass += "d-none";
  // }

  // console.log("userrrrrrrrrrrrrrrrrrr", userPermission);
  {
    console.log("piRequest", piRequest);
  }
  return (
    <>
      {/* ----------------START PI REQUEST TABLE------------------ */}
      <table className="dt-responsive-child table table-bordered">
        <thead>
          <tr>
            <th />
            <th>id #</th>
            <th>PI Date</th>
            <th>PI Type</th>
            <th>Order By</th>
            <th>Department</th>
            <th>Total Item</th>
            <th>Get Quote</th>
            <th>PO</th>
            <th>Status</th>
            {activeTab === "my_request" && (
              <th style={{ width: "180px" }}>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : piRequest.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No items found</p>
              </td>
            </tr>
          ) : (
            piRequest?.map((pi, index) => (
              <React.Fragment key={`pi-${pi.id}`}>
                {console.log("pi", pi)}
                <tr key={`row-${pi.id}`}>
                  <td
                    onClick={() => toggleRow(pi.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`icon-base ti tabler-chevron-${
                        expandedRows[pi.id] ? "down" : "right"
                      } icon-22px`}
                    />
                  </td>
                  <td>
                    {" "}
                    {(pagination.currentPage - 1) * pagination.perPage +
                      (index + 1)}
                  </td>
                  <td>{pi.pi_date}</td>
                  <td>{pi.pi_type}</td>
                  <td>{pi?.order_by?.name}</td>
                  <td>{pi?.department_by?.department_name}</td>
                  <td>{pi.total_item}</td>
                  <td>{pi.totalquate_count}</td>
                  <td>{pi.totalpo_count}</td>
                  <td>
                    <span
                      className={`badge ${
                        pi.final_approve_status === "Approve" ||
                        pi.final_approve_status === "Completed"
                          ? "bg-label-success"
                          : pi.final_approve_status === "InProgress"
                          ? "bg-label-info"
                          : pi.final_approve_status === "Pending"
                          ? "bg-label-warning"
                          : "bg-label-danger"
                      }`}
                    >
                      {pi.final_approve_status}
                    </span>
                  </td>
                  {activeTab === "my_request" &&
                    pi.final_approve_status === "Pending" && (
                      <td>
                        <div className="d-inline-flex gap-2">
                          <a
                            className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                          </a>

                          <div className="d-inline-block">
                            <div className="dropdown-menu dropdown-menu-end m-0">
                              <button
                                className={`dropdown-item waves-effect ${
                                  userPermission.some(
                                    (prem) =>
                                      prem.type === "PI Request" &&
                                      prem.permission === "add"
                                  )
                                    ? "d-block"
                                    : "d-none"
                                }`}
                                onClick={() => {
                                  navigate(
                                    `/po-material/pi-request-create/${pi.pi_type}/${pi.id}`
                                  );
                                  StartEditing(pi.id);
                                }}
                              >
                                Edit
                              </button>
                              {/* <a
                          href="#"
                          className="dropdown-item waves-effect"
                          data-bs-toggle="modal"
                          data-bs-target="#grnCreateModel"
                          onClick={() => {
                            handleOpen("viewSubCategory");
                            setSubCategoryData(subCat);
                          }}
                        >
                          View
                        </a> */}
                              {/* <div className="dropdown-divider"></div> */}
                              <a
                                // className={`dropdown-item text-danger delete-record waves-effect ${
                                //   userPermission.some(
                                //     (prem) =>
                                //       prem.type === "PI Request" &&
                                //       prem.permission === "delete"
                                //   )
                                //     ? "d-block"
                                //     : "d-none"
                                // }`}
                                className="dropdown-item text-danger delete-record waves-effect"
                                onClick={() => DeletePiRequest(pi.id)}
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    )}

                  {/* <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        navigate(
                          `/po-material/pi-request-create/${pi.pi_type}/${pi.id}`
                        );
                        StartEditing(pi.id);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => DeletePiRequest(pi.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px" />
                    </button>
                  </div>
                </td> */}
                </tr>

                {expandedRows[pi.id] && pi?.piitems.length > 0 && (
                  <tr key={`expanded-${pi.id}`}>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9 !important;\n                                        }\n                                    ",
                      }}
                    />
                    <td colSpan={11} style={{ padding: 0 }}>
                      <table className="table table1 datatables-basic align-middle w-100">
                        <thead>
                          <tr className="bg-label-secondary">
                            {/* <th>
                            <div className="ms-4">
                              <input
                                // className={`form-check-input ${
                                //   activeTab === "approval_request"
                                //     ? "d-block"
                                //     : "d-none"
                                // }
                                // ${
                                //   pi.piitems.every(
                                //     (item) => item.status === "Approve"
                                //   )
                                //     ? "d-none"
                                //     : "d-block"
                                // }`}
                                className={`form-check-input 
                                ${
                                  activeTab === "approval_request" &&
                                  pi.piitems.every(
                                    (item) => item.status === "Approve"
                                  )
                                    ? "d-none"
                                    : "d-block"
                                }`}
                                checked={
                                  pi.piitems.length > 0 &&
                                  pi.piitems.every((item) =>
                                    (selectedItemsMap[pi.id] || []).includes(
                                      item.id
                                    )
                                  )
                                }
                                onChange={() =>
                                  handleSelectAll(pi.id, pi.piitems)
                                }
                                style={{
                                  width: "1rem",
                                  height: "1rem",
                                }}
                              />
                            </div>
                          </th> */}
                            {/* <th>
                            <div className="ms-4">
                              <input
                                className={`form-check-input ${
                                  activeTab === "approval_request" &&
                                  !pi.piitems.every(
                                    (item) =>
                                      item.status === "Approve" ||
                                      item.status === "Reject"
                                  )
                                    ? "d-block"
                                    : "d-none"
                                } ${
                                  activeTab === "my_request" &&
                                  !pi.piitems.every(
                                    (item) =>
                                      item.status.toLowerCase() !== "pending"
                                  )
                                    ? "none"
                                    : ""
                                }`}
                                type="checkbox"
                                checked={
                                  pi.piitems.length > 0 &&
                                  pi.piitems
                                    .filter(
                                      (item) =>
                                        item.status === "Pending" ||
                                        item.status === "pending"
                                    )
                                    .every((item) =>
                                      (selectedItemsMap[pi.id] || []).includes(
                                        item.id
                                      )
                                    )
                                }
                                onChange={() =>
                                  handleSelectAll(pi.id, pi.piitems)
                                }
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            </div>
                          </th> */}
                            {/* <th>
                            <div className="ms-4">
                              <input
                                className={`form-check-input ${
                                  activeTab === "approval_request"
                                    ? pi?.piitems?.some(
                                        (item) =>
                                          item.status.toLowerCase() ===
                                          "pending"
                                      )
                                      ? "d-block"
                                      : "d-none"
                                    : activeTab === "my_request"
                                    ? pi?.piitems?.some(
                                        (item) =>
                                          item.status.toLowerCase() !==
                                          "pending"
                                      )
                                      ? "d-block"
                                      : "d-none"
                                    : "d-none"
                                }`}
                                type="checkbox"
                                checked={pi.piitems
                                  .filter(
                                    (item) =>
                                      item.status.toLowerCase() === "pending"
                                  )
                                  .every((item) =>
                                    (selectedItemsMap[pi.id] || []).includes(
                                      item.id
                                    )
                                  )}
                                onChange={() =>
                                  handleSelectAll(pi.id, pi.piitems)
                                }
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            </div>
                          </th> */}
                            {/* <th>
                            <div className="ms-4">
                              <input
                                // className={`form-check-input ${
                                //   activeTab === "approval_request"
                                //     ? pi?.piitems?.some(
                                //         (item) =>
                                //           item.status.toLowerCase() ===
                                //           "pending"
                                //       )
                                //       ? "d-block"
                                //       : "d-none"
                                //     : activeTab === "my_request"
                                //     ? pi?.piitems?.some(
                                //         (item) =>
                                //           item.status.toLowerCase() !==
                                //           "pending"
                                //       )
                                //       ? "d-block"
                                //       : "d-none"
                                //     : "d-none"
                                // }`}
                                // className={`form-check-input ${
                                //   activeTab === "approval_request"
                                //     ? pi?.piitems?.some(
                                //         (item) =>
                                //           item.status?.toLowerCase() ===
                                //           "pending"
                                //       )
                                //       ? "d-block"
                                //       : "d-none"
                                //     : activeTab === "my_request"
                                //     ? "d-none"
                                //     : "d-none"
                                // }`}
                                className={`form-check-input ${(() => {
                                  // Check if any pi item has a pending status
                                  const hasPendingItem = pi?.piitems?.some(
                                    (item) =>
                                      item?.status?.toLowerCase()?.trim() ===
                                      "pending"
                                  );

                                  // Check if any pi item has quote_status !== 1 and status = "approve"
                                  const hasApprovedItemWithoutQuote =
                                    pi?.piitems?.some(
                                      (item) =>
                                        item?.quote_status !== 1 &&
                                        item?.status?.toLowerCase()?.trim() ===
                                          "approve"
                                    );

                                  // 1️⃣ approval_request tab — show if user has Approve permission & any item is pending
                                  if (
                                    activeTab === "approval_request" &&
                                    userPermission?.some(
                                      (perm) =>
                                        perm.type === "PI Request" &&
                                        perm.permission?.toLowerCase() ===
                                          "approve"
                                    ) &&
                                    hasPendingItem
                                  ) {
                                    return "d-block";
                                  }

                                  // 2️⃣ my_request tab — always hide checkbox
                                  if (activeTab === "my_request") {
                                    return "d-none";
                                  }

                                  // 3️⃣ all_request tab — show if user can Add quotation & has an approved item without quote
                                  if (
                                    activeTab === "all_request" &&
                                    userPermission?.some(
                                      (perm) =>
                                        perm.type === "Get Quotation" &&
                                        perm.permission?.toLowerCase() === "add"
                                    ) &&
                                    hasApprovedItemWithoutQuote
                                  ) {
                                    return "d-block";
                                  }

                                  // 4️⃣ default — hide
                                  return "d-none";
                                })()}`}
                                type="checkbox"
                                checked={
                                  activeTab === "approval_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() ===
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : activeTab === "my_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() !==
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : activeTab === "all_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() !==
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : false
                                }
                                onChange={() =>
                                  handleSelectAll(pi.id, pi.piitems)
                                }
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            </div>
                          </th> */}
                            {/* <th>
                            <div className="ms-4">
                              <input
                                type="checkbox"
                                // className={`form-check-input ${(() => {
                                //   const hasPendingItem = pi?.piitems?.some(
                                //     (item) =>
                                //       item?.status?.toLowerCase()?.trim() ===
                                //       "pending"
                                //   );

                                //   if (
                                //     activeTab === "approval_request" &&
                                //     hasPendingItem
                                //   ) {
                                //     return "d-block";
                                //   }
                                //   return "d-none";
                                // })()}`}
                                className={`form-check-input ${(() => {
                                  // Check if any pi item has a pending status
                                  const hasPendingItem = pi?.piitems?.some(
                                    (item) =>
                                      item?.status?.toLowerCase()?.trim() ===
                                      "pending"
                                  );

                                  // Check if any pi item has quote_status !== 1 and status = "approve"
                                  const hasApprovedItemWithoutQuote =
                                    pi?.piitems?.some(
                                      (item) =>
                                        item?.quote_status !== 1 &&
                                        item?.status?.toLowerCase()?.trim() ===
                                          "approve"
                                    );

                                  // 1️⃣ approval_request tab — show if user has Approve permission & any item is pending
                                  if (
                                    activeTab === "approval_request" &&
                                    userPermission?.some(
                                      (perm) =>
                                        perm.type === "PI Request" &&
                                        perm.permission?.toLowerCase() ===
                                          "approve"
                                    ) &&
                                    hasPendingItem
                                  ) {
                                    return "d-block";
                                  }

                                  // 2️⃣ my_request tab — always hide checkbox
                                  if (activeTab === "my_request") {
                                    return "d-none";
                                  }

                                  // 3️⃣ all_request tab — show if user can Add quotation & has an approved item without quote
                                  if (
                                    activeTab === "all_request" &&
                                    userPermission?.some(
                                      (perm) =>
                                        perm.type === "Get Quotation" &&
                                        perm.permission?.toLowerCase() === "add"
                                    ) &&
                                    hasApprovedItemWithoutQuote
                                  ) {
                                    return "d-block";
                                  }

                                  // 4️⃣ default — hide
                                  return "d-none";
                                })()}`}
                                checked={
                                  activeTab === "approval_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() ===
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : activeTab === "my_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() !==
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : activeTab === "all_request"
                                    ? pi.piitems
                                        .filter(
                                          (item) =>
                                            item.status.toLowerCase() !==
                                            "pending"
                                        )
                                        .every((item) =>
                                          (
                                            selectedItemsMap[pi.id] || []
                                          ).includes(item.id)
                                        )
                                    : false
                                }
                                // onChange={(e) =>
                                //   handleSelectAll(pi.id, pi.piitems)
                                // }
                                onChange={() =>
                                  handleSelectAll(index, pi.piitems)
                                }
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            </div>
                          </th> */}
                            <th>
                              <div className="ms-4">
                                <input
                                  type="checkbox"
                                  className={`form-check-input ${(() => {
                                    // Check if any pi item has a pending status
                                    const hasPendingItem = pi?.piitems?.some(
                                      (item) =>
                                        item?.status?.toLowerCase()?.trim() ===
                                        "pending"
                                    );

                                    // Check if any pi item has quote_status !== 1 and status = "approve"
                                    const hasApprovedItemWithoutQuote =
                                      pi?.piitems?.some(
                                        (item) =>
                                          item?.quote_status != 1 &&
                                          item?.status
                                            ?.toLowerCase()
                                            ?.trim() === "approve"
                                      );

                                    // 1️⃣ approval_request tab — show if user has Approve permission & any item is pending
                                    if (
                                      activeTab === "approval_request" &&
                                      userPermission?.some(
                                        (perm) =>
                                          perm.type === "PI Request" &&
                                          perm.permission?.toLowerCase() ===
                                            "approve"
                                      ) &&
                                      hasPendingItem
                                    ) {
                                      return "d-block";
                                    }

                                    // 2️⃣ my_request tab — always hide checkbox
                                    // Check if any pi item has been approved and PO is done (for my_request)
                                    const hasApprovedAndPOCompleted =
                                      pi?.piitems?.some(
                                        (item) =>
                                          item?.status
                                            ?.toLowerCase()
                                            ?.trim() === "approve" &&
                                          item?.quote_status == 1 &&
                                          item?.po_status == 1
                                      );
                                    if (
                                      activeTab === "my_request" &&
                                      hasApprovedAndPOCompleted
                                    ) {
                                      return "d-block";
                                    }

                                    // 3️⃣ all_request tab — show if user can Add quotation & has an approved item without quote
                                    if (
                                      activeTab === "all_request" &&
                                      userPermission?.some(
                                        (perm) =>
                                          perm.type === "Get Quotation" &&
                                          perm.permission?.toLowerCase() ===
                                            "add"
                                      ) &&
                                      hasApprovedItemWithoutQuote
                                    ) {
                                      return "d-block";
                                    }

                                    // 4️⃣ default — hide
                                    return "d-none";
                                  })()}`}
                                  checked={
                                    activeTab === "approval_request"
                                      ? pi.piitems
                                          .filter(
                                            (item) =>
                                              item.status.toLowerCase() ===
                                              "pending"
                                          )
                                          .every((item) =>
                                            (
                                              selectedItemsMap[index] || []
                                            ).includes(item.id)
                                          )
                                      : activeTab === "my_request"
                                      ? pi.piitems
                                          .filter(
                                            (item) =>
                                              item.status.toLowerCase() !==
                                              "pending"
                                          )
                                          .every((item) =>
                                            (
                                              selectedItemsMap[index] || []
                                            ).includes(item.id)
                                          )
                                      : activeTab === "all_request"
                                      ? pi.piitems
                                          .filter(
                                            (item) =>
                                              item.status.toLowerCase() !==
                                              "pending"
                                          )
                                          .every((item) =>
                                            (
                                              selectedItemsMap[index] || []
                                            ).includes(item.id)
                                          )
                                      : false
                                  }
                                  onChange={() =>
                                    handleSelectAll(index, pi.piitems)
                                  }
                                  style={{ width: "1rem", height: "1rem" }}
                                />
                              </div>
                            </th>

                            <th>Item</th>
                            <th>Qty.</th>
                            <th>UOM</th>
                            <th>Priority</th>
                            <th>Purpose</th>
                            <th>Approval Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            {/* {activeTab === "approval_request" && ( */}
                            {activeTab === "approval_request" &&
                              userPermission.some(
                                (prem) =>
                                  prem.type === "PI Request" &&
                                  prem.permission === "approve"
                              ) && (
                                <th
                                  className={`${
                                    activeTab === "approval_request" &&
                                    pi?.piitems?.every(
                                      (item) =>
                                        item.status === "Approve" ||
                                        item.status === "Reject"
                                    )
                                      ? "d-none"
                                      : ""
                                  }`}
                                >
                                  Action
                                </th>
                              )}

                            {/* )} */}
                          </tr>
                        </thead>
                        <tbody>
                          {pi?.piitems?.map((piItem) => (
                            <tr key={`piItem-${pi.id}-${piItem.id}`}>
                              {console.log("pi items", piItem)}
                              {/* {console.log("piitem", piItem)} */}
                              {/* {activeTab === "approval_request" ||
                              (activeTab === "all_request" && ( */}
                              {/* <td className="dt-select">
                              <div className="ms-4">
                                <input
                                  aria-label="Select row"
                                  className={`form-check-input ${
                                    activeTab === "all_request" &&
                                    (piItem.status === "Approve" ||
                                      piItem.status === "Reject")
                                      ? "d-block"
                                      : "d-none"
                                  } ${
                                    activeTab === "approval_request" &&
                                    (piItem.status === "Pending" ||
                                      piItem.status === "pending")
                                      ? "d-block"
                                      : "d-none"
                                  }`}
                                  type="checkbox"
                                  checked={(
                                    selectedItemsMap[pi.id] || []
                                  ).includes(piItem.id)}
                                  onChange={() =>
                                    handleSelectItem(pi.id, piItem.id)
                                  }
                                />
                              </div>
                            </td> */}
                              {/* <td>
                              <div>{piItem?.quote_status}</div>
                            </td> */}
                              {/* <td className="dt-select">
                              <div className="ms-4">
                                <input
                                  aria-label="Select row"
                                  // className={`form-check-input ${
                                  //   activeTab === "approval_request" &&
                                  //   piItem.status.toLowerCase() === "pending"
                                  //     ? "d-block"
                                  //     : "d-none"
                                  // } `}
                                  // className={`form-check-input ${
                                  //   activeTab === "approval_request"
                                  //     ? piItem.status.toLowerCase() ===
                                  //       "pending"
                                  //       ? "d-block"
                                  //       : "d-none"
                                  //     : activeTab === "my_request"
                                  //     ? piItem.status.toLowerCase() ===
                                  //       "pending"
                                  //       ? "d-block"
                                  //       : "d-none"
                                  //     : "d-none"
                                  // }`}
                                  // className={`form-check-input ${
                                  //   activeTab === "approval_request"
                                  //     ? pi?.piitems?.some(
                                  //         (item) =>
                                  //           item.status?.toLowerCase() ===
                                  //           "pending"
                                  //       ) && piItem?.status === "Approve"
                                  //       ? "d-block"
                                  //       : "d-none"
                                  //     : ""
                                  // } ${
                                  //   activeTab === "my_request" ? "d-none" : ""
                                  // } ${
                                  //   userPermission.some(
                                  //     (prem) =>
                                  //       prem.type === "Get Quotation" &&
                                  //       prem.permission === "add"
                                  //   ) &&
                                  //   activeTab === "all_request" &&
                                  //   piItem?.quote_status != 1 &&
                                  //   piItem?.status == "Approve"
                                  //     ? "d-block"
                                  //     : "d-none"
                                  // }`}
                                  className={checkboxClass}
                                  type="checkbox"
                                  checked={(
                                    selectedItemsMap[pi.id] || []
                                  ).includes(piItem.id)}
                                  onChange={() =>
                                    handleSelectItem(pi.id, piItem.id)
                                  }
                                />
                                <input
                                  aria-label="Select row"
                                  type="checkbox"
                                  checked={(
                                    selectedItemsMap[pi.id] || []
                                  ).includes(piItem.id)}
                                  onChange={() =>
                                    handleSelectItem(pi.id, piItem.id)
                                  }
                                  className={`form-check-input ${(() => {
                                    const status = piItem?.status
                                      ?.toLowerCase()
                                      .trim();
                                    // approval_request tab with permission and pending status
                                    if (
                                      activeTab === "approval_request" &&
                                      userPermission.some(
                                        (prem) =>
                                          prem.type === "PI Request" &&
                                          prem.permission === "approve"
                                      ) &&
                                      status === "pending"
                                    ) {
                                      return "d-block";
                                    }

                                    // my_request tab hides checkbox
                                    if (activeTab === "my_request") {
                                      return "d-none";
                                    }

                                    // all_request tab with permission, quote not added, and approved status
                                    if (
                                      activeTab === "all_request" &&
                                      userPermission.some(
                                        (prem) =>
                                          prem.type === "Get Quotation" &&
                                          prem.permission === "add"
                                      ) &&
                                      piItem?.quote_status !== 1 &&
                                      piItem?.status === "Approve"
                                    ) {
                                      return "d-block";
                                    }

                                    // default
                                    return "d-none";
                                  })()}`}
                                />
                                <input
                                  type="checkbox"
                                  checked={(
                                    selectedItemsMap[pi.id] || []
                                  ).includes(piItem.id)}
                                  className={`form-check-input ${(() => {
                                    const status = piItem?.status
                                      ?.toLowerCase()
                                      ?.trim();

                                    if (
                                      activeTab === "approval_request" &&
                                      userPermission.some(
                                        (perm) =>
                                          perm.type === "PI Request" &&
                                          perm.permission?.toLowerCase() ===
                                            "approve"
                                      ) &&
                                      status === "pending"
                                    ) {
                                      return "d-block";
                                    }

                                    if (activeTab === "my_request")
                                      return "d-none";

                                    if (
                                      activeTab === "all_request" &&
                                      userPermission.some(
                                        (perm) =>
                                          perm.type === "Get Quotation" &&
                                          perm.permission?.toLowerCase() ===
                                            "add"
                                      ) &&
                                      piItem?.quote_status !== 1 &&
                                      piItem?.status?.toLowerCase()?.trim() ===
                                        "approve"
                                    ) {
                                      return "d-block";
                                    }

                                    return "d-none";
                                  })()}`}
                                  // onChange={() =>
                                  //   handleSelectItem(pi.id, piItem.id)
                                  // }
                                  onChange={() =>
                                    handleSelectItem(index, piItem.id)
                                  }
                                />
                              </div>
                            </td> */}
                              <td className="dt-select">
                                <div className="ms-4">
                                  <input
                                    type="checkbox"
                                    checked={(
                                      selectedItemsMap[index] || []
                                    ).includes(piItem.id)}
                                    className={`form-check-input ${(() => {
                                      const status = piItem?.status
                                        ?.toLowerCase()
                                        ?.trim();

                                      // approval_request tab + user has approve permission + item pending
                                      if (
                                        activeTab === "approval_request" &&
                                        userPermission.some(
                                          (perm) =>
                                            perm.type === "PI Request" &&
                                            perm.permission?.toLowerCase() ===
                                              "approve"
                                        ) &&
                                        status === "pending"
                                      ) {
                                        return "d-block";
                                      }

                                      // my_request tab hides checkbox
                                      // Check if any pi item has been approved and PO is done (for my_request)
                                      const hasApprovedAndPOCompleted =
                                        pi?.piitems?.some(
                                          (item) =>
                                            item?.status
                                              ?.toLowerCase()
                                              ?.trim() === "approve" &&
                                            item?.quote_status == 1 &&
                                            item?.po_status == 1
                                        );
                                      if (
                                        activeTab === "my_request" &&
                                        hasApprovedAndPOCompleted
                                      )
                                        return "d-block";

                                      // all_request tab + user can Add quotation + approved item w/o quote
                                      if (
                                        activeTab === "all_request" &&
                                        userPermission.some(
                                          (perm) =>
                                            perm.type === "Get Quotation" &&
                                            perm.permission?.toLowerCase() ===
                                              "add"
                                        ) &&
                                        piItem?.quote_status !== 1 &&
                                        piItem?.status
                                          ?.toLowerCase()
                                          ?.trim() === "approve"
                                      ) {
                                        return "d-block";
                                      }

                                      // default hide
                                      return "d-none";
                                    })()}`}
                                    onChange={() =>
                                      handleSelectItem(index, piItem.id)
                                    }
                                  />
                                </div>
                              </td>

                              {/* <td>
                              <span>{piItem?.status}</span>
                            </td> */}
                              {/* {console.log("Pi item", piItem)} */}
                              {/* ))} */}

                              <td>{piItem.item_name}</td>
                              <td>{piItem.qty}</td>
                              <td>{piItem.uom}</td>
                              <td>
                                <span
                                  // className="badge badge-outline-danger"
                                  className={`badge ${
                                    piItem.priority === "high" &&
                                    "badge-outline-success"
                                  } ${
                                    piItem.priority === "medium" &&
                                    "badge-outline-warning"
                                  }  ${
                                    piItem.priority === "low" &&
                                    "badge-outline-danger"
                                  }`}
                                >
                                  {piItem.priority}
                                </span>
                              </td>
                              <td>
                                <a
                                  href="#"
                                  type="button"
                                  className=""
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  aria-label="Purpose"
                                  data-bs-original-title={piItem?.purpose}
                                >
                                  <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                                </a>
                              </td>
                              <td>{piItem.approve_date || "N / A"}</td>
                              <td>
                                <a
                                  href="#"
                                  type="button"
                                  className=""
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  aria-label="Remark"
                                  data-bs-original-title={piItem?.remark}
                                >
                                  <i className="icon-base ti tabler-info-circle text-dark  icon-20px" />
                                </a>
                              </td>
                              <td>
                                <span
                                  // className={`badge ${
                                  //   piItem.status === "Pending" &&
                                  //   "bg-label-warning"
                                  // } ${
                                  //   piItem.status === "approved" &&
                                  //   "bg-label-success"
                                  // }`}

                                  className={`badge ${
                                    piItem.status === "Approve"
                                      ? "bg-label-success"
                                      : piItem.status === "InProgress"
                                      ? "bg-label-info"
                                      : piItem.status === "Pending" ||
                                        piItem.status === "pending"
                                      ? "bg-label-warning"
                                      : piItem.status === "Reject"
                                      ? "bg-label-danger"
                                      : null
                                  }`}
                                >
                                  {piItem?.status === "Approve" &&
                                  piItem?.quote_status == 0 &&
                                  piItem?.po_status == 0
                                    ? "Approve"
                                    : piItem?.status === "Approve" &&
                                      piItem?.quote_status == 1 &&
                                      piItem?.po_status == 0
                                    ? "Get Quote"
                                    : piItem?.status === "Approve" &&
                                      piItem?.quote_status == 1 &&
                                      piItem?.po_status == 1
                                    ? "PO"
                                    : piItem.status}
                                </span>

                                {/* {console.log("pi", pi)} */}
                              </td>
                              {/* <td>
                              <div
                                className={`d-inline-flex gap-2 ${
                                  activeTab === "approval_request" &&
                                  piItem.status.toLowerCase() !== "pending"
                                    ? "d-none"
                                    : ""
                                }`}
                              >
                                Approve button
                                <div className="badge rounded bg-label-success p-1_5">
                                  <i
                                    className="icon-base ti tabler-circle-check icon-md cursor-pointer"
                                    onClick={() => singleApprove(piItem.id)}
                                  />
                                </div>

                                Reject button
                                <div className="badge rounded bg-label-danger p-1_5">
                                  <i
                                    className="icon-base ti tabler-xbox-x icon-md cursor-pointer"
                                    onClick={() =>
                                      singleReject({
                                        pi_request_item_id: piItem.id,
                                        pi_request_id: piItem.pi_request_id,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </td> */}
                              {activeTab === "approval_request" &&
                                userPermission.some(
                                  (prem) =>
                                    prem.type === "PI Request" &&
                                    prem.permission === "approve"
                                ) && (
                                  <td
                                    style={{
                                      display:
                                        activeTab === "approval_request" &&
                                        piItem.status.toLowerCase() !==
                                          "pending"
                                          ? "none"
                                          : "table-cell",
                                    }}
                                  >
                                    <div className="d-inline-flex gap-2">
                                      <div className="badge rounded bg-label-success p-1_5">
                                        <i
                                          className="icon-base ti tabler-circle-check icon-md cursor-pointer"
                                          onClick={() =>
                                            singleApprove(piItem.id)
                                          }
                                        />
                                      </div>
                                      <div className="badge rounded bg-label-danger p-1_5">
                                        <i
                                          className="icon-base ti tabler-xbox-x icon-md cursor-pointer"
                                          onClick={() =>
                                            singleReject({
                                              pi_request_item_id: piItem.id,
                                              pi_request_id:
                                                piItem.pi_request_id,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  </td>
                                )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* {console.log("pi", pi)} */}

                      {selectedItemsMap[index]?.length > 0 && (
                        <div className="text-center w-100">
                          {/* 1️⃣ Get Quotation */}
                          {activeTab === "all_request" &&
                            userPermission.some(
                              (perm) =>
                                perm.type === "Get Quotation" &&
                                perm.permission === "add"
                            ) && (
                              <div className="text-center w-100">
                                <Link
                                  className="btn btn-primary btn-sm mt-2 waves-effect waves-light text-decoration-none"
                                  onClick={async () => {
                                    const res = await getQuoteCreate({
                                      pi_request_id: pi.id,
                                      pi_request_item_id:
                                        selectedItemsMap[index],
                                    });
                                    // console.log("get quotation btn", {
                                    //   pi_request_id: pi.id,
                                    //   pi_request_item_id: selectedItemsMap[index],
                                    // });
                                    if (res?.data?.id) {
                                      navigate(
                                        `/po-material/pi-request-get-quote/${res.data.id}`
                                      );
                                    }
                                  }}
                                >
                                  Get Quotation
                                </Link>
                              </div>
                            )}

                          <div className="d-inline-flex gap-2 ms-1">
                            {/* 2️⃣ Bulk Approve */}
                            {activeTab === "approval_request" && (
                              <button
                                className={`btn btn-success btn-sm mt-2 mb-2 waves-effect waves-light ${
                                  pi?.piitems?.some(
                                    (item) =>
                                      item.status.toLowerCase().trim() ===
                                      "pending"
                                  )
                                    ? "d-block"
                                    : "d-none"
                                }`}
                                data-bs-toggle="modal"
                                data-bs-target="#servicesModal"
                                onClick={() => {
                                  const selected =
                                    selectedItemsMap[index] || [];
                                  if (selected.length === 0)
                                    return toast.error(
                                      "No items selected for bulk approve"
                                    );

                                  const firstItem = pi.piitems.find((item) =>
                                    selected.includes(item.id)
                                  );

                                  if (firstItem) {
                                    bulkApprove({
                                      pi_request_item_id: selected,
                                      pi_request_id: firstItem.pi_request_id,
                                    });
                                  } else {
                                    toast.error(
                                      "Cannot find PI Request ID for selected items"
                                    );
                                  }
                                }}
                              >
                                Bulk Item Approve
                              </button>
                            )}

                            {/* 3️⃣ Bulk Reject */}
                            {activeTab === "approval_request" && (
                              <button
                                className={`btn btn-danger btn-sm mt-2 mb-2 waves-effect waves-light ${
                                  pi?.piitems?.some(
                                    (item) =>
                                      item.status.toLowerCase().trim() ===
                                      "pending"
                                  )
                                    ? "d-block"
                                    : "d-none"
                                }`}
                                onClick={() => {
                                  const selected =
                                    selectedItemsMap[index] || [];
                                  if (selected.length === 0)
                                    return toast.error(
                                      "No items selected for bulk reject"
                                    );

                                  const firstItem = pi.piitems.find((item) =>
                                    selected.includes(item.id)
                                  );

                                  if (firstItem) {
                                    bulkReject({
                                      pi_request_item_id: selected,
                                      pi_request_id: firstItem.pi_request_id,
                                    });
                                  } else {
                                    toast.error(
                                      "Cannot find PI Request ID for selected items"
                                    );
                                  }
                                }}
                              >
                                Bulk Item Reject
                              </button>
                            )}

                            {/* 4️⃣ Service Received (My Request Tab) */}
                            {/* {activeTab === "my_request" &&
                              pi?.pi_type === "service" &&
                              pi?.final_approve_status === "InProgress" && (
                                <button
                                  className="btn btn-info btn-sm waves-effect waves-light mt-2 mb-2"
                                  type="button"
                                  onClick={() => {
                                    handleOpen("serviceReceive");
                                    setPiRequestId(pi?.id);
                                  }}
                                >
                                  <span>
                                    <i className="icon-base icon-18px ti tabler-circle-check me-md-2" />
                                    <span className="d-md-inline-block d-none">
                                      Service Received
                                    </span>
                                  </span>
                                </button>
                              )} */}

                            {activeTab === "my_request" && (
                              <>
                                {/* CASE 1: Show text when service is in progress */}
                                {
                                  // pi?.pi_type === "service" &&
                                  // pi?.final_approve_status !== "InProgress" &&
                                  pi?.is_service_recive == 1 ? (
                                    <span className="badge bg-label-success p-2 m-2">
                                      Service Received
                                    </span>
                                  ) : null
                                }

                                {/* CASE 2: Show button when service can be received */}
                                {pi?.service_recive_button_status == 1 &&
                                pi?.is_service_recive === 0 ? (
                                  // pi?.final_approve_status == "InProgress"
                                  <button
                                    className="btn btn-info btn-sm waves-effect waves-light mt-2 mb-2"
                                    type="button"
                                    onClick={() => {
                                      handleOpen("serviceReceive");
                                      setPiRequestId(pi?.id);
                                    }}
                                  >
                                    <i className="icon-base icon-18px ti tabler-circle-check me-md-2" />
                                    <span className="d-md-inline-block d-none">
                                      Service Received
                                    </span>
                                  </button>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      {modal.viewRejectPi && <Reject_Pi_request />}
      {modal.serviceReceive && (
        <ServiceReceived_Confirmation_Modal piRequestId={piRequestId} />
      )}

      {/* ----------------END PI REQUEST TABLE------------------ */}
    </>
  );
}
