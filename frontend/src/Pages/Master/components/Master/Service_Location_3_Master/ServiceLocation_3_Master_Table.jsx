import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";

export default function ServiceLocation_3_Master_Table() {
  const { handleOpen } = useUIContext();
  const { serviceLocation3, deleteServiceLocation3, startEditing, pagination } =
    useServiceLocation3Master();
  return (
    <>
      {/* -----------------START SERVICE LOCATION 3 MASTER TABLE-------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Service Location 3</th>
            <th scope="col">Service Location 2</th>
            <th scope="col">Service Location 1</th>

            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceLocation3.map((serviceLocation3, index) => {
            return (
              <tr key={serviceLocation3.id}>
                <td>
                  <div className="ms-4">
                    {" "}
                    {(pagination.currentPage - 1) * pagination.perPage +
                      (index + 1)}
                  </div>
                </td>
                <td>{serviceLocation3.service_location_3_name}</td>
                <td>
                  {serviceLocation3?.service_location2?.service_location_2_name}{" "}
                </td>
                <td>
                  {serviceLocation3?.service_location1?.service_location_name}{" "}
                </td>

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
                          // key={user.id}
                          className="dropdown-item waves-effect"
                          onClick={() => {
                            startEditing(
                              serviceLocation3.id,
                              serviceLocation3.service_location_3_name,
                              serviceLocation3.service_location_1_id, // ✅ ID
                              serviceLocation3.service_location_2_id, // ✅ ID
                              serviceLocation3?.sl1?.service_location_name, // ✅ Label
                              serviceLocation3?.sl2?.service_location_2_name // ✅ Label
                            );
                            handleOpen("addNewServiceLocation3");
                          }}
                        >
                          Edit
                        </button>

                        {/* <div className="dropdown-divider"></div> */}
                        <a
                          className="dropdown-item text-danger delete-record waves-effect"
                          onClick={() => {
                            deleteServiceLocation3(serviceLocation3.id);
                          }}
                        >
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
      {/* -----------------END SERVICE LOCATION 3 MASTER TABLE-------------------- */}
    </>
  );
}
