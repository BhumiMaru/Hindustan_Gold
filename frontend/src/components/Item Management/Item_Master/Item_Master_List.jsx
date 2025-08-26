import React from "react";
import Item_Master_Table from "./Item_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";
import SearchBar from "../../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function Item_Master_List() {
  return (
    <>
      {/* -----------------START ITEM MASTER LIST----------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="row px-3 pt-2">
            <div className="col-lg-3">
              <select id="select10Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Type</option>
                <option value="HI">Item</option>
                <option value="CA">Services</option>
                <option value="NV">Asset</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select7Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Category</option>
                <option value="HI">Category</option>
                <option value="CA">Category</option>
                <option value="NV">Category</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select8Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Subcategory</option>
                <option value="HI">Category</option>
                <option value="CA">Category</option>
                <option value="NV">Category</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select9Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Status</option>
                <option value="HI">Active</option>
                <option value="CA">Deactive</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar />
            </div>
            <div className="">
              <Link
                to="/item/item-create-material"
                className="btn btn-primary waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Material
              </Link>
              <Link
                to="/item/item-create-service"
                className="btn btn-info waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Service
              </Link>
              <Link
                to="/item/item-create-asset"
                className="btn btn-success waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Add Asset
              </Link>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Item_Master_Table />
            <Pagination />
          </div>
        </div>
      </div>

      {/* -----------------END ITEM MASTER LIST----------------- */}
    </>
  );
}
