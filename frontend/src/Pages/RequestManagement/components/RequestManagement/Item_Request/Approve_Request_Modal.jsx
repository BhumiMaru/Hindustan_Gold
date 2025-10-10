import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";

export default function Approve_Request_Modal() {
  const { handleClose } = useUIContext();
  const {
    itemRequestId,
    setItemRequestId,
    approveRequest,
    createItemRequest,
    itemRequestData,
    item_Request_Id,
    set_ItemRequest_Id,
    wholeItemRequestData,
    getItemRequestData,
  } = useItemRequest();
  const { CreatePIRequest } = usePIRequest();

  console.log("itemRequestId", itemRequestId);
  console.log("item_Request_Id", item_Request_Id);
  console.log("itemRequestData", itemRequestData);
  console.log("wholeItemRequestData", wholeItemRequestData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    const payload = {
      // ...itemRequestData,
      // Ensure we're sending the correct ID for edit
      // ...(id && { id: itemRequestData.request_id }),
      type: "approval_request",
      item_type: itemRequestData.item_type,
      item_request_id: itemRequestData.request_id,
      pi_type: "service",
      c_id: itemRequestData.c_id,
      category_name: itemRequestData.category_name,
      sub_c_id: itemRequestData.sub_c_id,
      sub_category_name: itemRequestData.sub_category_name,
      item_code: itemRequestData.item_code,
      service_location_1_id: itemRequestData.service_location_1_id,
      service_location_1_name: itemRequestData.service_location_1_name,
      service_location_2_id: itemRequestData.service_location_2_id,
      service_location_2_name: itemRequestData.service_location_2_name,
      service_location_3_id: itemRequestData.service_location_3_id,
      service_location_3_name: itemRequestData.service_location_3_name,
      purpose: itemRequestData.purpose,
      quantity: itemRequestData.quantity,
      // uom: itemRequestData.uom,
      remarks: itemRequestData.remarks,
      items: [
        {
          // id: wholeItemRequestData?.item_request?.item?.id ,

          item_id: wholeItemRequestData?.item_request?.item?.id,
          item_name: wholeItemRequestData?.item_name,
          qty: wholeItemRequestData?.item_request?.quantity,
          uom: wholeItemRequestData?.item_request?.item?.uom || "0",
          priority: "low",
          purpose: wholeItemRequestData?.item_request?.purpose,
          remark: wholeItemRequestData?.reject_remark,
          tentative_consumption_day: 1,
          status: wholeItemRequestData?.status || "Pending",
          // pi_doc:,
        },
      ],
      // status: wholeItemRequestData?.status,
      // workflowId: itemRequestData.c_id,
      // receiving_person: itemRequestData.receiving_person,
    };

    console.log("Submitting payload:", payload);

    try {
      CreatePIRequest(payload);
      handleClose("viewApprove");
      getItemRequestData();
    } catch (error) {
      console.log("Save error:", error);
    }
  };

  return (
    <>
      {/* -------------------START APPROVE REQUEST MODAL--------------------- */}
      <div
        className="modal fade show"
        id="servicesModal"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewApprove")}
              />
            </div>
            <div className="modal-body text-center">
              <div className="mb-3">
                <i className="icon-base ti tabler-server-cog icon-46px text-success" />
              </div>
              <h5 className="mb-0">
                Will this service request be completed in-house or by an
                external provider?
              </h5>
              {/*  <p class="text-muted small mt-1">This action cannot be undone.</p>*/}
            </div>
            <div className="modal-footer justify-content-center">
              {/*  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cancel
            </button>*/}
              <button
                type="button"
                className="btn btn-success waves-effect waves-light"
                onClick={() => {
                  const workflow_id = itemRequestId;
                  approveRequest(workflow_id);

                  handleClose("viewApprove");
                }}
              >
                Yes, in-house
              </button>
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
                onClick={handleSubmit}
              >
                Generate New PI
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -------------------END APPROVE REQUEST MODAL--------------------- */}
    </>
  );
}
