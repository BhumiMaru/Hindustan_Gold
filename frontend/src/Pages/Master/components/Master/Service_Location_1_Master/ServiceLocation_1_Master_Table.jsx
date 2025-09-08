import React, { useEffect } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";

export default function ServiceLocation_1_Master_Table() {
  const { handleOpen } = useUIContext();
  const { serviceLocation, startEditing, deleteServiceLocation } =
    useServiceLocation1Master();

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
          {serviceLocation.map((serviceLocation1, index) => {
            return (
              <tr key={serviceLocation1.id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{serviceLocation1.service_location_name}</td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        startEditing(
                          serviceLocation1.id,
                          serviceLocation1.service_location_name
                        );
                        handleOpen("addNewServiceLocation1");
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
                        deleteServiceLocation(serviceLocation1.id);
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
      {/* -----------------END SERVICE LOCATION 1 MASTER TABLE-------------------- */}
    </>
  );
}
