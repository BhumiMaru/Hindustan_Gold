import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { toast } from "react-toastify"; // ADD THIS IMPORT
import Vendor_Quote_Detail from "./Vendor_Quote_Detail";
import Add_Quote_Modal from "./Add_Quote_Modal";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../../utils/decryptData";

export default function PI_Request_Get_Quote() {
  const { handleOpen, modal } = useUIContext();
  const { id } = useParams();
  const { vendorFilter, getVendorFilter, vendorApprove } = useVendor();

  // Add state for selected vendor
  const [selectedVendor, setSelectedVendor] = useState(null);
  // Add state for past vendor list
  // const [pastVendorList, setPastVendorList] = useState([]);
  const { userPermission, fetchUserPermission } = useUserCreation();

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

  const {
    quoteData,
    quoteItems,
    getQuoteDetails,
    quoteVendorList,
    createQuoteVendor,
    quotationVendorList,
    setQuotationVendorList,
    sendRequest,
    newVendorList,
    setNewVendorList,
    oldVendorList,
    setOldVendorList,
    newVendorId,
    setNewVendorId,
    newVendorData,
    setNewVendorData,
  } = useGetQuote();
  const navigate = useNavigate();

  // console.log("quoteData", quoteData);
  const vendor_type = "new";

  useEffect(() => {
    getVendorFilter();
    getQuoteDetails(id);
  }, [id]);

  // Add this separate useEffect to call quoteVendorList when quoteData is available
  useEffect(() => {
    if (quoteData?.id) {
      quoteVendorList({
        pi_get_quote_id: quoteData.id,
        vendor_type: "new",
      });
      quoteVendorList({
        pi_get_quote_id: quoteData.id,
        vendor_type: "old",
      });
    }
  }, [quoteData?.id]);

  // console.log("get new", newVendorList);
  // console.log("get old", oldVendorList);

  // console.log("pastVendorList", pastVendorList);

  // / Inside your component
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // State for past and new vendor selections
  const [selectedOldVendors, setSelectedOldVendors] = useState([]);
  const [selectedNewVendors, setSelectedNewVendors] = useState([]);
  const [selectAllOld, setSelectAllOld] = useState(false);
  const [selectAllNew, setSelectAllNew] = useState(false);

  // Handle select all checkbox
  // const handleSelectAll = (e) => {
  //   const isChecked = e.target.checked;
  //   setSelectAll(isChecked);

  //   if (isChecked) {
  //     // Select all vendor IDs from quotationVendorList
  //     const allVendorIds = quotationVendorList.map(
  //       (vendor) => vendor.vendor_id || vendor.id
  //     );
  //     setSelectedVendors(allVendorIds);
  //   } else {
  //     // Clear all selections
  //     setSelectedVendors([]);
  //   }
  // };

  // Handle individual checkbox selection
  // const handleSingleCheckbox = (e, vendorId) => {
  //   const isChecked = e.target.checked;

  //   if (isChecked) {
  //     // Add vendor to selection
  //     setSelectedVendors((prev) => [...prev, vendorId]);
  //   } else {
  //     // Remove vendor from selection
  //     setSelectedVendors((prev) => prev.filter((id) => id !== vendorId));
  //     setSelectAll(false);
  //   }
  // };

  // Handle select all (OLD vendors)
  const handleSelectAllOld = (e) => {
    const isChecked = e.target.checked;
    setSelectAllOld(isChecked);
    if (isChecked) {
      const allVendorIds = oldVendorList.map(
        (vendor) => vendor.vendor_id || vendor.id
      );
      setSelectedOldVendors(allVendorIds);
    } else {
      setSelectedOldVendors([]);
    }
  };

  // Handle select all (NEW vendors)
  const handleSelectAllNew = (e) => {
    const isChecked = e.target.checked;
    setSelectAllNew(isChecked);
    if (isChecked) {
      const allVendorIds = newVendorList.map(
        (vendor) => vendor.vendor_id || vendor.id
      );
      setSelectedNewVendors(allVendorIds);
    } else {
      setSelectedNewVendors([]);
    }
  };

  // Handle single checkbox OLD
  const handleSingleCheckboxOld = (e, vendorId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedOldVendors((prev) => [...prev, vendorId]);
    } else {
      setSelectedOldVendors((prev) => prev.filter((id) => id !== vendorId));
      setSelectAllOld(false);
    }
  };

  // Handle single checkbox NEW

  const handleSingleCheckboxNew = (e, vendorId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedNewVendors((prev) => [...prev, vendorId]);
    } else {
      setSelectedNewVendors((prev) => prev.filter((id) => id !== vendorId));
      setSelectAllNew(false);
    }
  };

  // Handle send request for selected vendors
  // const handleSendRequest = async () => {
  //   if (selectedVendors.length === 0) {
  //     toast.error("Please select at least one vendor");
  //     return;
  //   }

  //   try {
  //     await sendRequest({
  //       pi_get_quote_id: parseInt(id),
  //       pi_get_quote_vendor_ids: selectedVendors, // These are the quote vendor IDs
  //     });

  //     // Clear selection after successful send
  //     setSelectedVendors([]);
  //     setSelectAll(false);

  //     // Refresh the vendor list
  //     if (quoteData?.id) {
  //       await quoteVendorList({
  //         pi_get_quote_id: quoteData.id,
  //         vendor_type: "new",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error sending request:", error);
  //   }
  // };

  // Send Request for OLD vendors
  const handleSendOldVendorRequest = async () => {
    if (selectedOldVendors.length === 0) {
      toast.error("Please select at least one past vendor");
      return;
    }
    try {
      await sendRequest({
        pi_get_quote_id: parseInt(id),
        pi_get_quote_vendor_ids: selectedOldVendors,
      });
      // toast.success("Request sent to past vendors!");
      setSelectedOldVendors([]);
      setSelectAllOld(false);
      await quoteVendorList({
        pi_get_quote_id: quoteData.id,
        vendor_type: "old",
      });
    } catch (error) {
      console.error("Error sending request to past vendors:", error);
    }
  };

  // Send Request for NEW vendors
  const handleSendNewVendorRequest = async () => {
    if (selectedNewVendors.length === 0) {
      toast.error("Please select at least one new vendor");
      return;
    }
    try {
      await sendRequest({
        pi_get_quote_id: parseInt(id),
        pi_get_quote_vendor_ids: selectedNewVendors,
      });
      // toast.success("Request sent to new vendors!");
      setSelectedNewVendors([]);
      setSelectAllNew(false);
      await quoteVendorList({
        pi_get_quote_id: quoteData.id,
        vendor_type: "new",
      });
    } catch (error) {
      console.error("Error sending request to new vendors:", error);
    }
  };

  useEffect(() => {
    // Initialize all tooltips after render
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [quoteItems]);

  // Handle add vendor - CORRECTED VERSION
  const handleAddVendor = async () => {
    if (!selectedVendor) {
      toast.error("Please select a vendor first");
      return;
    }

    if (!id) {
      toast.error("PI Request ID is missing");
      return;
    }

    try {
      // Get the PI request ID from quoteItems
      const piRequestId = quoteItems?.pi_request?.id;

      if (!piRequestId) {
        toast.error("PI Request data not loaded yet");
        return;
      }

      // Call the API with correct parameters - PASS AS OBJECT
      const result = await createQuoteVendor({
        pi_get_quote_id: parseInt(id),
        pi_id: quoteData.pi_request.id,
        vendor_id: selectedVendor,
      });
      console.log("result", result);
      await quoteVendorList({
        pi_get_quote_id: result.pi_get_quote_id,
        vendor_type: result.vendor_type,
      });

      if (result?.status) {
        // Refresh the vendor list
        // setTimeout(() => {
        // window.location.reload();
        // navigate(0); // This reloads the current route
        // }, 1000);
        setSelectedVendor(null); // Reset selection
        toast.success("Vendor added successfully!");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  // Handle vendor selection
  const handleVendorSelect = (option) => {
    setSelectedVendor(option);
  };

  // console.log("quoteItems", quoteItems);

  return (
    <>
      {/* ---------------START PI REQUEST GET QUOTE-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-2">
          <h5 className="m-2">PI Item List</h5>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">id#</div>
                  </th>
                  <th>PI Date</th>
                  <th>Approval Date</th>
                  <th>Order By</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>{quoteItems?.pi_request?.pi_date}</td>
                  <td>{quoteItems?.pi_request?.order_by?.name}</td>
                  <td>{quoteItems?.pi_request?.order_by?.name}</td>
                  <td>
                    {
                      quoteItems?.pi_request?.order_by?.department
                        ?.department_name
                    }
                  </td>
                </tr>

                <tr>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9 !important;\n                                        }\n                                    ",
                    }}
                  />
                  <td colSpan={10} style={{ padding: 0 }}>
                    <table className="table table1 datatables-basic align-middle w-100">
                      <thead>
                        <tr className="bg-label-secondary">
                          <th>
                            <div className="ms-4">Item</div>
                          </th>
                          <th>Qty.</th>
                          <th>UOM</th>
                          <th>Priority</th>
                          <th>Purpose</th>
                          <th>Remarks</th>
                          {/* <th>Status</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {quoteItems?.piget_quate_items?.map((pi, index) => {
                          // console.log("ppp", pi);
                          return (
                            <tr key={pi.id}>
                              <td>
                                <div className="ms-4">
                                  {pi?.pi_request_item?.item?.item_name}
                                </div>
                              </td>
                              <td> {pi?.pi_request_item?.qty}</td>
                              <td>{pi?.pi_request_item?.uom}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    pi?.pi_request_item?.priority === "high"
                                      ? "badge-outline-success"
                                      : pi?.pi_request_item?.priority ===
                                        "medium"
                                      ? "badge-outline-info"
                                      : "badge-outline-danger"
                                  }`}
                                >
                                  {pi?.pi_request_item?.priority}
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
                                  data-bs-original-title={
                                    pi?.pi_request_item?.purpose
                                  }
                                >
                                  <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                                </a>
                              </td>
                              <td>{pi?.pi_request_item?.remark}</td>
                              {/* <td>
                                <span
                                  className={`badge ${
                                    pi?.pi_request_item?.status === "Approve"
                                      ? "bg-label-success"
                                      : "bg-label-danger"
                                  } `}
                                >
                                  {pi?.pi_request_item?.status}
                                </span>
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5 className="ms-2">Past Vendor List</h5>
            <div className="me-4">
              <button
                className="btn btn-success btn-sm waves-effect waves-light"
                onClick={handleSendOldVendorRequest}
              >
                Bulk Mail Request
              </button>
            </div>
          </div>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{
                          width: "1rem !important",
                          height: "1rem !important",
                        }}
                        checked={selectAllOld}
                        onChange={handleSelectAllOld}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="ms-4">Vendor Id #</div>
                  </th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email Id</th>
                  <th>Mobile No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {oldVendorList.map((pastVendor, index) => {
                  const vendorId = pastVendor.vendor_id || pastVendor.id;
                  const isSelected = selectedVendors.includes(vendorId);
                  // console.log("pastVendor", pastVendor);
                  return (
                    <tr key={index}>
                      <td>
                        <div className="ms-4">
                          <input
                            aria-label="Select row"
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedOldVendors.includes(vendorId)}
                            onChange={(e) =>
                              handleSingleCheckboxOld(e, vendorId)
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div className="ms-4">{pastVendor.vendor_id}</div>
                      </td>
                      <td>{pastVendor.vendor.vendor_name}</td>
                      <td>{pastVendor.vendor.contact_person_name}</td>
                      <td>{pastVendor.vendor.email}</td>
                      <td>{pastVendor.vendor.mobile}</td>
                      <td>
                        <span className="badge bg-label-info">
                          {pastVendor.quote_status}
                        </span>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-icon  waves-effect waves-light"
                          data-bs-placement="top"
                          aria-label="View Detail"
                          data-bs-original-title="View Detail"
                          data-bs-toggle="modal"
                          data-bs-target="#GetQuoteModel"
                          onClick={() => handleOpen("viewVendorQuoteDetails")}
                        >
                          <i className="icon-base ti tabler-eye icon-md" />
                        </a>

                        <a
                          href="#"
                          className="btn btn-icon  waves-effect waves-light"
                          data-bs-placement="top"
                          aria-label="Add Quote"
                          data-bs-original-title="Add Quote"
                          data-bs-toggle="modal"
                          data-bs-target="#AddQuoteModel"
                          onClick={() => handleOpen("addQuote")}
                        >
                          <i className="icon-base ti tabler-receipt-rupee icon-md" />
                        </a>
                        {pastVendor.quote_status === "Pending" ? (
                          <button
                            className="btn btn-info btn-sm waves-effect waves-light"
                            onClick={handleSendOldVendorRequest}
                          >
                            Send Request
                          </button>
                        ) : pastVendor.quote_status ===
                          "Request Quotation Pending" ? (
                          <button className="btn bg-label-info btn-sm waves-effect waves-light">
                            Quotation Pending
                          </button>
                        ) : pastVendor.quote_status === "completed" ? (
                          <button className="btn btn-success btn-sm waves-effect waves-light">
                            Vendor Approve
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className=" d-flex justify-content-between mt-4 ms-2 me-4">
            <div className="d-flex">
              <h5 className="ms-2">Vendor</h5>
              <div className="d-flex ms-6 ">
                <div className="position-relative">
                  <CustomSelect
                    placeholder="Select Vendor"
                    options={vendorFilter.map((vendor) => ({
                      value: vendor.id,
                      label: vendor.vendor_name,
                    }))}
                    value={selectedVendor}
                    onChange={handleVendorSelect}
                  />
                </div>
                <div className="ms-4">
                  <button
                    className="btn btn-success btn-sm waves-effect waves-light"
                    onClick={handleAddVendor}
                    disabled={!selectedVendor}
                  >
                    Add
                  </button>
                </div>
                <div className="ms-2">
                  <button
                    className="btn btn-info btn-sm waves-effect waves-light"
                    data-bs-toggle="modal"
                    data-bs-target="#vendorAddModel"
                    onClick={() => handleOpen("addNewVendor")}
                  >
                    Add New Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{
                          width: "1rem !important",
                          height: "1rem !important",
                        }}
                        checked={selectAllNew}
                        onChange={handleSelectAllNew}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="ms-4">Vendor Id #</div>
                  </th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email Id</th>
                  <th>Mobile No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {newVendorList.map((quotation, index) => {
                  // console.log("quotation", quotation);
                  const vendorId = quotation.vendor_id || quotation.id;
                  const isSelected = selectedVendors.includes(vendorId);
                  // console.log("vendorId", vendorId);
                  // console.log("isSelected", isSelected);
                  return (
                    <tr key={index}>
                      <td>
                        <div className="ms-4">
                          <input
                            aria-label="Select row"
                            className={`form-check-input ${
                              quotation.quote_status === "Complete" && "d-none"
                            } ${
                              quotation.quote_status === "Quote Pending" &&
                              "d-none"
                            }`}
                            type="checkbox"
                            checked={selectedNewVendors.includes(vendorId)}
                            onChange={(e) =>
                              handleSingleCheckboxNew(e, vendorId)
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div className="ms-4">{quotation.vendor_id}</div>
                      </td>
                      <td>{quotation.vendor.vendor_name}</td>
                      <td>{quotation.vendor.contact_person_name}</td>
                      <td>{quotation.vendor.email}</td>
                      <td>{quotation.vendor.mobile}</td>
                      <td>
                        <span
                          className={`badge ${
                            quotation.quote_status === "Pending"
                              ? "bg-label-warning"
                              : quotation.quote_status === "Complete"
                              ? "bg-label-success"
                              : "bg-label-info"
                          } `}
                        >
                          {quotation.quote_status}
                        </span>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-icon  waves-effect waves-light"
                          data-bs-placement="top"
                          aria-label="View Detail"
                          data-bs-original-title="View Detail"
                          data-bs-toggle="modal"
                          data-bs-target="#GetQuoteModel"
                          onClick={() => {
                            setNewVendorId(quotation?.id);
                            setNewVendorData(quotation?.vendor_item);
                            handleOpen("viewVendorQuoteDetails");
                          }}
                        >
                          <i className="icon-base ti tabler-eye icon-md" />
                        </a>

                        <a
                          href="#"
                          className={`btn btn-icon  waves-effect waves-light ${
                            quotation.quote_status === "Complete" && "d-none"
                          }`}
                          data-bs-placement="top"
                          aria-label="Add Quote"
                          data-bs-original-title="Add Quote"
                          data-bs-toggle="modal"
                          data-bs-target="#AddQuoteModel"
                          onClick={() => {
                            setNewVendorId(quotation?.id);
                            setNewVendorData(quotation?.vendor_item);
                            handleOpen("addQuote");
                          }}
                        >
                          <i className="icon-base ti tabler-receipt-rupee icon-md" />
                        </a>
                        {quotation.quote_status === "Pending" ? (
                          <button
                            className="btn btn-info btn-sm waves-effect waves-light"
                            onClick={handleSendNewVendorRequest}
                          >
                            Send Request
                          </button>
                        ) : quotation.quote_status === "Quote Pending" ? (
                          <button className="btn bg-label-info btn-sm waves-effect waves-light">
                            Quotation Pending
                          </button>
                        ) : (
                          quotation.quote_status === "Complete" &&
                          userPermission?.some(
                            (perm) =>
                              perm.type === "Get Quotation" &&
                              perm.permission === "Add"
                          ) && (
                            <button
                              // className="btn btn-success btn-sm waves-effect waves-light"
                              className={`btn btn-success btn-sm waves-effect waves-light ${
                                quotation.po_status === 1 && "d-none"
                              }`}
                              onClick={() =>
                                vendorApprove({
                                  vendor_id: quotation.vendor_id,
                                  pi_get_quate: quotation.pi_get_quote_id,
                                })
                              }
                            >
                              Vendor Approve
                            </button>
                          )
                        )}
                        {console.log("qu", quotation)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal.viewVendorQuoteDetails && <Vendor_Quote_Detail />}
      {modal.addQuote && <Add_Quote_Modal />}
      {/* ---------------END PI REQUEST GET QUOTE-------------------- */}
    </>
  );
}
