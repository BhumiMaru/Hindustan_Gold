import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";

export default function Invoice_List_Form({ id, type }) {
  const { handleClose } = useUIContext();
  const {
    createInvoice,
    invoiceData,
    setInvoiceData,
    editInvoice,
    invoiceId,
    setInvoiceId,
    subCategoryId,
    setSubCategoryId,
    itemName,
    setItemName,
    vendor,
    setVendor,
  } = useInvoice();
  const { vendorFilter, setVendorFilter, getVendorFilter } = useVendor();
  const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();
  // const [subCategoryId, setSubCategoryId] = useState(null);
  const [file, setFile] = useState(null);
  // const [itemName, setItemName] = useState("all");
  const { fetchItemFilter, filterItem } = useItemRequest();
  // console.log("grnId grnId", id);
  console.log("type", type);

  useEffect(() => {
    console.log("Current vendor state:", vendor);
    console.log("Current invoiceData:", invoiceData);
  }, [vendor, invoiceData]);
  // In your Invoice_List_Form component, add this useEffect to debug the select
  useEffect(() => {
    console.log("Vendor dropdown debug:", {
      vendorValue: vendor,
      vendorOptions: vendorFilter?.map((item) => ({
        value: item.id,
        label: item.vendor_name,
      })),
      selectedOption: vendorFilter?.find((item) => item.id === vendor),
    });
  }, [vendor]);

  useEffect(() => {
    if (invoiceData.item_id && filterItem?.length > 0) {
      const itemExists = filterItem.find(
        (item) => item.item_id === invoiceData.item_id
      );
      if (itemExists && itemName !== invoiceData.item_id) {
        console.log("Auto-selecting item:", invoiceData.item_id);
        setItemName(invoiceData.item_id);
      }
    }
  }, [filterItem, invoiceData.item_id, itemName]);

  useEffect(() => {
    const loadData = async () => {
      await getVendorFilter();
      await fetchItemFilter();
      await fetchSubCategoryFilter();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (type !== undefined && type !== null) {
      setInvoiceData((prev) => ({
        ...prev,
        invoice_type: String(type), // convert number to string
      }));
    }
  }, [type]);

  useEffect(() => {
    if (subCategoryId) {
      fetchItemFilter(subCategoryId);
      setItemName(null); // reset previous item
    } else {
      fetchItemFilter(); // fetch all if subCategory cleared
    }
  }, [subCategoryId]);

  console.log("subCategoryId", subCategoryId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("grn_id", id ? Number(id) : null);
    formData.append(
      "invoice_type",
      invoiceData.invoice_type !== "" && invoiceData.invoice_type !== null
        ? Number(invoiceData.invoice_type)
        : null
    );
    formData.append("vendor_id", vendor ? Number(vendor) : null);
    formData.append(
      "sub_cat_id",
      subCategoryId
        ? Number(subCategoryId)
        : invoiceData.sub_cat_id
        ? Number(invoiceData.sub_cat_id)
        : null
    );
    formData.append(
      "item_id",
      itemName
        ? Number(itemName)
        : Number(invoiceData.item_id)
        ? Number(invoiceData.item_id)
        : null
    );
    formData.append("invoice_date", invoiceData.invoice_date || "");
    formData.append(
      "taxable_amount",
      invoiceData.taxable_amount !== "" && invoiceData.taxable_amount !== null
        ? Number(invoiceData.taxable_amount)
        : 0
    );
    formData.append(
      "tds_amount",
      invoiceData.tds_amount !== "" && invoiceData.tds_amount !== null
        ? Number(invoiceData.tds_amount)
        : 0
    );
    formData.append("remarks", invoiceData.remarks || "");

    if (file) formData.append("invoice_file", file);

    if (invoiceId) {
      await editInvoice({ id: invoiceId, formData }); // send FormData directly
    } else {
      await createInvoice(formData);
    }

    handleClose("addInvoice");
  };

  return (
    <>
      {/* -------------------START INVOICE LIST FORM------------------- */}
      <div
        className="modal fade show"
        id="InvoiceModel"
        tabIndex={-1}
        style={{ display: "block" }}
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
                  <i className="icon-base ti tabler-file icon-22px" />
                </button>
                <h5 className="modal-title ms-2 mt-2" id="AddQuoteModelLabel2">
                  Add Invoice
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("addInvoice")}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4">
                  <label className="form-label">Sub Category</label>
                  <div className="select2-info">
                    <div className="position-relative">
                      <CustomSelect
                        id="selectSubCategory"
                        options={filterSubCategory?.map((subcat) => ({
                          value: subcat.id,
                          label: subcat.sub_category_name,
                        }))}
                        name="sub_cat_id"
                        value={subCategoryId}
                        onChange={setSubCategoryId}
                        placeholder="Select SubCategory"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Item</label>
                  <div className="select2-info">
                    <div className="position-relative">
                      <CustomSelect
                        id="selectItemName"
                        options={filterItem?.map((item) => ({
                          value: item.item_id,
                          label: item.item_name,
                        }))}
                        name="item_id"
                        value={itemName}
                        onChange={setItemName}
                        placeholder="Select Item"
                        disabled={!subCategoryId}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Vendor</label>
                  <div className="select2-info">
                    <div className="position-relative">
                      <CustomSelect
                        key={`vendor-select-${vendor}`}
                        options={vendorFilter?.map((item) => ({
                          value: item.id,
                          label: item.vendor_name,
                        }))}
                        name="vendor_id"
                        value={vendor}
                        onChange={setVendor}
                        placeholder="Select Vendor"
                      />
                    </div>
                    {console.log("CustomSelect Debug:", {
                      vendorValue: vendor,
                      vendorType: typeof vendor,
                      options: vendorFilter?.map((item) => ({
                        value: item.id,
                        valueType: typeof item.id,
                        label: item.vendor_name,
                      })),
                    })}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Invoice Date</label>
                  <input
                    type="date"
                    name="invoice_date"
                    className="form-control"
                    value={invoiceData.invoice_date || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-4 mt-2">
                  <label className="form-label">Taxable Amount</label>
                  <input
                    type="number"
                    name="taxable_amount"
                    className="form-control"
                    value={invoiceData.taxable_amount || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-4 mt-2">
                  <label className="form-label">TDS Amount</label>
                  <input
                    type="number"
                    name="tds_amount"
                    className="form-control"
                    value={invoiceData.tds_amount || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Remarks</label>
                  <textarea
                    className="form-control"
                    name="remarks"
                    value={invoiceData.remarks || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 mt-2">
                  <label className="form-label">Invoice Attachment File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {invoiceData.invoice_file && (
                    <span>Invoice FileName: {invoiceData.invoice_file}</span>
                  )}
                </div>
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                    onClick={() => handleClose("addInvoice")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn  btn-success ms-2 waves-effect waves-light"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -------------------END INVOICE LIST FORM------------------- */}
    </>
  );
}
