import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../../../../constants/endpoints";
import { postData } from "../../../../../utils/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { decryptData } from "../../../../../utils/decryptData";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import axios from "axios";
const base_url = import.meta.env.VITE_API_BASE_URL;

// export default function Vendor_fill_quote({
//   pi_get_quote_id,
//   pi_get_quote_vendor_id,
//   itemsData,
// }) {
export default function Vendor_fill_quote() {
  const {
    quoteVendorListForEmail,
    quoteDataForEmail,
    setQuoteDataForEmail,
    quoteVendorList,
    quoteData,
    vendorEmailData,
    newVendorId,
    // newVendorData,
    // setNewVendorData,
    vendorRateUpdate,
    newVendorList,
  } = useGetQuote();
  const navigate = useNavigate();

  // console.log("quoteDataForEmail", quoteDataForEmail);

  const [newVendorData, setNewVendorData] = useState([]);

  const location = useLocation();
  // console.log("location", location);
  const params = new URLSearchParams(location.search);
  // console.log("params", params);
  const data = decodeURIComponent(params.get("data"));
  // console.log("data", data);

  // console.log(quoteDataForEmail);

  let decryptEmailData = null;
  if (data) {
    try {
      const cleaned = decodeURIComponent(data).replace(/ /g, "+"); // 🔥 Fix spaces turned from +
      // console.log("cleaned", cleaned);
      decryptEmailData = decryptData(cleaned);
      // console.log("decryptEmailData", decryptEmailData);
    } catch (error) {
      console.log("decrypt error", error);
    }
  }

  // console.log("decryptEmailData", decryptEmailData);

  const [file, setFile] = useState(null);

  const [items, setItems] = useState([]);
  // console.log("vendorEmailData", vendorEmailData);

  // Sync items with API data
  // useEffect(() => {
  //   if (quoteDataForEmail?.vendor_item?.length > 0) {
  //     setItems(
  //       quoteDataForEmail.vendor_item.map((item) => ({
  //         ...item,
  //         rate: item.rate,
  //       }))
  //     );
  //   }
  // }, [quoteDataForEmail]);

  // useEffect(() => {
  //   if (quoteDataForEmail?.vendor_item?.length > 0) {
  //     setItems(
  //       quoteDataForEmail.vendor_item.map((item) => ({
  //         ...item,
  //         rate: item.rate || "", // initialize rate
  //       }))
  //     );
  //   }
  // }, [quoteDataForEmail]);

  // useEffect(() => {
  //   if (quoteDataForEmail?.vendor_item?.length > 0) {
  //     setItems(
  //       quoteDataForEmail.vendor_item.map((item) => ({
  //         id: item.id,
  //         rate: item.rate,
  //       }))
  //     );
  //   }
  // }, [quoteDataForEmail]);
  // useEffect(() => {
  //   if (quoteDataForEmail?.vendor_item?.length > 0) {
  //     setNewVendorData(
  //       quoteDataForEmail.vendor_item.map((item) => ({
  //         id: item.id,
  //         rate: item.rate,
  //       }))
  //     );
  //   }
  // }, [quoteDataForEmail]);

  // useEffect(() => {
  //   if (quoteDataForEmail?.vendor_item?.length > 0) {
  //     setItems(
  //       quoteDataForEmail.vendor_item.map((item) => ({
  //         id: Number(
  //           item.pi_get_quote_vendor_item_id ||
  //             item.id ||
  //             item.pirequestitem_id ||
  //             item.pirequestitem?.id
  //         ),
  //         rate: item.rate || "", // keep as string for input control
  //       }))
  //     );
  //   }
  // }, [quoteDataForEmail]);

  useEffect(() => {
    if (quoteDataForEmail?.vendor_item?.length > 0 && items.length === 0) {
      setItems(
        quoteDataForEmail.vendor_item.map((item) => ({
          id: Number(
            item.pi_get_quote_vendor_item_id ||
              item.id ||
              item.pirequestitem_id ||
              item.pirequestitem?.id
          ),
          rate: item.rate || "", // keep as string for controlled input
        }))
      );
    }
  }, [quoteDataForEmail]);

  // console.log("quoteDataForEmail.vendor_item", quoteDataForEmail.vendor_item);
  // Update rates
  // const handleRateChange = (index, value) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].rate = value;
  //   setItems(updatedItems);
  // };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle rate input change
  // const handleRateChange = (index, value) => {
  //   console.log("index", index);
  //   console.log("value", value);
  //   const updatedItems = [...items];
  //   console.log("updatedItems", updatedItems);
  //   updatedItems[index] = {
  //     ...updatedItems[index],
  //     rate: value,
  //   };
  //   setItems(updatedItems);
  // };

  const handleRateChange = (index, value) => {
    // console.log("index", index);
    // console.log("value", value);
    const updatedItems = [...items];
    // console.log("updatedItems", updatedItems);
    updatedItems[index] = {
      ...updatedItems[index],
      rate: value,
    };
    setItems(updatedItems);
  };

  // console.log("newVendorData", newVendorData);
  // Handle rate input change
  // const handleRateChange = (index, value) => {
  //   if (!Array.isArray(newVendorData)) return; // prevent crash
  //   console.log("index rate", index);
  //   console.log("value rate", value);
  //   console.log("newVendorData", newVendorData);

  //   const updatedData = [...newVendorData];
  //   console.log("updatedData", updatedData);
  //   updatedData[index] = {
  //     ...updatedData[index],
  //     rate: value,
  //   };
  //   setNewVendorData(updatedData);
  // };

  // console.log(`${base_url}${ENDPOINTS.QUOTATIONDETAILS.RATEUPDATE}`);

  // console.log(`${base_url}${ENDPOINTS.QUOTATIONDETAILS.RATEUPDATE}`);
  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("pi_get_quote_id", decryptEmailData?.getquoteid);
  //     formData.append("pi_get_quote_vendor_id", decryptEmailData?.vendorid);

  //     // Append each item properly
  //     items.forEach((item, index) => {
  //       formData.append(`pi_get_quote_vendor_item_ids[${index}][id]`, item?.id);
  //       formData.append(
  //         `pi_get_quote_vendor_item_ids[${index}][rate]`,
  //         Number(item?.rate)
  //       );
  //     });

  //     if (file) {
  //       formData.append("vendor_quote_file", file);
  //     }

  //     // console.log("res", res);

  //     for (let [key, value] of formData.entries()) {
  //       console.log("key:", key);
  //       console.log("value:", value);
  //     }
  //   } catch (error) {
  //     console.log("err", error);
  //   }
  // };

  // console.log("Items:", items);

  // console.log("decryptEmailData", decryptEmailData);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("pi_get_quote_id", decryptEmailData?.getquoteid);
      formData.append("pi_get_quote_vendor_id", quoteDataForEmail?.id);

      // Append each item properly
      items.forEach((item, index) => {
        formData.append(
          `pi_get_quote_vendor_item_ids[${index}][id]`,
          Number(item?.id)
        );
        formData.append(
          `pi_get_quote_vendor_item_ids[${index}][rate]`,
          Number(item?.rate || 0)
        );
      });

      // items.forEach((item, index) => {
      //   if (!item?.id || isNaN(item.id)) {
      //     console.warn(`⚠️ Skipping invalid item at index ${index}`, item);
      //     return;
      //   }
      //   formData.append(
      //     `pi_get_quote_vendor_item_ids[${index}][id]`,
      //     Number(item.id)
      //   );
      //   formData.append(
      //     `pi_get_quote_vendor_item_ids[${index}][rate]`,
      //     Number(item.rate)
      //   );
      // });

      if (file) {
        formData.append("vendor_quote_file", file);
      }

      // for (let [key, value] of formData.entries()) {
      //   console.log("key:", key);
      //   console.log("value:", value);
      // }

      const res = await axios.post(
        `${base_url}${ENDPOINTS.QUOTATIONDETAILS.RATEUPDATE}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${decryptEmailData?.token}`,
          },
        }
      );

      // console.log("res data", res);
      // console.log("after newVendorData ", newVendorData);

      // Check backend response (assuming backend sends { status: true/false, message: "" })
      if (res?.status) {
        toast.success(res?.data?.message);
        navigate("/thank-you");
        return res.data;
        // Refresh vendor lists if needed
        // if (quoteDataForEmail?.id) {
        //   quoteVendorList({
        //     pi_get_quote_id: quoteDataForEmail.id,
        //     vendor_type: "new",
        //   });
        //   quoteVendorList({
        //     pi_get_quote_id: quoteDataForEmail.id,
        //     vendor_type: "old",
        //   });
        // }
      } else {
        toast.error(res?.message || "Failed to update vendor rates");
      }
    } catch (error) {
      toast.error("Error submitting vendor quote");
      console.error("Submit vendor quote error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Error updating vendor rate";
        toast.error(errorMessage);
      } else {
        toast.error("Network error: Failed to update vendor rate");
      }
      console.error("Vendor Rate Update error:", error);
      throw error;
    }
  };
  // const handleSubmit = async () => {
  //   try {
  //     await vendorRateUpdate({
  //       pi_get_quote_id: newVendorData[0]?.pi_get_quote_id,
  //       pi_get_quote_vendor_id: newVendorId,
  //       items: newVendorData.map((item) => ({
  //         id: item.id,
  //         rate: item.rate,
  //       })),
  //       vendor_quote_file: file,
  //     });

  //     console.log("vendor data", newVendorData);
  //     handleClose("addQuote");
  //     console.log("quoteData", quoteData);

  //     // Add this separate useEffect to call quoteVendorList when quoteData is available
  //     if (quoteData?.id) {
  //       quoteVendorList({
  //         pi_get_quote_id: quoteData.id,
  //         vendor_type: "new",
  //       });
  //       quoteVendorList({
  //         pi_get_quote_id: quoteData.id,
  //         vendor_type: "old",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error saving vendor rates:", error);
  //   }
  // };

  // useEffect(() => {
  //   quoteVendorListForEmail({
  //     pi_get_quote_id: decryptEmailData?.getquoteid,
  //     token:
  //       decryptEmailData?.token ||
  //       "441|NCUKDm9rHVVDMwN5JswzPWS7j30BwtpEpxRRklzP6feb1058",
  //     vendor_id: decryptEmailData?.vendorid,
  //   });
  // }, []);
  // console.log("decryptEmailData", decryptEmailData);

  useEffect(() => {
    if (decryptEmailData?.getquoteid && decryptEmailData?.vendorid) {
      quoteVendorListForEmail({
        pi_get_quote_id: decryptEmailData?.getquoteid,
        vendor_id: decryptEmailData?.vendorid,
        // token:
        //   decryptEmailData?.token ||
        //   "441|NCUKDm9rHVVDMwN5JswzPWS7j30BwtpEpxRRklzP6feb1058",
        token: decryptEmailData?.token,
      });
    }
  }, [decryptEmailData]);

  // console.log("quoteDataForEmail?.vendor_item", quoteDataForEmail);

  return (
    <div data-bs-spy="scroll" className="scrollspy-example">
      <div className="container">
        <div className="row mb-6">
          <div>
            <div>get Guote Id : {decryptEmailData?.getquoteid}</div>
            <div>vendor Id : {decryptEmailData?.vendorid}</div>
            <div>token :{decryptEmailData?.token}</div>
          </div>
          <div className="col-12 text-center mt-10">
            <img src="assets/img/logo_vertical.png" style={{ height: 100 }} />
          </div>
          <div className="col-12 text-center mt-6">
            <h3>Item Quotation</h3>
          </div>
          <div className="col-12">
            <p className="fs-5 fw-bold">Vendor Detail:-</p>
            <p>
              <b>Name :-</b> {vendorEmailData?.data?.vendor?.vendor_name}
            </p>
            <p>
              <b>Address :-</b> {vendorEmailData?.data?.vendor?.address}
            </p>
            <p>
              <b>Email :-</b> {vendorEmailData?.data?.vendor?.email}
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
            {quoteDataForEmail?.vendor_item?.map((item, index) => (
              <tr key={item.id}>
                {/* {console.log("ites", item)} */}
                <td>{item?.pirequestitem?.item_name}</td>
                <td>{item?.pirequestitem?.qty}</td>
                <td>{item?.pirequestitem?.uom}</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "100%", minWidth: 80 }}
                    // value={items[index]?.rate ?? ""}
                    value={items[index]?.rate ?? ""}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                    // disabled={
                    //   !(
                    //     item?.rate === "0.00" ||
                    //     item?.rate === 0 ||
                    //     item?.rate === null ||
                    //     item?.rate === ""
                    //   )
                    // }
                    disabled={item?.rate > 0}
                  />
                  {/* <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "100%", minWidth: 80 }}
                    value={item?.rate ?? ""}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                  /> */}
                </td>
                {/* {console.log("item rate", item.rate)} */}
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
              // onChange={handleFileChange}
              onChange={(e) => setFile(e.target.files[0])}
              disabled={quoteDataForEmail.vendor_quote_file}
              // disabled={item?.rate > 0}
            />
            {quoteDataForEmail.vendor_quote_file && (
              <span>File : {quoteDataForEmail.vendor_quote_file}</span>
            )}
          </div>

          <div
            className={`col-lg-6 text-end ${
              quoteDataForEmail?.vendor_item?.every(
                (vendor) => vendor.rate != null
              ) && quoteDataForEmail.vendor_quote_file != null
                ? "d-none"
                : "d-block"
            }`}
          >
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
