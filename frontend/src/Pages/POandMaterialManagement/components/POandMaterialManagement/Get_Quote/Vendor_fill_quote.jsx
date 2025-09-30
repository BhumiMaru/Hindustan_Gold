import React from "react";

export default function Vendor_fill_quote() {
  return (
    <>
      {/* ----------------------START SEND REQUEST ----------------------- */}
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
                <b>Addsress :-</b>Shelby Company Limited Small Heath, B10 0HF,
                UK 718-986-6062
              </p>
              <p>
                <b>Email :-</b>
                peakyFBlinders@gmail.com
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
              <tr>
                <td>ABCG - STCKER-CHARHER</td>
                <td>10</td>
                <td>Nos</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "100%", minWidth: 80 }}
                  />
                </td>
              </tr>
              <tr>
                <td>ABCG- STCKER-CHARHER</td>
                <td>10</td>
                <td>Nos</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: "100%", minWidth: 80 }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="row">
            <div className="row">
              <div className="col-lg-6">
                <label className="form-label">Upload Quotation </label>
                <input type="file" className="form-control" />
              </div>
              <div className="col-lg-6 text-end">
                <button className="btn btn-success mt-6 waves-effect waves-light">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------END SEND REQUEST ----------------------- */}
    </>
  );
}
