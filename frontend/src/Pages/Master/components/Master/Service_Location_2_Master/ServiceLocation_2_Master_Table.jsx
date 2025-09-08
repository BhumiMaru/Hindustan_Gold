import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";

export default function ServiceLocation_2_Master_Table() {
  const { handleOpen } = useUIContext();
  const { serviceLocation2, startEditing, deleteServiceLocation2 } =
    useServiceLocation2Master();
  return (
    <>
      {/* -----------------START SERVICE LOCATION 2 MASTER TABLE-------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Service Location 2</th>
            <th scope="col">Service Location 1</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceLocation2.map((serviceLocation2, index) => {
            return (
              <tr key={serviceLocation2.id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{serviceLocation2.service_location_2_name} </td>
                <td>
                  {serviceLocation2?.service_location1?.service_location_name}{" "}
                </td>

                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        startEditing(
                          serviceLocation2.id,
                          serviceLocation2.service_location_2_name,
                          serviceLocation2.service_location_1_id,
                          serviceLocation2.service_location1
                            ?.service_location_name
                        );
                        handleOpen("addNewServiceLocation2");
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        deleteServiceLocation2(serviceLocation2.id);
                      }}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* -----------------END SERVICE LOCATION 2 MASTER TABLE-------------------- */}
    </>
  );
}
