import React from "react";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";

export default function Item_Request_Table() {
  const { itemRequest } = useItemRequest();

  return (
    <>
      {/* -----------------START ITEM REQUEST TABLE---------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Request&nbsp;ID</th>
            <th scope="col">Date</th>
            <th scope="col">Item&nbsp;Type</th>
            <th scope="col">Item&nbsp;Name</th>
            <th scope="col">Request&nbsp;Person&nbsp;Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">UOM</th>
            <th scope="col">Unit&nbsp;Price</th>
            <th scope="col">Total&nbsp;Amount</th>

            <th scope="col">Status</th>
            <th scope="col" style={{ minWidth: "160px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {itemRequest.map((item, index) => {
            return (
              <tr key={item.item_request_id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{item.item_request_id}</td>
                <td>
                  {item?.item_request?.created_at
                    ? new Date(item.item_request.created_at)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </td>

                <td>{item?.item_request.item_type}</td>
                <td>Mouse</td>
                <td>
                  <div className="d-flex justify-content-start align-items-center user-name">
                    <div className="avatar-wrapper">
                      <div className="avatar me-2">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s"
                          alt="Avatar"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="emp_name text-truncate text-heading fw-medium">
                        {item?.item_request?.workflows.map((user) => {
                          return user?.request_user?.name;
                        })}
                      </span>
                      {item?.item_request?.workflows.map((user) => {
                        return (
                          <small className="emp_post text-truncate">
                            {user?.request_user?.role_id}
                          </small>
                        );
                      })}
                    </div>
                  </div>
                </td>
                <td>{item?.item_request.quantity}</td>
                <td>{item?.item_request.uom}</td>
                <td>{item?.item_request.unit_price}</td>
                <td>{item?.item_request.total_amount}</td>

                <td>
                  <span className="badge bg-label-warning">
                    {item?.item_request.final_approve_status}
                  </span>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <a
                      href="request-list.html"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </a>
                    <a
                      href="#"
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </a>
                    <a
                      href="#"
                      type="button"
                      className="btn btn-text-info rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                    >
                      <i className="icon-base ti tabler-eye text-info icon-22px"></i>
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}

          {/* <tr>
            <td>
              <div className="ms-4">3</div>
            </td>
            <td>REQ_000003</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
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
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>

            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button
                  className="btn btn-success btn-sm waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#servicesModal"
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#rejectRemarkModal"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">4</div>
            </td>
            <td>REQ_000001</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
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
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>
            <td>
              <span className="badge bg-label-success">Approve</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-info btn-sm waves-effect waves-light">
                  Handover
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">5</div>
            </td>
            <td>REQ_000001</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
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
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>
            <td>
              <span className="badge bg-label-success">Approve</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-success btn-sm waves-effect waves-light">
                  Service Received
                </button>
              </div>
            </td>
          </tr> */}
        </tbody>
      </table>
      {/* -----------------END ITEM REQUEST TABLE---------------- */}
    </>
  );
}
