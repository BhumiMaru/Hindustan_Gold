import React, { useEffect } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { useParams } from "react-router-dom";

export default function UpdateGRN({ id }) {
  const { handleClose } = useUIContext();
  const { grnData, setGrnData, CreateGRN, EditGRN, editId, setEditId, grnId } =
    useGRN();
  const { PoId, getPoDetails, poDetails } = usePOCreate();

  const po_id = Number(id) || grnId;

  useEffect(() => {
    getPoDetails(po_id);
  }, [po_id]);

  console.log("grnId", grnId);
  console.log("poDetails", poDetails);
  console.log("grnData", grnData);

  // For new GRN, initialize from PO details
  useEffect(() => {
    if (!editId && poDetails?.items) {
      const initialItems = poDetails.items.map((item, index) => {
        console.log("PO Item:", item);
        return {
          grn_item_id: null, // ✅ null for new items (no existing GRN item ID)
          po_item_id: item.id,
          item_name: item?.pirequestitem?.item_name,
          quantity: item?.qty,
          uom: item.uom,
          pending_qty: item.pending_quantity || item.quantity,
          grn_qty: 0, // Start with 0 for new GRN
        };
      });

      setGrnData((prev) => ({
        ...prev,
        po_id: po_id,
        items: initialItems,
      }));
    }
  }, [poDetails, editId]); // Added editId to dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrnData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGrnData((prev) => ({
        ...prev,
        invoice_file: file,
      }));
    }
  };

  // Handle changes for item quantities
  const handleItemChange = (index, value) => {
    setGrnData((prev) => {
      const updatedItems = [...(prev.items || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        grn_qty: parseInt(value) || 0,
      };
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleSave = () => {
    // Calculate total GRN quantity
    const totalGrnQty =
      grnData?.items?.reduce((total, item) => {
        return total + (Number(item.grn_qty) || 0);
      }, 0) || 0;

    const grnPayload = {
      grn_no: grnData.grn_no,
      grn_date: new Date().toISOString().split("T")[0],
      po_id: Number(grnData.po_id),
      date_of_receipt: grnData.date_of_receipt,
      total_grn_qty: totalGrnQty,
      invoice_file: grnData.invoice_file,
      remark: grnData.remark,
      items: grnData.items?.map((item) => ({
        grn_item_id: item.grn_item_id, // ✅ Use grn_item_id from the item object
        po_item_id: Number(item.po_item_id),
        grn_qty: Number(item.grn_qty || 0),
      })),
    };

    console.log("Sending GRN data:", grnPayload);
    console.log("GRN items being sent:", grnData.items);

    if (editId) {
      EditGRN({ id: editId, payload: grnPayload });
    } else {
      CreateGRN(grnPayload);
    }
    handleClose("editGRN");
  };

  return (
    <>
      {/* --------------------------START UPDATE GRN-------------------------- */}
      <div
        className="modal fade show"
        id="grnCreateModel"
        tabIndex={-1}
        style={{ display: "block", paddingLeft: 0 }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-icon rounded-pill btn-label-info waves-effect"
                >
                  <i className="icon-base ti tabler-truck-delivery icon-22px" />
                </button>
                <h5 className="modal-title ms-2 mt-2" id="AddQuoteModelLabel2">
                  {editId ? "Update GRN" : "Add GRN"}
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("editGRN")}
              />
            </div>
            <div className="modal-body">
              <div className="row px-4">
                <div className="col-lg-3">
                  <label className="form-label">Vendor</label>
                  <p>{poDetails?.venderdetail?.vendor_name}</p>
                </div>
                <div className="col-lg-3">
                  <label className="form-label">Contact Person</label>
                  <p>{poDetails?.venderdetail?.contact_person_name}</p>
                </div>
                <div className="col-lg-3">
                  <label className="form-label">GST Number</label>
                  <p>{poDetails?.venderdetail?.gst_number}</p>
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Address :</label>
                  <p>{poDetails?.venderdetail?.address}</p>
                </div>
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                    .table2 thead tr th {\n                        padding-block: 0.5rem !important;\n                        padding-inline-end: 1rem;\n                    }\n\n                ",
                }}
              />

              <table className="table table2 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>
                      <div className="ms-4">Item</div>
                    </th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Pending Qty.</th>
                    <th>Received Qty.</th>
                  </tr>
                </thead>
                <tbody>
                  {grnData?.items?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="ms-4">{item?.item_name}</div>
                      </td>
                      <td>{item?.quantity}</td>
                      <td>{item?.uom}</td>
                      <td>{item?.pending_qty}</td>
                      <td>
                        {item?.pending_qty > 0 ? (
                          <input
                            type="number"
                            className="form-control"
                            value={item.grn_qty}
                            onChange={(e) =>
                              handleItemChange(index, e.target.value)
                            }
                            min="0"
                            max={item?.pending_qty}
                          />
                        ) : (
                          <span>No pending quantity</span>
                        )}

                        {/* Debug info - remove in production */}
                        {/* {process.env.NODE_ENV === "development" && (
                          <small className="text-muted">
                            GRN Item ID: {item.grn_item_id || "new"}
                          </small>
                        )} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">
                <div className="col-lg-4">
                  <label className="form-label">PO ID</label>
                  <input
                    type="number"
                    className="form-control"
                    name="po_id"
                    value={grnData.po_id}
                    onChange={handleChange}
                    disabled={!!editId} // Disable when editing existing GRN
                  />
                </div>
                <div className="col-lg-4 d-none">
                  <label className="form-label">GRN Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="grn_date"
                    value={
                      grnData.grn_date || new Date().toISOString().split("T")[0]
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Date of Receipt</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_receipt"
                    value={grnData?.date_of_receipt || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="form-label">Invoice Attachment File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {editId && grnData?.invoice_file && (
                    <span>Current File: {grnData.invoice_file}</span>
                  )}
                </div>
                <div className="col-lg-12 mt-4">
                  <label className="form-label">Remarks</label>
                  <textarea
                    className="form-control"
                    name="remark"
                    value={grnData?.remark || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                    onClick={() => handleClose("editGRN")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success ms-2 waves-effect waves-light"
                    onClick={handleSave}
                  >
                    {editId ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* --------------------------END UPDATE GRN-------------------------- */}
    </>
  );
}
