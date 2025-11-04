import React, { useEffect } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function ServiceLocation_1_Master_Table() {
  const { handleOpen } = useUIContext();
  const {
    serviceLocation,
    startEditing,
    deleteServiceLocation,
    pagination,
    loading,
  } = useServiceLocation1Master();

  return (
    <>
      {/* -----------------START SERVICE LOCATION 1 MASTER TABLE-------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Service Location 1</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            serviceLocation.map((serviceLocation1, index) => {
              return (
                <tr key={serviceLocation1.id}>
                  <td>
                    <div className="ms-4">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{serviceLocation1.service_location_name}</td>

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
                                serviceLocation1.id,
                                serviceLocation1.service_location_name
                              );
                              handleOpen("addNewServiceLocation1");
                            }}
                          >
                            Edit
                          </button>

                          {/* <div className="dropdown-divider"></div> */}
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => {
                              deleteServiceLocation(serviceLocation1.id);
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
            })
          )}
        </tbody>
      </table>
      {/* -----------------END SERVICE LOCATION 1 MASTER TABLE-------------------- */}
    </>
  );
}
