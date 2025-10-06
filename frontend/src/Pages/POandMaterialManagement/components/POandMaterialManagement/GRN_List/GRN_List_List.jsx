import React, { useEffect } from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import GRN_List_Table from "./GRN_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import UpdateGRN from "./UpdateGRN";
import { useUIContext } from "../../../../../Context/UIContext";

export default function GRN_List_List() {
  const { GRNList } = useGRN();
  const { modal } = useUIContext();

  useEffect(() => {
    GRNList();
  }, []);
  return (
    <>
      {/* -------------START GRN LIST --------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar />
            </div>
            <div>
              <button
                className="btn buttons-collection btn-label-secondary  waves-effect"
                type="button"
              >
                <span>
                  <span className=" d-sm-block d-lg-flex align-items-center gap-1">
                    <i className="icon-base ti tabler-upload icon-xs" />
                    <span className="d-sm-inline-block">Export</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="row px-3 pb-2">
            <div className="col-lg-3">
              <select id="select17Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Item</option>
                <option value="HI">Item</option>
                <option value="CA">Item</option>
                <option value="NV">Item</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select7Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Vendor</option>
                <option value="HI">Category</option>
                <option value="CA">Category</option>
                <option value="NV">Category</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select9Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Status</option>
                <option value="HI">Pending</option>
                <option value="CA">Completed</option>
              </select>
            </div>
            <div className="col-lg-3">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <GRN_List_Table />
            <Pagination />
          </div>
        </div>
      </div>
     
      {/* -------------END GRN LIST --------------- */}
    </>
  );
}
