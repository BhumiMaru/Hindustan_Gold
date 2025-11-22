import React from "react";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Vendor_List_Table() {
  const { handleOpen } = useUIContext();
  const {
    vendorList,
    pagination,
    startEditing,
    setVendorEditId,
    vendorDelete,
    loading,
  } = useVendor();
  return (
    <>
      {/* ------------------START VENDOR LIST TABLE----------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr#</div>
            </th>
            {/* <th scope="col">Vendor Id</th> */}
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
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : vendorList.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No items found</p>
              </td>
            </tr>
          ) : (
            vendorList.map((vendor, index) => {
              // console.log("vendor", vendor);
              return (
                <tr key={vendor.id}>
                  <td>
                    <div className="ms-4">
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  {/* <td>VA_000001 </td> */}
                  {/* <td>{vendor.id}</td> */}
                  <td>{vendor?.created_at.split("T").shift()}</td>
                  <td>{vendor?.vendor_name}</td>
                  <td>{vendor?.contact_person_name}</td>
                  <td>{vendor?.email}</td>
                  <td>{vendor?.mobile}</td>
                  <td>{vendor?.invoice_total}</td>
                  <td>
                    <span
                      className={`badge ${
                        vendor?.status === 1
                          ? "bg-label-success"
                          : "bg-label-danger"
                      }`}
                    >
                      {vendor?.status === 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td>
                    {/* <div className="d-inline-flex gap-2">
                    <a
                      href="#"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#vendorViewModel"
                      onClick={() => {
                        setVendorEditId(vendor?.id);
                        handleOpen("viewVendorDetails");
                      }}
                    >
                      <i className="icon-base ti tabler-eye icon-22px" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#vendorAddModel"
                      onClick={() => {
                        // console.log("id", vendor.id);
                        startEditing(Number(vendor?.id));
                        handleOpen("addNewVendor");
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px" />
                    </a>
                    <a
                      href="#"
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      onClick={() => vendorDelete(vendor?.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px" />
                    </a>
                  </div> */}
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
                            key={vendor.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              // console.log("id", vendor.id);
                              startEditing(Number(vendor?.id));
                              handleOpen("addNewVendor");
                            }}
                          >
                            Edit
                          </button>

                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#vendorViewModel"
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              setVendorEditId(vendor?.id);
                              handleOpen("viewVendorDetails");
                            }}
                          >
                            View
                          </a>

                          <div className="dropdown-divider"></div>
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => vendorDelete(vendor?.id)}
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
      {/* ------------------END VENDOR LIST TABLE----------------------- */}
    </>
  );
}
