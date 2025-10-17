import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../../utils/decryptData";

export default function Get_Quote_Table() {
  const { quote, pagination } = useGetQuote();
  const [expandedRows, setExpandedRows] = useState({});
  const { userPermission, fetchUserPermission } = useUserCreation();
  console.log("userPermission", userPermission);

  useEffect(() => {
    // Initialize all tooltips after render
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [quote, expandedRows]);

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

  // Toggle Row
  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          {quote.map((item, index) => (
            <React.Fragment key={`quote-${item.id}`}>
              {/* Main Row */}
              <tr key={`row-${item.id}`}>
                <td
                  onClick={() => toggleRow(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={`icon-base ti tabler-chevron-${
                      expandedRows[item.id] ? "down" : "right"
                    } icon-22px`}
                  />
                </td>
                <td>
                  {" "}
                  {(pagination.currentPage - 1) * pagination.perPage +
                    (index + 1)}
                </td>
                <td>{item?.pi_request?.id}</td>
                <td>{item?.pi_request?.pi_date}</td>
                <td>{item?.pi_request?.pi_type}</td>
                <td>{item?.pi_request?.order_by?.name}</td>
                <td>
                  {item?.pi_request?.order_by?.department?.department_name}
                </td>
                <td>{item?.total_item}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Approve" || item.status === "Complete"
                        ? "bg-label-success"
                        : item.status === "InProgress"
                        ? "bg-label-info"
                        : item.status === "Pending"
                        ? "bg-label-warning"
                        : "bg-label-danger"
                    }`}
                  >
                    {item?.status}
                  </span>
                </td>
              </tr>
              {/* Items */}
              {expandedRows[item.id] && item.piget_quate_items.length > 0 && (
                <tr key={`expanded-${item.piget_quate_items.id}`}>
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
                          <th>TC Day</th>
                          <th>Purpose</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.piget_quate_items.map((items, index) => (
                          <tr key={index}>
                            {console.log("items", items)}
                            <td>
                              <div className="ms-4">
                                {items?.pi_request_item?.item_name}
                              </div>
                            </td>
                            <td>{items?.pi_request_item?.qty}</td>
                            <td>{items?.pi_request_item?.uom}</td>
                            <td>
                              <span
                                // className="badge badge-outline-danger"
                                className={`badge ${
                                  items?.pi_request_item?.priority === "high"
                                    ? "badge-outline-success"
                                    : items?.pi_request_item?.priority === "low"
                                    ? "badge-outline-danger"
                                    : items?.pi_request_item?.priority ===
                                      "medium"
                                    ? "badge-outline-warning"
                                    : ""
                                }`}
                              >
                                {items?.pi_request_item?.priority}
                              </span>
                            </td>
                            <td>
                              {
                                items?.pi_request_item
                                  ?.tentative_consumption_day
                              }
                            </td>
                            <td>
                              <a
                                href="#"
                                type="button"
                                className=""
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                aria-label="Purpose"
                                data-bs-original-title={
                                  items?.pi_request_item?.purpose
                                }
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
                                data-bs-original-title={
                                  items?.pi_request_item?.remark
                                }
                              >
                                <i className="icon-base ti tabler-info-circle text-dark  icon-20px" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-center w-100">
                      {/* <a href="pi-request-get-quote.html"
                                         className="btn btn-primary mt-2 mb-2 btn-sm">Create PO</a>*/}
                      {userPermission?.some(
                        (perm) =>
                          perm.type === "Get Quotation" &&
                          perm.permission === "view"
                      ) ? (
                        <Link
                          to={`/po-material/pi-request-get-quote/${item.id}`}
                          className="btn btn-info mt-2 mb-2 btn-sm waves-effect waves-light text-decoration-none"
                        >
                          View Detail
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* ------------------END GET QUOTE TABLE------------------- */}
    </>
  );
}
