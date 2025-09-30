import React, { useState } from "react";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../../../../constants/endpoints";
import { postData } from "../../../../../utils/api";

export default function Vendor_fill_quote({
  pi_get_quote_id,
  pi_get_quote_vendor_id,
  itemsData,
}) {
  // itemsData example: [{ id: 1, name: "ABCG - STCKER-CHARHER", qty: 10, uom: "Nos" }]

  const [items, setItems] = useState(
    itemsData?.map((item) => ({ ...item, rate: "" }))
  );
  const [file, setFile] = useState(null);

  const handleRateChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].rate = value;
    setItems(updatedItems);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validate rates
    const invalidRate = items?.some((item) => !item?.rate || item?.rate <= 0);
    if (invalidRate) {
      toast.error("Please enter valid rates for all items");
      return;
    }

    try {
      // Create FormData for rates + optional file
      const formData = new FormData();
      formData.append("pi_get_quote_id", pi_get_quote_id);
      formData.append("pi_get_quote_vendor_id", pi_get_quote_vendor_id);
      formData.append(
        "pi_get_quote_vendor_item_ids",
        JSON.stringify(
          items?.map((item) => ({
            id: item.id,
            rate: parseFloat(item.rate),
          }))
        )
      );

      if (file) {
        formData.append("quote_file", file);
      }

      // Single API call for rates + file
      const res = await postData(
        ENDPOINTS.QUOTATIONDETAILS.RATEUPDATE,
        formData
      );

      if (res.status) {
        toast.success(res.message || "Vendor rates updated successfully!");
      } else {
        toast.error(res.message || "Failed to update vendor rates");
      }
    } catch (error) {
      toast.error("Error submitting vendor quote");
      console.error("Submit vendor quote error:", error);
    }
  };

  return (
    <div data-bs-spy="scroll" className="scrollspy-example">
      <div className="container">
        <div className="row mb-6">
          <div className="col-12 text-center mt-10">
            <img src="assets/img/logo_vertical.png" style={{ height: 100 }} />
          </div>
          <div className="col-12 text-center mt-6">
            <h3>Item Quotation</h3>
          </div>
          <div className="col-12">
            <p className="fs-5 fw-bold">Vendor Detail:-</p>
            <p>
              <b>Name :-</b> ABC EnterPrice
            </p>
            <p>
              <b>Address :-</b> Shelby Company Limited Small Heath, B10 0HF, UK
              718-986-6062
            </p>
            <p>
              <b>Email :-</b> peakyFBlinders@gmail.com
            </p>
          </div>
        </div>

        <table className="table table1 datatables-basic align-middle w-100">
          <thead>
            <tr className="bg-label-secondary">
              <th>Item</th>
              <th>Qty.</th>
              <th>UOM</th>
              <th>Rate Per Qty.</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.uom}</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "100%", minWidth: 80 }}
                    value={item.rate}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row">
          <div className="col-lg-6">
            <label className="form-label">Upload Quotation </label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="col-lg-6 text-end">
            <button
              className="btn btn-success mt-6 waves-effect waves-light"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
