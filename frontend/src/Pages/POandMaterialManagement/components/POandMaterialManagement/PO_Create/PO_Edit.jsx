import React, { useState } from "react";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function PO_Edit() {
  const { poDetails, formData } = usePOCreate();
  const [charges, setCharges] = useState([]);
  const [milestones, setMilestones] = useState([
    // { percentage: "", payment_number: "" },
  ]);
  const [packingChargeChecked, setPackingChargeChecked] = useState(false);
  const [frightChargeChecked, setFrightChargeChecked] = useState(false);

  // Milestone handlers
  const handleAddMilestone = () => {
    setMilestones([...milestones, { percentage: "", payment_number: "" }]); // Changed
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  // Charge handlers
  const handleAddCharge = () => {
    setCharges([...charges, { name: "", amount: "" }]);
  };

  return (
    <>
      {/* ---------------------START PO EDIT--------------------- */}
      <div className="flex-grow-1 container-p-y container-fluid">
        <div className="row invoice-preview">
          <div className="card invoice-preview-card">
            <div className="card-body invoice-preview-header rounded">
              <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
                <div className="mb-md-0 mb-6">
                  <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
                    <div>
                      <img
                        src={`${publicUrl}/assets/img/logo_vertical.png`}
                        style={{ height: "86px", width: "137.95px" }}
                        alt="Company Logo"
                      />
                    </div>
                  </div>
                  <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
                  <p className="mb-2">San Diego County, CA 91905, USA</p>
                  <p className="mb-3">+1 (123) 456 7891, +44 (876) 543 2198</p>
                </div>
                <div className="col-md-5 col-8 pe-0 ps-0 ps-md-2">
                  <dl className="row mb-0 gx-4">
                    <dt className="col-sm-5 mb-2 d-md-flex align-items-center justify-content-end">
                      <span className="h5 text-capitalize mb-0 text-nowrap">
                        PO Number
                      </span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={poDetails?.po_number || ""}
                        id="invoiceId"
                      />
                    </dd>
                    <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
                      <span className="fw-normal">PO Date:</span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="date"
                        className="form-control invoice-date"
                        // value={formData?.po_date}
                        value={new Date()?.toISOString()?.split("T")[0]}
                        onChange={(e) =>
                          handleInputChange("po_date", e?.target?.value)
                        }
                      />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card-body px-0">
              <div className="row">
                <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
                  <select className="form-select mb-4 w-50" disabled>
                    <option value={poDetails?.venderdetail?.vendor_name}>
                      {poDetails?.venderdetail?.vendor_name}
                    </option>
                  </select>
                  <p className="mb-1">{poDetails?.venderdetail?.address}</p>
                </div>
                <div className="col-md-6 col-sm-7">
                  <table>
                    <tbody>
                      <tr>
                        <td className="pe-4">Contact Person:</td>
                        <td>{poDetails?.venderdetail?.contact_person_name}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">Mobile Number:</td>
                        <td>{poDetails?.venderdetail?.mobile}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">E-mail:</td>
                        <td>{poDetails?.venderdetail?.email}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">GST Number:</td>
                        <td>{poDetails?.venderdetail?.gst_number}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">PAN Number:</td>
                        <td>{poDetails?.venderdetail?.pan_number}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-2 d-flex">
                    <div>
                      <span className="badge bg-label-primary mt-3">
                        Is Payment Advance Or Partial
                      </span>
                    </div>
                    &nbsp;
                    <select
                      className="form-select mt-2 w-25 form-select-sm"
                      value={formData?.is_payment_advance_or_partial}
                      onChange={(e) =>
                        handleInputChange(
                          "is_payment_advance_or_partial",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-0 px-0">
              <form className="source-item">
                <div className="mb-4" data-repeater-list="group-a">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.#</th>
                        <th>Item</th>
                        <th>Indent No</th>
                        <th>Description</th>
                        <th>Qty.</th>
                        <th>UOM</th>
                        <th>
                          <span>Unit&nbsp;Price</span>

                          <select
                            class="form-select-sm w-auto"
                            value={formData?.default_rupees}
                            onChange={(e) =>
                              handleInputChange(
                                "default_rupees",
                                e.target.value
                              )
                            }
                          >
                            {/* <option value="">Select</option> */}
                            <option value="INR">INR(₹)</option>
                            <option value="USD">Dollar($)</option>
                          </select>
                        </th>
                        <th>Disc(%)</th>
                        <th>Disc(₹)</th>
                        <th>GST(%)</th>
                        <th>GST(₹)</th>
                        <th>Taxable Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData?.items?.map((item, index) => (
                        <tr key={index}>
                          {console.log("item", item)}
                          <td>{index + 1}</td>
                          <td>{item?.item_name}</td>
                          {/* <td>{item?.item_name}</td> */}
                          <td>No</td>
                          <td>{item?.description}</td>
                          <td>{item?.qty}</td>
                          <td>{item?.uom}</td>
                          <td>{item?.unit_price}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item?.disc_pr}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "disc_pr",
                                  e.target.value
                                )
                              }
                              min="0"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.disc_number}
                              readOnly
                              min="0"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item?.gst_pr}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "gst_pr",
                                  e.target.value
                                )
                              }
                              min="0"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.gst_amount}
                              readOnly
                              min="0"
                            />
                          </td>
                          <td>{item?.taxable_value}</td>
                          {/* <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.taxable_value}
                              readOnly
                              className="form-control-plaintext"
                            />
                          </td> */}
                        </tr>
                      ))}

                      {/* Total Discount */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2} className="text-end">
                          <span className="w-px-100">
                            Total&nbsp;Discount&nbsp;:
                          </span>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.total_discount}
                            // onChange={(e) =>
                            //   handleInputChange(
                            //     "total_discount",
                            //     e.target.value
                            //   )
                            // }
                          />
                        </td>
                      </tr>

                      {/* Packing Charge */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                                checked={packingChargeChecked}
                                onChange={(e) =>
                                  setPackingChargeChecked(e.target.checked)
                                }
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Packing&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.packing_charge}
                            onChange={(e) =>
                              handleInputChange(
                                "packing_charge",
                                e.target.value
                              )
                            }
                            disabled={!packingChargeChecked}
                          />
                        </td>
                      </tr>

                      {/* Packing GST */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">
                              Packing&nbsp;GST&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.packing_gst}
                            onChange={(e) =>
                              handleInputChange("packing_gst", e.target.value)
                            }
                          />
                        </td>
                      </tr>

                      {/* Fright Charge */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                                checked={frightChargeChecked}
                                onChange={(e) =>
                                  setFrightChargeChecked(e.target.checked)
                                }
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Fright&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.fright_charge}
                            onChange={(e) =>
                              handleInputChange("fright_charge", e.target.value)
                            }
                            disabled={!frightChargeChecked}
                          />
                        </td>
                      </tr>

                      {/* Fright GST */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.fright_gst}
                            onChange={(e) =>
                              handleInputChange("fright_gst", e.target.value)
                            }
                          />
                        </td>
                      </tr>

                      {/* Additional Charges */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex">
                            <span className="mt-1">
                              Additional&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                            onClick={handleAddCharge}
                          >
                            <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                            Add&nbsp;Charge
                          </button>
                        </td>
                      </tr>

                      {charges?.map((charge, index) => (
                        <tr key={index}>
                          <td colSpan={9} className="border-transparent"></td>
                          <td colSpan={2}>
                            <div className="d-flex align-items-center">
                              {index !== 0 && (
                                <button
                                  type="button"
                                  className="btn btn-sm me-2 text-danger fs-5"
                                  onClick={() => {
                                    const updatedCharges = [...charges];
                                    updatedCharges.splice(index, 1);
                                    setCharges(updatedCharges);
                                  }}
                                >
                                  &times;
                                </button>
                              )}
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Enter Charge Name"
                                value={charge?.name}
                                onChange={(e) =>
                                  handleChargeChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={charge?.amount}
                              onChange={(e) =>
                                handleChargeChange(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}

                      {/* Totals */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {formData?.sub_total}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {formData?.gst_value}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="mt-1">
                              ₹ {formData?.final_total}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>

            <hr className="my-0" />

            {/* Terms & Conditions Section */}
            <div className="card-body px-0 pb-0">
              <h5 className="my-0">Terms &amp; Conditions</h5>

              {/* Payment Milestones */}
              <label className="form-label">Payment</label>
              <div className="row mb-2">
                {milestones?.map((milestone, index) => (
                  <div className="col-4 mt-3" key={index}>
                    <div className="d-flex">
                      <select
                        className="form-select form-control form-select-sm"
                        style={{ width: 100 }}
                        value={milestone?.percentage}
                        onChange={(e) =>
                          handleMilestoneChange(
                            index,
                            "percentage",
                            e.target.value
                          )
                        }
                      >
                        <option value="">0%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                      </select>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button"
                        placeholder="Description"
                        value={milestone?.payment_number}
                        onChange={
                          (e) =>
                            handleMilestoneChange(
                              index,
                              "payment_number",
                              e.target.value
                            ) // Changed
                        }
                      />
                    </div>
                    <div>
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-sm me-2 text-danger fs-5"
                          onClick={() => {
                            const updatedMilestones = [...milestones];
                            updatedMilestones?.splice(index, 1);
                            setMilestones(updatedMilestones);
                          }}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    onClick={handleAddMilestone}
                  >
                    <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                    Payment&nbsp;Milestone
                  </button>
                </div>
              </div>

              {/* Taxes */}
              <label className="form-label">Taxes:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="d-flex">
                    <select
                      className="form-select form-control form-select-sm"
                      style={{ width: 100 }}
                      value={formData?.taxes_pr}
                      onChange={(e) =>
                        handleInputChange("taxes_pr", e.target.value)
                      }
                    >
                      <option value="">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      aria-label="Text input with segmented dropdown button"
                      placeholder="Tax Number"
                      value={formData?.taxes_number}
                      onChange={(e) =>
                        handleInputChange("taxes_number", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Guarantee and Warranty */}
              <label className="form-label">Guarantee and Warranty:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Enter Guarantee and Warranty"
                    value={formData?.guarantee_and_warranty}
                    onChange={(e) =>
                      handleInputChange(
                        "guarantee_and_warranty",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* Other Details */}
              <div className="row mb-2">
                <div className="col-4">
                  <label className="form-label">
                    Loading and freight charges
                    <span className="text-danger">*</span>:
                  </label>
                  <select
                    className="form-select mb-4 form-select-sm"
                    value={formData?.loading_and_freight_charges}
                    onChange={(e) =>
                      handleInputChange(
                        "loading_and_freight_charges",
                        e.target.value
                      )
                    }
                  >
                    {/* <option value="">Select</option> */}
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">
                    Installation at Site <span className="text-danger">*</span>:{" "}
                  </label>
                  <select
                    className="form-select mb-4 form-select-sm"
                    value={formData?.installation_at_site}
                    onChange={(e) =>
                      handleInputChange("installation_at_site", e.target.value)
                    }
                  >
                    {/* <option value="">Select</option> */}
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">Delivery:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Delivery terms"
                    value={formData?.delivery}
                    onChange={(e) =>
                      handleInputChange("delivery", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="my-0" />

            {/* Introduction and Save Button */}
            <div className="row mb-2">
              <div className="col-12">
                <label className="form-label">Introduction:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  aria-label="Text input with segmented dropdown button"
                  placeholder="Enter introduction"
                  value={formData?.introduction}
                  onChange={(e) =>
                    handleInputChange("introduction", e.target.value)
                  }
                />
              </div>
              <div className="col-12 mt-2 text-end">
                <button
                  className="btn btn-success waves-effect waves-light"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------END PO EDIT--------------------- */}
    </>
  );
}
