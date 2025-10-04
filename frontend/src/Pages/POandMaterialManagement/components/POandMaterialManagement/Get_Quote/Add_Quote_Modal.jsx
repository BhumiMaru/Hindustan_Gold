import React, { useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";

export default function Add_Quote_Modal() {
  const { handleClose } = useUIContext();
  const {
    newVendorId,
    newVendorData,
    setNewVendorData,
    vendorRateUpdate,
    newVendorList,
    quoteVendorList,
    quoteData,
  } = useGetQuote();
  console.log("newVendorList", newVendorList);

  const [file, setFile] = useState(null);

  // Handle rate input change
  const handleRateChange = (index, value) => {
    const updatedData = [...newVendorData];
    updatedData[index].rate = value;
    setNewVendorData(updatedData);
  };

  // Handle save
  const handleSave = async () => {
    try {
      await vendorRateUpdate({
        pi_get_quote_id: newVendorData[0]?.pi_get_quote_id,
        pi_get_quote_vendor_id: newVendorId,
        items: newVendorData.map((item) => ({
          id: item.id,
          rate: item.rate,
        })),
        vendor_quote_file: file,
      });

      console.log("vendor data", newVendorData);
      handleClose("addQuote");

      // Add this separate useEffect to call quoteVendorList when quoteData is available
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
    } catch (error) {
      console.error("Error saving vendor rates:", error);
    }
  };

  return (
    <>
      {/* -----------------------START ADD QUOTE DETAILS----------------------- */}
      <div
        className="modal fade show"
        id="AddQuoteModel"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddQuoteModelLabel2">
                Add Quote
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("addQuote")}
              />
            </div>

            <div className="modal-body">
              <table className="table table1 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>Item</th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {newVendorData?.map((vendor, index) => (
                    <tr key={index}>
                      {console.log("vendor", vendor)}
                      <td>{vendor?.pirequestitem?.item_name}</td>
                      <td>{vendor?.pirequestitem?.qty}</td>
                      <td>{vendor?.pirequestitem?.uom}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          style={{ width: "100%", minWidth: 80 }}
                          value={vendor?.rate ?? ""}
                          onChange={(e) =>
                            handleRateChange(index, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row mt-2">
                <div className="col-lg-12">
                  <label>Attachment File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleClose("addQuote")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -----------------------END ADD QUOTE DETAILS----------------------- */}
    </>
  );
}
